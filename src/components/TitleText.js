import React from 'react';

const TitleText = ({text, style, className }) => {
    return (
        <p className={className} style={style}>
            {text}
        </p>
    );
}

export default TitleText;
