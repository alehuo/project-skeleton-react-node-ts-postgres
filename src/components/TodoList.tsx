import React from 'react'
import { Task } from '../../src-common/entity/Task';
import { StoreState } from '../store/store';
import { connect } from 'react-redux';
import TaskContainer from './TaskContainer';

interface TodoListDispatchProps {
}

interface TodoListStoreProps {
  tasks: Task[]
}

type TodoListProps =  TodoListDispatchProps & TodoListStoreProps

const TodoList = (props: TodoListProps) => {
  
  const sortedTasks: Task[] = Object.values(props.tasks)
    .sort((a, b) => a.sortindex - b.sortindex)

  return (
    <div>
      {sortedTasks.map(item => (
        <TaskContainer key={item.id} taskid={item.id} />
      ))
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)