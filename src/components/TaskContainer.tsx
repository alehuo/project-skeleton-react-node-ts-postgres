import React from 'react'
import { Task } from '../../src-common/entity/Task';
import { StoreState } from '../store/store';
import { connect } from 'react-redux';
import './styles/TaskContainer.css';
import { deleteTask, moveTaskUp, moveTaskDown, changeTaskStatus } from '../store/taskReducer';

interface TaskContainerPassedProps {
  taskid: number
}

interface TaskContainerDispatchProps {
  deleteTask: typeof deleteTask
  moveTaskUp: typeof moveTaskUp
  moveTaskDown: typeof moveTaskDown
  changeTaskStatus: typeof changeTaskStatus
}

interface TaskContainerStoreProps {
  tasks: Task[]
}

type TaskContainerProps =
  TaskContainerPassedProps &
  TaskContainerDispatchProps &
  TaskContainerStoreProps

const TaskContainer = (props: TaskContainerProps) => {

  const task = props.tasks[props.taskid]

  const isDone = (task: Task) => {
    return task.status === 'done'
  }

  const changeStatus = () => {
    if (task.status === 'todo') {
      props.changeTaskStatus(task.id, 'done')
    } else {
      props.changeTaskStatus(task.id, 'todo')
    }
  }

  return (
    <div className="TaskContainer">
      <p>{task.name}</p>
      <br/>
      <input
        name="task-status"
        type="checkbox"
        checked={isDone(task)}
        onChange={() => changeStatus()} />
      <button onClick={() => props.deleteTask(props.taskid)}>
        Delete
      </button>
      <button onClick={() => props.moveTaskUp(props.taskid)}>
        Move up
      </button>
      <button onClick={() => props.moveTaskDown(props.taskid)}>
        Move down
      </button>
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    tasks: state.tasks.byid
  }
}

const mapDispatchToProps = {
  deleteTask,
  moveTaskUp,
  moveTaskDown,
  changeTaskStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)