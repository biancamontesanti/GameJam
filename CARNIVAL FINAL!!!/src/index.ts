/**   SHOOTING TARGET DEMO
		this file outlines the standard use of the shooting target module & all included
		components. the target shooting module allows you to create targets around your scene
			(both static and moving) that can be shot by the player. players can only shoot targets
			when they are within the bounds of the firing range area. you can find a detailed
		description of each component within its file.
 */

import { Animator, Entity, GltfContainer, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { PlayerShootingArea } from './shooting-range/player-shooting-area'
import { TargetObject } from './shooting-range/target-object'
import { setupUi } from './ui'
import { Vector3 } from '@dcl/sdk/math'


export function main() {






  TargetObject.Create({
    type: TargetObject.TARGET_TYPE.STATIC,
    pos: { x: 64, y: 0, z: 0 }
  })

  
}
