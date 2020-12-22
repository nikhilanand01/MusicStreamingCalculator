import React from "react";
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

class TabGroupTwo extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      val1: true,
      val2: false,
      val3: false
    }
  }

  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }


  handleMyClick(id) {
    if(id === "artist" && this.props.types[0].selected !== true) {
      this.setState({val1: true, val2: false, val3: false});
      this.props.types[0].selected = true;
      this.props.types[1].selected = false;
      this.props.types[2].selected = false;
    } else if (id === "writer" && this.props.types[1].selected !== true) {
      this.setState({val2: true, val1: false, val3: false});
      this.props.types[0].selected = false;
      this.props.types[1].selected = true;
      this.props.types[2].selected = false;
    } else if (id==="both" && this.props.types[2].selected !== true) {
      this.setState({val3: true, val1: false, val2: false});
      this.props.types[0].selected = false;
      this.props.types[1].selected = false;
      this.props.types[2].selected = true;
    }
  }

  render() {
    return (
        <div>
          {this.props.types.map(type => (
            <Tab ref={type.ref}
              key={type.id}
              active={type.selected}
              onClick={() => {this.handleMyClick(type.id);}}
              onChange={e => this.handleMyClick(e)}
            >
              {type.name}
            </Tab>
          ))}

        </div>
    );
  }


}


export default function Child({types}) {
  return (
      <TabGroupTwo
        types={types}
      />
  );
}
