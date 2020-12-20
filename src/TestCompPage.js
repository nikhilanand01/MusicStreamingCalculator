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
import Accordion from './components/Accordion.js';
import NumberFormat from 'react-number-format';

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

let recArtist = {
  name: "Recording Artist Only",
  id: "artist",
  ref: React.createRef(),
  selected: false
}
let recWriter = {
  name: "Writer Only",
  id: "writer",
  ref: React.createRef(),
  selected: false
}
let recBoth = {
  name: "Both",
  id: "both",
  ref: React.createRef(),
  selected: true
}
const roleTypes = [recArtist, recWriter, recBoth];

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
        this.artistButtonRef = React.createRef();
        this.writerButtonRef = React.createRef();
        this.bothButtonRef = React.createRef();
        this.moneyGoalInputRef = React.createRef();
        // this.costsTotalRef = React.createRef();
        this.costsRecordingRef = React.createRef();
        this.costsMarketingRef = React.createRef();
        this.costsDistributionRef = React.createRef();
        this.costsMiscRef = React.createRef();
        this.dealSliderRef = React.createRef();
        this.estStreamsRef = React.createRef();
        this.streamsSliderRef = React.createRef();

        this.state = {
            providers: [spotify, apple, youtube, amazon, google, pandora, deezer, amazonDig, tidal],
            streamNumber: 0,
            role: null,
            recordDeal: [],
            publishDeal: [],
            sliderValue: 50,
            recordDealSelected: null,
            publishingDealSelected: null,
            advance: 0,
            grossRecordingRev: 0,
            grossPubRev: 0,
            grossTotalRev: 0,
            totRecoupe: 0,
            labelShare: 0,
            publisherShare: 0,
            artistRecordEarnings: 0,
            artistWriterEarnings: 0,
            artistTotalEarnings: 0,
            recoupStreamsNeeds: 0,
            moneyGoalInput: 0,
            moneyGoalStreamsNeeded: 0,
            seriesBar: [{
              name: 'From Recording',
              data: [16255, 100558, 0]
            }, {
              name: 'From Writing',
              data: [17371, 3191, 3700]
            },{
              name: 'From Advance',
              data: [1000, 0, 0]
            }
          ],
          seriesRadial: [44],
          roleTypes: roleTypes,
          costsTotal: 0,
          costsRecording: 0,
          costsMarketing: 0,
          costsDistribution: 0,
          costsMisc: 0,
        };

    }

    componentDidMount() {
        this.buildRecordDealSelect();
        this.handleRoleButton("Writer & Artist");
        this.buildPublishingDealSelect();
        this.setSliderValue(50);
        this.testMap();
        this.calculate();
    }


    render() {
      return (
        <div style={{padding: '2%', display: 'flex', flexDirection: 'column'}}>
            <div style={{textAlign: 'center'}}>
              <TitleText text="The Streaming Calculator" style={{color: '#111', fontSize: '48px', fontWeight: '700', lineHeight: '48px', margin: '0 0 24px', padding: '0 30px', textAlign: 'center', textTransform: 'uppercase'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div style={{width: '30%', flexDirection: 'column', paddingRight: '1.25%', marginRight: '1%', borderRight: 'thin dotted #b3d0ff'}}>
                    <SmallText text="About You" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', textDecoration: 'underline', marginTop: 0, marginBottom: 0 }}/>
                    <div>
                      <SmallText text="Your Role" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        {this.state.roleTypes.map(type => (
                          <DspButton ref={type.ref}
                            key={type.id}
                            //active={type.selected}
                            onChange={e => this.handleMyClick(type.id)}
                            text={type.name}
                          />))}
                        </div>
                    </div>
                  <div>
                    <div style={{marginBottom: '8%'}}>
                      <div>
                        <SmallText text="Record Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                        <SingleDropDown
                            ref={this.dealTypeRef}
                            options={labelDealOptions}
                            onChange = {e => this.getStateRecDeal(e)}/>
                      </div>
                      <div>
                        {this.state.recordDealSelected === "labelServices" &&
                          <div>
                            <SmallText text="Label Services" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                            <MultiDropDown options={labelServicesOptions} defaultValue={labelServicesOptions[0]}/>
                          </div>
                        }
                      </div>
                      <SmallText text="Record Deal Split" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747',marginBottom:'3px' }}/>
                      <DealSplitSlider ref={this.dealSliderRef}
                          onChange = {e => this.doSliderStuff(e)}/>
                      <SmallText text="Record Deal Advance" style={{ textAlign: 'center', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                      <div style={{justifyContent: 'center'}}>
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
                </div>



              <div style={{width: '33%', flexDirection: 'column', paddingRight: '1%'}}>
                  <SmallText text="About Your Song" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', textDecoration: 'underline', marginTop: 0, marginBottom: 0 }}/>
                  <div style={{alignItems: 'center', borderBottom: 'thin dotted #b3d0ff', paddingBottom: '2.5%'}}>
                    <SmallText text="Estimated Streams" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                    <NumberInput ref={this.estStreamsRef}
                       id={0}
                       label="Estimated Streams"
                       locked={false}
                       active={false}
                       onChange={e => this.changeStreams(e)}/>
                    <StreamSlider ref={this.streamsSliderRef} onChange={e => this.updateStreamSlider(e)}/>
                    <div>
                      <Accordion
                          title="Which DSPs Are Included?"
                          body={
                            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row'}}>
                              {this.state.providers.map((provider) =>
                              <DspButton
                                ref={provider.ref}
                                key={provider.id}
                                text={provider.name}
                                onChange = {e => this.getButtonClick(provider.id)}/>)}
                            </div>}/>
                    </div>
                  </div>

                  <div style={{borderBottom: 'thin dotted #b3d0ff', paddingBottom: '2.5%'}}>
                    <NumberFormat value={`${this.state.costsTotal.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: '2%', marginBottom: '5%'}}>{`Costs: ${value}`}</div>} />
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
                        <div style={{flexDirection: 'row', marginBottom: '2%', paddingRight: '2%'}}>
                            <div style={{}}>
                              <NumberInput
                                id= {"costsRecording"}
                                ref = {this.costsRecordingRef}
                                label="Recording Costs"
                                locked={false}
                                active={false}
                                onChange = {e => this.getStateCostsRecording(e)}/>
                            </div>
                            <div style={{width: '15%'}}>
                              <SwitchButton/>
                            </div>
                        </div>
                        <div style={{flexDirection: 'row', marginBottom: '2%', paddingRight: '2%'}}>
                            <NumberInput
                              id= {"costsMarketing"}
                              ref = {this.costsMarketingRef}
                              label="Marketing Costs"
                              locked={false}
                              active={false}
                              onChange = {e => this.getStateCostsMarketing(e)}/>
                          <div style={{marginLeft: '1%'}}>
                            <SingleDropDown options={marketingSplitOptions}/>
                          </div>
                        </div>
                        <div style={{ flexDirection: 'row', marginBottom: '2%', paddingRight: '2%'}}>
                            <NumberInput
                              id= {"costsDistribution"}
                              ref = {this.costsDistributionRef}
                              label="Distrubtion Costs"
                              locked={false}
                              active={false}
                              onChange = {e => this.getStateCostsDistribution(e)}/>
                          <div style={{width: '15%'}}>
                            <SwitchButton/>
                          </div>
                        </div>
                        <div style={{ flexDirection: 'row'}}>
                            <NumberInput
                              id= {"costsMisc"}
                              ref = {this.costsMiscRef}
                              label="Misc. Costs"
                              locked={false}
                              active={false}
                              onChange = {e => this.getStateCostsMisc(e)}/>
                          <div style={{width: '15%'}}>
                            <SwitchButton/>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div>
                    <SmallText text="Advanced Calculations" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747', marginBottom: 0}}/>

                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                      <div style={{flexDirection: 'column', marginRight: '5%'}}>
                        <SmallText text="Auto Recoup" style={{ fontSize: '15px', fontWeight: '800', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                        <SmallText text={`Streams Needed: ${this.state.recoupStreamsNeeds.toFixed(0)}`} style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                      </div>
                      <div style={{flexDirection: 'column'}}>
                        <SmallText text="Money Goal" style={{ fontSize: '15px', fontWeight: '800', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/>
                        <NumberInput
                          id= {"moneyGoalInput"}
                          ref = {this.moneyGoalInputRef}
                          label="I want to Make...."
                          locked={false}
                          active={false}
                          onChange = {e => this.getStateMoneyGoalInput(e)}/>
                        {/*<SmallText text={`Streams Needed: ${this.state.moneyGoalStreamsNeeded.toFixed(0)}`} style={{ fontSize: '14px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}/> */}
                      </div>
                    </div>
                  </div>
              </div>

                <div style={{flexDirection: 'column', width: '35%', border: 'thin solid #b3d0ff', backgroundColor: '#f2f6ff'}}>
                  <div>
                    <div>
                      <SmallText text="Your Results" style={{ fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', textDecoration: 'underline', marginTop: 0, marginBottom: 0 }}/>
                      <NumberFormat value={`${this.state.artistTotalEarnings.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{ fontSize: '26px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginBottom: 0, marginTop: '3%' }}>{`You've Earned: ${value}`}</div>} />
                      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                          <NumberFormat value={`${this.state.grossTotalRev.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{ fontSize: '20px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginBottom: '10%'}}>{`Total Revenue Generated: ${value}`}</div>} />
                          <NumberFormat value={`${this.state.totRecoupe.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{ fontSize: '18px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}>{`Total Recoupable Money: ${value}`}</div>} />
                        </div>
                          <RadialChart series={this.state.seriesRadial} height={200} width={150}/>
                      </div>
                    </div>
                    <div>
                      <BarChart series={this.state.seriesBar}/>
                    </div>
                  </div>

                </div>

            </div>

        </div>

        )
    }

  updateStreamSlider(e) {
    console.log("updating stream slider");
    console.log(this.streamsSliderRef.current.state.values);
  }

  getRoleButton(name){
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

  getButtonClick(id){
    //console.log("clicked: " + id);
    //console.log(this.state.providers[id].ref.current.state);
    if(this.state.providers[id].ref.current.state.button !== null && this.state.providers[id].ref.current.state.button !== this.state.providers[id].includeInCalculations) {
      this.toggleMe(id);
    }

  }

  calcTotalCosts(){
    let costsTotal;
    costsTotal = parseFloat(this.state.costsRecording) + parseFloat(this.state.costsMarketing) + parseFloat(this.state.costsDistribution) + parseFloat(this.state.costsMisc);

    this.setState({
      costsTotal: costsTotal
    },() => {
    //this.calculate();
    console.log(this.state.costsTotal);
    })

    this.updateRecoupable();
  }

  updateRecoupable(){
    let ret = this.state.costsTotal + this.state.advance;
    console.log("ret: " + ret);
    this.setState({totRecoupe: ret})

  }

  getStateCostsRecording(){
    console.log(this.costsRecordingRef.current.state)
    if(this.costsRecordingRef.current.state.value !== "" && parseInt(this.costsRecordingRef.current.state.value) !== this.state.costsRecording) {
      const e = parseInt(this.costsRecordingRef.current.state.value);
      this.updateCostsRecording(e);
    }
  }

  updateCostsRecording(e){
      // console.log("changed RECORDING costs to: " + e);
      this.setState({costsRecording: e}, () => {
          this.calculate();
      });
      console.log("state: " + this.state.costsRecording);

  }

  getStateCostsMarketing(){
    console.log(this.costsMarketingRef.current.state)
    if(this.costsMarketingRef.current.state.value !== "" && parseInt(this.costsMarketingRef.current.state.value) !== this.state.costsMarketing) {
      const e = parseInt(this.costsMarketingRef.current.state.value);
      this.updateCostsMarketing(e);
    }
  }

  updateCostsMarketing(e){
      // console.log("changed MARKETING costs to: " + e);
      this.setState({costsMarketing: e}, () => {
          this.calculate();
      });
  }

  getStateCostsDistribution(){
    console.log(this.costsDistributionRef.current.state)
    if(this.costsDistributionRef.current.state.value !== "" && parseInt(this.costsDistributionRef.current.state.value) !== this.state.costsDistribution) {
      const e = parseInt(this.costsDistributionRef.current.state.value);
      this.updateCostsDistribution(e);
    }
  }

  updateCostsDistribution(e){
      // console.log("changed DISTRIBUTION costs to: " + e);
      this.setState({costsDistribution: e}, () => {
          this.calculate();
      });
  }

  getStateCostsMisc(){
    console.log(this.costsMiscRef.current.state)
    if(this.costsMiscRef.current.state.value !== "" && parseInt(this.costsMiscRef.current.state.value) !== this.state.costsMisc) {
      const e = parseInt(this.costsMiscRef.current.state.value);
      this.updateCostsMisc(e);
    }
  }

  updateCostsMisc(e){
      // console.log("changed MISC costs to: " + e);
      this.setState({costsMisc: e}, () => {
          this.calculate();
      });
   }

  getStateAdvance(){
    console.log(this.advanceRef.current.state)
    if(this.advanceRef.current.state.value !== "" && parseInt(this.advanceRef.current.state.value) !== this.state.advance) {
        const e = parseInt(this.advanceRef.current.state.value);
        this.updateAdvance(e);
    }
  }

  getStatePubDeal(){
    //console.log("getting state rec deal");
    if(this.pubTypeRef.current.state.selectedOption !== null && this.pubTypeRef.current.state.selectedOption.value !== this.state.publishingDealSelected) {
      //console.log(this.dealTypeRef.current.state.selectedOption.value);
      const e = this.pubTypeRef.current.state.selectedOption.value;
      this.handlePublishingDealSelect(e);
    }
    //const node = this.dealTypeRef.current;
    //console.log("Node: " + node);
  }

  getStateRecDeal(){
    //console.log("getting state rec deal");
    if(this.dealTypeRef.current.state.selectedOption !== null && this.dealTypeRef.current.state.selectedOption.value !== this.state.recordDealSelected) {
      //console.log(this.dealTypeRef.current.state.selectedOption.value);
      const e = this.dealTypeRef.current.state.selectedOption.value;
      this.handleRecDealSelect(e);
    }
    //const node = this.dealTypeRef.current;
    //console.log("Node: " + node);
  }

  testMap(){
    this.state.providers.map(provider => console.log(provider.name));
    //this.state.providers.map(provider => ce('tr', null, ce('td', null, ce('text', null, provider.name))), ce('tr', null, ce('td', null, ce('input', {type: 'checkbox', checked: provider.includeInCalculations, onClick: e => this.toggleMe(provider.id)}))))
  }

  handleMyClick(id){
    //console.log("clicked on " + id);
    //console.log(this.state.roleTypes[0].ref.current.state.button);

    //this.setState({role: id});
    if(id==="artist" && this.state.roleTypes[0].selected !== this.state.roleTypes[0].ref.current.state.button) {
      this.setState({role: "artist"});
      this.state.roleTypes[0].selected = true;
      this.state.roleTypes[0].ref.current.setState({button: true});
      this.state.roleTypes[1].selected = false;
      this.state.roleTypes[1].ref.current.setState({button: false});
      this.state.roleTypes[2].selected = false;
      this.state.roleTypes[2].ref.current.setState({button: false});
      this.calculate();
    }
    if(id==="writer" && this.state.roleTypes[1].selected !== this.state.roleTypes[1].ref.current.state.button) {
      this.setState({role: "writer"});
      this.state.roleTypes[0].selected = false;
      this.state.roleTypes[0].ref.current.setState({button: false});
      this.state.roleTypes[1].selected = true;
      this.state.roleTypes[1].ref.current.setState({button: true});
      this.state.roleTypes[2].selected = false;
      this.state.roleTypes[2].ref.current.setState({button: false});
      this.calculate();
    }
    if(id==="both" && this.state.roleTypes[2].selected !== this.state.roleTypes[2].ref.current.state.button) {
      this.setState({role: "both"});
      this.state.roleTypes[0].selected = false;
      this.state.roleTypes[0].ref.current.setState({button: false});
      this.state.roleTypes[1].selected = false;
      this.state.roleTypes[1].ref.current.setState({button: false});
      this.state.roleTypes[2].selected = true;
      this.state.roleTypes[2].ref.current.setState({button: true});
      this.calculate();
    }
  }

  changeStreams(e){

      if(this.estStreamsRef.current.state.value !== "" && parseInt(this.estStreamsRef.current.state.value) !== this.state.streamNumber) {
          const l = parseInt(this.estStreamsRef.current.state.value);
          this.updateStreams(l);
      }
  }

  updateStreams(e){
    // console.log("changed estStreams to: " + e);
      this.setState({streamNumber: e}, () => {
          this.calculate();
      });
  }

  updateAdvance(e){
    // console.log("changed advance to: " + e);
      this.setState({advance: e}, () => {
          this.calculate();
      });
   }

  setSliderValue(val){
      this.setState( {sliderValue: val});
      this.calculate();
  }

  updateSlider(e){
      // console.log(e.target.value)
      //val = document.getElementById("splitSlider").value()
      this.setState( {sliderValue: e.target.value})
      this.calculate();
  }

  buildPublishingDealSelect(){
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

  handlePublishingDealSelect(e){
      // console.log(e);
      this.setState({publishingDealSelected: e});
      this.calculate();
  }

  handleRoleButton(which){
      console.log(which);
      this.setState({role: which})
      this.calculate();
  }

  handleRecDealSelect(e){
     console.log("selecting Roles");
     console.log(e);
     if(e === "royalty") {
       this.setState({sliderValue: 20});
       this.changeSliderVal(20);
     } else if (e === "netProfit") {
       this.setState({sliderValue: 50});
       this.changeSliderVal(50);
     } else if (e === "distributionPercent") {
       this.setState({sliderValue: 70});
       this.changeSliderVal(70);
     } else if (e === "distributionFee") {
       this.setState({sliderValue: 100});
       this.changeSliderVal(100);
     } else if (e === "labelServices") {
       this.setState({sliderValue: 80});
       this.changeSliderVal(80);
     }
     //document.getElementById("splitSlider").value = this.state.sliderValue;
     //console.log(this.myRef.current);
     //React.findDOMNode(this.refs.sliderRef).value = this.state.sliderValue;
     // console.log("sliderValue: " + this.state.sliderValue);
     this.setState({recordDealSelected: e})
     this.calculate();
  }

  changeSliderVal(val){
      this.dealSliderRef.current.setState({values: [val]});
  }

  doSliderStuff(e){
   console.log(this.dealSliderRef.current.state.values);
   if(this.dealSliderRef.current.state.values !== null && this.dealSliderRef.current.state.values[0] !== this.state.sliderValue) {
     //console.log("setting slider state to: " + this.dealSliderRef.current.state.values[0]);
     this.setState({sliderValue: this.dealSliderRef.current.state.values[0]});
     this.calculate();
   }
  }

  buildRecordDealSelect(){
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

  toggleMe(index){
    this.state.providers[index].includeInCalculations = !this.state.providers[index].includeInCalculations;
    //console.log(dsps[index].name);
    //console.log(dsps[index].includeInCalculations);
    this.calculate();
  }

  calculate(){
      this.calcTotalCosts();
      this.getPublisherShare();

      console.log("calculating");
      let artistRecordShare = 0;
      let labelShare = 0;
      let totalMoneyToRecoupe = parseFloat(this.state.advance) + parseFloat(this.state.costsRecording) + parseFloat(this.state.costsMarketing) + parseFloat(this.state.costsDistribution) + parseFloat(this.state.costsMisc);
      let grossRevenue= this.state.streamNumber * this.weightedAverageOfSelected();

      if (this.state.recordDealSelected === "royalty") {
          // Artist Split
          if((grossRevenue * (parseFloat(this.state.sliderValue)/100)) <= totalMoneyToRecoupe){
            console.log("unrecouped");
            artistRecordShare = 0;
          } else {
            artistRecordShare = (grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe;
          }
          labelShare = grossRevenue * (1-(parseFloat(this.state.sliderValue)/100));

      } else if (this.state.recordDealSelected === "netProfit" || this.state.recordDealSelected === "distributionPercent" || this.state.recordDealSelected === "Distribution Fee") {
          let profit = (grossRevenue - this.state.costsTotal);
          // Artist Split
          if(((profit * (parseFloat(this.state.sliderValue)/100)) - parseFloat(this.state.advance)) < 0){
            console.log("unrecouped");
            artistRecordShare = 0;
          } else {
            artistRecordShare = (profit * (parseFloat(this.state.sliderValue)/100)) - parseFloat(this.state.advance);
          }
          // Label Split Net Profit, Distributions
          if(this.state.recordDealSelected === "netProfit" || this.state.recordDealSelected === "distributionPercent") {
              if(profit < 0){
                  labelShare = 0;
              } else {
                  labelShare = (profit * (1-(parseFloat(this.state.sliderValue)/100)));
              }
          } else labelShare = grossRevenue - artistRecordShare;


      } else if (this.state.recordDealSelected === "labelServices") {
          // Artist Split
          if((grossRevenue * (parseFloat(this.state.sliderValue)/100)) <= totalMoneyToRecoupe){
            console.log("unrecouped");
            artistRecordShare = 0;
          } else {
            artistRecordShare = (grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe;
          }
          labelShare = grossRevenue * (1-(parseFloat(this.state.sliderValue)/100)) + this.state.costsTotal;//extra menu items would be factored into costs
      }

      console.log("grossRevenue: " + grossRevenue)
      console.log("totRecoupe: " + totalMoneyToRecoupe)
      console.log("ArtistRecordEarnings: " + artistRecordShare)
      console.log("labelShare: " + labelShare)

      this.setState({
        grossRecordingRev: grossRevenue,
        totRecoupe: totalMoneyToRecoupe,
        artistRecordEarnings: artistRecordShare,
        labelShare: labelShare,
        });


      this.getArtistTotalEarnings(artistRecordShare);
      this.getGrossTotalEarnings();

  }

  getPublisherShare(){
    let pubGrossRevenue = avgPubPayout * this.state.streamNumber;
    let pubPerformanceRevenue = pubGrossRevenue * .5;
    let pubMechanicalRevenue = pubGrossRevenue * .5;
    let pubPROAdminFee = pubPerformanceRevenue * .165;
    let pubMechanicalAdminFee = pubMechanicalRevenue * .15;
    let pubMechanicalRecordFee = (pubMechanicalRevenue - pubMechanicalAdminFee) * .3;
    let publisherPercentage;

    switch(this.state.publishingDealSelected) {
      case 'Full/Traditional':
        publisherPercentage = 1.0;
        break;
      case 'Co-Publishing':
        publisherPercentage = 0.5;
        break;
      case 'Admin Deal':
        publisherPercentage = 0.1;
        break;
      case 'No Deal':
        publisherPercentage = 0.0;
        break;
    }

    let publisherShare = ((pubPerformanceRevenue - pubPROAdminFee) * .5) * publisherPercentage
    let artistWriterEarnings = ((pubPerformanceRevenue - pubPROAdminFee) * .5) + (((pubPerformanceRevenue - pubPROAdminFee) * .5) * (1 - publisherPercentage)) + (pubMechanicalRevenue - (pubMechanicalAdminFee + pubMechanicalRecordFee))

    this.setState({
      publisherShare: publisherShare,
      artistWriterEarnings: artistWriterEarnings,
      grossPubRev: pubGrossRevenue,
    },
    () => {console.log("PUB PERCENTAGE***** " + publisherPercentage)});
  }

  weightedAverageOfSelected(){

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

  getArtistTotalEarnings(artistRecordShare){
      if(this.state.role === "both") {
          this.setState({artistTotalEarnings: artistRecordShare + this.state.artistWriterEarnings});
      } else if(this.state.role === "artist") {
          this.setState({artistTotalEarnings: artistRecordShare});
      } else if(this.state.role === "writer") {
          this.setState({artistTotalEarnings: this.state.artistWriterEarnings});
      }
  }

  getGrossTotalEarnings(){
    this.setState({grossTotalRev: this.state.grossRecordingRev + this.state.grossPubRev});
  }

  autoRecoup(){
    let recoupStreamsNeeds;

    if(this.state.recordDealSelected === "royalty" || this.state.recordDealSelected === "labelServices"){
	     recoupStreamsNeeds = (this.state.totRecoupe/(parseFloat(this.state.sliderValue)/100)) / this.weightedAverageOfSelected()
     } else {
       recoupStreamsNeeds = ((this.state.costsTotal + this.state.advance) / (parseFloat(this.state.sliderValue)/100)) / this.weightedAverageOfSelected()
     }
  }

  getStateMoneyGoalInput(){
    console.log(this.moneyGoalInputRef.current.state);
    if(this.moneyGoalInputRef.current.state.value !== "" && parseInt(this.moneyGoalInputRef.current.state.value) !== this.state.moneyGoalInput)
      {
       const e = parseInt(this.moneyGoalInputRef.current.state.value);
       this.updateMoneyGoal(e);
      }
  }

  updateMoneyGoal(e){
    // console.log("changed Money Goals to: " + e);
    // console.log("*********" + this.state.moneyGoalStreamsNeeded)
    this.setState({moneyGoalInput: e});
    this.calculate();
  }

  moneyGoal(){
    let moneyGoalInput = parseFloat(this.state.moneyGoalInput);
    let moneyGoalStreamsNeeded;

    if(this.state.recordDealSelected === "royalty" || this.state.recordDealSelected === "labelServices"){
      moneyGoalStreamsNeeded = (moneyGoalInput - parseFloat(this.state.advance) + (this.state.totRecoupe)) / ((parseFloat(this.state.sliderValue)/100) * this.weightedAverageOfSelected())
    } else {
      moneyGoalStreamsNeeded = ((moneyGoalInput / (parseFloat(this.state.sliderValue)/100)) + parseFloat(this.state.advance)) / this.weightedAverageOfSelected()
    }
    console.log("*********" + moneyGoalStreamsNeeded)
  }

  percentRecouped(){
    let recoupPercent = 0;
    if(this.state.totRecoupe > 0) {
      if ((this.state.artistRecordEarnings / this.state.totRecoupe) > 1){
        recoupPercent = 100
      } else {
        recoupPercent = ((this.state.artistRecordEarnings / this.state.totRecoupe) * 100)
        recoupPercent.toFixed(0);
      }
    }
    //return recoupPercent;
    this.setState({seriesRadial: recoupPercent},() => {
    this.calculate();
  });
  }



}


export default TestCompPage;
