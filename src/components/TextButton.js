/* eslint-env browser, commonjs, jquery, es6 */

import React from 'react';
import '../stylesheets/TextButton.css';
import SmallText from './SmallText';

// import '../stylesheets/';

const TextButton = ({buttonText, style, buttonStyle, onClick }) => {
  return (
    <button className="text-button" style={buttonStyle} onClick={() => onClick()} >
        <SmallText text={buttonText} style={style} />
    </button>
  );
}

 export default TextButton;
