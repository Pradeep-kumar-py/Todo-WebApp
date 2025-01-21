import React, { useState, useRef, useContext } from 'react'
import { TodoContext } from '../TodoContext';

import Upcoming from './Upcoming';
import { FiEdit } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { BsThreeDots } from "react-icons/bs";

const Today = () => {

  const { TaskBox, setTaskBox } = useContext(TodoContext)
  const { checkBox, setcheckBox } = useContext(TodoContext)

  const todayTask = TaskBox.filter(task => task.TaskBoxTitle.toLowerCase() === "today")


  const handleNewTaskBox = (TaskBoxTitle) => {
    const newBox = { id: Date.now(), TaskBoxTitle, };
    setTaskBox((prevTaskBox) => [...prevTaskBox, newBox])
    console.log("Add new Task box: ", newBox)
  }


  const handleNewCheckBox = (taskBoxId, TaskName) => {
    if (!taskBoxId || !TaskName) {
      console.error("Invalid taskBoxId or TaskName");
      return;
    }

    const newTask = { id: Date.now(), taskBoxId, TaskName, };
    setcheckBox((prevcheckBox) => [...prevcheckBox, newTask]);
  };


  //To delete the taskbox

  const handleDeleteTaskBox = (id) => {
    setTaskBox((prevTaskBox) => prevTaskBox.filter((box) => box.id !== id));
    console.log("deleted task id: ", id)
  }

  const handleDeleteCheckBox = (taskId) => {
    setcheckBox((prevcheckBox) => prevcheckBox.filter(task => task && task.id !== taskId))
  }

  // Handle the edit button


  const handleSaveEditTaskBox = (id, newTitle) => {
    setTaskBox((prevTaskBox) => prevTaskBox.map((box) => box.id === id ? { ...box, TaskBoxTitle: newTitle } : box))
    console.log("Edited task box with id: ", id, "New title: ", newTitle)
  }


  const handleEditCheckBox = (taskId, newTaskName) => {
    setcheckBox((prevcheckBox) => prevcheckBox.map((task) => task && task.id === taskId ? { ...task, TaskName: newTaskName } : task))
  }

  const handleCheckedTask = (taskId) => {
    setcheckBox((prevcheckbox) => {
      const updatedTask = prevcheckbox.map((task) => task.id === taskId ? { ...task, checked: !task.checked } : task)
      console.log("Updated checkBox state:", updatedTask);
      localStorage.setItem('checkBoxData', JSON.stringify(updatedTask))
      return updatedTask;
    });
  }







  const NewList = ({ TaskBoxTitle, id, onDelete, onEdit, onSaveEdit, onAddTask, tasks, setcheckBox }) => {
    const [IsEditing, setIsEditing] = useState(false)
    const [newTitle, setnewTitle] = useState(TaskBoxTitle)
    const [IsAddingTask, setIsAddingTask] = useState(false);
    const [newTaskName, setnewTaskName] = useState("");

    const taskForThisBox = checkBox.filter(
      (task) => task && task.taskBoxId === id
    );


    const handleSave = () => {
      onSaveEdit(id, newTitle)
      setIsEditing(false);
    }

    const handleAddTask = () => {
      if (newTaskName.trim() !== "") {
        onAddTask(id, newTaskName)
        setnewTaskName("")
      }
      setIsAddingTask(false);
    }

    return (
      <div className='w-[70vw] border-2 m-5 h-auto  self-start p-4  relative   rounded-md overflow-auto' id={id} >
        <h1 className='text-2xl font-bold mb-2 flex items-center justify-between' >
          {IsEditing ? (
            <input type='text' value={newTitle} onChange={(e) => setnewTitle(e.target.value)} onBlur={handleSave} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(), handleSave() }} autoFocus className=" outline-1 outline-gray-300 h-[4.5vh] rounded-md px-2 py-1 text-gray-700 w-[85%]" />
          ) : (<span onClick={() => setIsEditing(true)} className="cursor-pointer" >{TaskBoxTitle}</span>)}
          <p className="flex gap-2 " > <RxCross2 className="cursor-pointer" onClick={() => onDelete(id)} /><FiEdit className='text-[20px] cursor-pointer ' onClick={() => setIsEditing(true)} /></p>
        </h1>
        <div className="flex border-2 w-full gap-4 font-semibold text-gray-500 h-10 items-center rounded-md" >
          {IsAddingTask ? (
            <input type='text'
              value={newTaskName}
              onChange={(e) => setnewTaskName(e.target.value)}
              onBlur={handleAddTask} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(), handleAddTask() }} placeholder='Enter new Task' autoFocus className=" text-xl pl-2 outline-none  w-full " />
          ) : (
            <div className='flex w-full gap-4 pr-4 pl-1 font-semibold text-gray-500 h-10 items-center rounded-md justify-between ' >
              <button onClick={() => setIsAddingTask(true)} autoFocus className='flex w-full gap-4  outline-none' >
                <p className='flex gap-3' ><MdAdd className="text-[25px] text-gray-500" />Add New Task</p>
              </button>
              <BsThreeDots className={`cursor-pointer text-3xl`} />
            </div>
          )}
        </div>
        {taskForThisBox.map((task) => (
          <NewTask
            key={task.id}
            taskId={task.id}
            checked={task.checked}
            onToggle={handleCheckedTask}
            TaskName={task.TaskName}
            onEdit={(taskId, newName) => handleEditCheckBox(taskId, newName)}
            onDelete={handleDeleteCheckBox}
          />
        ))}

      </div>
    )
  }

  const NewTask = ({ TaskName, taskId, onEdit, onDelete, checked, onToggle }) => {
    const [IsEditing, setIsEditing] = useState(false)
    const [newName, setnewName] = useState(TaskName)

    const handleSaveEdit = () => {
      onEdit(taskId, newName)
      setIsEditing(false);
    }
    // console.log("checked box:", taskId.checked)/


    return (
      <>
        <div className={`flex gap-3 mt-2 items-center h-11 border-2 rounded-md pl-2 w-full ${checked ? "bg-gray-200  line-through " : ""} `} >
          {IsEditing ? (<input type='text' value={newName} onChange={(e) => setnewName(e.target.value)} onBlur={handleSaveEdit} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(), handleSaveEdit() } }} autoFocus className="outline-none " />) : (
            <>
              <div className="flex items-center justify-between w-full  " >
                <label for="taskId" className="flex gap-3 peer-checked:bg-blue-600 overflow-hidden" >
                  <input
                    type="checkbox"
                    id={taskId}
                    checked={checked}
                    onChange={() => onToggle(taskId)}
                    className="cursor-pointer  "
                  />
                  {TaskName}
                </label>
                <p className="flex gap-2 " > <RxCross2 className="cursor-pointer text-2xl " onClick={() => onDelete(taskId)} /><FiEdit className='text-[20px] cursor-pointer ' onClick={() => setIsEditing(true)} /></p>
              </div>
            </>
          )}

        </div>
      </>
    )
  }


  return (
    <>
      <div className="text-3xl font-bold flex justify-center mt-3 text-gray-500 bg-gray-200 pt-1 pb-1 w-[] rounded-xl m-auto " >Today Task</div>
      {todayTask.map(box => (
        <NewList
          key={box.id}
          id={box.id}
          TaskBoxTitle={box.TaskBoxTitle}
          onDelete={handleDeleteTaskBox}
          onSaveEdit={handleSaveEditTaskBox}
          onAddTask={handleNewCheckBox} />
      ))}
    </>
  )
}

export default Today
