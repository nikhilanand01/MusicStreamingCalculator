/* eslint-env browser, commonjs, jquery, es6 */
import React from 'react';

const SmallText = ({text, style, className}) => {
    return (
        <p className={className} style={style}>
            {text}
        </p>
    );
}

 export default SmallText;
