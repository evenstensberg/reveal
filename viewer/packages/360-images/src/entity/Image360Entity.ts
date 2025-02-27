/*!
 * Copyright 2022 Cognite AS
 */

import { DeviceDescriptor, SceneHandler } from '@reveal/utilities';
import { Image360DataProvider } from '@reveal/data-providers';
import { Image360 } from './Image360';
import { Historical360ImageSet, Image360EventDescriptor } from '@reveal/data-providers/src/types';
import { Image360RevisionEntity } from './Image360RevisionEntity';
import minBy from 'lodash/minBy';
import { Image360VisualizationBox } from './Image360VisualizationBox';
import { ImageAnnotationObject } from '../annotation/ImageAnnotationObject';
import { Overlay3DIcon } from '@reveal/3d-overlays';
import { Image360AnnotationFilter } from '../annotation/Image360AnnotationFilter';

export class Image360Entity implements Image360 {
  private readonly _revisions: Image360RevisionEntity[];
  private readonly _imageMetadata: Image360EventDescriptor;
  private readonly _transform: THREE.Matrix4;
  private readonly _image360Icon: Overlay3DIcon;
  private readonly _image360VisualizationBox: Image360VisualizationBox;
  private _activeRevision: Image360RevisionEntity;

  /**
   * Get a copy of the model-to-world transformation matrix
   * of the given 360 image.
   * @returns model-to-world transform of the 360 Image
   */
  get transform(): THREE.Matrix4 {
    return this._transform.clone();
  }

  /**
   * Get the icon that represents the 360
   * image during normal visualization.
   * @returns Image360Icon
   */
  get icon(): Overlay3DIcon {
    return this._image360Icon;
  }

  /**
   * The object containing the unit cube with the 360 images.
   * @returns Image360Visualization
   */
  get image360Visualization(): Image360VisualizationBox {
    return this._image360VisualizationBox;
  }

  /**
   * Get Id of 360 image entity.
   * @returns Station Id
   */
  get id(): string {
    return this._imageMetadata.id;
  }

  /**
   * Get label of 360 image entity.
   * @returns Station label
   * */
  get label(): string | undefined {
    return this._imageMetadata.label;
  }

  constructor(
    image360Metadata: Historical360ImageSet,
    sceneHandler: SceneHandler,
    imageProvider: Image360DataProvider,
    annotationFilterer: Image360AnnotationFilter,
    transform: THREE.Matrix4,
    icon: Overlay3DIcon,
    device: DeviceDescriptor
  ) {
    this._transform = transform;
    this._image360Icon = icon;
    this._imageMetadata = image360Metadata;

    this._image360VisualizationBox = new Image360VisualizationBox(this._transform, sceneHandler, device);
    this._image360VisualizationBox.visible = false;

    this._revisions = image360Metadata.imageRevisions.map(
      descriptor =>
        new Image360RevisionEntity(imageProvider, descriptor, this._image360VisualizationBox, annotationFilterer)
    );
    this._activeRevision = this.getMostRecentRevision();
  }

  /**
   * List all historical images for this entity.
   * @returns A list of available revisions.
   */
  public getRevisions(): Image360RevisionEntity[] {
    return this._revisions;
  }

  /**
   * Get the revision that is currently loaded for this entry.
   * @returns Returns the active revision.
   */
  public getActiveRevision(): Image360RevisionEntity {
    return this._activeRevision;
  }

  public setActiveRevision(revision: Image360RevisionEntity): void {
    this._activeRevision = revision;
    this._activeRevision.applyTextures();
  }

  public applyFullResolutionTextures(): Promise<void> {
    return this._activeRevision.applyFullResolutionTextures();
  }

  public getMostRecentRevision(): Image360RevisionEntity {
    return this._revisions[0];
  }

  /**
   * Get the revision closest to the provided date.
   * If all revisions are undated the first available revison is returned.
   */
  public getRevisionClosestToDate(date: Date): Image360RevisionEntity {
    const dateAsNumber = date.getTime();
    const datedRevisions = this._revisions.filter(revision => revision.date !== undefined);
    const closestDatedRevision = minBy(datedRevisions, revision => Math.abs(revision.date!.getTime() - dateAsNumber));
    return closestDatedRevision ?? this.getMostRecentRevision();
  }

  public intersectAnnotations(raycaster: THREE.Raycaster): ImageAnnotationObject | undefined {
    return this._activeRevision.intersectAnnotations(raycaster);
  }

  /**
   * Drops the GPU resources for the 360 image
   */
  public unloadImage(): void {
    this._image360VisualizationBox.unloadImages();
  }

  public activateAnnotations(): void {
    const setAndShowAnnotations = async () => {
      const annotations = await this._activeRevision.getAnnotations();

      this._image360VisualizationBox.setAnnotations(annotations);
      this._image360VisualizationBox.setAnnotationsVisibility(true);
    };

    setAndShowAnnotations();
  }

  public deactivateAnnotations(): void {
    this._image360VisualizationBox.setAnnotationsVisibility(false);
  }

  /**
   * @obvious
   */
  public dispose(): void {
    this.unloadImage();
    this._revisions.forEach(revision => revision.dispose());
    this._image360Icon.dispose();
  }
}
