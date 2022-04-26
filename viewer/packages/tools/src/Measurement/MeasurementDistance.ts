/*!
 * Copyright 2022 Cognite AS
 */

import { Cognite3DViewer } from '@reveal/core';
import * as THREE from 'three';
import { LineGeometry } from './LineGeometry';
import { lineShaders } from '@reveal/rendering';
import { Line } from './Line';
import { Measurement } from './Measurement';

export class MeasurementDistance implements Measurement {
  private readonly _viewer: Cognite3DViewer;
  private _measurementLine: Line | undefined;
  private _lineGeometry: LineGeometry;
  private _isActive: boolean;
  private readonly _startPoint: THREE.Vector3;
  private readonly _endPoint: THREE.Vector3;
  private _positions: Float32Array;
  private _colors: Float32Array;

  private readonly LineUniforms: any = {
    worldUnits: { value: 1 },
    linewidth: { value: 0.02 },
    resolution: { value: new THREE.Vector2(1, 1) },
    dashOffset: { value: 0 },
    dashScale: { value: 1 },
    dashSize: { value: 1 },
    gapSize: { value: 1 },
    diffuse: { value: new THREE.Color(0x00ffff) }
  };

  private readonly ShaderLibUniforms: any = {
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, this.LineUniforms])
  };

  constructor(viewer: Cognite3DViewer) {
    this._viewer = viewer;
    this._isActive = false;
    this._startPoint = new THREE.Vector3();
    this._endPoint = new THREE.Vector3();
    this._positions = new Float32Array(6);
    this._colors = new Float32Array(6);
  }

  private initializeLine(): void {
    if (this._measurementLine === undefined) {
      this._lineGeometry = new LineGeometry();
      const material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(this.ShaderLibUniforms.uniforms),
        vertexShader: lineShaders.vertex,
        fragmentShader: lineShaders.fragment,
        clipping: true,
        linewidth: 0.1,
        vertexColors: true,
        alphaToCoverage: true,
        glslVersion: THREE.GLSL3
      });

      this._positions[0] = this._positions[1] = this._positions[2] = 0;
      this._positions[3] = this._positions[4] = this._positions[5] = 0;

      // const color = new THREE.Color(200, 180, 100);

      this._colors[0] = 25;
      this._colors[1] = 50;
      this._colors[2] = 100;
      this._colors[3] = 100;
      this._colors[4] = 50;
      this._colors[5] = 25;

      this._lineGeometry.setPositions(this._positions);
      this._lineGeometry.setColors(this._colors);

      this._measurementLine = new Line(this._lineGeometry, material);

      this._viewer.addObject3D(this._measurementLine);
    }
  }

  /**
   * Add/Start the line of the distance measurement
   * @param point Start point of the Line
   */
  public add(point: THREE.Vector3): void {
    this.initializeLine();
    this.addStartPoint(point);
  }

  private clearLine(): void {
    if (this._measurementLine) {
      this._measurementLine.geometry.dispose();
      this._measurementLine.clear();
      this._measurementLine = undefined;
      this._isActive = false;
    }
  }

  /**
   * Remove the measurement line
   */
  public remove(): void {
    this.clearLine();
  }

  /**
   * Completes a line for distance measurement
   */
  public complete(): void {
    this.clearLine();
  }

  private addStartPoint(point: THREE.Vector3): void {
    this._startPoint.copy(point);
    this._endPoint.copy(point);
    this._positions[0] = this._startPoint.x;
    this._positions[1] = this._startPoint.y;
    this._positions[2] = this._startPoint.z;
    this._isActive = true;
  }

  /**
   * Get the distance value between the start point & end/mouse point
   * @returns Distance between the two points
   */
  public getMeasurementValue(): number {
    return this._endPoint.distanceTo(this._startPoint);
  }

  /**
   * Update the Distance measurement
   * @param controlPoint Control point (Second point) of the distance measurement
   */
  public update(controlPoint: THREE.Vector3): void {
    const distance = new THREE.Vector3()
      .subVectors(controlPoint, this._viewer.cameraManager.getCamera().position)
      .length();
    if (distance < 0.4) {
      const direction = new THREE.Vector3();
      direction.subVectors(this._endPoint, this._startPoint);
      // controlPoint.addVectors(this._endPoint, this._endPoint.normalize());
    }
    if (this._isActive && this._measurementLine && distance > 0.2) {
      this._positions[3] = controlPoint.x;
      this._positions[4] = controlPoint.y;
      this._positions[5] = controlPoint.z;
      this._lineGeometry.setPositions(this._positions);
      this._endPoint.copy(controlPoint);
    }
  }

  /**
   * Check if the measurement is active
   * @returns Returns `true` if distance measurement is active
   */
  public isActive(): boolean {
    return this._isActive;
  }
}
