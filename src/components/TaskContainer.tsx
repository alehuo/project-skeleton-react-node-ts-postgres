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
  
  console.log(props.taskid)

  return (
    <div className="TaskContainer">
      {props.tasks[props.taskid].name}
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