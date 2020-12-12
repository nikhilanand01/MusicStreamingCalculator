import React from 'react';

const TitleText = ({text, style }) => {
    return (
        <p className="titleText" style={style}>
            {text}
        </p>
    );
}

export default TitleText;
