import { UiInputResult } from "@dcl/sdk/ecs"
import { ScoreObject } from "./score-object"

const isDebugging: boolean = false

export module ScoreManager {
    let totalScore: number = 0
  
    export function addScore(scoreType: ScoreObject.SCORE_TYPE) {
      switch (scoreType) {
        case ScoreObject.SCORE_TYPE.TEN:
          totalScore += 10
          break
        case ScoreObject.SCORE_TYPE.TWENTYFIVE:
          totalScore += 25
          break
        case ScoreObject.SCORE_TYPE.FIFTY:
          totalScore += 50
          break
      }
  
      if (isDebugging) console.log('Total Score: ' + totalScore)
    }
  
    export function resetScore() {
      totalScore = 0
      if (isDebugging) console.log('Total Score reset to 0')
    }
  
    export function getTotalScore(): number {
      return totalScore
    }
  }