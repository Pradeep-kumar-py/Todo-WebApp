import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Left from './components/Left.jsx';
import Upcoming from './components/Upcoming';
import Today from './components/Today';
import Calendar from './components/Calendar';
import './index.css'
import StickyWall from './components/StickyWall';
import WebViewer from './components/WebViewer.jsx';


export default function App() {
  return (
    <>
      <Router>
        <div className="body border-2  min-h-[99vh] flex gap-1  ">
          
            <Left />
          
          <div className="right w-[75vw] border-2 h-[99vh]">
            <Routes>
              <Route path="/" element={<Upcoming />} />
              <Route path="/today" element={<Today />} />
              <Route path="/Calendar" element={<Calendar />} />
              <Route path="/StickyWall" element={<StickyWall />} />
              <Route path="/web/:site" element={<WebViewer />} />
              
            </Routes>
          </div>
        </div>
      </Router>

    </>
  )
}
