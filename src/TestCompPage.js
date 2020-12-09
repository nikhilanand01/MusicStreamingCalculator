import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';
import DspButton from './components/DspButton.js';
import SwitchButton from './components/SwitchButton.js';
import NumberInput from './components/NumberInput.js';
import TabGroup from './components/ButtonGroup.js';
import SingleDropDown from './components/SingleDropDown.js';
import MultiDropDown from './components/MultiDropDown.js';
import TestChart from './components/Chart.js';

const ce = React.createElement;

const labelDealOptions = [
  { value: 'royalty', label: 'Royalty' },
  { value: 'netProfit', label: 'Net Profit' },
  { value: 'distributionPercent', label: 'Distribution (%)' },
  { value: 'distributionFee', label: 'Distribution (fee)' },
  { value: 'labelServices', label: 'Label Services' }
]

const pubDealOptions = [
  { value: 'FullTraditional', label: 'Full/Traditional' },
  { value: 'co-publising', label: 'Co-publising' },
  { value: 'admin', label: 'Admin' },
  { value: 'noDeal', label: 'No Deal' }
]

const marketingSplitOptions = [
  { value: 0.0, label: '0%' },
  { value: 0.5, label: '50%' },
  { value: 1.0, label: '100%' }
]

const labelServicesOptions = [
  { value: 'steamDistribution', label: 'Steam Distribution' },
  { value: 'avertising', label: 'Avertising' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'royaltyAccounting', label: 'Royalty Accounting' },
  { value: 'splitPayments', label: 'Split Payments' },
]

const roleTypes = ["Recording Artist Only", "Writer Only", "Both"];

class TestCompPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamNumber: null,
            role: null,
            recordDeal: [],
            publishDeal: [],
            sliderValue: null,
            recordDealSelected: null,
            publishingDealSelected: null,
            advance: null
        };

    }

    componentDidMount() {
        console.log("mounted");
        this.buildRecordDealSelect();
        this.handleRoleButton("Writer & Artist");
        this.buildPublishingDealSelect();
        this.setSliderValue(50);
        this.setInitialStates();
    }

    render() {
      return (
        <div style={{marginTop: '5%'}}>
          <SmallText text="About You" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
          <div style={{justifyContent:'center'}}>
            <div style={{display: 'flex', justifyContent:'center'}}>
              <SmallText text="Your Role" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
            </div>
            <TabGroup/>
          </div>
          <div style={{width: '25%', justifyContent: 'center'}}>
            <SmallText text="Record Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
            <SingleDropDown options={labelDealOptions}/>
            <SmallText text="Publishing Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
            <SingleDropDown options={pubDealOptions}/>
            <SmallText text="Label Services" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
            <MultiDropDown options={labelServicesOptions} defaultValue={labelServicesOptions[0]}/>
          </div>
          <div>
            <SmallText text="DSPs" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747',marginBottom:'0' }}/>
            <SmallText text="(Select Which DSPs to include in Calculation)" style={{ fontSize: '12px', fontWeight: 'light', lineHeight: '1.09', textAlign: 'center', color: 'grey' }}/>
            <div style={{display: 'flex', justifyContent:'center', margin: '2%'}}>
              <DspButton text="Spotify"/> <DspButton text="Apple Music"/><DspButton text="Tidal"/>
            </div>
            <div style={{display: 'flex', justifyContent:'center', margin: '1%'}}>
              <DspButton text="Youtube (Content ID)"/> <DspButton text="Amazon Unlimited"/><DspButton text="Google Play"/>
            </div>
            <div style={{display: 'flex', justifyContent:'center', margin: '1%'}}>
              <DspButton text="Pandora"/> <DspButton text="Amazon Music"/><DspButton text="Rhapsody"/>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <SmallText text="Estimated Streams" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
            <NumberInput id={0} label="Estimated Streams" locked={false} active={false} />
          </div>
          <div>
            <SmallText text="Costs" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747' }} />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <NumberInput id={1} label="Recording Costs" locked={false} active={false} />
              <SwitchButton/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <NumberInput id={2} label="Marketing Costs" locked={false} active={false} />
              <div style={{width: '8%', marginLeft: '1%'}}>
                <SingleDropDown options={marketingSplitOptions}/>
              </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <NumberInput id={3} label="Distrubtion Costs" locked={false} active={false} />
              <SwitchButton/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <NumberInput id={4} label="Misc. Costs" locked={false} active={false} />
              <SwitchButton/>
            </div>
            <SmallText text="Guaranteed Income" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747' }} />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <NumberInput id={5} label="From Advance" locked={false} active={false} />
              <SwitchButton/>
            </div>
          </div>
          <div>
            <TestChart/>
          </div>
        </div>
        )


    }

    setInitialStates() {
        this.setState({streamNumber: 1000000000,role: "Writer & Artist", recordDealDelected: "Royalty", publishingDealSelected: "Full/Traditional", advance: 0})
    }

    changeStreams(e) {
        console.log("changed streams to: " + e.target.value);
        this.setState({streamNumber: e.target.value});
    }

    setSliderValue(val) {
        this.setState( {sliderValue: val})
    }
    updateSlider(e) {
        console.log(e.target.value)
        //val = document.getElementById("splitSlider").value()
        this.setState( {sliderValue: e.target.value})
    }

    buildPublishingDealSelect() {
        let fullTrad = {
            id: 0,
            name: "Full/Traditional"
        }
        let coPublishing = {
            id: 1,
            name: "Co-Publishing"
        }
        let adminDeal = {
            id: 2,
            name: "Admin Deal"
        }
        let noDeal = {
            id: 3,
            name: "No Deal"
        }
        let deals = [fullTrad, coPublishing, adminDeal, noDeal]
        this.setState( {publishDeal: deals})
    }

    handlePublishingDealSelect(e) {
        console.log(e.target.value);
        this.setState({publishingDealSelected: e.target.value})
    }


    handleRoleButton(which) {
        console.log(which);
        this.setState({role: which})
    }

   // handleRecDealSelect(e)

    handleRecDealSelect(e) {
        //console.log("selecting Roles");
        //console.log(e.target.value);
        this.setState({recordDealSelected: e.target.value})
    }

    buildRecordDealSelect() {
        //console.log("Roles!");
        let royalty = {
            id: 0,
            name: "Royalty"
        };
        let netProfit = {
            id: 1,
            name: "Net Profit"
        };
        let distributionPercent = {
            id: 2,
            name: "Distribution Percent"
        };
        let labelServices = {
            id: 3,
            name: "Label Services"
        }

        let rls = [royalty, netProfit, distributionPercent, labelServices];
        this.setState( {recordDeal: rls} );
    }
}


export default TestCompPage;
