import { move } from 'ramda'

interface ObjectWithId {
  id: number
}

interface IdObject {
  [key: string]: any
}

export function arrayToByIdObject(array: ObjectWithId[]): IdObject {
  const obj: IdObject = {}

  array.forEach(item => {
    const key: string = item.id.toString()
    obj[key] = item
  })

  return obj
}

export function moveItemUp(array: number[], itemToMove: number) {
  const origIndex = array.findIndex(item => item === itemToMove)
  if (origIndex === 0) {
    return array
  } else {
    return move(origIndex, origIndex - 1, array)
  }
}

export function moveItemDown(array: number[], itemToMove: number) {
  const origIndex = array.findIndex(item => item === itemToMove)
  if (origIndex === array.length) {
    return array
  } else {
    return move(origIndex, origIndex + 1, array)
  }
}