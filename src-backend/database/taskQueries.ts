import { db, yesql } from './connection'
import { Task } from '../../src-common/entity/Task';

export async function getTasks() {
  const result = await db.query(yesql.getTasks().text, null)
  return result.rows
}

export async function createTask(newTask: Task) {
  const result = await db
    .query(yesql.createTask(newTask).text, [
      newTask.name, 
      newTask.sortindex, 
      newTask.owner,
      newTask.status]
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