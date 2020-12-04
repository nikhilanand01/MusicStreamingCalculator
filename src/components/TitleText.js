import React from 'react';

// import '../stylesheets/<NAME>'

const TitleText = ({text, style }) => {
    return (
        <p className="titleText" style={style}>
            {text}
        </p>
    );
}

export default TitleText;
