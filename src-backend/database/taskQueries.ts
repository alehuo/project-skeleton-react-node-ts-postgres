import { db, yesql } from './connection'
import { Task } from '../../src-common/entity/Task';

export async function getTasks() {
  const result = await db.query(yesql.getTasks().text, null)
  return result.rows
}

export async function createTask(newTask: Task) {
  const result = await db.query(
    yesql.createTask(newTask).text, [
      newTask.name, 
      newTask.sortindex, 
      newTask.owner,
      newTask.status
    ]
  )
  return result.rows[0]
}

export async function deleteTask(taskid: string) {
  const result = await db.query(yesql.deleteTask().text, [taskid])
  console.log(result)
  if (result.rowCount === 0) {
    throw new Error("No such entity")
  } else {
    return
  }
}

export async function changeTaskStatus(taskid: string, status: string) {
  const result = await db.query(
    yesql.updateTaskStatus().text, [
      taskid,
      status
    ]
  )
  if (result.rowCount !== 1) {
    throw new Error("No such entity")
  } else {
    return
  }
}

export async function moveTaskUp(taskid: string) {
  await db.query("BEGIN;", [])
  const res1 = await db.query(
    yesql.moveTaskUpPart1().text,
    [taskid]
  )
  const res2 = await db.query(
    yesql.moveTaskUpPart2().text,
    [taskid]
  )
  if ( res1.rowCount === 1 && res2.rowCount === 1 ) {
    await db.query("COMMIT;", [])   
    return
  } else {
    console.log(res1, res2)
    throw new Error("Error while moving task")
  }
}

export async function moveTaskDown(taskid: string) {
  await db.query("BEGIN;", [])
  const res1 = await db.query(
    yesql.moveTaskDownPart1().text,
    [taskid]
  )
  const res2 = await db.query(
    yesql.moveTaskDownPart2().text,
    [taskid]
  )
  if ( res1.rowCount === 1 && res2.rowCount === 1 ) {
    await db.query("COMMIT;", [])   
    return
  } else {
    console.log(res1, res2)
    throw new Error("Error while moving task")
  }
}