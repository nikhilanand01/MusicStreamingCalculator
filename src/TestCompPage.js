import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';
import TextButton from './components/TextButton.js';
import DspButton from './components/DspButton.js';
import SwitchButton from './components/SwitchButton.js';

const ce = React.createElement;

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
        <div>
        <TextButton buttonText="TEXT Button" style={{ textAlign: 'center' }} buttonStyle={{ marginRight: '15px', background: 'red' }} onClick={() => console.log("TEXT")} />
        <DspButton buttonText="DSP Button" style={{ textAlign: 'center' }} buttonStyle={{ marginRight: '15px', background: 'yellow' }} onClick={() => console.log("DSP")} />
        <SwitchButton onChange={this.handleChange} checked={this.state.checked} className="Recoup-Switch"/>
        <SmallText text="Sample Small Text" style={{ fontSize: '18px', fontWeight: 600, lineHeight: '1.09', textAlign: 'center', color: '#323747' }} />
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
