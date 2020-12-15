import React, { useState } from "react";
import styled from "styled-components";


const Tab = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  font-size: 15px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 3px solid black;
    font-weight: bold;
    opacity: 1;
  `}
`;

function TabGroupTwo({types}) {
  const [active, setActive] = useState(types[0]);
  return (
      <div>
        {types.map(type => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => {setActive(type)}}
          >

            {type}
          </Tab>
        ))}
      </div>
  );
}


export default function Child({types}) {
  return (
      <TabGroupTwo
        types={types}
      />
  );
}
