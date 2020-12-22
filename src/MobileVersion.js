import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';
import TitleText from './components/TitleText.js';

class MobileVersion extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <TitleText text="The MOBILE Streaming Calculator" style={{color: '#111', fontSize: '28px', fontWeight: '700', justifyContent: 'center', textTransform: 'uppercase'}}/>
        <SmallText text="COMING SOON..."/>
      </div>
    )
  }
}

export default MobileVersion;
