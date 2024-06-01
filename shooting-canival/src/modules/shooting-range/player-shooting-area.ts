/*    PLAYER SHOOTING AREA
    contains all functional components of the shooting area, including firing sounds,
    interface for placement calls, and actual firing mechanics. the firing area allows
    players to shoot weapons when within the area's trigger bounds
*/

import * as utils from '@dcl-sdk/utils'
import {
  Animator,
  AudioSource,
  AvatarAnchorPointType,
  AvatarAttach,
  ColliderLayer,
  Entity,
  GltfContainer,
  InputAction,
  Material,
  MeshCollider,
  MeshRenderer,
  PointerEventType,
  RaycastQueryType,
  RaycastResult,
  Schemas,
  Transform,
  engine,
  inputSystem,
  pointerEventsSystem,
  raycastSystem,

} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { ShotDecalObject } from './shot-decal-object'
import { ScoreObject } from './score-object'
import { triggerEmote, triggerSceneEmote } from '~system/RestrictedActions'
import { logTestResult } from '~system/Testing'


/** manages the state of the shooting area, acting as the functional linkage between a target
 *  being shot, playing sounds, and bulletmark placement. the area is composed of 2 objects:
 *      1 - trigger box area that de/actives shooting when the player leaves/enter the area
 *      2 - floor object that displays shooting area's location
 */




  var variavelState: boolean = true
  export {variavelState}
 
  
  let gameStarted: boolean = false

export module PlayerShootingArea {
  /** when true debug logs are generated (toggle off when you deploy) */
  const isDebugging: boolean = true

  //audio paths
  const AUDIO_SHOT_SFX: string[] = ['audio/shooting-range/laser-gun.mp3', 'audio/shooting-range/shot-missed.mp3']
  

  //audio paths
  const AUDIO_WIN: string[] = ['audio/shooting-range/victorysound.mp3','audio/shooting-range/mixkit-losing-bleeps-2026.mp3']
  

  //shooting area size
  const SHOOTING_AREA_SCALE = { x: 32, y: 1, z: 32 }

  /** when true the player can fire at targets */
  var inShootingArea: boolean = false

  /** trigger area, allows players to shoot when inside */
  var shootingAreaEntity: undefined | Entity = undefined
  /** floor, displays shooting area location */
  var shootingFloorEntity: Entity








// // LIBERA TRIGGER 
//   const startButton = engine.addEntity()
//   Transform.create(startButton, {position: Vector3.create(17, 1, 17) })
//   MeshRenderer.setBox(startButton)
//   MeshCollider.setBox(startButton)
//   pointerEventsSystem.onPointerDown(
//     {
//       entity: startButton,
//       opts: { button: InputAction.IA_POINTER,
//       hoverText: 'Click'
//     }},
//     () => {
//     function startGame() {
//         console.log("GAME START")
//        gameStarted = true
      
//     }
//     startGame()  
//   }
  
//   )







  /** object interface used to define all data required to manipulate the transform of the shooting area */
  export interface ShootingAreaTransformData {
    x: number
    y: number
    z: number
  }

  //audio objects setup (single object for all sounds anchored to the player)
  //  NOTE: currently the 'play from start' functionality is scuffed in SDK7, so we need an array roll of sounds
  //  create gun shot audio SFX objects
  const entityAudioShotHit: Entity[][] = [[], []]
  //process each type of audio SFX
  for (let i: number = 0; i < AUDIO_SHOT_SFX.length; i++) {
    //create a few of each type (allows over-play)
    for (let j: number = 0; j < 5; j++) {
      const entity = engine.addEntity()
      Transform.create(entity)
      AudioSource.create(entity, { audioClipUrl: AUDIO_SHOT_SFX[i], loop: false, playing: false })
      AvatarAttach.create(entity, { anchorPointId: AvatarAnchorPointType.AAPT_NAME_TAG })
      entityAudioShotHit[i].push(entity)
    }
  }
   
  
  
  let fullscoreantonio: number = 0

  let losescoreantonio: number = 0

                
  const MVICTORYANIMATION = 'models/shooting-range/dancingcube.glb'
          
  


//   //cubo de animacaO TARGET 
//   const fases = engine.addEntity()
// Transform.create(fases, { position: Vector3.create(30, 0, 30) })
// MeshRenderer.setBox(fases)
// MeshCollider.setBox(fases)
// pointerEventsSystem.onPointerDown(
//   {
//     entity: fases,
//     opts: { button: InputAction.IA_POINTER, hoverText: 'Dance' },
//   },
//   () => {
//     if (fullscoreantonio < 80)  {
//       (fullscoreantonio = 0)
//       Animator.playSingleAnimation(newshoting2, '1') 
//     }
//   if (fullscoreantonio >= 80 && fullscoreantonio <150) {
//     (fullscoreantonio = 80)
//     Animator.playSingleAnimation(newshoting2, '2') 
//   }
//  if (fullscoreantonio >= 150 && fullscoreantonio <200) {
//   (fullscoreantonio = 150)
//   Animator.playSingleAnimation(newshoting2, '3') 
//  }
//  if (fullscoreantonio >=200 ) {
//   (fullscoreantonio = 200)
//   Animator.playSingleAnimation(newshoting2, '4') 
// }
//   }
  
// )


// Create entity
const sourceEntity = engine.addEntity()

// Create AudioSource component
AudioSource.create(sourceEntity, {
	audioClipUrl: 'audio/shooting-range/carnivalloop.mp3',
	loop: true,
	playing: true,
})

Transform.create(sourceEntity, {
  position: Vector3.create(64, 0, 0),
})


let button = engine.addEntity()

GltfContainer.create(button, {
  src: 'models/shooting-range/button2.glb',
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
})

Transform.create(button, {
  position: Vector3.create(64, 0, 0),
})



// if (raycastResult.hits[0].meshName != 'button') {
//   console.log("button"),
//   (fullscoreantonio += 0),
//   (losescoreantonio += 0)
// }


pointerEventsSystem.onPointerDown(
	{
		entity: button,
		opts: { button: InputAction.IA_POINTER, hoverText: 'Game Start' },
	},
	function () {
		console.log('CLICKED AVOCADO') 


    console.log("GAME START")
    gameStarted = true

    if (fullscoreantonio < 150)  {
      (fullscoreantonio = 0)
      Animator.playSingleAnimation(fase1, '1') 
    }
  if (fullscoreantonio >= 150 && fullscoreantonio <250) {
    (fullscoreantonio = 180)
    Animator.playSingleAnimation(fase2, '1') 
  }
 if (fullscoreantonio >= 250 && fullscoreantonio <350) {
  (fullscoreantonio = 280)
  Animator.playSingleAnimation(fase3, '1') 
 }
 if (fullscoreantonio >= 350 ) {
  (fullscoreantonio = 380)
  Animator.playSingleAnimation(fase1, '1') 
}
 

	}
)


let fase1 = engine.addEntity()


	GltfContainer.create(fase1, {
		src: 'models/shooting-range/fase1bibi.glb'
	})

	Transform.create(fase1, {
		position: Vector3.create(64, 0, 0),
    
	})


  Animator.create(fase1, {
    states: [
      {
        clip: '1',
        playing: false, 
        shouldReset: true,
        loop: false,
       
      }
    ]
  })

  let fase2 = engine.addEntity()


	GltfContainer.create(fase2, {
		src: 'models/shooting-range/fase2bibi.glb'
	})

	Transform.create(fase2, {
		position: Vector3.create(64, 0, 0),
    
	})


  Animator.create(fase2, {
    states: [
      {
        clip: '1',
        playing: false, 
        shouldReset: true,
        loop: false,
       
      }
    ]
  })

  let fase3 = engine.addEntity()


	GltfContainer.create(fase3, {
		src: 'models/shooting-range/fase3bibi.glb'
	})

	Transform.create(fase3, {
		position: Vector3.create(64, 0, 0),
    
	})


  Animator.create(fase3, {
    states: [
      {
        clip: '1',
        playing: false, 
        shouldReset: true,
        loop: false,
       
      }
    ]
  })
  let fase4 = engine.addEntity()


	GltfContainer.create(fase4, {
		src: 'models/shooting-range/fase4.glb'
	})

	Transform.create(fase4, {
		position: Vector3.create(64, 0, 0),
    
	})


  Animator.create(fase4, {
    states: [
      {
        clip: '1',
        playing: false, 
        shouldReset: true,
        loop: false,
       
      }
    ]
  })







// let newshoting = engine.addEntity()


// 	GltfContainer.create(newshoting, {
// 		src: 'models/shooting-range/alvosverdes.glb'
// 	})

// 	Transform.create(newshoting, {
// 		position: Vector3.create(64, 0, 0),
    
// 	})


//   Animator.create(newshoting, {
//     states: [
//       {
//         clip: '1',
//         playing: false, 
//         shouldReset: true,
//         loop: false,
       
//       }, 
//       {
//         clip: '2',
//         playing: false, 
//         shouldReset: true,
//         loop: false,
        
//       },
//       {
//         clip: '3',
//         playing: false, 
//         shouldReset: true,
//         loop: false,
       
//       },  {
//         clip: '4',
//         playing: false, 
//         shouldReset: true,
//         loop: false,
       
//       },
//       {
//         clip: '5',
//         playing: false, 
//         shouldReset: true,
//         loop: false,
       
//       }, 


//     ]
//   })





















  // let scoreBar = engine.addEntity()

	// GltfContainer.create(scoreBar, {
	// 	src: 'models/shooting-range/scoreBar.glb'
	// })

	// Transform.create(scoreBar, {
	// 	position: Vector3.create(16, 1, 16),
	// })




//EFEITO LUZ DO TIRO
  // let shootEffect = engine.addEntity()


  

	// GltfContainer.create(shootEffect, {
	// 	src: 'models/shooting-range/shooteffect.glb'
	// })

	// Transform.create(shootEffect, {
	// 	position: Vector3.create(64, 0, 0),
	// })


  // Animator.create(shootEffect, {
  //   states: [
  //     {
  //       clip: '1',
  //       playing: false, 
  //       shouldReset: true,
  //       loop: false,
       
  //     }, 
     

  //   ]
      
  // })




 // const clipAnim = Animator.getClip(newshoting, 'Animation')

  //clipAnim.loop = false
  


  /** next audio object that should be played */
  var audioIndex: number[] = [0, 0,]
  /** plays an audio sound of the given type */
  function PlayShotSound(type: number) {
    //grab next index, check for roll-over
    audioIndex[type]++
    if (audioIndex[type] >= entityAudioShotHit[type].length) audioIndex[type] = 0
    //play next sound
    AudioSource.playSound(entityAudioShotHit[type][audioIndex[type]], AUDIO_SHOT_SFX[type])
  };




  


  /** next audio object that should be played */
  var audioWin: number[] = [0,0]
  /** plays an audio sound of the given type */
  function PlayWinSound(type: number) {
    //grab next index, check for roll-over
    audioWin[type]++
    if (audioWin[type] >= entityAudioShotHit[type].length) audioWin[type] = 0
    //play next sound
    AudioSource.playSound(entityAudioShotHit[type][audioWin[type]], AUDIO_WIN[type])
  };





  /** left click input -> fire a ray */
  engine.addSystem(() => {
    //pull in feedback from input system
    const cmd = inputSystem.getInputCommand(InputAction.IA_POINTER, PointerEventType.PET_DOWN)
    //if input was triggered, attmept to fire a shot
    if (cmd) {
      if (isDebugging) console.log('Shooting Area: left click => attmepting to fire shot')
      FireShot()
    }
  })


  /** fires a ray from the player's camera, checking for a target hit */
  export function FireShot() {
    //ensure player is within firing zone
    if (!gameStarted) return

    //draw a new raycast from the camera's position
    raycastSystem.registerLocalDirectionRaycast(
      {
        entity: engine.CameraEntity,
        opts: {
          queryType: RaycastQueryType.RQT_HIT_FIRST,
          direction: Vector3.Forward(), //Transform.get(engine.CameraEntity).rotation
          maxDistance: 64
        }
      }
      ,
      
      function (raycastResult) {
        //entity was hit
        if (raycastResult.hits.length > 0) {
          if (raycastResult.hits[0].entityId) {
            if (isDebugging) console.log('Shooting Area: valid hit found, attempting to find entity...')
            //attempt to get hit position and hit entity
            const hitPos = raycastResult.hits[0].position
            if (!hitPos) return
            const hitID = raycastResult.hits[0].entityId
            if (!hitID) return
            const entity = hitID as Entity
            const transform = Transform.get(entity)
            const relPos = {
              x: hitPos.x - transform.position.x,
              y: hitPos.y - transform.position.y,
              z: hitPos.z - transform.position.z - 0.05

              
              
            }
            console.log(raycastResult.hits[0].meshName)



            if (isDebugging)
              console.log(
                'Shooting Area: hit validated entityID=' +
                  hitID +
                  ', mesh=' +
                  raycastResult.hits[0].meshName +
                  '\t\nposition{ x=' +
                  relPos.x +
                  ', y=' +
                  relPos.y +
                  ', z=' +
                  relPos.z +
                  ' }'
              )
            



              if (raycastResult.hits[0].meshName != 'target74_collider') {
                console.log(`meshName`)
          
          //ATIVA SHOOT EFFECT LUX
                  //  Animator.playSingleAnimation(shootEffect, '1')
            // ShotDecalObject.Create({ parent: entity, pos: relPos })
            //render new score display
            switch (raycastResult.hits[0].meshName) {
              case 'button':
      fullscoreantonio += 0
      console.log("botao")
      console.log(fullscoreantonio)
          break

              case 'max1_collider':
               //play audio - hit
            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)
                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })
                break



                case 'max2_collider':
                   //play audio - hit
           
            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)



                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break

                case 'max3_collider':  
                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)





             ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break

                case 'max4_collider':
                      //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)
  

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break

                case 'max5_collider':
                     //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })

                break


                case 'max6_collider':
                      //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })
                break




                case 'max7_collider':

                   //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)





                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })
                break

                case 'max8_collider':


                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)



                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })



                break   


                case 'max9_collider':


                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)



                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })



                break   




                case 'max10_collider':


                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)



                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })


                break   



                case '11_collider':


                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })

                break 
                
                


                case '12_collider':


                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)


                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })


                break   



                case 'max13_collider':


                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)


                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })


                break   
                case 'max14_collider':

                //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)


                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.FIFTY,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })


                break   


              case 'max15_collider':    
                    //play audio - hit
            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)


                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.FIFTY,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break


              case 'max16_collider':

              //play audio - hit

            PlayShotSound(0)
            fullscoreantonio += 50
            console.log("++++")
            console.log(fullscoreantonio)

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.FIFTY,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break
                
                case 'max17_collider':

                //play audio - hit
  
              PlayShotSound(0)
              fullscoreantonio += 50
              console.log("++++")
              console.log(fullscoreantonio)
  
                  ScoreObject.Create({
                    type: ScoreObject.SCORE_TYPE.FIFTY,
                    pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                  })
                  break
                
                  case 'max18_collider':

                  //play audio - hit
    
                PlayShotSound(0)
                fullscoreantonio += 50
                console.log("++++")
                console.log(fullscoreantonio)
    
                    ScoreObject.Create({
                      type: ScoreObject.SCORE_TYPE.FIFTY,
                      pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                    })
                    break
                    
                    case 'max19_collider':

                    //play audio - hit
      
                  PlayShotSound(0)
                  fullscoreantonio += 50
                  console.log("++++")
                  console.log(fullscoreantonio)
      
                      ScoreObject.Create({
                        type: ScoreObject.SCORE_TYPE.FIFTY,
                        pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                      })
                      break
                
                      case 'max20_collider':

                      //play audio - hit
        
                    PlayShotSound(0)
                    fullscoreantonio += 50
                    console.log("++++")
                    console.log(fullscoreantonio)
        
                        ScoreObject.Create({
                          type: ScoreObject.SCORE_TYPE.FIFTY,
                          pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                        })
                        break
                        

                        case 'max21_collider':

                        //play audio - hit
          
                      PlayShotSound(0)
                      fullscoreantonio += 50
                      console.log("++++")
                      console.log(fullscoreantonio)
          
                          ScoreObject.Create({
                            type: ScoreObject.SCORE_TYPE.FIFTY,
                            pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                          })
                          break
                        
                          case 'max22_collider':

                          //play audio - hit
            
                        PlayShotSound(0)
                        fullscoreantonio += 50
                        console.log("++++")
                        console.log(fullscoreantonio)
            
                            ScoreObject.Create({
                              type: ScoreObject.SCORE_TYPE.FIFTY,
                              pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                            })
                            break
                            
                            case 'max23_collider':

                            //play audio - hit
              
                          PlayShotSound(0)
                          fullscoreantonio += 50
                          console.log("++++")
                          console.log(fullscoreantonio)
              
                              ScoreObject.Create({
                                type: ScoreObject.SCORE_TYPE.FIFTY,
                                pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                              })
                              break
                              
                              case 'max14_collider':

                              //play audio - hit
                
                            PlayShotSound(0)
                            fullscoreantonio += 50
                            console.log("++++")
                            console.log(fullscoreantonio)
                
                                ScoreObject.Create({
                                  type: ScoreObject.SCORE_TYPE.FIFTY,
                                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                })
                                break
                                

                                case 'max25_collider':

                                //play audio - hit
                  
                              PlayShotSound(0)
                              fullscoreantonio += 50
                              console.log("++++")
                              console.log(fullscoreantonio)
                  
                                  ScoreObject.Create({
                                    type: ScoreObject.SCORE_TYPE.FIFTY,
                                    pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                  })
                                  break
                                  
                                  case 'min1_collider':

                                  //play audio - hit
                    
                                PlayShotSound(0)
                                fullscoreantonio += 20
                                console.log("++++")
                                console.log(fullscoreantonio)
                    
                                    ScoreObject.Create({
                                      type: ScoreObject.SCORE_TYPE.TEN,
                                      pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                    })
                                    break

                                    case 'min2_collider':

                                    //play audio - hit
                      
                                  PlayShotSound(0)
                                  fullscoreantonio += 20
                                  console.log("++++")
                                  console.log(fullscoreantonio)
                      
                                      ScoreObject.Create({
                                        type: ScoreObject.SCORE_TYPE.TEN,
                                        pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                      })
                                      break        
                                    
                                      case 'min3_collider':

                                      //play audio - hit
                        
                                    PlayShotSound(0)
                                    fullscoreantonio += 20
                                    console.log("++++")
                                    console.log(fullscoreantonio)
                        
                                        ScoreObject.Create({
                                          type: ScoreObject.SCORE_TYPE.TEN,
                                          pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                        })
                                        break

                                 case 'min4_collider':

                                  //play audio - hit
                    
                                PlayShotSound(0)
                                fullscoreantonio += 20
                                console.log("++++")
                                console.log(fullscoreantonio)
                    
                                    ScoreObject.Create({
                                      type: ScoreObject.SCORE_TYPE.TEN,
                                      pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                    })
                                    break


                                    case 'min5_collider':

                                  //play audio - hit
                    
                                PlayShotSound(0)
                                fullscoreantonio += 20
                                console.log("++++")
                                console.log(fullscoreantonio)
                    
                                    ScoreObject.Create({
                                      type: ScoreObject.SCORE_TYPE.TEN,
                                      pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                    })
                                    break

                                    case 'min6_collider':

                                    //play audio - hit
                      
                                  PlayShotSound(0)
                                  fullscoreantonio += 20
                                  console.log("++++")
                                  console.log(fullscoreantonio)
                      
                                      ScoreObject.Create({
                                        type: ScoreObject.SCORE_TYPE.TEN,
                                        pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                      })
                                      break                 
                                      case 'min7_collider':

                                      //play audio - hit
                        
                                    PlayShotSound(0)
                                    fullscoreantonio += 20
                                    console.log("++++")
                                    console.log(fullscoreantonio)
                        
                                        ScoreObject.Create({
                                          type: ScoreObject.SCORE_TYPE.TEN,
                                          pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                        })
                                        break
    
                                        case 'min8_collider':
    
                                        //play audio - hit
                          
                                      PlayShotSound(0)
                                      fullscoreantonio += 20
                                      console.log("++++")
                                      console.log(fullscoreantonio)
                          
                                          ScoreObject.Create({
                                            type: ScoreObject.SCORE_TYPE.TEN,
                                            pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                          })
                                          break        
                                        
                                          case 'min9_collider':
    
                                          //play audio - hit
                            
                                        PlayShotSound(0)
                                        fullscoreantonio += 20
                                        console.log("++++")
                                        console.log(fullscoreantonio)
                            
                                            ScoreObject.Create({
                                              type: ScoreObject.SCORE_TYPE.TEN,
                                              pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                            })
                                            break
    
                                     case 'min10_collider':
    
                                      //play audio - hit
                        
                                    PlayShotSound(0)
                                    fullscoreantonio += 20
                                    console.log("++++")
                                    console.log(fullscoreantonio)
                        
                                        ScoreObject.Create({
                                          type: ScoreObject.SCORE_TYPE.TEN,
                                          pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                        })
                                        break
    
    
                                        case 'min11_collider':
    
                                      //play audio - hit
                        
                                    PlayShotSound(0)
                                    fullscoreantonio += 20
                                    console.log("++++")
                                    console.log(fullscoreantonio)
                        
                                        ScoreObject.Create({
                                          type: ScoreObject.SCORE_TYPE.TEN,
                                          pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                        })
                                        break
    
                                        case 'min12_collider':
    
                                        //play audio - hit
                          
                                      PlayShotSound(0)
                                      fullscoreantonio += 20
                                      console.log("++++")
                                      console.log(fullscoreantonio)
                          
                                          ScoreObject.Create({
                                            type: ScoreObject.SCORE_TYPE.TEN,
                                            pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                          })
                                          break    
                                          case 'min13_collider':

                                          //play audio - hit
                            
                                        PlayShotSound(0)
                                        fullscoreantonio += 20
                                        console.log("++++")
                                        console.log(fullscoreantonio)
                            
                                            ScoreObject.Create({
                                              type: ScoreObject.SCORE_TYPE.TEN,
                                              pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                            })
                                            break
        
                                            case 'min14_collider':
        
                                            //play audio - hit
                              
                                          PlayShotSound(0)
                                          fullscoreantonio += 20
                                          console.log("++++")
                                          console.log(fullscoreantonio)
                              
                                              ScoreObject.Create({
                                                type: ScoreObject.SCORE_TYPE.TEN,
                                                pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                              })
                                              break        
                                            
                                              case 'min15_collider':
        
                                              //play audio - hit
                                
                                            PlayShotSound(0)
                                            fullscoreantonio += 20
                                            console.log("++++")
                                            console.log(fullscoreantonio)
                                
                                                ScoreObject.Create({
                                                  type: ScoreObject.SCORE_TYPE.TEN,
                                                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                })
                                                break
        
                                         case 'min16_collider':
        
                                          //play audio - hit
                            
                                        PlayShotSound(0)
                                        fullscoreantonio += 20
                                        console.log("++++")
                                        console.log(fullscoreantonio)
                            
                                            ScoreObject.Create({
                                              type: ScoreObject.SCORE_TYPE.TEN,
                                              pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                            })
                                            break
        
        
        
        
                                            case 'min17_collider':
        
                                          //play audio - hit
                            
                                        PlayShotSound(0)
                                        fullscoreantonio += 20
                                        console.log("++++")
                                        console.log(fullscoreantonio)
                            
                                            ScoreObject.Create({
                                              type: ScoreObject.SCORE_TYPE.TEN,
                                              pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                            })
                                            break
        
                                            case 'min18_collider':
        
                                            //play audio - hit
                              
                                          PlayShotSound(0)
                                          fullscoreantonio += 20
                                          console.log("++++")
                                          console.log(fullscoreantonio)
                              
                                              ScoreObject.Create({
                                                type: ScoreObject.SCORE_TYPE.TEN,
                                                pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                              })
                                              break    
                                              case 'min19_collider':

                                              //play audio - hit
                                
                                            PlayShotSound(0)
                                            fullscoreantonio += 20
                                            console.log("++++")
                                            console.log(fullscoreantonio)
                                
                                                ScoreObject.Create({
                                                  type: ScoreObject.SCORE_TYPE.TEN,
                                                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                })
                                                break
            
                                                case 'min20_collider':
            
                                                //play audio - hit
                                  
                                              PlayShotSound(0)
                                              fullscoreantonio += 20
                                              console.log("++++")
                                              console.log(fullscoreantonio)
                                  
                                                  ScoreObject.Create({
                                                    type: ScoreObject.SCORE_TYPE.TEN,
                                                    pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                  })
                                                  break        
                                                
                                                  case 'min21_collider':
            
                                                  //play audio - hit
                                    
                                                PlayShotSound(0)
                                                fullscoreantonio += 20
                                                console.log("++++")
                                                console.log(fullscoreantonio)
                                    
                                                    ScoreObject.Create({
                                                      type: ScoreObject.SCORE_TYPE.TEN,
                                                      pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                    })
                                                    break
            
                                             case 'min22_collider':
            
                                              //play audio - hit
                                
                                            PlayShotSound(0)
                                            fullscoreantonio += 20
                                            console.log("++++")
                                            console.log(fullscoreantonio)
                                
                                                ScoreObject.Create({
                                                  type: ScoreObject.SCORE_TYPE.TEN,
                                                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                })
                                                break
            
            
            
            
                                                case 'min23_collider':
            
                                              //play audio - hit
                                
                                            PlayShotSound(0)
                                            fullscoreantonio += 20
                                            console.log("++++")
                                            console.log(fullscoreantonio)
                                
                                                ScoreObject.Create({
                                                  type: ScoreObject.SCORE_TYPE.TEN,
                                                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                })
                                                break
            
                                                case 'min24_collider':
            
                                                //play audio - hit
                                  
                                              PlayShotSound(0)
                                              fullscoreantonio += 20
                                              console.log("++++")
                                              console.log(fullscoreantonio)
                                  
                                                  ScoreObject.Create({
                                                    type: ScoreObject.SCORE_TYPE.TEN,
                                                    pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                  })
                                                  break                            
                                                  case 'min25_collider':
            
                                                  //play audio - hit
                                    
                                                PlayShotSound(0)
                                                fullscoreantonio += 20
                                                console.log("++++")
                                                console.log(fullscoreantonio)
                                    
                                                    ScoreObject.Create({
                                                      type: ScoreObject.SCORE_TYPE.TEN,
                                                      pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                                                    })
                                                    break             
                case 'button_collider':

            console.log("cubo sem pontos")



                // // ScoreObject.Create({
                // //   type: ScoreObject.SCORE_TYPE.FIFTY,
                // //   pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                // })
                break





            }



            // //play audio - hit
            // PlayShotSound(0)
            //  fullscoreantonio += 10
            //  console.log("++++")
            //  console.log(fullscoreantonio)




              }

              else {
                PlayShotSound(1)
                losescoreantonio += 10
                console.log(losescoreantonio)

           



                function Dancelose() {
      
                  if ( losescoreantonio >= 50) {
      
      
                    console.log('vc perdeu')
    
                    
                    inShootingArea = false
      
                    PlayWinSound(1)

                    
                    gameStarted=false
              
                    // const entity = engine.addEntity()
                    // Transform.create(entity, {
                     
                    //   position: { x: 16, y: 1, z: 16 }
                    // })
              
                    // //  add custom model
                    // GltfContainer.create(entity, {
                    //   src: MVICTORYANIMATION,
                    //   visibleMeshesCollisionMask: undefined,
                    //   invisibleMeshesCollisionMask: undefined
                    // })
      
      
                  }
                
                }
                  Dancelose() 
              }



             function DanceVictory() {
      
              if ( fullscoreantonio >= 160 && fullscoreantonio <= 170 ) {         

               (fullscoreantonio = 180) 
                // const clipAnim = Animator.getClip(newshoting, 'Animation')

                // clipAnim.shouldReset = true

               // Animator.stopAllAnimations(newshoting, true)
              


              Animator.playSingleAnimation(fase1, '1')

              

              let nivel2 = engine.addEntity()



              GltfContainer.create(nivel2, {
                src: 'models/shooting-range/level1.glb'
              })
              
              Transform.create(nivel2, {
                position: Vector3.create(64, 0, 0),
                
              })
              
              
              Animator.create(nivel2, {
                states: [
                  {
                    clip: '1',
                    playing: true, 
                    shouldReset: false,
                    loop: false,
                   
                  }
              
                ]
              })
              Animator.playSingleAnimation(nivel2, '1', true )
              

                console.log('vc venceu a primeira fase')



                inShootingArea = false





                PlayWinSound(0)
                
                
                gameStarted=false 
                
                const entity = engine.addEntity()
                Transform.create(entity, {
                 
                  position: { x: 16, y: 1, z: 16 }
                })
          
                //  add custom model
                GltfContainer.create(entity, {
                  src: MVICTORYANIMATION,
                  visibleMeshesCollisionMask: undefined,
                  invisibleMeshesCollisionMask: undefined
                })

              }

            }
              DanceVictory() 
              



        function DanceVictory2() {
      
          if ( fullscoreantonio >= 249 && fullscoreantonio <= 250 ) {                               



            Animator.playSingleAnimation(fase2, '1')

          


            console.log('vc venceu a segunda fase')


            let nivel2 = engine.addEntity()



            GltfContainer.create(nivel2, {
              src: 'models/shooting-range/level3.glb'
            })
            
            Transform.create(nivel2, {
              position: Vector3.create(64, 0, 0),
              
            })
            
            
            Animator.create(nivel2, {
              states: [
                {
                  clip: '1',
                  playing: true, 
                  shouldReset: false,
                  loop: false,
                 
                }
            
              ]
            })

            inShootingArea = false





            PlayWinSound(0)
            
            
            gameStarted=false 
            
            // const entity = engine.addEntity()
            // Transform.create(entity, {
             
            //   position: { x: 16, y: 1, z: 16 }
            // })
      
            // //  add custom model
            // GltfContainer.create(entity, {
            //   src: MVICTORYANIMATION,
            //   visibleMeshesCollisionMask: undefined,
            //   invisibleMeshesCollisionMask: undefined
            // })

            DanceVictory2() 
          

              
        function DanceVictory3() {
      
          if ( fullscoreantonio >= 300 && fullscoreantonio <= 400 ) {                               
    

              console.log('vc venceu a terceira fase')

  
              let nivel3 = engine.addEntity()


              GltfContainer.create(nivel3, {
                src: 'models/shooting-range/level4.glb'
              })
              
              Transform.create(nivel3, {
                position: Vector3.create(64, 0, 0),
                
              })
              
              
              Animator.create(nivel3, {
                states: [
                  {
                    clip: '1',
                    playing: true, 
                    shouldReset: false,
                    loop: false,
                   
                  }
              
                ]
              })
  
              inShootingArea = false
  
  
  
              PlayWinSound(0)
              
              
              gameStarted=false 
              
            
            }
            DanceVictory3() 
        }}}
      
            function DanceVictory4() {
      
              if ( fullscoreantonio >= 400 && fullscoreantonio <= 410 ) {    

               // TO RESET
                // (fullscoreantonio = 0)                            

            let nivel4 = engine.addEntity()



            GltfContainer.create(nivel4, {
              src: 'models/shooting-range/win.glb'
            })
            
            Transform.create(nivel4, {
              position: Vector3.create(64, 0, 0),
              
            })
            
            
            Animator.create(nivel4, {
              states: [
                {
                  clip: '1',
                  playing: true, 
                  shouldReset: false,
                  loop: false,
                 
                }
            
              ]
            })
    
    
                console.log('vc ganhou o jogo')
    
                inShootingArea = false
    
    
                PlayWinSound(0)
                
                
                gameStarted=false 
    
              DanceVictory4() 
            }
              
  

            }
          }

        }


          if (isDebugging) console.log('Shooting Area: no entities hit')
          //play audio - miss
          PlayShotSound(1)
          losescoreantonio += 10
          console.log(losescoreantonio)



          function Dancelose() {
      
            if ( losescoreantonio >= 50) {

              console.log('vc perdeu')

              let tryagain = engine.addEntity()



            GltfContainer.create(tryagain, {
              src: 'models/shooting-range/tryagain.glb'
            })
            
            Transform.create(tryagain, {
              position: Vector3.create(64, 0, 0),
              
            })
            
            
            Animator.create(tryagain, {
              states: [
                {
                  clip: '1',
                  playing: true, 
                  shouldReset: false,
                  loop: false,
                 
                }
            
              ]
            })

              PlayWinSound(0)

              if (losescoreantonio >= 50) {
                (losescoreantonio = 0) 
              }
              

              inShootingArea = false

              
        
              // const entity = engine.addEntity()
              // Transform.create(entity, {
               
              //   position: { x: 16, y: 1, z: 16 }
              // })

        
              // //  add custom model
              // GltfContainer.create(entity, {
              //   src: MVICTORYANIMATION,
              //   visibleMeshesCollisionMask: undefined,
              //   invisibleMeshesCollisionMask: undefined
              // })


              
            }
          }

            Dancelose() 

      })}
      
    
  




























  /** returns the shooting area entity, only one instance is maintained. */
  export function GetSurfaceObject(): Entity {
    //ensure shooting area has been initialized
    if (shootingAreaEntity == undefined) {
      if (isDebugging) console.log('Shooting Area: object does not exist, creating new shooting area...')

      //create shooting area floor
      //  entity
      shootingFloorEntity = engine.addEntity()
      Transform.create(shootingFloorEntity, { scale: { x: SHOOTING_AREA_SCALE.x, y: 1, z: SHOOTING_AREA_SCALE.z } })
      //  shape & collider
      MeshRenderer.setBox(shootingFloorEntity)
      MeshCollider.setBox(shootingFloorEntity)
      //  material
      Material.setPbrMaterial(shootingFloorEntity, {
        albedoColor: Color4.Red(),
        emissiveColor: undefined,
        emissiveIntensity: 0
      })

      //create shooting area object
      //  entity
      shootingAreaEntity = engine.addEntity()
      Transform.create(shootingAreaEntity, { scale: SHOOTING_AREA_SCALE })

    













      //  trigger area
      utils.triggers.addTrigger(
        shootingAreaEntity,
        utils.NO_LAYERS,
        utils.LAYER_1,
        [{ type: 'box', scale: SHOOTING_AREA_SCALE }],
        //entry callback
        function (otherEntity) {
          console.log(`trigger area entered, object=${otherEntity}!`)
          inShootingArea = true
          //update floor material
          Material.setPbrMaterial(shootingFloorEntity, {
            albedoColor: Color4.Yellow(),
            emissiveColor: Color4.Yellow(),
            emissiveIntensity: 1
          })
        },







        //exit callback
        function (otherEntity) {
          console.log(`trigger area exited, object=${otherEntity}!`)
          inShootingArea = false
          //update floor material
          Material.setPbrMaterial(shootingFloorEntity, {
            albedoColor: Color4.Red(),
            emissiveColor: undefined,
            emissiveIntensity: 0
          })
        }
      )

      if (isDebugging) console.log('Shooting Area: created new shooting area!')
    }
    return shootingAreaEntity
  }

  /** moves the shooting area to the given location */
  export function Move(mod: ShootingAreaTransformData) {
    if (isDebugging)
      console.log('Shooting Area: object moved to pos(x=' + mod.x + ', y=' + mod.y + ', z=' + mod.z + ')')
    Transform.getMutable(GetSurfaceObject()).position = mod
    Transform.getMutable(shootingFloorEntity).position = { x: mod.x, y: mod.y - 0.45, z: mod.z }
  }
}
