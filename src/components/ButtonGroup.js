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


function TabGroup({types}) {
  const [active, setActive] = useState(types[0]);
  return (
      <div>
        {types.map(type => (
          <Tab ref={type.ref}
            key={type.id}
            active={active === type.selected}
            onClick={() => {setActive(type)}}
          >

            {type.name}
          </Tab>
        ))}
      </div>
  );
}

<<<<<<< HEAD

=======
>>>>>>> b3e19be7d378a4908674be120d151c465485c9e1
export default function App({types}) {
  return (
      <TabGroup
        types={types}
      />

  );
}
