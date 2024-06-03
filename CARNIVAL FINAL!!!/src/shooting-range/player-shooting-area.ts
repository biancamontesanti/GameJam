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
import { ScoreObject } from './score-object'

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
  const AUDIO_SHOT_SFX: string[] = ['audio/shooting-range/newshot.mp3', 'audio/shooting-range/shot-missed.mp3']
  

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
   
  
  
  let points: number = 0

  let losepoints: number = 0

          

let fruitzapper = engine.addEntity()


GltfContainer.create(fruitzapper, {
  src: 'models/shooting-range/CARNIVAL_COLIDER.glb',
})

Transform.create(fruitzapper, {
  position: Vector3.create(64, 0, 0),

  
})


Animator.create(fruitzapper, {
  states: [
    {
      clip: '1',
      playing: true, 
      shouldReset: false,
      loop: true,
     
    }

  ]
})




let shootEffect = engine.addEntity()




GltfContainer.create(shootEffect, {
  src: 'models/shooting-range/LUZES_bibix.glb'
})

Transform.create(shootEffect, {
  position: Vector3.create(64, 0, 0),
})


Animator.create(shootEffect, {
  states: [
    {
      clip: '1',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    }, 
   

  ]
    
})




// Create entity
const futuresound = engine.addEntity()

// Create AudioSource component
AudioSource.create(futuresound, {
	audioClipUrl: 'audio/shooting-range/spookymagic.mp3',
	loop: true,
	playing: true,
})

Transform.create(futuresound, {
  position: Vector3.create(12, 5, 52),
})







let FUTURE = engine.addEntity()

GltfContainer.create(FUTURE, {
  src: 'models/shooting-range/SEEYOURFUTURE3.glb',
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
})

Transform.create(FUTURE, {
  position: Vector3.create(12, 8, 55),
  scale: {x:4, y:1, z: 6},
  rotation:{x:-0.970, y:-0.807, z:6, w:-0.807},

})
Animator.create(FUTURE, {
  states: [
    {
      clip: '1',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '2',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '3',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '4',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '5',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '6',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '7',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '8',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '9',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '10',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '11',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },
    {
      clip: '12',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    },


  ]
})


let FUTUREBUTTON= engine.addEntity()

GltfContainer.create(FUTUREBUTTON, {
  src: 'models/shooting-range/BOTAO_bibix.glb',
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
})

Transform.create(FUTUREBUTTON, {
  position: Vector3.create(64, 0, 0)

})

Animator.create(FUTUREBUTTON, {
  states: [
    {
      clip: '1',
      playing: false, 
      shouldReset: false,
      loop: false,
     
    }]})

pointerEventsSystem.onPointerDown(
	{
		entity: FUTUREBUTTON,
		opts: { button: InputAction.IA_POINTER, hoverText: 'Game Start' },
	},
	function () {

    let randon: number = 0

    randon = (Math.floor(Math.random() * 11))

    if (randon===1) {Animator.playSingleAnimation(FUTURE,'1')}
    if (randon===2) {Animator.playSingleAnimation(FUTURE,'2')}
    if (randon===3) {Animator.playSingleAnimation(FUTURE,'3')}
    if (randon===4) {Animator.playSingleAnimation(FUTURE,'4')}
    if (randon===5) {Animator.playSingleAnimation(FUTURE,'5')}
    if (randon===6) {Animator.playSingleAnimation(FUTURE,'6')}
    if (randon===7) {Animator.playSingleAnimation(FUTURE,'7')}
    if (randon===8) {Animator.playSingleAnimation(FUTURE,'8')}
    if (randon===9) {Animator.playSingleAnimation(FUTURE,'9')}
    if (randon===10) {Animator.playSingleAnimation(FUTURE,'10')}
    if (randon===11) {Animator.playSingleAnimation(FUTURE,'11')}
    if (randon===12) {Animator.playSingleAnimation(FUTURE,'12')}


  })







// Create entity
const sourceEntity = engine.addEntity()

// Create AudioSource component
AudioSource.create(sourceEntity, {
	audioClipUrl: 'audio/shooting-range/carnivalloop.mp3',
	loop: true,
	playing: true,
})

Transform.create(sourceEntity, {
  position: Vector3.create(9, 1, 12),
})






// Create entity
const sourceEntity1 = engine.addEntity()

// Create AudioSource component
AudioSource.create(sourceEntity1, {
	audioClipUrl: 'audio/shooting-range/carnivalloop.mp3',
	loop: true,
	playing: true,
})

Transform.create(sourceEntity1, {
  position: Vector3.create(16, 1, 47),
})






// Create entity
const sourceEntity2 = engine.addEntity()

// Create AudioSource component
AudioSource.create(sourceEntity2, {
	audioClipUrl: 'audio/shooting-range/carnivalloop.mp3',
	loop: true,
	playing: true,
})

Transform.create(sourceEntity2, {
  position: Vector3.create(52, 1, 9),
})







let namelevels = engine.addEntity()

GltfContainer.create(namelevels, {
  src: 'models/shooting-range/NAME_LEVELS_CARNIVAL.glb',
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
})

Transform.create(namelevels, {
  position: Vector3.create(64, 0, 0),

})








let counter : number = 20




let button = engine.addEntity()

GltfContainer.create(button, {
  src: 'models/shooting-range/botaofinalxxxxx.glb',
  visibleMeshesCollisionMask: ColliderLayer.CL_POINTER
})

Transform.create(button, {
  position: Vector3.create(64, 0, 0),

})
Animator.create(button, {
  states: [
    {
      clip: '1',
      playing: false, 
      shouldReset: true,
      loop: false,
     
    }

  ]
})




pointerEventsSystem.onPointerDown(
	{
		entity: button,
		opts: { button: InputAction.IA_POINTER, hoverText: 'Game Start' },
	},
	function () {
		console.log('CLICKED AVOCADO') 

    Animator.playSingleAnimation(button,'1', false)

    console.log("GAME START")
    gameStarted = true
   

    



    if (counter == 20 )  {
      
      
      if (points < 150)  {
      (points == 0)

      counter = 47

      


      let Fase1 = engine.addEntity()


GltfContainer.create(Fase1, {
  src: 'models/shooting-range/fase1_bibix.glb',
})

Transform.create(Fase1, {
  position: Vector3.create(64, 0, 0),

  
})


Animator.create(Fase1, {
  states: [
    {
      clip: '1',
      playing: true, 
      shouldReset: true,
      loop: false,
     
    }

  ]
})
}


    }




    if (counter == 47 )  {
     

       

      if (points >= 180 ) {
        (points = 190)

        counter = 99



    


        let fase2 = 
        engine.addEntity()
     
    
    GltfContainer.create(fase2, {
      src: 'models/shooting-range/FASE2_bibix.glb',
    })
    
    Transform.create(fase2, {
      position: Vector3.create(64, 0, 0),
    
      
    })
    
    
    
    Animator.create(fase2, {
      states: [
        {
          clip: '1',
          playing: true, 
          shouldReset: false,
          loop: false,
         
        }
    
      ]
    })








     }



      


  }



  if (counter == 99 )  {



     
 if (points >= 480 ) {
  (points = 490)


  counter = 174
  let fase3 = engine.addEntity()


  GltfContainer.create(fase3, {
    src: 'models/shooting-range/FASE3_bibix.glb'
  })
  
  Transform.create(fase3, {
    position: Vector3.create(64, 0, 0),
    
  })
  
  
  Animator.create(fase3, {
    states: [
      {
        clip: '1',
        playing: true, 
        shouldReset: false,
        loop: false,
       
      }
  
    ]
  })
 
 }



  }






  if (counter == 174 )  {



     
    if (points >= 520 ) {
     (points = 600)
   
   
     counter = 200
     let fase4 = engine.addEntity()
   
   
     GltfContainer.create(fase4, {
       src: 'models/shooting-range/FASE4_bibix.glb'
     })
     
     Transform.create(fase4, {
       position: Vector3.create(64, 0, 0),
       
     })
     
     
     Animator.create(fase4, {
       states: [
         {
           clip: '1',
           playing: true, 
           shouldReset: false,
           loop: false,
          
         }
     
       ]
     })
   
    
    }
   
   
   
   
   
   
   
     }







 
 
 

	}
)





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
    
          
          
                  //  //render new shot decal
                  //  Animator.playSingleAnimation(shootEffect, '1')
            // ShotDecalObject.Create({ parent: entity, pos: relPos })
            //render new score display
            switch (raycastResult.hits[0].meshName) {
              case 'button':
      points += 0
      console.log("botao")
      console.log(points)
          break

              case '1_collider':
               //play audio - hit
            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)
                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })
                break



                case '2_collider':
                   //play audio - hit
           
            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)



                // ScoreObject.Create({
                //   type: ScoreObject.SCORE_TYPE.TEN,
                //   pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                // })
                break

                case '3_collider':  
                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)





             ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break

                case '4_collider':
                      //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)
  

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break

                case '5_collider':
                     //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })

                break


                case '6_collider':
                      //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)

                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })
                break




                case '7_collider':

                   //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)





                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })
                break

                case '8_collider':


                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })






                break   


                case '9_collider':


                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })






                break   




                case '10_collider':


                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })






                break   



                case '11_collider':


                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })






                break 
                
                
                case '12_collider':


                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })






                break   



                case '13_collider':


                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })






                break   
                case '14_collider':


                //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TEN,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z  }
                })






                break   


















                
                

              case '1_collider':    
                    //play audio - hit
            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)







                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.TWENTYFIVE,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break





              case '1_collider':



              //play audio - hit

            PlayShotSound(0)
            points += 10
            console.log("++++")
            console.log(points)



                ScoreObject.Create({
                  type: ScoreObject.SCORE_TYPE.FIFTY,
                  pos: { x: hitPos.x, y: hitPos.y, z: hitPos.z }
                })
                break




                case 'button_collider':

            console.log("cubo sem pontos")


                break







            }





              }




             function DanceVictory() {
      
              if ( points >= 160 && points <= 170 ) {         

               (points = 180) 


                console.log('vc venceu a primeira fase')



                let nivel2 = engine.addEntity()



GltfContainer.create(nivel2, {
  src: 'models/shooting-range/WIN_bibix.glb'
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


                inShootingArea = false

                counter = 47


                PlayWinSound(0)
                
                
                gameStarted=false 
                
                const entity = engine.addEntity()
                Transform.create(entity, {
                 
                  position: { x: 16, y: 1, z: 16 }
                })
          
              }

            }
              DanceVictory() 
              



        function DanceVictory2() {
      
          if ( points >= 400 && points <= 470 ) {  
            
            

            (points = 480) 




            console.log('vc venceu a segunda fase')


            let nivel3 = engine.addEntity()



            GltfContainer.create(nivel3, {
              src: 'models/shooting-range/WIN_bibix.glb'
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
            Animator.playSingleAnimation(nivel3, '1', true )
            

            

            inShootingArea = false





            PlayWinSound(0)
            
            
            gameStarted=false 
            
            const entity = engine.addEntity()
            Transform.create(entity, {
             
              position: { x: 16, y: 1, z: 16 }
            })
      

          }

        }
          DanceVictory2() 
      

            function DanceVictory3() {
      
            if ( points >= 700 && points <= 950 ) {  
              
              

               (points = 700) 
  
            
            let nivel4 = engine.addEntity()



            GltfContainer.create(nivel4, {
              src: 'models/shooting-range/WIN_bibix.glb'
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
            Animator.playSingleAnimation(nivel4, '1', true )
            
  
  
  
              PlayWinSound(0)
              
              
              gameStarted=false 
              
  
            }
  
          }
            DanceVictory3() 





        }
          if (isDebugging) console.log('Shooting Area: no entities hit')
        
          



          
      
            if ( losepoints >= 400) {
              
              
              console.log('vc perdeu')

              

              
              PlayWinSound(0)

              if (losepoints >= 50) {
                (losepoints = 0) 
              }

              points = 0
              

              inShootingArea = false

              
            let dancelose = engine.addEntity()



            GltfContainer.create(dancelose, {
              src: 'models/shooting-range/YOULOSE_VAANISH.glb'
            })
            
            Transform.create(dancelose, {
              position: Vector3.create(64, 0, 0),
              
            })
            
            
            Animator.create(dancelose, {
              states: [
                {
                  clip: '1',
                  playing: true, 
                  shouldReset: false,
                  loop: false,
                 
                }
            
              ]
            })
            Animator.playSingleAnimation(dancelose, '1', true )

             
  


              
            
          }

            

        }
      }
    )
  }












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
