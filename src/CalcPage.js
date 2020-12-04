import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';

const ce = React.createElement;


//average / approx payout for publishing for stream
const avgPubPayout = 0.0007174565191


//handling dsps
let spotify = {
  id: 0,
  name: "Spotify",
  payoutPerStream: 0.00331,
  marketShareStreams: .2922,
    marketShareDollars: .4893,
    includeInCalculations: true
}
let apple = {
  id: 1,
  name: "Apple Music",
  payoutPerStream: 0.00495,
  marketShareStreams: .0995,
    marketShareDollars: .2497,
    includeInCalculations: true
}
let youtube = {
  id: 2,
  name: "Youtube Content ld",
  payoutPerStream: 0.00028,
  marketShareStreams: .4858,
    marketShareDollars: .0699,
    includeInCalculations: true
}
let amazon = {
  id: 3,
  name: "Amazon Unlimited",
  payoutPerStream: 0.01175,
  marketShareStreams: .0068,
    marketShareDollars: .0404,
    includeInCalculations: true
}
let google = {
  id: 4,
  name: "Google Play",
  payoutPerStream: 0.00543,
  marketShareStreams: .0112,
    marketShareDollars: .0308,
    includeInCalculations: true
}
let pandora = {
  id: 5,
  name: "Pandora",
  payoutPerStream: 0.00155,
  marketShareStreams: .0386,
    marketShareDollars: .0303,
    includeInCalculations: true
}
let deezer = {
  id: 6,
  name: "Deezer",
  payoutPerStream: 0.00567,
  marketShareStreams: .0091,
    marketShareDollars: .026,
    includeInCalculations: true
}
let amazonDig = {
  id: 7,
  name: "Amazon Digital Services",
  payoutPerStream: 0.00395,
  marketShareStreams: .0095,
    marketShareDollars: .019,
    includeInCalculations: true
}
let tidal = {
  id: 8,
  name: "TIDAL",
  payoutPerStream: 0.00927,
  marketShareStreams: 0.0021,
    marketShareDollars: 0.0098,
    includeInCalculations: true
}
let others = {
  id: 9,
  name: "Napster / Rhapsody",
  payoutPerStream: 0.0111,
  marketShareStreams: 0.0014,
    marketShareDollars: 0.0080,
    includeInCalculations: true
}

let dsps = [spotify, apple, youtube, amazon, google, pandora, deezer, amazonDig, tidal, others]

function toggleMe(index) {
  dsps[index].includeInCalculations = !dsps[index].includeInCalculations;
  //console.log(dsps[index].name);
  //console.log(dsps[index].includeInCalculations);
}







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
            advance: null,
            costs: null,
            prov: []
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
            ce('input', {id: "fromAdvance", placeholder: "From Advance", onChange: e => this.updateAdvance(e)}),
            ce('br'),
            ce('text', null, 'Costs: '),
            ce('input', {placeholder: 'Costs', onChange: e => this.updateCosts(e)}),
            ce('br'),
            ce('text', null, 'Recoupable: '),
            ce('input', {type: 'checkbox', checked: 'true'}),
            ce('br'),
            ce('text', null, 'DSPs'),
            ce('br'),
            ce('table', {id: 'dspTable'}, 
              ce('thead', null, ce('tr', null, ce('th', null, "Platform"), ce('th', null, "Include")))//,
              //<!--ce('tbody', null, this.state.prov.map(provs => ce('tr', null, provs.name), ce('tr', null, ce('input', {type: 'checkbox', checked: provs.includeInCalculations, onClick: e => toggleMe()}))))-->
            )
            
        )

    }

    setInitialStates() {
      //console.log(dsps)
        this.setState({streamNumber: 1000000000,role: "Writer & Artist", recordDealDelected: "Royalty", publishingDealSelected: "Full/Traditional", advance: 0, costs: 0, prov: dsps});
        //console.log(this.state.prov)
    }

    changeStreams(e) {
        console.log("changed streams to: " + e.target.value);
        this.setState({streamNumber: e.target.value});
    }

    updateAdvance(e) {
      console.log("changed advance to: " + e.target.value);
      this.setState({advance: e.target.value});
    }

    updateCosts(e) {
        console.log("changed costs to: " + e.target.value);
        this.setState({costs: e.target.value});
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
        console.log(e.target.value);
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
