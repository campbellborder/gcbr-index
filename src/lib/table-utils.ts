import { indicators } from "./indicators";

export const blankVisibilityState: Record<string, boolean> = Object.fromEntries([['iso-a3', false], ...indicators.map((indicator) => [indicator.value, false])])

export function getVisibilityState(indicatorValue: string) {

  // TODO: better deep copy
  var state: Record<string, boolean> = JSON.parse(JSON.stringify(blankVisibilityState))
  state['iso-a3'] = true
  state[indicatorValue] = true

  indicators.filter((indicator) => indicator.category == indicatorValue).forEach((indicator) => {
    state[indicator.value] = true
  })

  return state

}