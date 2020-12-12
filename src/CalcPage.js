import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';
import TabGroup from './components/ButtonGroup.js';
import SingleDropDown from './components/SingleDropDown.js';
import NumberInput from './components/NumberInput.js';
import DspButton from './components/DspButton.js';

const labelDealOptions = [
  { value: 'royalty', label: 'Royalty' },
  { value: 'netProfit', label: 'Net Profit' },
  { value: 'distributionPercent', label: 'Distribution (%)' },
  { value: 'distributionFee', label: 'Distribution (fee)' },
  { value: 'labelServices', label: 'Label Services' }
]

const pubDealOptions = [
  { value: 'Full/Traditional', label: 'Full/Traditional' },
  { value: 'Co-Publishing', label: 'Co-publising' },
  { value: 'Admin', label: 'Admin' },
  { value: 'No Deal', label: 'No Deal' }
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
          ref: React.createRef(),
          name: "Spotify",
          payoutPerStream: 0.00331,
          marketShareStreams: .2922,
            marketShareDollars: .4893,
            includeInCalculations: true
        };
        let apple = {
          id: 1,
          ref: React.createRef(),
          name: "Apple Music",
          payoutPerStream: 0.00495,
          marketShareStreams: .0995,
            marketShareDollars: .2497,
            includeInCalculations: true
        };
        let youtube = {
          id: 2,
          ref: React.createRef(),
          name: "Youtube Content ld",
          payoutPerStream: 0.00028,
          marketShareStreams: .4858,
            marketShareDollars: .0699,
            includeInCalculations: true
        };
        let amazon = {
          id: 3,
          ref: React.createRef(),
          name: "Amazon Unlimited",
          payoutPerStream: 0.01175,
          marketShareStreams: .0068,
            marketShareDollars: .0404,
            includeInCalculations: true
        };
        let google = {
          id: 4,
          ref: React.createRef(),
          name: "Google Play",
          payoutPerStream: 0.00543,
          marketShareStreams: .0112,
            marketShareDollars: .0308,
            includeInCalculations: true
        };
        let pandora = {
          id: 5,
          ref: React.createRef(),
          name: "Pandora",
          payoutPerStream: 0.00155,
          marketShareStreams: .0386,
            marketShareDollars: .0303,
            includeInCalculations: true
        };
        let deezer = {
          id: 6,
          name: "Deezer",
          ref: React.createRef(),
          payoutPerStream: 0.00567,
          marketShareStreams: .0091,
            marketShareDollars: .026,
            includeInCalculations: true
        };
        let amazonDig = {
          id: 7,
          ref: React.createRef(),
          name: "Amazon Digital Services",
          payoutPerStream: 0.00395,
          marketShareStreams: .0095,
            marketShareDollars: .019,
            includeInCalculations: true
        };
        let tidal = {
          id: 8,
          ref: React.createRef(),
          name: "TIDAL",
          payoutPerStream: 0.00927,
          marketShareStreams: 0.0021,
            marketShareDollars: 0.0098,
            includeInCalculations: true
        };
        let others = {
          id: 9,
          ref: React.createRef(),
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
        this.dealTypeRef = React.createRef();
        this.tabGroupRef = React.createRef();
        this.pubTypeRef = React.createRef();
        this.advanceRef = React.createRef();
        this.costsRef = React.createRef();
        this.artistButtonRef = React.createRef();
        this.writerButtonRef = React.createRef();
        this.bothButtonRef = React.createRef();


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


    componentDidMount() {
        //console.log("mounted");
        this.buildRecordDealSelect();
        this.handleRoleButton("Writer & Artist");
        this.buildPublishingDealSelect();
        this.setSliderValue(50);
        this.testMap();
        //this.buildDspsArr();
        this.setInitialRoleState();
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
              <DspButton ref={this.artistButtonRef}
                text = "Artist"
                key="artButton"
                onChange={e => this.getRoleButton("artist")}
              />
              <DspButton ref={this.writerButtonRef}
                text = "Writer"
                key="writeButton"
                onChange={e => this.getRoleButton("writer")}
              />
              <DspButton ref={this.bothButtonRef}
                text = "Both"
                key="bothButton"
                onChange={e => this.getRoleButton("both")}
              />
              <p> {this.state.role} </p>
              <br />
              <SmallText text="Record Deal Type: "/>
              <SingleDropDown ref={this.dealTypeRef}

                  options={labelDealOptions}
                  onChange = {e => this.getStateRecDeal(e)}
              />
              <br />
              <SmallText text="Publishing Deal Type: "/>
              <SingleDropDown ref={this.pubTypeRef}
                  options={pubDealOptions}
                  onChange = {e => this.getStatePubDeal(e)}
              />
              <br />
              <SmallText text="Deal Split: "/>

              <br />
              <SmallText text="Guaranteed Income: "/>
              <NumberInput ref={this.advanceRef}
                id= {"numInput"}
                label = "From Advance"
                locked = {false}
                active = {false}
                onChange = {e => this.getStateAdvance(e)}
              />
              <br />
              <SmallText text="Costs: "/>
              <NumberInput ref={this.costsRef}
                id = {"costInput"}
                label = "Costs"
                locked = {false}
                active = {false}
                onChange = {e => this.getStateCosts(e)}
              />
              <br />
              <SmallText text="Recoupable: "/>
              <input
                 type="checkbox"
              />
              <br />
              <SmallText text="DSPs"/>
              <div>
                {this.state.providers.map((provider) =>
                   <DspButton ref={provider.ref}
                     key={provider.id}
                     text={provider.name}
                     onChange = {e => this.getButtonClick(provider.id)}
                   />
                )}
              </div>
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
    setInitialRoleState() {
      /*this.artistButtonRef.current.setState({button: false});
      this.writerButtonRef.current.setState({button: false});
      this.bothButtonRef.current.setState({button: true});
      */
    }
    getRoleButton(name) {
         console.log(name);
         console.log(this.artistButtonRef.current.state.button);
         console.log(this.writerButtonRef.current.state.button);
         console.log(this.bothButtonRef.current.state.button);

         if(name === "artist" && !this.artistButtonRef.current.state.button) {
            this.handleRoleButton("artist");
            this.writerButtonRef.current.setState({button: false});
            this.bothButtonRef.current.setState({button: false});
            //this.state.
         } else if (name === "writer" && !this.writerButtonRef.current.state.button) {
            this.handleRoleButton("writer");
            this.artistButtonRef.current.setState({button: false});
            this.bothButtonRef.current.setState({button: false});
         } else if (name === "both" && !this.bothButtonRef.current.state.button) {
            this.handleRoleButton("both");
            this.writerButtonRef.current.setState({button: false});
            this.artistButtonRef.current.setState({button: false});
         }
    }
    getButtonClick(id) {
      //console.log("clicked: " + id);
      //console.log(this.state.providers[id].ref.current.state);
      if(this.state.providers[id].ref.current.state.button != null && this.state.providers[id].ref.current.state.button != this.state.providers[id].includeInCalculations) {
        this.toggleMe(id);
      }

    }
    getStateCosts() {
      console.log(this.costsRef.current.state)
      if(this.costsRef.current.state.value != "" && parseInt(this.costsRef.current.state.value) != this.state.costs) {
        const e = parseInt(this.costsRef.current.state.value);
        this.updateCosts(e);
      }
    }
    getStateAdvance() {
      console.log(this.advanceRef.current.state)
      if(this.advanceRef.current.state.value != "" && parseInt(this.advanceRef.current.state.value) != this.state.advance) {
          const e = parseInt(this.advanceRef.current.state.value);
          this.updateAdvance(e);
      }
    }
    getStatePubDeal() {
      //console.log("getting state rec deal");
      if(this.pubTypeRef.current.state.selectedOption != null && this.pubTypeRef.current.state.selectedOption.value != this.state.publishingDealSelected) {
        //console.log(this.dealTypeRef.current.state.selectedOption.value);
        const e = this.pubTypeRef.current.state.selectedOption.value;
        this.handlePublishingDealSelect(e);
      }
      //const node = this.dealTypeRef.current;
      //console.log("Node: " + node);
    }
    getStateRecDeal() {
      //console.log("getting state rec deal");
      if(this.dealTypeRef.current.state.selectedOption != null && this.dealTypeRef.current.state.selectedOption.value != this.state.recordDealSelected) {
        //console.log(this.dealTypeRef.current.state.selectedOption.value);
        const e = this.dealTypeRef.current.state.selectedOption.value;
        this.handleRecDealSelect(e);
      }
      //const node = this.dealTypeRef.current;
      //console.log("Node: " + node);
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
      console.log("changed advance to: " + e);
      this.setState({advance: e});
      this.calculate();
    }

    updateCosts(e) {
        console.log("changed costs to: " + e);
        this.setState({costs: e});
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
        console.log(e);
        this.setState({publishingDealSelected: e});
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
        if(e === "royalty") {
          this.setState({sliderValue: 20});
        } else if (e === "netProfit") {
          this.setState({sliderValue: 50});
        } else if (e === "distributionPercent") {
          this.setState({sliderValue: 70});
        } else if (e === "labelServices") {
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
        //console.log(totalMoneyToRecoupe)
        let grossRevenue= this.state.streamNumber * this.weightedAverageOfSelected();
        //console.log("grossRevenue: " + grossRevenue)
        //checkDSPs();
        //console.log(estStreams.value * avgPayout);
        //console.log(estStreams.value * weightedAverageOfSelected());
        if (this.state.recordDealSelected === "royalty") {
            // Artist Split
            if((grossRevenue * (parseFloat(this.state.sliderValue)/100)) <= totalMoneyToRecoupe){
              console.log("unrecouped");
              artistShare = 0;
            } else {
              artistShare = (grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe;
            }
            labelShare = grossRevenue * (1-(parseFloat(this.state.sliderValue)/100));

        } else if (this.state.recordDealSelected === "netProfit" || this.state.recordDealSelected === "distributionPercent" || this.state.recordDealSelected === "Distribution Fee") {
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
            if(this.state.recordDealSelected === "netProfit" || this.state.recordDealSelected === "distributionPercent") {
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

        } else if (this.state.recordDealSelected === "labelServices") {
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
        console.log(sum)
        let sumOfWeights = 0.0;
        for(let i=0;i < this.state.providers.length; i++) {
          if(this.state.providers[i].includeInCalculations) {
            sumOfWeights += this.state.providers[i].marketShareStreams
          }
        }
        if(sumOfWeights <= 0.0) return 0.0
        //console.log(sum)
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
