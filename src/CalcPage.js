import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';
import TextButton from './components/TextButton.js';
import TabGroup from './components/ButtonGroup.js';
import SingleDropDown from './components/SingleDropDown.js';

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
        };
        let apple = {
          id: 1,
          name: "Apple Music",
          payoutPerStream: 0.00495,
          marketShareStreams: .0995,
            marketShareDollars: .2497,
            includeInCalculations: true
        };
        let youtube = {
          id: 2,
          name: "Youtube Content ld",
          payoutPerStream: 0.00028,
          marketShareStreams: .4858,
            marketShareDollars: .0699,
            includeInCalculations: true
        };
        let amazon = {
          id: 3,
          name: "Amazon Unlimited",
          payoutPerStream: 0.01175,
          marketShareStreams: .0068,
            marketShareDollars: .0404,
            includeInCalculations: true
        };
        let google = {
          id: 4,
          name: "Google Play",
          payoutPerStream: 0.00543,
          marketShareStreams: .0112,
            marketShareDollars: .0308,
            includeInCalculations: true
        };
        let pandora = {
          id: 5,
          name: "Pandora",
          payoutPerStream: 0.00155,
          marketShareStreams: .0386,
            marketShareDollars: .0303,
            includeInCalculations: true
        };
        let deezer = {
          id: 6,
          name: "Deezer",
          payoutPerStream: 0.00567,
          marketShareStreams: .0091,
            marketShareDollars: .026,
            includeInCalculations: true
        };
        let amazonDig = {
          id: 7,
          name: "Amazon Digital Services",
          payoutPerStream: 0.00395,
          marketShareStreams: .0095,
            marketShareDollars: .019,
            includeInCalculations: true
        };
        let tidal = {
          id: 8,
          name: "TIDAL",
          payoutPerStream: 0.00927,
          marketShareStreams: 0.0021,
            marketShareDollars: 0.0098,
            includeInCalculations: true
        };
        let others = {
          id: 9,
          name: "Napster / Rhapsody",
          payoutPerStream: 0.0111,
          marketShareStreams: 0.0014,
            marketShareDollars: 0.0080,
            includeInCalculations: true
        };

//console.log(act)

class CalcPage extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            providers: [spotify, apple, youtube, amazon, google, pandora, deezer, amazonDig, tidal, others],
            streamNumber: null,
            role: null,
            recordDeal: [],
            publishDeal: [],
            sliderValue: 50,
            recordDealSelected: null,
            publishingDealSelected: null,
            advance: 0,
            costs: 0,
            grossRev: 0,
            totRecoupe: 0,
            publisherShare: 0,
            writerEarnings: 0,
            totalEarnings: 0
        };

    }

    callbackFunction = (childData) => {
      console.log("setting state: " + childData);
      this.setState({recordDealSelected: childData})
    }


    componentDidMount() {
        console.log("mounted");
        this.buildRecordDealSelect();
        this.handleRoleButton("Writer & Artist");
        this.buildPublishingDealSelect();
        this.setSliderValue(50);
        this.testMap();
        //this.buildDspsArr();
        this.setInitialStates();
    }


    render() {
      return (
           <div>
              <h2>Welcome to the revenue calculator</h2>
              <input 
                type = "text"
                placeholder = "Enter Est Streams"
                onChange = {e => this.changeStreams(e)}
              />
              <br />
              <SmallText text="Role: "/>
              <TabGroup
                 //parentCallBack = {this.callbackFunction}
                 //onChange = {e => this.handleRoleButton("test"/*active*/)}
              />
              <p> {this.state.role} </p>
              <br />
              <SmallText text="Record Deal Type: "/>
              <SingleDropDown
                  parentCallBack={this.callbackFunction}
                  options={labelDealOptions}
                  
              />
           </div>
        );
      /*<!--
      return ce('div', {ref: 'this.myRef'},
        ce('h2', {className: "font"}, 'Welcome to the Revenue Calculator'),
            ce('input', {id: "estStreams", type: "text", placeholder: "Enter Est. Streams", onChange: e => this.changeStreams(e)}),
            ce('br'),
            ce('text', null, 'Role: '),
            /*ce('select', {onChange: e => this.handleRoleSelect(e)},
                this.state.roles.map(role => ce('option', {key: role.id}, role.name))
                ),*//*
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
            ce('input', {type: 'range', ref: 'sliderRef', min: '1', max: '100', id: 'splitSlider', onChange: e => this.updateSlider(e)}),
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
              ce('thead', null, ce('tr', null, ce('th', null, "Platform"), ce('th', null, "Include"))),
              ce('tbody', null, this.state.providers.map(provider => ce('tr', null, ce('td', null, ce('input', {placeholder: provider.name})), ce('td', null, ce('input', {type: 'checkbox', checked: provider.includeInCalculations, onChange: e => this.toggleMe(provider.id)})))))
            ),
            ce('br'),
            //ce('button', {onClick: e => this.calculate()}, 'Calculate'),
            //ce('br'),
            ce('text', null, 'Total Revenue: '),
            ce('br'),
            ce('text', null, 'Gross Revenue: '),
            ce('input', {value: this.state.grossRev}),
            ce('br'),
            ce('text', null, 'Total Money Needed to Recoupe: '),
            ce('input', {value: 0}),
            ce('br'),
            ce('text', null, 'Unrecouped: '),
            ce('br'),
            ce('text', null, 'Label Earnings: '),
            ce('input', {value: this.state.publisherShare}),
            ce('text', null, 'Writer Earnings: '),
            ce('input', {value: this.state.writerEarnings}),
            ce('br'),
            ce('text', null, 'TOTAL EARNINGS: '),
            ce('input', {value: this.state.totalEarnings}),
            ce('br')
            
        )-->*/

    }


    testMap() {
      this.state.providers.map(provider => console.log(provider.name));
      //this.state.providers.map(provider => ce('tr', null, ce('td', null, ce('text', null, provider.name))), ce('tr', null, ce('td', null, ce('input', {type: 'checkbox', checked: provider.includeInCalculations, onClick: e => this.toggleMe(provider.id)}))))
    }

    setInitialStates() {

      this.setState({streamNumber: 1000000000,role: "Writer & Artist", recordDealSelected: "Royalty", publishingDealSelected: "Full/Traditional", advance: 0, costs: 0, grossRev: 0, publisherShare: 0, writerEarnings: 0, totalEarnings: 0});

      console.log(this.state.providers)
      this.calculate();
    }

    changeStreams(e) {
        console.log("changed streams to: " + e.target.value);
        this.setState({streamNumber: e.target.value});
        this.calculate();
    }

    updateAdvance(e) {
      console.log("changed advance to: " + e.target.value);
      this.setState({advance: e.target.value});
      this.calculate();
    }

    updateCosts(e) {
        console.log("changed costs to: " + e.target.value);
        this.setState({costs: e.target.value});
        this.calculate();
    }

    setSliderValue(val) {
        this.setState( {sliderValue: val});
        this.calculate();
    }

    

    updateSlider(e) {
        console.log(e.target.value)
        //val = document.getElementById("splitSlider").value()
        this.setState( {sliderValue: e.target.value})
        this.calculate();
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
        this.setState({publishingDealSelected: e.target.value});
        this.calculate();
    }


    handleRoleButton(which) {
        console.log(which);
        this.setState({role: which})
        this.calculate();
    }

   // handleRecDealSelect(e)

    handleRecDealSelect(e) {
        console.log("selecting Roles");
        console.log(e);
        if(e === "Royalty") {
          this.setState({sliderValue: 20});
        } else if (e === "Net Profit") {
          this.setState({sliderValue: 50});
        } else if (e === "Distribution Percent") {
          this.setState({sliderValue: 70});
        } else if (e === "Label Services") {
          this.setState({sliderValue: 80});
        }
        //document.getElementById("splitSlider").value = this.state.sliderValue;
        //console.log(this.myRef.current);
        //React.findDOMNode(this.refs.sliderRef).value = this.state.sliderValue;
        console.log("sliderValue: " + this.state.sliderValue);
        this.setState({recordDealSelected: e})
        this.calculate();
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

    ///////// DSP Stuff ///////

    buildDspsArr() {

        //handling dsps
        let spotify = {
          id: 0,
          name: "Spotify",
          payoutPerStream: 0.00331,
          marketShareStreams: .2922,
            marketShareDollars: .4893,
            includeInCalculations: true
        };
        let apple = {
          id: 1,
          name: "Apple Music",
          payoutPerStream: 0.00495,
          marketShareStreams: .0995,
            marketShareDollars: .2497,
            includeInCalculations: true
        };
        let youtube = {
          id: 2,
          name: "Youtube Content ld",
          payoutPerStream: 0.00028,
          marketShareStreams: .4858,
            marketShareDollars: .0699,
            includeInCalculations: true
        };
        let amazon = {
          id: 3,
          name: "Amazon Unlimited",
          payoutPerStream: 0.01175,
          marketShareStreams: .0068,
            marketShareDollars: .0404,
            includeInCalculations: true
        };
        let google = {
          id: 4,
          name: "Google Play",
          payoutPerStream: 0.00543,
          marketShareStreams: .0112,
            marketShareDollars: .0308,
            includeInCalculations: true
        };
        let pandora = {
          id: 5,
          name: "Pandora",
          payoutPerStream: 0.00155,
          marketShareStreams: .0386,
            marketShareDollars: .0303,
            includeInCalculations: true
        };
        let deezer = {
          id: 6,
          name: "Deezer",
          payoutPerStream: 0.00567,
          marketShareStreams: .0091,
            marketShareDollars: .026,
            includeInCalculations: true
        };
        let amazonDig = {
          id: 7,
          name: "Amazon Digital Services",
          payoutPerStream: 0.00395,
          marketShareStreams: .0095,
            marketShareDollars: .019,
            includeInCalculations: true
        };
        let tidal = {
          id: 8,
          name: "TIDAL",
          payoutPerStream: 0.00927,
          marketShareStreams: 0.0021,
            marketShareDollars: 0.0098,
            includeInCalculations: true
        };
        let others = {
          id: 9,
          name: "Napster / Rhapsody",
          payoutPerStream: 0.0111,
          marketShareStreams: 0.0014,
            marketShareDollars: 0.0080,
            includeInCalculations: true
        };
        let dsps = [spotify, apple, youtube, amazon, google, pandora, deezer, amazonDig, tidal, others];
        console.log(dsps)

        this.setState( {providers: dsps} );

    }

    toggleMe(index) {
      this.state.providers[index].includeInCalculations = !this.state.providers[index].includeInCalculations;
      //console.log(dsps[index].name);
      //console.log(dsps[index].includeInCalculations);
      this.calculate();
    }

    /// MATH STUFF /////
    calculate() {
        this.getPublisherShare();

        console.log("calculating");
        let artistShare;
        let labelShare;
        // Why are there double semi-colons?
                   //prob a typo
        let totalMoneyToRecoupe = parseFloat(this.state.advance) + parseFloat(this.state.costs);
        console.log(totalMoneyToRecoupe)
        let grossRevenue= this.state.streamNumber * this.weightedAverageOfSelected();
        console.log("grossRevenue: " + grossRevenue)
        //checkDSPs();
        //console.log(estStreams.value * avgPayout);
        //console.log(estStreams.value * weightedAverageOfSelected());
        if (this.state.recordDealSelected === "Royalty") {
            // Artist Split
            if((grossRevenue * (parseFloat(this.state.sliderValue)/100)) <= totalMoneyToRecoupe){
              console.log("unrecouped");
              artistShare = 0;
            } else {
              artistShare = (grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe;
            }
            labelShare = grossRevenue * (1-(parseFloat(this.state.sliderValue)/100));

        } else if (this.state.recordDealSelected === "Net Profit" || this.state.recordDealSelected === "Distribution Percent" || this.state.recordDealSelected === "Distribution Fee") {
            //net profit deals are generally guaranteed 50/50, distribution are generally 70/30 artist/label
            let profit = (grossRevenue - this.state.costs);
            // Artist Split
            if(((profit * (parseFloat(this.state.sliderValue)/100)) - parseFloat(this.state.advance)) < 0){
              console.log("unrecouped");
              artistShare = 0;
            } else {
              artistShare = (profit * (parseFloat(this.state.sliderValue)/100)) - parseFloat(this.state.advance);
            }
            // Label Split Net Profit, Distributions
            if(this.state.recordDealSelected === "Net Profit" || this.state.recordDealSelected === "Distribution Percent") {
                if(profit < 0){
                    labelShare = 0;
                } else {
                    labelShare = (profit * (1-(parseFloat(this.state.sliderValue)/100)));
                }
            } else labelShare = grossRevenue - artistShare;

            /* Nik Label Share for Net Profit, %Distribution Deals
            if(profit < 0){
              labelShare = 0;
            } else {
              labelShare = (profit * (1-(parseFloat(artistDeal.value)/100)));
            }
            */

        } else if (this.state.recordDealSelected === "Label Services") {
            // Artist Split
            if((grossRevenue * (parseFloat(this.state.sliderValue)/100)) <= totalMoneyToRecoupe){
              console.log("unrecouped");
              artistShare = 0;
            } else {
              artistShare = (grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe;
            }
            labelShare = grossRevenue * (1-(parseFloat(this.state.sliderValue)/100)) + this.state.costs;//extra menu items would be factored into costs
        }

        console.log("grossRevenue: " + grossRevenue)
        console.log("totRecoupe: " + totalMoneyToRecoupe)
        console.log("writerEarnings: " + artistShare)
        console.log("publisherShare: " + labelShare)

        this.setState({grossRev: grossRevenue, totRecoupe: totalMoneyToRecoupe, writerEarnings: artistShare, publisherShare: labelShare});

        this.getTotalEarnings(artistShare);

    }
    getPublisherShare() {
        //console.log("avgPubPayout: " + avgPubPayout)

        let pubGrossRevenue = avgPubPayout * this.state.streamNumber;
        let pubPerformanceRevenue = pubGrossRevenue * .5;
        let pubMechanicalRevenue = pubGrossRevenue * .5;
        let pubPROAdminFee = pubPerformanceRevenue * .165;
        let pubMechanicalAdminFee = pubMechanicalRevenue * .15;
        let pubMechanicalRecordFee = (pubMechanicalRevenue - pubMechanicalAdminFee) * .3;

        let publisherPercentage;

        if(this.state.publishingDealSelected === "Full/Traditional") {
            publisherPercentage = 1.0;
            this.setState({publisherShare: ((pubPerformanceRevenue - pubPROAdminFee) * .5) * publisherPercentage});
            this.setState({writerEarnings: ((pubPerformanceRevenue - pubPROAdminFee) * .5) + (((pubPerformanceRevenue - pubPROAdminFee) * .5) * (1- publisherPercentage)) + (pubMechanicalRevenue - (pubMechanicalAdminFee + pubMechanicalRecordFee))});
        } else if(this.state.publishingDealSelected === "Co-Publishing") {
            publisherPercentage = 0.5;
            this.setState({publisherShare: ((pubPerformanceRevenue - pubPROAdminFee) * .5) * publisherPercentage});
            this.setState({writerEarnings: ((pubPerformanceRevenue - pubPROAdminFee) * .5) + (((pubPerformanceRevenue - pubPROAdminFee) * .5) * (1- publisherPercentage)) + (pubMechanicalRevenue - (pubMechanicalAdminFee + pubMechanicalRecordFee))});
        } else if(this.state.publishingDealSelected === "Admin Deal") {
            publisherPercentage = 0.1;
            this.setState({publisherShare: ((pubPerformanceRevenue - pubPROAdminFee) * .5) * publisherPercentage});
            this.setState({writerEarnings: ((pubPerformanceRevenue - pubPROAdminFee) * .5) + (((pubPerformanceRevenue - pubPROAdminFee) * .5) * (1- publisherPercentage)) + (pubMechanicalRevenue - (pubMechanicalAdminFee + pubMechanicalRecordFee))});
        } else if(this.state.publishingDealSelected === "No Deal") {
            publisherPercentage = 0.0;
            this.setState({publisherShare: ((pubPerformanceRevenue - pubPROAdminFee) * .5) * publisherPercentage});
            this.setState({writerEarnings: ((pubPerformanceRevenue - pubPROAdminFee) * .5) + (((pubPerformanceRevenue - pubPROAdminFee) * .5) * (1- publisherPercentage)) + (pubMechanicalRevenue - (pubMechanicalAdminFee + pubMechanicalRecordFee))});
        }
    }

    weightedAverageOfSelected() {
        let sum = 0.0;
        for(let i=0; i < this.state.providers.length; i++) {
          if(this.state.providers[i].includeInCalculations) {
                sum += (this.state.providers[i].payoutPerStream * this.state.providers[i].marketShareStreams)
            }
        }
        let sumOfWeights = 0.0;
        for(let i=0;i < this.state.providers.length; i++) {
            sumOfWeights += this.state.providers[i].marketShareStreams
        }
        console.log(sum/sumOfWeights);
        return sum/sumOfWeights;
    }



    getTotalEarnings(artistShare) {
        if(this.state.role === "both") {
            this.setState({totalEarnings: artistShare + parseFloat(this.state.writerEarnings)});
        } else if(this.state.role === "artist") {
            this.setState({totalEarnings: artistShare});
        } else if(this.state.role === "writer") {
            this.setState({totalEarnings: this.state.writerEarnings});
        }
    }


}


export default CalcPage;
