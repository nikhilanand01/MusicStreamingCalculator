import React from 'react';
import './App.css';
import DesktopVersion from './DesktopVersion.js';
import MobileVersion from './MobileVersion.js';
import {BrowserView, MobileView} from "react-device-detect";
import ReactGA from 'react-ga';

function initializeAnalytics(){
  ReactGA.initialize("UA-140003762-3")
  ReactGA.pageview('/')
}


function App() {
  initializeAnalytics()
  return (
    <div className="App">
      <BrowserView>
        <DesktopVersion/>
      </BrowserView>
      <MobileView>
        <MobileVersion/>
      </MobileView>
    </div>
  );
}


export default App;
