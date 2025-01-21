import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaListCheck } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { list } from "postcss";
const uniqueID = uuidv4();
// import './index.css'

const Left = () => {

    const { TaskBox, setTaskBox } = useContext(TodoContext)
    const { checkBox, setcheckBox } = useContext(TodoContext)
    const {Lists, setLists} = useContext(TodoContext)

    // Filter TaskBox for tasks with title "today"
    const todayTask = TaskBox.filter(task =>
        task.TaskBoxTitle.toLowerCase() === "today"
    );



    // Filter checkBox for tasks matching the IDs from todayTask
    const filteredTask = checkBox.filter(checks =>
        todayTask.some(task => task.id === checks.taskBoxId)
    );

    console.log("filtered task", filteredTask);

    // console.log("today filtered task", TodayFilteredTask.length)
    const [selectedDiv, setselectedDiv] = useState(null)
    // const [Lists, setLists] = useState([])
    // const [Lists, setLists] = useState(() => {
    //     const savedItems = localStorage.getItem('TodoListData');
    //     return savedItems ? JSON.parse(savedItems) : []; // Initialize with localStorage data or empty array
    // });


    //Save items to local storage whenever the list changes

    // useEffect(() => {
    //     console.log('Saving to localStorage:', Lists);
    //     localStorage.setItem('TodoListData', JSON.stringify(Lists))
    // }, [Lists])


    // const handleAddNewLIst = () => {
    //     const name = prompt('Enter the title of New List: ');
    //     const SiteUrl = prompt("Enter url: ")

    //     if (name && SiteUrl) {
    //         const newList = { id: Date.now(), name, SiteUrl }
    //         setLists((prevLists) => [...prevLists, newList])
    //         console.log("Add new list:", newList)
    //     }
    // }
    
    const handleAddNewList = () => {
        const name = prompt('Enter the title of New List: ');
        const SiteUrl = prompt("Enter URL: ");
        
        if (name && SiteUrl) {
            try {
                const url = new URL(SiteUrl);
                let embedUrl = SiteUrl;
    
                // Example logic: Convert YouTube video URLs to embed format
                if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
                    const videoId = url.searchParams.get("v");
                    if (videoId) {
                        embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    }
                } else if (url.hostname === "youtu.be") {
                    // Handle shortened YouTube URLs
                    embedUrl = `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
                }
    
                const newList = { id: Date.now(), name, SiteUrl: embedUrl };
                setLists((prevLists) => [...prevLists, newList]);
                console.log("Added new list:", newList);
            } catch (error) {
                console.error("Invalid URL format:", error);
                alert("Please enter a valid URL.");
            }
        }
    };
    
    

    const handleDeleteSite =(id)=>{
        setLists((previousSite)=> previousSite.filter(list => list.id != id) )

    }


    const TaskItems = ({ to, Icon, Title, id, NOFTask, selectedDiv, setselectedDiv }) => {
        return (
            <li className={`flex items-center justify-between cursor-pointer box-border p-[5px] rounded-md ${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`} onClick={() => setselectedDiv(id)}>
                <Link to={to} className="flex items-center justify-between w-full text-inherit">
                    <p className="flex items-center gap-3 text-gray-500 text-[20px] font-semibold ">{Icon}{Title} </p>
                    <span className={`h-5 w-7 rounded-[4px] bg-gray-200 text-[12px] flex items-center justify-center font-semibold ${selectedDiv === id ? 'bg-white' : 'bg-gray-200'} `} >{NOFTask}</span>
                </Link>
            </li>
        )
    }
    const ListItems = ({ id, NOFTask, name, onAddNew,to }) => {
        return (
            <li className={`${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`} onClick={() => setselectedDiv(id)} >
                <Link to={to} className="flex items-center gap-1 justify-between p-[5px] w-[100%]  box-border rounded-md cursor-pointer" >
                <div className="flex items-center gap-2 relative">
                    <div className="h-4 w-4 bg-red-500 rounded-[4px] " ></div>
                    <p className="text-lg font-semibold text-gray-500 w-[220px] overflow-hidden " >{name}</p>
                </div>
                <button className={` flex items-center justify-center`} >
                    <RxCross2 className="cursor-pointer text-xl text-gray-600 " onClick ={()=> handleDeleteSite(id)} />
                </button>
                </Link>
            </li>
        )
    }

    const TaskItems1 = ({ to, Icon, Title, id, NOFTask, selectedDiv, setselectedDiv }) => {
        return (
            <li className={`flex items-center justify-between cursor-pointer box-border p-[5px] rounded-md ${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`} onClick={() => setselectedDiv(id)}>
                <Link to={to} className="flex items-center justify-between w-full text-inherit">
                    <p className="flex items-center gap-3 text-gray-500 text-[20px] font-semibold ">{Icon}{Title} </p>
                </Link>
            </li>
        )
    }
    const AddNewListButton = ({ Icon, Title, id, NOFTask, onClick }) => {
        const handleClick = () => {
            setselectedDiv(id);
            if (onClick) {
                onClick();
            }
        }
        return (
            <button className={`flex items-center cursor-pointer box-border p-[5px] rounded-md gap-3 text-gray-500 text-[20px] font-semibold  ${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`} onClick={handleClick}>{Icon}{Title}</button>
        )
    }


    return (
        <>
            <div className="left w-[25vw] border-2 sticky h-[99vh] top-0 ">
                <div className="m-3 bg-[#f4f4f4] min-h-[97%] p-3 flex flex-col  justify-between rounded-[15px] ">
                    <div className="flex flex-col gap-5 ">
                        <div className="flex items-center justify-between mt-[10px] ml-1 mr-1">
                            <h1 className="text-2xl font-bold text-gray-600" >Menu</h1>
                            <span className="text-[25px] text-gray-500 cursor-pointer" ><RxHamburgerMenu /></span>
                        </div>
                        <div className="flex relative " >
                            <input type="text" placeholder='Search' className=" bg-gray-100 w-[100%] pl-10 h-[40px] outline-none rounded-md border-[2px] border-gray-200 text-lg font-semibold" />
                            <IoSearch className=" absolute left-2 top-1/4 text-gray-500 text-[20px]  " />
                        </div>
                        <div className=" mt-4" >
                            <h2 className="font-bold text-gray-600" >TASKS</h2>
                            <ul className="ml-2 mt-3  flex flex-col gap-3 " >
                                <TaskItems to="/" id={1} NOFTask={checkBox.length} Icon={<MdKeyboardDoubleArrowRight className="text-[25px]" />} Title="Upcoming" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} />
                                <TaskItems to={"/Today"} id={2} NOFTask={filteredTask.length} Icon={<FaListCheck />} Title="Today" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} />
                                <TaskItems1 to="/Calendar" id={3} NOFTask={null} Icon={<FaCalendarAlt />} Title="Calendar" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} />
                                <TaskItems1 to="/StickyWall" id={4} NOFTask={null} Icon={<FaNoteSticky />} Title="Sticky Wall" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} />
                            </ul>
                        </div>
                        <hr className=" border-t-[2px] border-gray-200" />
                        <div className="" >
                            <h3 className="font-bold text-gray-600" >LISTS</h3>
                            <div className="max-h-[200px] overflow-auto">
                                <ul className="ml-[15px] mt-3  flex flex-col gap-3 overflow-x-hidden " >
                                    <ListItems id={5} name="Personel" NOFTask={12} />

                                    {Lists.map((site) => (
                                        <ListItems to={`/web/${site.name}`} key={site.id} name={site.name} id={site.id} NOFTask={null} />
                                    ))}
                                    <AddNewListButton onClick={handleAddNewList} id={6} Title={"Add New List"} Icon={<MdAdd className="text-[25px] text-gray-500" />} />
                                </ul>
                            </div>
                        </div>
                        <hr className=" border-t-[2px] border-gray-200" />

                    </div>
                    <div className="footer ml-3 mb-3 flex flex-col gap-3">
                        <div>
                            <div className={`flex items-center gap-4 text-gray-500 font-semibold p-[5px] box-border rounded-md cursor-pointer  hover:bg-gray-200 ${selectedDiv === 7 ? 'bg-gray-200' : 'bg-gray-100'}  transition-all duration-300`} onClick={() => setselectedDiv(7)}><IoSettings />Settings</div>
                        </div>
                        <div>
                            <div className={`flex items-center gap-4 text-gray-500 font-semibold p-[5px] box-border rounded-md cursor-pointer  hover:bg-gray-200 ${selectedDiv === 8 ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300 `} onClick={() => setselectedDiv(8)}><FaSignOutAlt />Log out</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}
export default Left;