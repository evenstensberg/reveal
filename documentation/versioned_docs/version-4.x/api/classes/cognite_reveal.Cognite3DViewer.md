---
id: "cognite_reveal.Cognite3DViewer"
title: "Class: Cognite3DViewer"
sidebar_label: "Cognite3DViewer"
custom_edit_url: null
---

[@cognite/reveal](../modules/cognite_reveal.md).Cognite3DViewer

## Constructors

### constructor

• **new Cognite3DViewer**(`options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`Cognite3DViewerOptions`](../interfaces/cognite_reveal.Cognite3DViewerOptions.md) |

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:212](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L212)

## Accessors

### cadBudget

• `get` **cadBudget**(): [`CadModelBudget`](../modules/cognite_reveal.md#cadmodelbudget)

Gets the current budget for downloading geometry for CAD models. Note that this
budget is shared between all added CAD models and not a per-model budget.

#### Returns

[`CadModelBudget`](../modules/cognite_reveal.md#cadmodelbudget)

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:166](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L166)

• `set` **cadBudget**(`budget`): `void`

Sets the current budget for downloading geometry for CAD models. Note that this
budget is shared between all added CAD models and not a per-model budget.

#### Parameters

| Name | Type |
| :------ | :------ |
| `budget` | [`CadModelBudget`](../modules/cognite_reveal.md#cadmodelbudget) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:176](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L176)

___

### cameraManager

• `get` **cameraManager**(): [`CameraManager`](../interfaces/cognite_reveal.CameraManager.md)

#### Returns

[`CameraManager`](../interfaces/cognite_reveal.CameraManager.md)

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:584](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L584)

___

### canvas

• `get` **canvas**(): `HTMLCanvasElement`

Returns the rendering canvas, the DOM element where the renderer draws its output.

#### Returns

`HTMLCanvasElement`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:90](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L90)

___

### domElement

• `get` **domElement**(): `HTMLElement`

The DOM element the viewer will insert its rendering canvas into.
The DOM element can be specified in the options when the viewer is created.
If not specified, the DOM element will be created automatically.
The DOM element cannot be changed after the viewer has been created.

#### Returns

`HTMLElement`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:100](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L100)

___

### models

• `get` **models**(): [`CogniteModel`](../modules/cognite_reveal.md#cognitemodel)[]

Gets a list of models currently added to the viewer.

#### Returns

[`CogniteModel`](../modules/cognite_reveal.md#cognitemodel)[]

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:201](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L201)

___

### pointCloudBudget

• `get` **pointCloudBudget**(): [`PointCloudBudget`](../modules/cognite_reveal.md#pointcloudbudget)

Returns the point cloud budget. The budget is shared between all loaded
point cloud models.

#### Returns

[`PointCloudBudget`](../modules/cognite_reveal.md#pointcloudbudget)

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:186](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L186)

• `set` **pointCloudBudget**(`budget`): `void`

Sets the point cloud budget. The budget is shared between all loaded
point cloud models.

#### Parameters

| Name | Type |
| :------ | :------ |
| `budget` | [`PointCloudBudget`](../modules/cognite_reveal.md#pointcloudbudget) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:194](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L194)

## Methods

### add360ImageSet

▸ **add360ImageSet**(`datasource`, `eventFilter`, `add360ImageOptions?`): `Promise`<[`Image360Collection`](../interfaces/cognite_reveal.Image360Collection.md)\>

Adds a set of 360 images to the scene from the /events API in Cognite Data Fusion.

**`Example`**

```js
const eventFilter = { site_id: "12345" };
await viewer.add360ImageSet('events', eventFilter);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `datasource` | ``"events"`` | The CDF data source which holds the references to the 360 image sets. |
| `eventFilter` | `Object` | The metadata filter to apply when querying events that contains the 360 images. |
| `add360ImageOptions?` | [`AddImage360Options`](../modules/cognite_reveal.md#addimage360options) | Options for behaviours when adding 360 images. |

#### Returns

`Promise`<[`Image360Collection`](../interfaces/cognite_reveal.Image360Collection.md)\>

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:724](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L724)

___

### addCadModel

▸ **addCadModel**(`options`): `Promise`<[`CogniteCadModel`](cognite_reveal.CogniteCadModel.md)\>

Add a new CAD 3D model to the viewer.
Call [fitCameraToModel](cognite_reveal.Cognite3DViewer.md#fitcameratomodel) to see the model after the model has loaded.

**`Example`**

```js
const options = {
modelId:     'COGNITE_3D_MODEL_ID',
revisionId:  'COGNITE_3D_REVISION_ID',
};
viewer.addCadModel(options).then(model => {
viewer.fitCameraToModel(model, 0);
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AddModelOptions`](../interfaces/cognite_reveal.AddModelOptions.md) |

#### Returns

`Promise`<[`CogniteCadModel`](cognite_reveal.CogniteCadModel.md)\>

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:670](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L670)

___

### addModel

▸ **addModel**(`options`): `Promise`<[`CogniteModel`](../modules/cognite_reveal.md#cognitemodel)\>

Add a new model to the viewer.
Call [fitCameraToModel](cognite_reveal.Cognite3DViewer.md#fitcameratomodel) to see the model after the model has loaded.

**`Example`**

```js
const options = {
modelId:     'COGNITE_3D_MODEL_ID',
revisionId:  'COGNITE_3D_REVISION_ID',
};
viewer.addModel(options).then(model => {
viewer.fitCameraToModel(model, 0);
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AddModelOptions`](../interfaces/cognite_reveal.AddModelOptions.md) |

#### Returns

`Promise`<[`CogniteModel`](../modules/cognite_reveal.md#cognitemodel)\>

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:637](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L637)

___

### addObject3D

▸ **addObject3D**(`object`): `void`

Add a THREE.Object3D to the viewer.

**`Example`**

```js
const sphere = new THREE.Mesh(
new THREE.SphereGeometry(),
new THREE.MeshBasicMaterial()
);
viewer.addObject3D(sphere);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object3D`<`Event`\> |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:886](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L886)

___

### addPointCloudModel

▸ **addPointCloudModel**(`options`): `Promise`<[`CognitePointCloudModel`](cognite_reveal.CognitePointCloudModel.md)\>

Add a new pointcloud 3D model to the viewer.
Call [fitCameraToModel](cognite_reveal.Cognite3DViewer.md#fitcameratomodel) to see the model after the model has loaded.

**`Example`**

```js
const options = {
modelId:     'COGNITE_3D_MODEL_ID',
revisionId:  'COGNITE_3D_REVISION_ID',
};
viewer.addPointCloudModel(options).then(model => {
viewer.fitCameraToModel(model, 0);
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AddModelOptions`](../interfaces/cognite_reveal.AddModelOptions.md) |

#### Returns

`Promise`<[`CognitePointCloudModel`](cognite_reveal.CognitePointCloudModel.md)\>

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:698](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L698)

___

### determineModelType

▸ **determineModelType**(`modelId`, `revisionId`): `Promise`<``""`` \| [`SupportedModelTypes`](../modules/cognite_reveal.md#supportedmodeltypes)\>

Use to determine of which type the model is.

**`Example`**

```typescript
const viewer = new Cognite3DViewer(...);
const type = await viewer.determineModelType(options.modelId, options.revisionId)
let model: CogniteModel
switch (type) {
  case 'cad':
    model = await viewer.addCadModel(options);
    break;
  case 'pointcloud':
    model = await viewer.addPointCloudModel(options);
    break;
  default:
    throw new Error('Model is not supported');
}
viewer.fitCameraToModel(model);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `modelId` | `number` | The model's id. |
| `revisionId` | `number` | The model's revision id. |

#### Returns

`Promise`<``""`` \| [`SupportedModelTypes`](../modules/cognite_reveal.md#supportedmodeltypes)\>

Empty string if type is not supported.

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:853](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L853)

___

### dispose

▸ **dispose**(): `void`

Dispose of WebGL resources. Can be used to free up memory when the viewer is no longer in use.

**`See`**

[https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects](https://threejs.org/docs/#manual/en/introduction/How-to-dispose-of-objects)
```ts
// Viewer is no longer in use, free up memory
viewer.dispose();
```.

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:390](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L390)

___

### enter360Image

▸ **enter360Image**(`image360`): `Promise`<`void`\>

Enter visualization of a 360 image.

#### Parameters

| Name | Type |
| :------ | :------ |
| `image360` | [`Image360`](../interfaces/cognite_reveal.Image360.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:771](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L771)

___

### exit360Image

▸ **exit360Image**(): `void`

Exit visualization of the 360 image.

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:781](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L781)

___

### fitCameraToBoundingBox

▸ **fitCameraToBoundingBox**(`box`, `duration?`, `radiusFactor?`): `void`

Move camera to a place where the content of a bounding box is visible to the camera.

**`Example`**

```js
// Fit camera to bounding box over 500 milliseconds
viewer.fitCameraToBoundingBox(boundingBox, 500);
```
```js
// Fit camera to bounding box instantaneously
viewer.fitCameraToBoundingBox(boundingBox, 0);
```
```js
// Place the camera closer to the bounding box
viewer.fitCameraToBoundingBox(boundingBox, 500, 2);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `box` | `Box3` | `undefined` | The bounding box in world space. |
| `duration?` | `number` | `undefined` | The duration of the animation moving the camera. Set this to 0 (zero) to disable animation. |
| `radiusFactor` | `number` | `2` | The ratio of the distance from camera to center of box and radius of the box. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1076](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1076)

___

### fitCameraToModel

▸ **fitCameraToModel**(`model`, `duration?`): `void`

Move camera to a place where the 3D model is visible.
It uses the bounding box of the 3D model and calls [fitCameraToBoundingBox](cognite_reveal.Cognite3DViewer.md#fitcameratoboundingbox).

**`Example`**

```js
// Fit camera to model
viewer.fitCameraToModel(model);
```
```js
// Fit camera to model over 500 milliseconds
viewer.fitCameraToModel(model, 500);
```
```js
// Fit camera to model instantly
viewer.fitCameraToModel(model, 0);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`CogniteModel`](../modules/cognite_reveal.md#cognitemodel) | The 3D model. |
| `duration?` | `number` | The duration of the animation moving the camera. Set this to 0 (zero) to disable animation. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1031](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1031)

___

### fitCameraToModels

▸ **fitCameraToModels**(`models?`, `duration?`, `restrictToMostGeometry?`): `void`

Move camera to a place where a set of 3D models are visible.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models?` | [`CogniteModel`](../modules/cognite_reveal.md#cognitemodel)[] | `undefined` | Optional 3D models to focus the camera on. If no models are provided the camera will fit to all models. |
| `duration?` | `number` | `undefined` | The duration of the animation moving the camera. Set this to 0 (zero) to disable animation. |
| `restrictToMostGeometry` | `boolean` | `false` | If true, attempt to remove junk geometry from the bounds to allow setting a good camera position. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1042](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1042)

___

### getClippingPlanes

▸ **getClippingPlanes**(): `Plane`[]

Returns the current active global clipping planes.

**`Deprecated`**

Use [getGlobalClippingPlanes](cognite_reveal.Cognite3DViewer.md#getglobalclippingplanes) instead.

#### Returns

`Plane`[]

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:982](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L982)

___

### getGlobalClippingPlanes

▸ **getGlobalClippingPlanes**(): `Plane`[]

Returns the current active global clipping planes.

#### Returns

`Plane`[]

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:989](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L989)

___

### getIntersectionFromPixel

▸ **getIntersectionFromPixel**(`offsetX`, `offsetY`): `Promise`<``null`` \| [`Intersection`](../modules/cognite_reveal.md#intersection)\>

Raycasting model(s) for finding where the ray intersects with the model.

**`See`**

[https://en.wikipedia.org/wiki/Ray_casting](https://en.wikipedia.org/wiki/Ray_casting) For more details on Ray casting.

**`Example`**

For CAD model
```js
const offsetX = 50 // pixels from the left
const offsetY = 100 // pixels from the top
const intersection = await viewer.getIntersectionFromPixel(offsetX, offsetY);
if (intersection) // it was a hit
  console.log(
  'You hit model ', intersection.model,
  ' at the node with tree index ', intersection.treeIndex,
  ' at this exact point ', intersection.point
  );
```

**`Example`**

For point cloud
```js
const offsetX = 50 // pixels from the left
const offsetY = 100 // pixels from the top
const intersection = await viewer.getIntersectionFromPixel(offsetX, offsetY);
if (intersection) // it was a hit
  console.log(
  'You hit model ', intersection.model,
  ' at the point index ', intersection.pointIndex,
  ' at this exact point ', intersection.point
  );
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offsetX` | `number` | X coordinate in pixels (relative to the domElement). |
| `offsetY` | `number` | Y coordinate in pixels (relative to the domElement). |

#### Returns

`Promise`<``null`` \| [`Intersection`](../modules/cognite_reveal.md#intersection)\>

A promise that if there was an intersection then return the intersection object - otherwise it
returns `null` if there were no intersections.

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1298](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1298)

___

### getScreenshot

▸ **getScreenshot**(`width?`, `height?`, `includeUI?`): `Promise`<`string`\>

Take a screenshot from the current camera position. When drawing UI, only the viewer DOM element and its children will be included in the image.
The DOM is scaled to fit any provided resolution, and as a result some elements can be positioned incorrectly in regards to the 3D render.

`html2canvas` is used to draw UI and this has some limitations on what CSS properties it is able to render. See [the html2canvas documentation](https://html2canvas.hertzen.com/documentation) for details.

**`Example`**

```js
// Take a screenshot with custom resolution
const url = await viewer.getScreenshot(1920, 1080);
```
```js
// Add a screenshot with resolution of the canvas to the page
const url = await viewer.getScreenshot();
const image = document.createElement('img');
image.src = url;
document.body.appendChild(image);
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `width` | `number` | `undefined` | Width of the final image. Default is current canvas size. |
| `height` | `number` | `undefined` | Height of the final image. Default is current canvas size. |
| `includeUI` | `boolean` | `true` | If false the screenshot will include only the rendered 3D. Default is true. |

#### Returns

`Promise`<`string`\>

A [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) of the image ('image/png').

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1168](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1168)

___

### getVersion

▸ **getVersion**(): `string`

Returns reveal version installed.

#### Returns

`string`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:363](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L363)

___

### getViewState

▸ **getViewState**(): [`ViewerState`](../modules/cognite_reveal.md#viewerstate)

Gets the current viewer state which includes the camera pose as well as applied styling.

#### Returns

[`ViewerState`](../modules/cognite_reveal.md#viewerstate)

JSON object containing viewer state.

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:601](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L601)

___

### loadCameraFromModel

▸ **loadCameraFromModel**(`model`): `void`

Attempts to load the camera settings from the settings stored for the
provided model. See [https://docs.cognite.com/api/v1/#operation/get3DRevision](https://docs.cognite.com/api/v1/#operation/get3DRevision)
and [https://docs.cognite.com/api/v1/#operation/update3DRevisions](https://docs.cognite.com/api/v1/#operation/update3DRevisions) for
information on how this setting is retrieved and stored. This setting can
also be changed through the 3D models management interface in Cognite Fusion.
If no camera configuration is stored in CDF, [fitCameraToModel](cognite_reveal.Cognite3DViewer.md#fitcameratomodel)
is used as a fallback.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`CogniteModel`](../modules/cognite_reveal.md#cognitemodel) | The model to load camera settings from. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1003](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1003)

___

### off

▸ **off**(`event`, `callback`): `void`

**`Example`**

```js
viewer.off('click', onClick);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"click"`` \| ``"hover"`` |
| `callback` | [`PointerEventDelegate`](../modules/cognite_reveal.md#pointereventdelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:512](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L512)

▸ **off**(`event`, `callback`): `void`

**`Example`**

```js
viewer.off('cameraChange', onCameraChange);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"cameraChange"`` |
| `callback` | [`CameraChangeDelegate`](../modules/cognite_reveal.md#camerachangedelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:519](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L519)

▸ **off**(`event`, `callback`): `void`

Unsubscribe the 'beforeSceneRendered'-event previously subscribed with [on](cognite_reveal.Cognite3DViewer.md#on).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"beforeSceneRendered"`` |
| `callback` | [`BeforeSceneRenderedDelegate`](../modules/cognite_reveal.md#beforescenerendereddelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:523](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L523)

▸ **off**(`event`, `callback`): `void`

**`Example`**

```js
viewer.off('sceneRendered', updateStats);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"sceneRendered"`` |
| `callback` | [`SceneRenderedDelegate`](../modules/cognite_reveal.md#scenerendereddelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:530](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L530)

▸ **off**(`event`, `callback`): `void`

**`Example`**

```js
viewer.off('disposed', clearAll);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disposed"`` |
| `callback` | [`DisposedDelegate`](../modules/cognite_reveal.md#disposeddelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:537](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L537)

___

### on

▸ **on**(`event`, `callback`): `void`

Triggered when the viewer is disposed. Listeners should clean up any
resources held and remove the reference to the viewer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"disposed"`` |
| `callback` | [`DisposedDelegate`](../modules/cognite_reveal.md#disposeddelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:430](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L430)

▸ **on**(`event`, `callback`): `void`

**`Example`**

```js
const onClick = (event) => { console.log(event.offsetX, event.offsetY) };
viewer.on('click', onClick);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"click"`` \| ``"hover"`` |
| `callback` | [`PointerEventDelegate`](../modules/cognite_reveal.md#pointereventdelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:439](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L439)

▸ **on**(`event`, `callback`): `void`

**`Example`**

```js
viewer.on('cameraChange', (position, target) => {
  console.log('Camera changed: ', position, target);
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | ``"cameraChange"`` |
| `callback` | [`CameraChangeDelegate`](../modules/cognite_reveal.md#camerachangedelegate) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:448](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L448)

▸ **on**(`event`, `callback`): `void`

Event that is triggered immediately before the scene is rendered.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"beforeSceneRendered"`` | Metadata about the rendering frame. |
| `callback` | [`BeforeSceneRenderedDelegate`](../modules/cognite_reveal.md#beforescenerendereddelegate) | Callback to trigger when event occurs. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:454](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L454)

▸ **on**(`event`, `callback`): `void`

Event that is triggered immediately after the scene has been rendered.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | ``"sceneRendered"`` | Metadata about the rendering frame. |
| `callback` | [`SceneRenderedDelegate`](../modules/cognite_reveal.md#scenerendereddelegate) | Callback to trigger when the event occurs. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:460](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L460)

___

### remove360Images

▸ **remove360Images**(`...image360Entities`): `Promise`<`void`\>

Remove a set of 360 images.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...image360Entities` | [`Image360`](../interfaces/cognite_reveal.Image360.md)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:760](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L760)

___

### removeModel

▸ **removeModel**(`model`): `void`

Removes a model that was previously added using [addModel](cognite_reveal.Cognite3DViewer.md#addmodel),
[addCadModel](cognite_reveal.Cognite3DViewer.md#addcadmodel) or [addPointCloudModel](cognite_reveal.Cognite3DViewer.md#addpointcloudmodel)
.

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`CogniteModel`](../modules/cognite_reveal.md#cognitemodel) |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:794](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L794)

___

### removeObject3D

▸ **removeObject3D**(`object`): `void`

Remove a THREE.Object3D from the viewer.

**`Example`**

```js
const sphere = new THREE.Mesh(new THREE.SphereGeometry(), new THREE.MeshBasicMaterial());
viewer.addObject3D(sphere);
viewer.removeObject3D(sphere);
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object3D`<`Event`\> |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:906](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L906)

___

### requestRedraw

▸ **requestRedraw**(): `void`

Typically used when you perform some changes and can't see them unless you move camera.

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1083](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1083)

___

### setBackgroundColor

▸ **setBackgroundColor**(`backgroundColor`): `void`

Sets the color used as the clear color of the renderer.

#### Parameters

| Name | Type |
| :------ | :------ |
| `backgroundColor` | `Object` |
| `backgroundColor.alpha?` | `number` |
| `backgroundColor.color?` | `Color` |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:921](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L921)

___

### setCameraManager

▸ **setCameraManager**(`cameraManager`): `void`

Sets the active camera manager instance for current Cognite3Dviewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cameraManager` | [`CameraManager`](../interfaces/cognite_reveal.CameraManager.md) | Camera manager instance. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:592](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L592)

___

### setClippingPlanes

▸ **setClippingPlanes**(`clippingPlanes`): `void`

Sets per-pixel clipping planes. Pixels behind any of the planes will be sliced away.

**`Deprecated`**

Use [setGlobalClippingPlanes](cognite_reveal.Cognite3DViewer.md#setglobalclippingplanes) instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `clippingPlanes` | `Plane`[] |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:974](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L974)

___

### setGlobalClippingPlanes

▸ **setGlobalClippingPlanes**(`clippingPlanes`): `void`

Sets per-pixel clipping planes. Pixels behind any of the planes will be sliced away.

**`Example`**

```js
// Hide pixels with values less than 0 in the x direction
const plane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
viewer.setGlobalClippingPlanes([plane]);
```
```js
// Hide pixels with values greater than 20 in the x direction
 const plane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 20);
viewer.setGlobalClippingPlanes([plane]);
```
```js
// Hide pixels with values less than 0 in the x direction or greater than 0 in the y direction
const xPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
const yPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
viewer.setGlobalClippingPlanes([xPlane, yPlane]);
```
```js
// Hide pixels behind an arbitrary, non axis-aligned plane
 const plane = new THREE.Plane(new THREE.Vector3(1.5, 20, -19), 20);
viewer.setGlobalClippingPlanes([plane]);
```
```js
// Disable clipping planes
 viewer.setGlobalClippingPlanes([]);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clippingPlanes` | `Plane`[] | The planes to use for clipping. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:964](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L964)

___

### setLogLevel

▸ **setLogLevel**(`level`): `void`

Sets the log level. Used for debugging.
Defaults to 'none' (which is identical to 'silent').

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | ``"error"`` \| ``"debug"`` \| ``"none"`` \| ``"trace"`` \| ``"info"`` \| ``"warn"`` \| ``"silent"`` |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:372](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L372)

___

### setResolutionOptions

▸ **setResolutionOptions**(`options`): `void`

Set options to control resolution of the viewer. This includes
settings for max resolution and limiting resolution when moving the camera.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ResolutionOptions`](../modules/cognite_reveal.md#resolutionoptions) | Options to apply. |

#### Returns

`void`

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:350](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L350)

___

### setViewState

▸ **setViewState**(`state`): `Promise`<`void`\>

Restores camera settings from the state provided, and clears all current styled
node collections and applies the `state` object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | [`ViewerState`](../modules/cognite_reveal.md#viewerstate) | Viewer state retrieved from [getViewState](cognite_reveal.Cognite3DViewer.md#getviewstate). |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:611](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L611)

___

### worldToScreen

▸ **worldToScreen**(`point`, `normalize?`): ``null`` \| `Vector2`

Convert a point in world space to its coordinates in the canvas. This can be used to place HTML objects near 3D objects on top of the 3D viewer.

**`See`**

[https://www.w3schools.com/graphics/canvas_coordinates.asp](https://www.w3schools.com/graphics/canvas_coordinates.asp) For details on HTML Canvas Coordinates.

**`Example`**

```js
const boundingBoxCenter = new THREE.Vector3();
// Find center of bounding box in world space
model.getBoundingBox(nodeId).getCenter(boundingBoxCenter);
// Screen coordinates of that point
const screenCoordinates = viewer.worldToScreen(boundingBoxCenter);
```
```js
const boundingBoxCenter = new THREE.Vector3();
// Find center of bounding box in world space
model.getBoundingBox(nodeId).getCenter(boundingBoxCenter);
// Screen coordinates of that point normalized in the range [0,1]
const screenCoordinates = viewer.worldToScreen(boundingBoxCenter, true);
```
```js
const boundingBoxCenter = new THREE.Vector3();
// Find center of bounding box in world space
model.getBoundingBox(nodeId).getCenter(boundingBoxCenter);
// Screen coordinates of that point
const screenCoordinates = viewer.worldToScreen(boundingBoxCenter);
if (screenCoordinates == null) {
  // Object not visible on screen
} else {
  // Object is visible on screen
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `point` | `Vector3` | World space coordinate. |
| `normalize?` | `boolean` | Optional. If true, coordinates are normalized into [0,1]. If false, the values are in the range [0, <canvas_size>). |

#### Returns

``null`` \| `Vector2`

Returns 2D coordinates if the point is visible on screen, or `null` if object is outside screen.

#### Defined in

[packages/api/src/public/migration/Cognite3DViewer.ts:1121](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/api/src/public/migration/Cognite3DViewer.ts#L1121)
