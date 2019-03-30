import React, { useState } from 'react'
import { Task } from '../../src-common/entity/Task';
import { addTask } from '../store/taskReducer';
import { StoreState } from '../store/store';
import { connect } from 'react-redux';

interface AddTaskButtonDispatchProps {
  addTask: typeof addTask
}

interface AddTaskButtonStoreProps {
  tasks: Task[]
}

type AddTaskButtonProps =  AddTaskButtonDispatchProps & AddTaskButtonStoreProps

const AddTaskButton = (props: AddTaskButtonProps) => {
  const [newTask, setNewTask] = useState("");

  const newSortIndex = Object.values(props.tasks).length

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('submit!', newTask)
    props.addTask( newTask, '123', newSortIndex, 'todo' )
    setNewTask("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Task:
        <input 
          type="text"
          name="taskname"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
      </label>
      <input type="submit" value="Save" />
    </form>
  )
}

const mapStateToProps = (state: StoreState) => {
  return {
    tasks: state.tasks.byid
  }
}

const mapDispatchToProps = {
  addTask: addTask
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskButton)