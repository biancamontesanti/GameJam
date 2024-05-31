# Shooting Range

![preview](https://github.com/TheCryptoTrader69/SDK7-Shooting-Range/blob/main/images/preview.gif)

## Description
Basic gun game mechanic along with bullet marks and pop up scores.

## Instructions
Make sure you stand inside the shooting area marked in red before firing at the targets. Use your mouse to look around and <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> keys on your keyboard to move forward, left, backward and right respectively. Press the <kbd>Space</kbd> key to jump and the <kbd>Left Mouse Button</kbd> to shoot.

## Try it out

**Setting Up Your Environment**

To start developing for Decentraland, follow [these instructions](https://docs.decentraland.org/creator/development-guide/sdk7/installation-guide/)

**Running The Scene**

You can run the scene by following [these instructions](https://docs.decentraland.org/creator/development-guide/sdk7/preview-scene/)

## Acknowledgements
The following files were taken from https://freesound.org/:
- _shot.mp3_ modified from https://freesound.org/people/MATRIXXX_/sounds/473846/ 
- _shotFail.mp3_ modified from https://freesound.org/people/jackyyang09/sounds/467432/


## Quest Definition

```json
{
    "name": "Prepare for Battle",
    "image_url": "https://raw.githubusercontent.com/decentraland/sdk7-goerli-plaza/main/Gnark/images/scene-thumbnail.png",
    "definition": {
        "steps": [
          {
            "id": "prepare-for",
            "description": "Prepare for the Battle",
            "tasks": [
              {
                "id": "pick-up-armor",
                "description": "Pick up the armor",
                "actionItems": [
                  {
                    "type": "CUSTOM",
                    "parameters": {
                      "kind": "PickUp",
                      "id": "armor"
                    }
                  }
                ]
              },
              {
                "id": "pick-up-ammo",
                "description": "Pick up the ammo",
                "actionItems": [
                  {
                    "type": "CUSTOM",
                    "parameters": {
                      "kind": "PickUp",
                      "id": "ammo"
                    }
                  }
                ]
              },
              {
                "id": "pick-up-medikit",
                "description": "Pick up the medikit",
                "actionItems": [
                  {
                    "type": "CUSTOM",
                    "parameters": {
                      "kind": "PickUp",
                      "id": "medikit"
                    }
                  }
                ]
              }
            ]
          },
          {
            "id": "go-to-zone",
            "description": "Go to the Battle Zone",
            "tasks": [
              {
                "id": "go-to-battle-zone",
                "description": "Go to the Battle Zone",
                "actionItems": [
                  {
                    "type": "LOCATION",
                    "parameters": {
                      "y": "1",
                      "x": "1"
                    }
                  }
                ]
              }
            ]
          }
        ],
        "connections": [
          {
            "stepFrom": "prepare-for",
            "stepTo": "go-to-zone"
          }
        ]
    }
}
```
