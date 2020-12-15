import React from 'react';
import './App.css';
import SmallText from './components/SmallText.js';
import TitleText from './components/TitleText.js';
import DspButton from './components/DspButton.js';
import SwitchButton from './components/SwitchButton.js';
import NumberInput from './components/NumberInput.js';
import TabGroup from './components/ButtonGroup.js';
import SingleDropDown from './components/SingleDropDown.js';
import MultiDropDown from './components/MultiDropDown.js';
import BarChart from './components/BarChart.js';
import RadialChart from './components/RadialChart.js';
import DealSplitSlider from './components/DealSplitSlider.js';
import StreamSlider from './components/StreamSlider.js';

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

{/* LABEL SERVICES RENDER CODE....
  <SmallText text="Label Services" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
  <MultiDropDown options={labelServicesOptions} defaultValue={labelServicesOptions[0]}/>
  <div style={{textAlign: 'right'}}>
    <SmallText text="Created By: Nikhil Anand, Sam Vincent, Alexandre Perrin, Peter Dyson"/>
  </div>
  */}


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

class TestCompPage extends React.Component{
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
            providers: [spotify, apple, youtube, amazon, google, pandora, deezer, amazonDig, tidal],
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
            totalEarnings: 0,
            recoupStreamsNeeds: 0,
        };

    }

    componentDidMount() {
        this.buildRecordDealSelect();
        this.handleRoleButton("Writer & Artist");
        this.buildPublishingDealSelect();
        this.setSliderValue(50);
        this.testMap();
        this.setInitialStates();
    }

    render() {
      return (
        <div style={{padding: '2%', display: 'flex', flexDirection: 'column'}}>

            <div style={{textAlign: 'center'}}>
              <TitleText text="The Streaming Calculator" style={{color: '#111', fontSize: '48px', fontWeight: '700', lineHeight: '48px', margin: '0 0 24px', padding: '0 30px', textAlign: 'center', textTransform: 'uppercase'}}/>
            </div>

            <div style={{display: 'flex', flexDirection: 'row'}}>

                <div style={{width: '33%', flexDirection: 'column', paddingRight: '.5%', marginRight: '1%', borderRight: 'thin dotted #b3d0ff'}}>
                    <SmallText text="(1. Start Here By Entering Information About Your Record & Publishing Deal)" style={{ fontSize: '12px', fontWeight: 'light', lineHeight: '1.09', textAlign: 'center', color: 'grey', marginTop: 0 }}/>
                    <SmallText text="About You" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', textDecoration: 'underline', marginTop: 0, marginBottom: 0 }}/>
                    <div>
                      <SmallText text="Your Role" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                      <TabGroup types={roleTypes}/>
                    </div>

                  <div>
                    <div style={{marginBottom: '8%'}}>
                      <SmallText text="Record Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                      <SingleDropDown
                          ref={this.dealTypeRef}
                          options={labelDealOptions}
                          onChange = {e => this.getStateRecDeal(e)}/>
                      <SmallText text="Record Deal Split" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747',marginBottom:'3px' }}/>
                      <DealSplitSlider/>
                      <SmallText text="Record Deal Advance" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <NumberInput ref={this.advanceRef}
                          id= {"numInput"}
                          label = "Advance on Earnings"
                          locked = {false}
                          active = {false}
                          onChange = {e => this.getStateAdvance(e)}/>
                      </div>
                    </div>

                    <SmallText text="Publishing Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                    <SingleDropDown
                        ref={this.pubTypeRef}
                        options={pubDealOptions}
                        onChange = {e => this.getStatePubDeal(e)}
                    />
                  </div>

                  <div style={{borderTop: 'thin dotted #b3d0ff', marginTop: '2%'}}>
                    <SmallText text="DSPs" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747',marginBottom:'0', marginTop: 5 }}/>
                    <SmallText text="(Select Which DSPs to include in Calculation)" style={{ fontSize: '12px', fontWeight: 'light', lineHeight: '1.09', textAlign: 'center', color: 'grey' }}/>
                      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                        {this.state.providers.map((provider) =>
                           <DspButton ref={provider.ref}
                             key={provider.id}
                             text={provider.name}
                             onChange = {e => this.getButtonClick(provider.id)}
                           />
                        )}
                      </div>
                  </div>
                </div>


                <div style={{width: '32%', flexDirection: 'column', paddingRight: '1%'}}>
                    <SmallText text="(2. Now Entering Some Information About Your Song)" style={{ fontSize: '12px', fontWeight: 'light', lineHeight: '1.09', textAlign: 'center', color: 'grey', marginTop: 0 }}/>
                    <SmallText text="About Your Song" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', textDecoration: 'underline', marginTop: 0, marginBottom: 0 }}/>
                    <div style={{alignItems: 'center', borderBottom: 'thin dotted #b3d0ff', paddingBottom: '2.5%'}}>
                      <SmallText text="Estimated Streams" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                      <NumberInput id={0} label="Estimated Streams" locked={false} active={false} />
                      <StreamSlider />
                    </div>
                    <div>
                      <SmallText text="Costs" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginBottom: 0 }} />
                      <SmallText text="Recoupable" style={{ fontSize: '12px', fontWeight: 'light', lineHeight: '1.09', textAlign: 'right', color: 'grey', paddingRight: '5%' }}/>
                      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '2%'}}>
                        <NumberInput id={1} label="Recording Costs" locked={false} active={false} />
                        <div style={{width: '30%'}}>
                          <SwitchButton/>
                        </div>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '2%'}}>
                        <NumberInput id={2} label="Marketing Costs" locked={false} active={false} />
                        <div style={{marginLeft: '1%', width: '29%'}}>
                          <SingleDropDown options={marketingSplitOptions}/>
                        </div>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row', marginBottom: '2%'}}>
                        <NumberInput id={3} label="Distrubtion Costs" locked={false} active={false} />
                        <div style={{width: '30%'}}>
                          <SwitchButton/>
                        </div>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <NumberInput id={4} label="Misc. Costs" locked={false} active={false} />
                        <div style={{width: '30%'}}>
                          <SwitchButton/>
                        </div>
                      </div>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                      <div style={{flexDirection: 'column'}}>
                        <SmallText text="Total Costs:" style={{ fontSize: '18px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                        <SmallText text={`$${this.state.costs.toFixed(0)}`} style={{ fontSize: '20px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                      </div>
                      <RadialChart />
                    </div>

                </div>

                <div style={{flexDirection: 'column', width: '35%', borderLeft: 'thin solid #b3d0ff'}}>
                  <div style={{backgroundColor: '#f2f6ff'}}>
                    <div>
                      <SmallText text="(3. Here are your results!)" style={{ fontSize: '12px', fontWeight: 'light', lineHeight: '1.09', textAlign: 'center', color: 'grey', marginTop: 0 }}/>
                      <SmallText text="Your Results" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', textDecoration: 'underline', marginTop: 0, marginBottom: 0 }}/>
                      <SmallText text={`You've Earned: $${this.state.totalEarnings}`} style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                      <SmallText text={`Total Revenue Generated: $${this.state.grossRev.toFixed(0)}`} style={{ fontSize: '20px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                      <SmallText text={`Total Recoupable Costs: $${this.state.totRecoupe.toFixed(0)}`} style={{ fontSize: '18px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                    </div>
                    <div style={{borderBottom: 'thin solid #b3d0ff'}}>
                      <BarChart/>
                    </div>
                  </div>
                  <div>
                    <SmallText text="Advanced Calculations" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747', marginBottom: 0}}/>
                    <SmallText text="(If you are trying to achieve a certain goal. Select it here)" style={{ fontSize: '12px', fontWeight: 'light', lineHeight: '1.09', textAlign: 'center', color: 'grey'}}/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                      <div style={{flexDirection: 'column', marginRight: '5%'}}>
                        <SmallText text="Auto Recoup" style={{ fontSize: '15px', fontWeight: '800', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                        <SmallText text={`Streams Needed: ${this.state.recoupStreamsNeeds.toFixed(0)}`} style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                      </div>
                      <div style={{flexDirection: 'column'}}>
                        <SmallText text="Money Goal" style={{ fontSize: '15px', fontWeight: '800', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                        <NumberInput id={6} label="I want to Make...." locked={false} active={false}/>
                        <SmallText text={`Streams Needed: ${this.state.recoupStreamsNeeds.toFixed(0)}`} style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                      </div>
                    </div>
                  </div>
                </div>

            </div>

        </div>

        )
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

      this.setState({
        grossRev: grossRevenue,
        totRecoupe: totalMoneyToRecoupe,
        writerEarnings: artistShare,
        publisherShare: labelShare});

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

  autoRecoup(){
    let recoupStreamsNeeds;

    if(this.state.recordDealSelected === "royalty" || this.state.recordDealSelected === "labelServices"){
	     recoupStreamsNeeds = (this.state.totRecoupe/(parseFloat(this.state.sliderValue)/100)) / this.weightedAverageOfSelected()
     } else {
       recoupStreamsNeeds = ((this.state.costs + this.state.advance) / (parseFloat(this.state.sliderValue)/100)) / this.weightedAverageOfSelected()
     }
  }



}


export default TestCompPage;
