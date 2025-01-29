
import React, { useContext } from 'react'
import { TodoContext } from '../TodoContext';
import { useState, useEffect } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Modal from './Modal';
import { BsThreeDots } from "react-icons/bs";
import { stringify } from 'uuid';




const Upcoming = () => {
    //To load data from Local storage
    const { TaskBox, setTaskBox } = useContext(TodoContext)
    const { checkBox, setcheckBox } = useContext(TodoContext)
    const { Hide, setHide } = useContext(TodoContext)

    // const [TaskBox, setTaskBox] = useState([])
    // const [checkBox, setcheckBox] = useState([])
    // const [TaskBox, setTaskBox] = useState(() => {
    //     const savedTasks = localStorage.getItem('TaskBoxData');
    //     return savedTasks ? JSON.parse(savedTasks) : [];
    // })


    // const [checkBox, setcheckBox] = useState(() => {
    //     const savedChecks = localStorage.getItem('checkBoxData');
    //     return savedChecks ? JSON.parse(savedChecks) : [];
    // });

    const [IsModalOpen, setIsModalOpen] = useState(false)





    // useEffect(() => {
    //     const savedTask = localStorage.getItem('TaskBoxData')
    //     if (savedTask) {
    //         setTaskBox(JSON.parse(savedTask));
    //     }
    // }, [])


    // useEffect(() => {
    //     const savedChecks = localStorage.getItem('checkBoxData');
    //     if (savedChecks) {
    //         setcheckBox(JSON.parse(savedChecks))
    //     }
    // }, [])




    // To save the data



    // useEffect(() => {
    //     console.log("saved TaskBox: ", TaskBox)
    //     localStorage.setItem('TaskBoxData', JSON.stringify(TaskBox))

    // }, [TaskBox])


    // useEffect(() => {
    //     console.log("saved checkbox: ", checkBox)
    //     localStorage.setItem('checkBoxData', JSON.stringify(checkBox))
    // }, [checkBox])


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

    const handleDeleteTaskBox = (id, taskBoxId) => {
        setTaskBox((prevTaskBox) => prevTaskBox.filter((box) => box.id !== id));
        setcheckBox((prevcheckBox) => prevcheckBox.filter(task => task && task.taskBoxId !== id))
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
            <div className={`w-[37dvw] min-w-[200px] border-2 border-gray-400  h-auto  self-start p-4  relative   rounded-md overflow-y-auto overflow-x-hidden max-lg:w-full  ${Hide ? "w-[45dvw]" : "w-[33.5]"} `} id={id} >
                <h1 className='text-2xl max-md:text-lg max-lg:text-xl font-bold mb-2 flex items-center justify-between ' >
                    {IsEditing ? (
                        <input type='text' value={newTitle} onChange={(e) => setnewTitle(e.target.value)} onBlur={handleSave} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(), handleSave() }} autoFocus className=" outline-1 outline-gray-300 h-[4.5vh] rounded-md px-2 py-1 text-gray-700 w-[85%] " />
                    ) : (<span onClick={() => setIsEditing(true)} className="cursor-pointer break-words w-[90%] " >{TaskBoxTitle}</span>)}
                    <p className="flex gap-2 " > <RxCross2 className="cursor-pointer" onClick={() => onDelete(id)} /><FiEdit className='text-[20px] cursor-pointer ' onClick={() => setIsEditing(true)} /></p>
                </h1>
                <div className="flex border-2 w-full gap-4 font-semibold text-gray-500 h-10 md:h-11 items-center rounded-md" >
                    {IsAddingTask ? (
                        <input type='text'
                            value={newTaskName}
                            onChange={(e) => setnewTaskName(e.target.value)}
                            onBlur={handleAddTask} onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(), handleAddTask() }}
                            placeholder='Enter new Task'
                            autoFocus
                            className=" text-xl pl-2 outline-none  w-full "
                        />
                    ) : (
                        <div className={`flex w-full gap-4 pr-4 pl-1 font-semibold text-gray-500  items-center rounded-md justify-between  `} >
                            <button onClick={() => setIsAddingTask(true)} autoFocus className={`flex w-full gap-4  outline-none `}>
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
                <div className={`flex-1 gap-3 mt-2 items-center pt-1 pb-1 pr-1 border-2 rounded-md pl-2 w-full  ${checked ? "bg-gray-200  line-through " : ""} `} >
                    {IsEditing ? (<input type='text' value={newName} onChange={(e) => setnewName(e.target.value)} onBlur={handleSaveEdit} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(), handleSaveEdit() } }} autoFocus className="outline-none " />) : (
                        <>
                            <div className="flex items-center justify-between w-full  " >
                                <label for="taskId" className="flex gap-3 break-normal overflow-hidden " >
                                    <input
                                        type="checkbox"
                                        id={taskId}
                                        checked={checked}
                                        onChange={() => onToggle(taskId)}
                                        className="cursor-pointer break-words "
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
            <div className={`h-[99vh] overflow-hidden w-full ml-2 `} >
                <div className='flex justify-between items-center m-3 '>
                    <div className='flex items-center gap-5'>
                        <div className='text-5xl font-bold max-md:text-2xl ' >Upcoming</div>
                        <span className='h-12 max-md:h-8 max-md:w-8 w-12  flex items-center justify-center text-4xl max-md:text-2xl font-semibold border-2 rounded-md' >{checkBox.length}</span>
                    </div>
                    <div className='w-24 max-md:w-18  h-12 max-md:h-9 bg-blue-200 flex items-center justify-center rounded-2xl text-lg font-semibold text-gray-700 cursor-pointer hover:bg-blue-300 transition-all duration-500 ' onClick={() => setIsModalOpen(true)} >
                        Add List
                    </div>
                </div>
                <hr class="border-1 border-gray-600"></hr>
                <div class="grid grid-cols-2 max-sm:grid-cols-1 grid-flow-row auto-rows-max gap-4 max-lg:scrollbar-hide m h-[90vh]  overflow-y-auto " >
                    {TaskBox.map((box) => (
                        <NewList
                            key={box.id}
                            id={box.id}
                            TaskBoxTitle={box.TaskBoxTitle}
                            onDelete={handleDeleteTaskBox}
                            onSaveEdit={handleSaveEditTaskBox}
                            onAddTask={handleNewCheckBox} />
                    ))}
                </div>
                <Modal
                    isOpen={IsModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleNewTaskBox}
                />

            </div>
        </>
    )
}

export default Upcoming
