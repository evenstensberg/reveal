/*!
 * Copyright 2022 Cognite AS
 */

import * as THREE from 'three';

import { Image360Provider } from '@reveal/data-providers';
import { Image360Entity } from '../src/entity/Image360Entity';
import { It, Mock } from 'moq.ts';
import { Overlay3DIcon } from '@reveal/3d-overlays';
import { DeviceDescriptor, SceneHandler } from '@reveal/utilities';
import { Historical360ImageSet } from '@reveal/data-providers/src/types';
import { Image360AnnotationFilter } from '../src/annotation/Image360AnnotationFilter';

describe(Image360Entity.name, () => {
  test('transformation should be respected', () => {
    const image360Descriptor: Historical360ImageSet = {
      id: '0',
      label: 'testEntity',
      collectionId: '0',
      collectionLabel: 'test_collection',
      transform: new THREE.Matrix4(),
      imageRevisions: [
        {
          timestamp: undefined,
          faceDescriptors: []
        }
      ]
    };

    const mockSceneHandler = new Mock<SceneHandler>().setup(p => p.addCustomObject(It.IsAny())).returns();
    const mock360ImageProvider = new Mock<Image360Provider<any>>();
    const mock360ImageIcon = new Mock<Overlay3DIcon>().object();

    const testTranslation = new THREE.Matrix4().makeTranslation(4, 5, 6);
    const desktopDevice: DeviceDescriptor = { deviceType: 'desktop' };

    const entity = new Image360Entity(
      image360Descriptor,
      mockSceneHandler.object(),
      mock360ImageProvider.object(),
      new Image360AnnotationFilter({}),
      testTranslation,
      mock360ImageIcon,
      desktopDevice
    );

    expect(entity.transform.equals(testTranslation)).toBeTrue();
  });
});
