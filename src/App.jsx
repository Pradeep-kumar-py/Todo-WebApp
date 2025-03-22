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



export default function App() {
  const {Hide, setHide} = useContext(TodoContext)
  console.log(Hide)
  
  return (
    <>
      <Router>
        <div className="body min-h-[99vh] flex gap-1  "> 
            <Left />
          <div className={`right w-[79vw]  h-[99dvh] max-md:w-[88dvw] max-lg:w-[94dvw]   ${Hide? "w-full": "w-[79vw]" } `}>
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
