/*!
 * Copyright 2021 Cognite AS
 */

import * as THREE from 'three';

import { SectorMetadata } from '../types';
import { computeNdcAreaOfBox } from './computeNdcAreaOfBox';
import { transformBoxToNDC } from './transformBoxToNDC';

const preallocated = {
  transformedBounds: new THREE.Box3()
};

type ModifiedFrustum = {
  near: number;
  far: number;
  weight: number;
  frustum: THREE.Frustum;
};

export class WeightFunctionsHelper {
  private readonly _camera: THREE.PerspectiveCamera;
  private _minSectorDistance: number = Infinity;
  private _maxSectorDistance: number = -Infinity;
  private readonly _modifiedFrustums: ModifiedFrustum[];

  constructor(camera: THREE.PerspectiveCamera) {
    this._camera = camera;

    // Create modified projection matrices to add heurestic of how "deep" in the frustum sectors are located
    // This is done to avoid loading too much geometry from sectors we are barely inside and prioritize
    // loading of geometry
    const { near, far } = camera;
    const nearFarRange = far - near;
    this._modifiedFrustums = [
      { near, far: near + 0.05 * nearFarRange, weight: 0.1 }, // 0-5% of frustum
      { near: near + 0.05 * nearFarRange, far: near + 0.4 * nearFarRange, weight: 0.7 }, // 5-40% of frustum
      { near: near + 0.4 * nearFarRange, far: near + 1.0 * nearFarRange, weight: 0.2 } // 40-100% of frustum
    ].map(x => {
      const projectionMatrix = createModifiedProjectionMatrix(camera, x.near, x.far);
      const frustum = new THREE.Frustum().setFromProjectionMatrix(projectionMatrix);
      return {
        ...x,
        frustum
      };
    });
  }

  addCandidateSectors(sectors: SectorMetadata[], modelMatrix: THREE.Matrix4) {
    // Note! We compute distance to camera, not screen (which would probably better)
    const { minDistance, maxDistance } = sectors.reduce(
      (minMax, sector) => {
        const distanceToCamera = this.distanceToCamera(sector, modelMatrix);
        minMax.maxDistance = Math.max(minMax.maxDistance, distanceToCamera);
        minMax.minDistance = Math.min(minMax.minDistance, distanceToCamera);
        return minMax;
      },
      { minDistance: Infinity, maxDistance: -Infinity }
    );
    this._minSectorDistance = minDistance;
    this._maxSectorDistance = maxDistance;
  }

  computeTransformedSectorBounds(sector: SectorMetadata, modelMatrix: THREE.Matrix4, out: THREE.Box3): void {
    out.copy(sector.bounds);
    out.applyMatrix4(modelMatrix);
  }

  /**
   * Computes a weight in range [0-1], where 1 means close to camera and 0 means far away.
   * @param sector
   */
  computeDistanceToCameraWeight(transformedSectorBounds: THREE.Box3): number {
    const minSectorDistance = this._minSectorDistance;
    const maxSectorDistance = this._maxSectorDistance;

    // Weight sectors that are close to the camera higher
    const distanceToCamera = transformedSectorBounds.distanceToPoint(this._camera.position);
    const normalizedDistanceToCamera = (distanceToCamera - minSectorDistance) / (maxSectorDistance - minSectorDistance);
    return 1.0 - normalizedDistanceToCamera;
  }

  /**
   * Compute a weight in range [0-1] where 1 means the sector covers the entire screen
   * and 0 means no coverage.
   * @param transformedSectorBounds
   * @returns
   */
  computeScreenAreaWeight(transformedSectorBounds: THREE.Box3): number {
    const distanceToCamera = transformedSectorBounds.distanceToPoint(this._camera.position);
    return distanceToCamera > 0.0 ? computeNdcAreaOfBox(this._camera, transformedSectorBounds) : 1.0;
  }

  /**
   * Compute a weight in range [0-1] based on at what "depths"
   * in the frustum the sector is placed.
   * @param transformedSectorBounds
   */
  computeFrustumDepthWeight(transformedSectorBounds: THREE.Box3): number {
    const frustum = new THREE.Frustum();
    frustum.intersectsBox(transformedSectorBounds);

    const frustumWeight = this._modifiedFrustums.reduce((accumulatedWeight, x) => {
      const { frustum, weight } = x;
      const accepted = frustum.intersectsBox(transformedSectorBounds);
      return accumulatedWeight + (accepted ? weight : 0);
    }, 0.0);
    return frustumWeight;
  }

  /**
   * Compute a weight that is based on where on the screen the sector is placed.
   * Sectors overlapping the center of the screen is considered more important than
   * sectors on the edge.
   * @param transformedSectorBounds
   * @returns
   * @deprecated Doesn't make sense
   */
  computeCenterOfScreenWeight(transformedSectorBounds: THREE.Box3): number {
    const samplePoints = [
      { weight: 1.0, point: new THREE.Vector2(0, 0) },

      { weight: 0.25, point: new THREE.Vector2(-0.5, -0.5) },
      { weight: 0.25, point: new THREE.Vector2(-0.5, 0.5) },
      { weight: 0.25, point: new THREE.Vector2(0.5, -0.5) },
      { weight: 0.25, point: new THREE.Vector2(0.5, 0.5) },

      { weight: 0.125, point: new THREE.Vector2(-0.75, -0.75) },
      { weight: 0.125, point: new THREE.Vector2(-0.75, 0.75) },
      { weight: 0.125, point: new THREE.Vector2(0.75, -0.75) },
      { weight: 0.125, point: new THREE.Vector2(0.75, 0.75) }
    ];
    const accumulatedSampleWeight = samplePoints.reduce((value, x) => x.weight + value, 0.0);

    const ndcBounds = transformBoxToNDC(transformedSectorBounds, this._camera);
    const ndcRect = new THREE.Box2(
      new THREE.Vector2(ndcBounds.min.x, ndcBounds.min.y),
      new THREE.Vector2(ndcBounds.max.x, ndcBounds.max.y)
    );
    const accumulatedWeight = samplePoints.reduce((sum, sample) => {
      const d = ndcRect.distanceToPoint(sample.point);
      const weight = (sample.weight * (2.0 - Math.max(d, 0.0))) / 2.0;
      return sum + weight;
    }, 0.0);

    // Scale to [0-1]
    return accumulatedWeight / accumulatedSampleWeight;
  }

  /**
   * Computes a weight based on placement in sector tree (i.e. prioritize)
   * sectors right below root sector.
   * @param sector
   */
  computeSectorTreePlacementWeight(sector: SectorMetadata): number {
    const levelWeight = sector.depth === 2 ? 1.0 : 1.0 / 3.0;
    return levelWeight;
  }

  private distanceToCamera(sector: SectorMetadata, modelMatrix: THREE.Matrix4) {
    const { transformedBounds } = preallocated;
    transformedBounds.copy(sector.bounds);
    transformedBounds.applyMatrix4(modelMatrix);
    return transformedBounds.distanceToPoint(this._camera.position);
  }
}

function createModifiedProjectionMatrix(camera: THREE.PerspectiveCamera, near: number, far: number): THREE.Matrix4 {
  const modifiedCamera = camera.clone();
  modifiedCamera.near = near;
  modifiedCamera.far = far;
  modifiedCamera.updateProjectionMatrix();
  return modifiedCamera.projectionMatrix;
}
