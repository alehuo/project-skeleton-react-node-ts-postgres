import React, { useEffect, } from 'react'
import 'reset-css'
import { getJSON } from './fetch'
import { receiveTasks } from './store/taskReducer'
import { StoreState } from './store/store'
import { connect } from 'react-redux'
import { Task } from '../src-common/entity/Task';
import TodoList from './components/TodoList';
import AddTaskButton from './components/AddTaskButton';

interface AppStoreProps {
  tasks: Task[]
}

interface DispatchProps {
  receiveTasks: typeof receiveTasks
}

type Props = AppStoreProps & DispatchProps



const App = (props: Props) => {

  useEffect(() => {
    getJSON('/api/v1/tasks').then(response => props.receiveTasks(response.tasks)).catch(() => undefined)
  }, [])

  const tasks: Task[] = Object.values(props.tasks)
    .sort((a, b) => a.sortindex - b.sortindex)

  return (
    <div>
      <p>Todo-app - a React + Node Typescript skeleton</p>
      <TodoList/>
      <AddTaskButton />
    </div> 
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    tasks: state.tasks
  }
}

const mapDispatchToProps = {
  receiveTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
