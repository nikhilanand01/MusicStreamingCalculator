import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';

const ce = React.createElement;

class CalcPage extends React.Component {
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
      return ce('div', null,
        ce('h2', {className: "font"}, 'Welcome to the Revenue Calculator'),
            ce('input', {id: "estStreams", type: "text", placeholder: "Enter Est. Streams", onChange: e => this.changeStreams(e)}),
            ce('br'),
            ce('text', null, 'Role: '),
            /*ce('select', {onChange: e => this.handleRoleSelect(e)}, 
                this.state.roles.map(role => ce('option', {key: role.id}, role.name))
                ),*/
            ce('button', {onClick: e => this.handleRoleButton("artist")}, 'Artist Only'),
            ce('button', {onClick: e => this.handleRoleButton("writer")}, 'Writer Only'),
            ce('button', {onClick: e => this.handleRoleButton("both")}, 'Writer & Artist'),
            ce('br'),
            ce('text', null, 'Record Deal Type: '),
            ce('select', {onChange: e => this.handleRecDealSelect(e)}, 
                this.state.recordDeal.map(deal => ce('option', {key: deal.id}, deal.name))
                ),
            ce('br'),
            ce('text', null, 'Publishing Deal Type: '),
            ce('select', {onChange: e => this.handlePublishingDealSelect(e)},
                this.state.publishDeal.map(deal => ce('option', {key: deal.id}, deal.name))
                ),
            ce('br'),
            ce('text', null, 'Deal Split: '),
            ce('input', {type: 'range', min: '1', max: '100', id: 'splitSlider', onChange: e => this.updateSlider(e)}),
            ce('text', null, 'Guaranteed Income: '),
            ce('input', {id: "fromAdvance", placeholder: "From Advance"})

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


export default CalcPage;
