import React, { Component } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import SmallText from './SmallText.js';

const sliderStyle = {
  position: 'relative',
  width: '100%',
  // height: 80,
  // touchAction: 'none',
}

const railStyle = {
  position: 'absolute',
  width: '100%',
  height: 10,
  marginTop: 35,
  borderRadius: 5,
  backgroundColor: '#CBDCFC',
  zIndex: 0
}

const domain = [0, 100]
const defaultValues = [25]

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
        backgroundColor: '#1971ff',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{fontSize: 14, marginTop: 35, fontWeight: '500'}}>
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
        backgroundColor: '#3665d6',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}


export class DealSplitSlider extends Component {
  state = {
    values: defaultValues.slice(),
    update: defaultValues.slice(),
  }

  componentDidUpdate() {
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
  }

  render() {
    const {
      state: { values, update},
    } = this

    return (
      <div>
        <div style={{ height: 70, width: '100%' }}>
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
            </div>)}
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
                />))}
              </div>)}
          </Tracks>
          </Slider>
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '0 2% 0'}}>
          <SmallText text={`Artist:  ${parseInt(values)}`} style={{textAlign: 'left', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09'}}/>
          <SmallText text={`${100-parseInt(values)} :Label`} style={{textAlign: 'left', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09',}}/>
        </div>
      </div>
    )
  }
}

export default DealSplitSlider;
