import React from 'react';
import './App.css';
import CalcPage from './CalcPage.js';
import DesktopVersion from './DesktopVersion.js';
import MobileVersion from './MobileVersion.js';
import {BrowserView, MobileView, isBrowser, isMobile} from "react-device-detect";


function App() {
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
