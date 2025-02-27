---
id: "cognite_reveal.DebouncedCameraStopEventTrigger"
title: "Class: DebouncedCameraStopEventTrigger"
sidebar_label: "DebouncedCameraStopEventTrigger"
custom_edit_url: null
---

[@cognite/reveal](../modules/cognite_reveal.md).DebouncedCameraStopEventTrigger

Simple helper class to trigger a stop event whenever a camera manager's
camera hasn't changed for a little while.

## Constructors

### constructor

• **new DebouncedCameraStopEventTrigger**(`cameraManager`, `debounceTimeMs?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `cameraManager` | [`CameraManager`](../interfaces/cognite_reveal.CameraManager.md) | `undefined` |
| `debounceTimeMs` | `number` | `100` |

#### Defined in

[packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts:21](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts#L21)

## Methods

### dispose

▸ **dispose**(): `void`

Deallocate resources associated with this object

#### Returns

`void`

#### Defined in

[packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts:47](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts#L47)

___

### subscribe

▸ **subscribe**(`callback`): `void`

Subscribe to the stop events generated by this trigger

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`CameraStopDelegate`](../modules/cognite_reveal.md#camerastopdelegate) |

#### Returns

`void`

#### Defined in

[packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts:33](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts#L33)

___

### unsubscribe

▸ **unsubscribe**(`callback`): `void`

Unsubscribe from the stop events

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | [`CameraStopDelegate`](../modules/cognite_reveal.md#camerastopdelegate) |

#### Returns

`void`

#### Defined in

[packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts:40](https://github.com/cognitedata/reveal/blob/917d1d190/viewer/packages/camera-manager/src/utils/DebouncedCameraStopEventTrigger.ts#L40)
