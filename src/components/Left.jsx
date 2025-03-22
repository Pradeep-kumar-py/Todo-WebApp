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
import { GiHidden } from "react-icons/gi";
import AddNewListModal from "./AddNewListModal";
import DarkModeToggle from "./DarkModeToggle";

const uniqueID = uuidv4();
// import './index.css'

const Left = () => {

    const { TaskBox, setTaskBox } = useContext(TodoContext)
    const { checkBox, setcheckBox } = useContext(TodoContext)
    const { Lists, setLists } = useContext(TodoContext)
    const { Hide, setHide } = useContext(TodoContext)
    console.log("Lists", Lists)
    const [selectedDiv, setselectedDiv] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Query, setQuery] = useState("")
    const [FilteredVideo, setFilteredVideo] = useState([])
    // Filter TaskBox for tasks with title "today"
    const todayTask = TaskBox.filter(task =>
        task.TaskBoxTitle.toLowerCase() === "today"
    );

    const searchVideo = () => {
        const SearchTask = Lists.filter(list =>
            list.name.toLowerCase().includes(Query.toLowerCase())
        )
        setFilteredVideo(SearchTask)
    }

    useEffect(() => {
        searchVideo();
    }, [Query,Lists]);

    // Lists.push(SearchTask)
    console.log("query", Query)
    // console.log("SearchTask", SearchTask)




    // Filter checkBox for tasks matching the IDs from todayTask
    const filteredTask = checkBox.filter(checks =>
        todayTask.some(task => task.id === checks.taskBoxId)
    );

    console.log("filtered task", filteredTask);

    // console.log("today filtered task", TodayFilteredTask.length)

    // const handleAddNewList = () => {
    //     const name = prompt('Enter the title of New List: ');
    //     const SiteUrl = prompt("Enter URL: ");

    //     if (name && SiteUrl) {
    //         try {
    //             const url = new URL(SiteUrl);
    //             let embedUrl = SiteUrl;

    //             // Example logic: Convert YouTube video URLs to embed format
    //             if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
    //                 const videoId = url.searchParams.get("v");
    //                 if (videoId) {
    //                     embedUrl = `https://www.youtube.com/embed/${videoId}`;
    //                 }
    //             } else if (url.hostname === "youtu.be") {
    //                 // Handle shortened YouTube URLs
    //                 embedUrl = `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    //             }

    //             const newList = { id: Date.now(), name, SiteUrl: embedUrl };
    //             setLists((prevLists) => [...prevLists, newList]);
    //             console.log("Added new list:", newList);
    //         } catch (error) {
    //             console.error("Invalid URL format:", error);
    //             alert("Please enter a valid URL.");
    //         }
    //     }
    // };

    const handleAddNewList = (name, SiteUrl) => {
        try {
            const url = new URL(SiteUrl);
            let embedUrl = SiteUrl;

            if (url.hostname === "www.youtube.com" || url.hostname === "youtube.com") {
                const videoId = url.searchParams.get("v");
                if (videoId) {
                    embedUrl = `https://www.youtube.com/embed/${videoId}`;
                }
            } else if (url.hostname === "youtu.be") {
                embedUrl = `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
            }

            const newList = { id: Date.now(), name, SiteUrl: embedUrl };
            setLists((prevLists) => [...prevLists, newList]);
            console.log("Added new list:", newList);
        } catch (error) {
            console.error("Invalid URL format:", error);
            alert("Please enter a valid URL.");
        }
    };

    const handleDeleteSite = (id) => {
        setLists((previousSite) => previousSite.filter(list => list.id != id))

    }



    const TaskItems = ({ to, Icon, Title, id, NOFTask, selectedDiv, setselectedDiv }) => {
        return (
            <li className={`flex items-center justify-between cursor-pointer box-border p-[5px] rounded-md dark:bg-gray-700 dark:hover:bg-gray-900 ${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`} onClick={() => setselectedDiv(id)}>
                <Link to={to} className="flex items-center justify-between w-full text-inherit">
                    <p className="flex items-center gap-3 text-gray-500 dark:text-white text-[20px] font-semibold ">{Icon}{Title} </p>
                    <span className={`h-5 w-7 rounded-[4px] bg-gray-200 text-[12px] flex items-center justify-center font-semibold dark:bg-gray-900 dark:text-white ${selectedDiv === id ? 'bg-white' : 'bg-gray-200'} `} >{NOFTask}</span>
                </Link>
            </li>
        )
    }
    const ListItems = ({ id, NOFTask, name, onAddNew, to }) => {
        return (
            <li className={` dark:bg-gray-700 dark:hover:bg-gray-900 rounded-md w-full ${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`} onClick={() => setselectedDiv(id)} >
                <Link to={to} className="flex w-full items-center gap-1 p-[5px] border-2 dark:border-gray-600 rounded-md cursor-pointer" >
                    <div className="flex items-center gap-2 w-full ">
                        <span className="h-4 w-4 bg-red-500 rounded-[4px] " ></span>
                        <span className="text-lg font-semibold text-gray-500 dark:text-white w-[160px] overflow-clip " >{name}</span>
                    </div>
                    <button className={` flex items-center justify-center`} >
                        <RxCross2 className="cursor-pointer text-xl text-gray-600 dark:text-white " onClick={() => handleDeleteSite(id)} />
                    </button>
                </Link>
            </li>
        )
    }

    const TaskItems1 = ({ to, Icon, Title, id, NOFTask, selectedDiv, setselectedDiv }) => {
        return (
            <li className={`flex items-center justify-between cursor-pointer box-border p-[5px] rounded-md dark:bg-gray-700 dark:hover:bg-gray-900 ${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300`} onClick={() => setselectedDiv(id)}>
                <Link to={to} className="flex items-center justify-between w-full text-inherit">
                    <p className="flex items-center gap-3 text-gray-500 dark:text-white text-[20px] font-semibold ">{Icon}{Title} </p>
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
            <button className={`flex items-center cursor-pointer box-border p-[5px] rounded-md gap-3 text-gray-500 text-[20px] font-semibold w-full m-2 dark:bg-gray-700 dark:text-white ${selectedDiv === id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 dark:hover:bg-gray-900 transition-all duration-300`} onClick={handleClick}>{Icon}{Title}</button>
        )
    }

    const SideBar = () => {
        return (
            <>
                <div className={`flex flex-col mt-3 max-lg:inline-block gap-5   text-gray-600 dark:text-gray-300 ${Hide ? "inline-block" : "hidden"} `} >
                    <RxHamburgerMenu onClick={() => setHide(!Hide)} className="text-3xl cursor-pointer mb-3 " />
                    <DarkModeToggle className="" />
                    <Link to="/" ><MdKeyboardDoubleArrowRight className="text-3xl mb-3 " /></Link>
                    <Link to="/Today" ><FaListCheck className="text-3xl mb-3 " /></Link>
                    <Link to="/Calendar" ><FaCalendarAlt className="text-3xl mb-3" /></Link>
                    <Link to="/StickyWall" ><FaNoteSticky className="text-3xl mb-3 " /></Link>
                </div>
            </>
        )
    }



    return (
        <>
            <div className="" >
                <SideBar />
                <div className={`left w-[20dvw] p-3 max-lg:hidden top-0 ${Hide ? "hidden" : "inline-block"} `}>
                    <div className=" bg-[#f4f4f4] dark:bg-gray-800 min-h-[97%] p-3 flex flex-col  justify-between rounded-[15px] w-full ">
                        <div className="flex flex-col gap-5 w-full ">
                            <div className="flex items-center justify-between mt-[10px] ml-1 mr-1">
                                <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-200" >Menu</h1>
                                <div className="flex items-center gap-2">
                                    <DarkModeToggle />
                                    <span className="text-[25px] text-gray-500 dark:text-gray-300 cursor-pointer" >
                                        <RxHamburgerMenu onClick={() => setHide(!Hide)} />
                                    </span>
                                </div>
                            </div>
                            <div className="flex relative " >
                                <input type="text" placeholder='Search' className=" dark:bg-gray-700 bg-gray-100 w-[100%] pl-10 h-[40px] outline-none rounded-md border-[2px] border-gray-200  text-lg font-semibold"
                                value={Query}
                                onChange={(e) => setQuery(e.target.value)}
                                />
                                <IoSearch className=" absolute left-2 top-1/4 text-gray-500 text-[20px]  " />
                            </div>
                            <div className=" mt-4" >
                                <h2 className="font-bold text-gray-600 dark:text-white " >TASKS</h2>
                                <ul className="ml-2 mt-3  flex flex-col gap-3 dark:text-white " >
                                    <TaskItems to="/" id={1} NOFTask={checkBox.length} Icon={<MdKeyboardDoubleArrowRight className="text-[25px]" />} Title="Upcoming" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} />
                                    <TaskItems to={"/Today"} id={2} NOFTask={filteredTask.length} Icon={<FaListCheck />} Title="Today" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} />
                                    <TaskItems1 to="/Calendar" id={3} NOFTask={null} Icon={<FaCalendarAlt />} Title="Calendar" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} />
                                    {/* <TaskItems1 to="/StickyWall" id={4} NOFTask={null} Icon={<FaNoteSticky />} Title="Sticky Wall" selectedDiv={selectedDiv} setselectedDiv={setselectedDiv} /> */}
                                </ul>
                            </div>
                            <hr className=" border-t-[2px] border-gray-200" />
                            <div className="w-full" >
                                <h3 className="font-bold text-gray-600 text-lg dark:text-white" >Videos</h3>
                                <div className="h-[40dvh] overflow-auto w-full" >
                                    <ul className="mt-3  flex flex-col gap-3 w-full overflow-auto " >
                                        {/* <ListItems id={5} name="Personel" NOFTask={12} /> */}

                                        {/* {Lists.map((site) => (
                                            <ListItems to={`/web/${site.name}`} key={site.id} name={site.name} id={site.id} />
                                        ))} */}
                                        {FilteredVideo.map((site) => (

                                            <ListItems to={`/web/${site.name}`} key={site.id} name={site.name} id={site.id} />
                                        ))}
                                    </ul>
                                </div>
                                <AddNewListButton onClick={() => setIsModalOpen(true)}
                                    id={6} Title={"Add New Video"} Icon={<MdAdd className="text-[25px] text-gray-500 dark:text-white" />} />
                            </div>
                            {/* <hr className=" border-t-[2px] border-gray-200" /> */}

                        </div>
                        {/* <div className="footer ml-3 mb-3 flex flex-col gap-3">
                            <div>
                                <div className={`flex items-center gap-4 text-gray-500 font-semibold p-[5px] box-border rounded-md cursor-pointer  hover:bg-gray-200 ${selectedDiv === 7 ? 'bg-gray-200' : 'bg-gray-100'}  transition-all duration-300`} onClick={() => setselectedDiv(7)}><IoSettings />Settings</div>
                            </div>
                            <div>
                                <div className={`flex items-center gap-4 text-gray-500 font-semibold p-[5px] box-border rounded-md cursor-pointer  hover:bg-gray-200 ${selectedDiv === 8 ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-200 transition-all duration-300 `} onClick={() => setselectedDiv(8)}><FaSignOutAlt />Log out</div>
                            </div>

                        </div> */}
                    </div>
                </div>
            </div>
            <AddNewListModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddNewList}
            />
        </>
    )

}
export default Left;