import React, { useState } from "react";
import styled from "styled-components";


const Tab = styled.button`
  padding: 10px 30px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: ease border-bottom 250ms;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    font-weight: bold;
    opacity: 1;
  `}
`;


function TabGroup() {
  const [active, setActive] = useState(types[0]);
  return (
      <div>
        {types.map(type => (
          <Tab
            key={type}
            active={active === type}
            onClick={() => {setActive(type);}}
          >
            {type}
          </Tab>
        ))}
      </div>
  );
}

const types = ["Recording Artist Only", "Writer Only", "Both"]


export default function App() {
  return (
      <TabGroup
        types={types}
        />
  );
}
