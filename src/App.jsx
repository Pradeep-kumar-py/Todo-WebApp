import './index.css'
import { useState, useEffect, useContext } from 'react'
import { TodoContext } from './TodoContext.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Left from './components/Left.jsx';
import Upcoming from './components/Upcoming';
import Today from './components/Today';
import Calendar from './components/Calendar';
import StickyWall from './components/StickyWall';
import WebViewer from './components/WebViewer.jsx';
import useViewportHeight from './components/viewPort.jsx';

export default function App() {
  const { Hide, setHide } = useContext(TodoContext)
  useViewportHeight();
  // Apply dark mode class on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode && JSON.parse(savedMode)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Router>
        <div className="your-container body  flex gap-1 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className='min-h-[100svh]'>
            <Left />
          </div>
          <div className={`right w-[79dvw] min-h-[100svh] max-md:w-[88dvw] max-lg:w-[94dvw] dark:text-gray-200 ${Hide ? "w-full" : "w-[79vw]"} `}>
            <Routes>
              <Route path="/" element={<Upcoming />} />
              <Route path="/today" element={<Today />} />
              <Route path="/Calendar" element={<Calendar />} />
              {/* <Route path="/StickyWall" element={<StickyWall />} /> */}
              <Route path="/web/:site" element={<WebViewer />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}
