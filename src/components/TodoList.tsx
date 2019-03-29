import React from 'react'
import { Task } from '../../src-common/entity/Task';
import { StoreState } from '../store/store';
import { connect } from 'react-redux';
import TaskContainer from './TaskContainer';

interface TodoListDispatchProps {
}

interface TodoListStoreProps {
  tasks: Task[]
  taskOrder: number[]
}

type TodoListProps =  TodoListDispatchProps & TodoListStoreProps

const TodoList = (props: TodoListProps) => {

  return (
    <div>
      {props.taskOrder.map(taskKey => (
        <TaskContainer key={taskKey} taskid={taskKey} />
      ))
      }
    </div>
    
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    tasks: state.tasks.byid,
    taskOrder: state.tasks.orderOfTasks
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)