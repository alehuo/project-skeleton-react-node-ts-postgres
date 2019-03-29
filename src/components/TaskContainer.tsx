import React from 'react'
import { Task } from '../../src-common/entity/Task';
import { StoreState } from '../store/store';
import { connect } from 'react-redux';
import './styles/TaskContainer.css';
import { deleteTask, moveTaskUp, moveTaskDown } from '../store/taskReducer';

interface TaskContainerPassedProps {
  taskid: number
}

interface TaskContainerDispatchProps {
  deleteTask: typeof deleteTask
  moveTaskUp: typeof moveTaskUp
  moveTaskDown: typeof moveTaskDown
}

interface TaskContainerStoreProps {
  tasks: Task[]
}

type TaskContainerProps =
  TaskContainerPassedProps &
  TaskContainerDispatchProps &
  TaskContainerStoreProps

const TaskContainer = (props: TaskContainerProps) => {

  return (
    <div className="TaskContainer">
      <p>{props.tasks[props.taskid].name}</p>
      <br/>
      <button onClick={() => console.log('done')}>
        Mark as done
      </button>
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
  moveTaskDown
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)