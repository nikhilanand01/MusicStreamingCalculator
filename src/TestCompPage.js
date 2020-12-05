import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';
import TextButton from './components/TextButton.js';
import DspButton from './components/DspButton.js';
import SwitchButton from './components/SwitchButton.js';
import Input from './components/NumberInput.js';

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
        <div style={{marginTop: '5%'}}>
          <div style={{display: 'flex', justifyContent:'center'}}>
            <TextButton buttonText="Recording Artist Only" style={{ textAlign: 'center' }} buttonStyle={{ marginRight: '15px'}} onClick= {e => this.handleRoleButton("artist")} />
            <TextButton buttonText="Writer Only" style={{ textAlign: 'center' }} buttonStyle={{ marginRight: '15px'}} onClick= {e => this.handleRoleButton("writer")} />
            <TextButton buttonText="Recording Artist & Writer" style={{ textAlign: 'center' }} buttonStyle={{ marginRight: '15px'}} onClick= {e => this.handleRoleButton("both")} />
          </div>
          <div style={{display: 'flex', justifyContent:'center', margin: '2%'}}>
            <DspButton/>
          </div>
          <div>
            <SmallText text="Costs" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747' }} />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Input id={1} label="Recording Costs" locked={false} active={false} />
              <SwitchButton/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Input id={2} label="Marketing Costs" locked={false} active={false} />
              <SwitchButton/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Input id={3} label="Distrubtion Costs" locked={false} active={false} />
              <SwitchButton/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Input id={4} label="Misc. Costs" locked={false} active={false} />
              <SwitchButton/>
            </div>
            <SmallText text="Guaranteed Income" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747' }} />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Input id={5} label="From Advance" locked={false} active={false} />
              <SwitchButton/>
            </div>
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
