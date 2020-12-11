import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider'

const sliderStyle = {
  position: 'relative',
  width: '100%',
  height: 80,
  // touchAction: 'none',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: '#d5eddc',
}

function GetMiddleValue(min, max) {
  min = domain[0];
  max = domain[1];
  return (min+max)/2
}

function MaxNumb(){
  return Math.floor(Math.random() * 1000000);
}


const domain = [0, MaxNumb()]
const defaultValues = [GetMiddleValue()]

export function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2b753f',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{fontSize: 11, marginTop: 35 }}>
        {value}
      </div>
    </div>
  )
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#49cc6c',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}


export class StreamSlider extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  render() {
    const {
      state: { values, update },
    } = this

    return (
      <div style={{ height: 120, width: '40%' }}>
        <Slider
          rootStyle={sliderStyle}
          domain={domain}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
          mode={1}
          step={1}
        >
        <Rail>
          {({ getRailProps }) => (<div style={railStyle} {...getRailProps()} />)}
        </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </div>
    )
  }
}

export default StreamSlider;
