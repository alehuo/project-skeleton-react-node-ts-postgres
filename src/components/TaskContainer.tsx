import React from 'react'
import { Task } from '../../src-common/entity/Task';
import { StoreState } from '../store/store';
import { connect } from 'react-redux';
import './styles/TaskContainer.css';

interface TaskContainerPassedProps {
  taskid: number
}

interface TaskContainerDispatchProps {
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
      <button onClick={() => console.log('delete')}>
        Delete
      </button>
      <button onClick={() => console.log('move up')}>
        Move up
      </button>
      <button onClick={() => console.log('move down')}>
        Move down
      </button>
    </div>
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer)