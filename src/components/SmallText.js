/* eslint-env browser, commonjs, jquery, es6 */
import React from 'react';

// import '../stylesheets/';

const SmallText = ({text, style}) => {
    return (
        <p className="smallText" style={style}>
            {text}
        </p>
    );
}

 export default SmallText;
