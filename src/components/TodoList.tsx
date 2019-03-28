import React, { useState } from 'react'
import { Task } from '../../src-common/entity/Task';
import { addTask } from '../store/taskReducer';
import { StoreState } from '../store/store';
import { connect } from 'react-redux';

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
    <ul>
      {sortedTasks.map(item => (
        <li key={item.id}> - {item.name}</li>
      ))
      }
    </ul>
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