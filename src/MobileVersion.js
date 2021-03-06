import React from 'react';
import NumberFormat from 'react-number-format';
import './App.css';
import SmallText from './components/SmallText.js';
import TitleText from './components/TitleText.js';
import SelectButton from './components/SelectButton.js';
import NumberInput from './components/NumberInput.js';
import SingleDropDown from './components/SingleDropDown.js';
import MarketingDropDown from './components/MarketingCostDropDown.js';
import MultiDropDown from './components/MultiDropDown.js';
import BarChart from './components/BarChart.js';
import RadialChart from './components/RadialChart.js';
import DealSplitSlider from './components/DealSplitSlider.js';
import StreamSlider from './components/StreamSlider.js';
import Accordion from './components/Accordion.js';
import Checkbox from './components/Checkbox.js';
import ToolTip from './components/ToolTip.js';
import SwitchButton from './components/SwitchButton.js';

import './stylesheets/MobilePage.css';

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

class MobileVersion extends React.Component{
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
        this.costsRecordingRef = React.createRef();
        this.costsMarketingRef = React.createRef();
        this.costsDistributionRef = React.createRef();
        this.costsMiscRef = React.createRef();
        this.dealSliderRef = React.createRef();
        this.estStreamsRef = React.createRef();
        this.streamsSliderRef = React.createRef();
        this.marketingDropDownRef = React.createRef();
        this.labelServicesSelectedRef = React.createRef();
        this.barchartRef = React.createRef();

        this.state = {
            providers: [spotify, apple, youtube, amazon, google, pandora, deezer, amazonDig, tidal],
            streamNumber: 0,
            role: null,
            recordDeal: [],
            publishDeal: [],
            labelServices: [],
            sliderValue: 50,
            recordDealSelected: null,
            publishingDealSelected: null,
            advance: 0,
            grossRecordingRev: 0,
            moneyGoalChecked: false,
            autoRecoupChecked: false,
            recordingCostChecked: true,
            distributionCostChecked: true,
            miscCostChecked: true,
            grossPubRev: 0,
            grossTotalRev: 0,
            totRecoupe: 0,
            labelShare: 0,
            labelPublishingShare: 0,
            publisherShare: 0,
            artistRecordEarnings: 0,
            labelServicesCosts: 0,
            artistUnrecoupedAmount: 0,
            artistWriterEarnings: 0,
            artistTotalEarnings: 0,
            recoupStreamsNeeds: 0,
            marketingValSelected: 0.0,
            moneyGoalInput: 0,
            moneyGoalStreamsNeeded: 0,
            seriesBar: [{
              name: 'From Recording',
              data: [0, 0, 0]
            }, {
              name: 'From Writing',
              data: [0, 0, 0]
            },{
              name: 'From Advance',
              data: [0, 0, 0]
            }
          ],
          seriesRadial: [],
          roleTypes: roleTypes,
          costsTotal: 0,
          costsRecording: 0,
          costsMarketing: 0,
          costsDistribution: 0,
          costsMisc: 0,
          streamValue: 0,
        };

    }

    componentDidMount() {
        this.buildRecordDealSelect();
        this.handleRoleButton();
        this.buildPublishingDealSelect();
        this.buildLabelServicesSelect();
        this.setSliderValue(50);
        this.calculate();
    }


    render() {
      return (
        <div>
          <div className="mobile-main-container">
              <div style={{textAlign: 'center'}}>
                <TitleText className="title-text" text="What's My Stream?" />
              </div>
              <Accordion style={{backgroundColor: '#000'}}
                  title="About You"
                  body={
                  <div style={{flexDirection: 'column', backgroundColor: '#fff'}}>
                      <div>
                        <SmallText text="Your Role:" style={{textAlign: 'left', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                          {this.state.roleTypes.map(type => (
                            <SelectButton ref={type.ref}
                              key={type.id}
                              onChange={e => this.handleMyClick(type.id)}
                              text={type.name}
                            />))}
                          </div>
                      </div>
                    <div>
                      {this.state.role !== "writer" &&
                        <div style={{margin: '3% 0% 4% 0%', borderTop: 'thin solid #f0f0f0'}}>
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
                                <MultiDropDown ref={this.labelServicesSelectedRef}
                                  options={this.state.labelServices}
                                  default={this.state.labelServices[0]}
                                  onChange={e => this.changeLabelServicesDropDown(e)}
                                />
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
                              pattern="[0-9]*"
                              label = "Advance on Earnings"
                              locked = {false}
                              active = {false}
                              onChange = {e => this.getStateAdvance(e)}/>
                          </div>
                        </div>
                      }
                      {this.state.role !== "artist" &&
                        <div style={{borderTop: 'thin solid #f0f0f0', marginBottom: '5%'}}>
                          <SmallText text="Publishing Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                          <SingleDropDown
                              ref={this.pubTypeRef}
                              options={pubDealOptions}
                              onChange = {e => this.getStatePubDeal(e)}
                          />
                        </div>
                      }
                    </div>
                  </div>
                  }/>

                <Accordion
                    title="Your Streams"
                    body={
                      <div style={{flexDirection: 'column', backgroundColor: '#fff'}}>
                          <div style={{alignItems: 'center'}}>
                            <SmallText text="Estimated Streams" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                            <NumberInput ref={this.estStreamsRef}
                               id={0}
                               pattern="[0-9]*"
                               label="Estimated Streams"
                               locked={false}
                               active={false}
                               onChange={e => this.changeStreams(e)}/>
                            <StreamSlider ref={this.streamsSliderRef} values={[this.state.streamNumber]} domain={[0, (this.state.streamNumber+1)*2]} onChange={e => this.updateStreamSlider(e)}/>
                            <div>
                              <Accordion
                                  title="Which DSPs Are Included?"
                                  body={
                                    <div>
                                    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row'}}>
                                      {this.state.providers.map((provider) =>
                                      <SelectButton
                                        ref={provider.ref}
                                        key={provider.id}
                                        text={provider.name}
                                        onChange = {e => this.getButtonClick(provider.id)}/>)}
                                    </div>
                                      <SmallText text={`You Make $${this.state.streamValue.toFixed(5)} per stream`}/>
                                    </div>
                                  }/>
                            </div>
                          </div>
                      </div>

                }/>

              <Accordion
                title="Your Costs"
                body={
                  <div>
                    <NumberFormat value={`${this.state.costsTotal.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: '2%', marginBottom: '5%'}}>{`Costs: ${value}`}</div>} />
                    <div style={{justifyContent:'center'}}>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '3%'}}>
                            <NumberInput
                              id= {"costsRecording"}
                              pattern="[0-9]*"
                              ref = {this.costsRecordingRef}
                              label="Recording Costs"
                              locked={false}
                              active={false}
                              onChange = {e => this.getStateCostsRecording(e)}/>
                            <div>
                              <SmallText text="Recoupable" style={{fontSize: '10px', margin: '-8px 0px 2px 2px'}}/>
                              <SwitchButton onChange={e => this.changeCheckboxes("recording")} checked={this.state.recordingCostChecked} />
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '3%', paddingRight: '2%'}}>
                            <NumberInput
                              id= {"costsMarketing"}
                              pattern="[0-9]*"
                              ref = {this.costsMarketingRef}
                              label="Marketing Costs"
                              locked={false}
                              active={false}
                              onChange = {e => this.getStateCostsMarketing(e)}/>
                          <div style={{marginLeft: '2%', width: '46%'}}>
                            <MarketingDropDown
                              ref={this.marketingDropDownRef}
                              selectedOption={marketingSplitOptions[2]}
                              options={marketingSplitOptions}
                              defaultValue={marketingSplitOptions[0]}
                              onChange={e => this.calcMarketingCosts()}
                              />
                          </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '3%'}}>
                            <NumberInput
                              id= {"costsDistribution"}
                              pattern="[0-9]*"
                              ref = {this.costsDistributionRef}
                              label="Distribution Costs"
                              locked={false}
                              active={false}
                              onChange = {e => this.getStateCostsDistribution(e)}/>
                            <div>
                              <SwitchButton onChange={e => this.changeCheckboxes("distribution")}  checked={this.state.distributionCostChecked}/>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <NumberInput
                              id= {"costsMisc"}
                              pattern="[0-9]*"
                              ref = {this.costsMiscRef}
                              label="Misc. Costs"
                              locked={false}
                              active={false}
                              onChange = {e => this.getStateCostsMisc(e)}/>
                            <div>
                              <SwitchButton onChange={e => this.changeCheckboxes("misc")}  checked={this.state.miscCostChecked}/>
                            </div>
                        </div>
                    </div>
                  </div>
                }/>


              <Accordion
                title="Advanced Record Deal Calculations"
                body={
                  <div>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                      <div style={{flexDirection: 'column', width: '50%', paddingRight: '3%', borderRight: 'thin solid #252c78'}}>
                        <SmallText text="Auto Recoup" style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: 'auto', marginBottom: 0 }}/>
                        <SwitchButton onChange={e => this.handleAutoRecoup()} checked={this.state.autoRecoupChecked}/>
                        <NumberFormat value={`${this.state.recoupStreamsNeeds.toFixed(0)}`} displayType={'text'} thousandSeparator={true} renderText={value => <div style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747', padding: '5% 0% 5% 0%'}}>{`Streams Needed: ${value}`}</div>} />
                      </div>
                      <div style={{flexDirection: 'column', paddingLeft: '3%', justifyContent: 'center', width: '50%'}}>
                        <ToolTip content="Advance is included in revenue earned" direction="top">
                          <SmallText text="Money Goal" style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: 'auto', marginBottom: 0 }}/>
                        </ToolTip>
                        <SwitchButton onChange={e => this.handleMoneyGoalCheckbox()} checked={this.state.moneyGoalChecked}/>
                        <NumberInput
                          id= {"moneyGoalInput"}
                          pattern="[0-9]*"
                          ref = {this.moneyGoalInputRef}
                          label="I want to Make..."
                          locked={false}
                          active={false}
                          onChange = {e => this.getStateMoneyGoalInput(e)}/>
                        <NumberFormat value={`${this.state.moneyGoalStreamsNeeded.toFixed(0)}`} displayType={'text'} thousandSeparator={true} renderText={value => <div style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: '3%'}}>{`Streams Needed: ${value}`}</div>} />
                      </div>
                    </div>
                  </div>
                }/>


                  <div className="mobile-results-container">
                    <div>
                      <div>
                        <SmallText className="subtitle" text="Your Results" />
                        <NumberFormat value={`${this.state.artistTotalEarnings.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{ fontSize: '26px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginBottom: 0, marginTop: '3%' }}>{`You've Earned: ${value}`}</div>} />
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                            <NumberFormat value={`${this.state.grossTotalRev.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{ fontSize: '20px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginBottom: '10%'}}>{`Total Revenue Generated: ${value}`}</div>} />
                            <NumberFormat value={`${this.state.totRecoupe.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{ fontSize: '18px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747' }}>{`Total Recoupable Money: ${value}`}</div>} />
                          </div>
                          <RadialChart series={this.state.seriesRadial} height={200} width={150}/>
                        </div>
                      </div>
                      {/*<div>
                        <BarChart ref={this.barchartRef} series={this.state.seriesBar}/>
                      </div>*/}
                    </div>
                  </div>

          </div>
          <div className="footer">
            <div style={{width: '92%'}}>
              <SmallText className="subtitle" text="About This Tool:"/>
              <p>What are your streams worth? This Streaming Calculator was made to model music streaming revenue, and give more clarity on the roles in the music industry that effect streaming revenue. These figures are estimates and can be used as a guide to know your worth.</p>
              <a href={'https://nikhilanand3.medium.com/simulating-music-streaming-revenue-59ec1ad1db6'} target={'blank'}>See Our Full Write-up Here</a>
              <p>Created By: <a href={'https://www.linkedin.com/in/nikhil-anand-/'} target={'blank'}>Nikhil Anand,</a> <a href={'mailto:svincent3@berklee.edu'} target={'blank'}>Sam Vincent,</a> <a href={'https://www.linkedin.com/in/alperrin/'} target={'blank'}>Alexandre Perrin,</a> & <a href={'https://www.linkedin.com/in/pete-dyson-70b61b21/'} target={'blank'}>Pete Dyson</a></p>
            </div>
          </div>
        </div>

        )
    }

  changeLabelServicesDropDown(e) {

    if(e.selectedOption !== null && e.selectedOption !== this.state.selectedOptions) {
      this.setState({selectedOptions: e.selectedOption}, () => {
        this.setState({labelServices: this.updateLabelServicesSelect()}, () => {

          console.log(e)
          let lblCosts = 0;
          for(let i=0; i<e.selectedOption.length; i++) {
            lblCosts += this.state.labelServices[parseInt(e.selectedOption[i].id)].amt;
          }

          if(this.state.labelServicesCosts !== lblCosts) {
            this.setState({labelServicesCosts: lblCosts}, () => {this.calcTotalCosts();})
          }
        })
      })
    }
  }

  updateLabelServicesSelect() {
      let stemDistribution = {
          id: 0,
          value: "stemDistribution",
          label: 'Stem Distribution',
          amt: (parseInt(this.state.artistRecordEarnings)* 0.1),
          selected: true

      }
      let advertising = {
          id: 1,
          value: "advertising",
          label: 'Avertising',
          amt: 2500,
          selected: false

      }
      let analytics = {
          id: 2,
          value: "analytics",
          label: 'Analytics',
          amt: 2500,
          selected: false

      }
      let royaltyAccounting = {
          id: 3,
          value: "royaltyAccounting",
          label: 'Royalty Accounting',
          amt: (parseInt(this.state.artistRecordEarnings) * 0.05),
          selected: false

      }
      let splitPayments = {
          id: 4,
          value: "splitPayments",
          label: 'Split Payments',
          amt: 1000,
          selected: false

      }

      let services = [stemDistribution, advertising, analytics, royaltyAccounting, splitPayments]
      return services;
  }

  handleMoneyGoalCheckbox() {
    this.setState({moneyGoalChecked: !this.state.moneyGoalChecked}, () => {
      this.calculate();
    })
  }

  handleAutoRecoup() {
    this.setState({autoRecoupChecked: !this.state.autoRecoupChecked}, () => {
      this.calculate();
    })
  }

  calcMarketingCosts() {
    if(this.marketingDropDownRef.current.state.selectedOption !== null && this.state.marketingValSelected !== this.marketingDropDownRef.current.state.selectedOption.value) {
      this.setState({marketingValSelected: this.marketingDropDownRef.current.state.selectedOption.value}, () => {this.calcTotalCosts();})
    }
  }

  changeCheckboxes(whichOne) {

    if(whichOne === "recording") {
      this.setState({recordingCostChecked: !this.state.recordingCostChecked}, () => {this.calcTotalCosts();})
    }
    if(whichOne === "distribution") {
      this.setState({distributionCostChecked: !this.state.distributionCostChecked}, () => {this.calcTotalCosts();})
    }
    if(whichOne === "misc") {
      this.setState({miscCostChecked: !this.state.miscCostChecked}, () => {this.calcTotalCosts();})
    }
  }

  updateStreamSlider(e) {
    if(this.state.streamNumber !== this.streamsSliderRef.current.state.values[0] && this.streamsSliderRef.current.state.values[0] !== this.estStreamsRef.current.state.value) {
      const state = this.streamsSliderRef.current.state.values[0];
      this.estStreamsRef.current.setState({value: state});
        this.setState({streamNumber: state}, () =>
        {this.calculate()})
    }
  }

  getRoleButton(name){

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

    if(this.state.providers[id].ref.current.state.button !== null && this.state.providers[id].ref.current.state.button !== this.state.providers[id].includeInCalculations) {
      this.toggleMe(id);
    }

  }

  calcTotalCosts(){
    let costsTotal = 0;

    if(this.state.recordingCostChecked) costsTotal += this.state.costsRecording;
    if(this.state.distributionCostChecked) costsTotal += this.state.costsDistribution;
    if(this.state.miscCostChecked) costsTotal += this.state.costsMisc;
    if(this.marketingDropDownRef.current.state.selectedOption === null) {
      costsTotal += this.state.costsMarketing;
    }
    else costsTotal += (this.state.costsMarketing * this.marketingDropDownRef.current.state.selectedOption.value)

    if(this.state.recordDealSelected === "labelServices") {
      costsTotal += this.state.labelServicesCosts;
    }

    //costsTotal = parseFloat(this.state.costsRecording) + parseFloat(this.state.costsMarketing) + parseFloat(this.state.costsDistribution) + parseFloat(this.state.costsMisc);

    this.setState({
      costsTotal: costsTotal
    },() => {this.updateRecoupable();
    })


  }

  updateRecoupable(){
    let ret = this.state.costsTotal + this.state.advance;
    this.setState({totRecoupe: ret}, () => {this.calculate()})

  }

  getStateCostsRecording(){

    if(this.costsRecordingRef.current.state.value !== "" && parseInt(this.costsRecordingRef.current.state.value) !== this.state.costsRecording) {
      const e = parseInt(this.costsRecordingRef.current.state.value);
      this.updateCostsRecording(e);
    }
  }

  updateCostsRecording(e){

      this.setState({costsRecording: e}, () => {
          this.calcTotalCosts();
      });
  }

  getStateCostsMarketing(){

    if(this.costsMarketingRef.current.state.value !== "" && parseInt(this.costsMarketingRef.current.state.value) !== this.state.costsMarketing) {
      const e = parseInt(this.costsMarketingRef.current.state.value);
      this.updateCostsMarketing(e);
    }
  }

  updateCostsMarketing(e){

      this.setState({costsMarketing: e}, () => {
          this.calcTotalCosts();
      });
  }

  getStateCostsDistribution(){

    if(this.costsDistributionRef.current.state.value !== "" && parseInt(this.costsDistributionRef.current.state.value) !== this.state.costsDistribution) {
      const e = parseInt(this.costsDistributionRef.current.state.value);
      this.updateCostsDistribution(e);
    }
  }

  updateCostsDistribution(e){

      this.setState({costsDistribution: e}, () => {
          this.calcTotalCosts();
      });
  }

  getStateCostsMisc(){

    if(this.costsMiscRef.current.state.value !== "" && parseInt(this.costsMiscRef.current.state.value) !== this.state.costsMisc) {
      const e = parseInt(this.costsMiscRef.current.state.value);
      this.updateCostsMisc(e);
    }
  }

  updateCostsMisc(e){

      this.setState({costsMisc: e}, () => {
          this.calcTotalCosts();
      });
  }

  getStateAdvance(){

    if(this.advanceRef.current.state.value !== "" && parseInt(this.advanceRef.current.state.value) !== this.state.advance) {
        const e = parseInt(this.advanceRef.current.state.value);
        this.updateAdvance(e);
    }
  }

  getStatePubDeal(){

    if(this.pubTypeRef.current.state.selectedOption !== null && this.pubTypeRef.current.state.selectedOption.value !== this.state.publishingDealSelected) {
      const e = this.pubTypeRef.current.state.selectedOption.value;
      this.handlePublishingDealSelect(e);
    }
    //const node = this.dealTypeRef.current;
  }

  getStateRecDeal(){

    if(this.dealTypeRef.current.state.selectedOption !== null && this.dealTypeRef.current.state.selectedOption.value !== this.state.recordDealSelected) {
      const e = this.dealTypeRef.current.state.selectedOption.value;
      this.handleRecDealSelect(e);
    }
    //const node = this.dealTypeRef.current;
  }

  handleMyClick(id){

    //this.setState({role: id});
    if(id==="artist" && this.state.roleTypes[0].selected !== this.state.roleTypes[0].ref.current.state.button) {
      this.state.roleTypes[0].selected = true;
      this.state.roleTypes[0].ref.current.setState({button: true});
      this.state.roleTypes[1].selected = false;
      this.state.roleTypes[1].ref.current.setState({button: false});
      this.state.roleTypes[2].selected = false;
      this.state.roleTypes[2].ref.current.setState({button: false});
      this.setState({role: "artist"}, () => {this.calculate()});

    }
    if(id==="writer" && this.state.roleTypes[1].selected !== this.state.roleTypes[1].ref.current.state.button) {
      this.state.roleTypes[0].selected = false;
      this.state.roleTypes[0].ref.current.setState({button: false});
      this.state.roleTypes[1].selected = true;
      this.state.roleTypes[1].ref.current.setState({button: true});
      this.state.roleTypes[2].selected = false;
      this.state.roleTypes[2].ref.current.setState({button: false});
      this.setState({role: "writer"}, () => {this.calculate()});
    }
    if(id==="both" && this.state.roleTypes[2].selected !== this.state.roleTypes[2].ref.current.state.button) {
      this.state.roleTypes[0].selected = false;
      this.state.roleTypes[0].ref.current.setState({button: false});
      this.state.roleTypes[1].selected = false;
      this.state.roleTypes[1].ref.current.setState({button: false});
      this.state.roleTypes[2].selected = true;
      this.state.roleTypes[2].ref.current.setState({button: true});
      this.setState({role: "both"}, () => {this.calculate()});
    }
  }

  changeStreams(e){

      if(this.estStreamsRef.current.state.value !== "" && parseInt(this.estStreamsRef.current.state.value) !== this.state.streamNumber) {
          const l = parseInt(this.estStreamsRef.current.state.value);
          this.updateStreams(l);
      }
  }

  updateStreams(e){
      this.setState({streamNumber: e}, () => {
          this.streamsSliderRef.current.setState({values: [e]})
          this.estStreamsRef.current.setState({value: e}, () => {this.calculate();})
      });
  }

  updateAdvance(e){

      this.setState({advance: e}, () => {
          this.calculate();
      });
   }

  setSliderValue(val){
      this.setState( {sliderValue: val});
      this.calculate();
  }

  updateSlider(e){

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

      this.setState({publishingDealSelected: e}, () => {this.calculate()});
  }

  handleRoleButton(which){

      this.setState({role: which})
      this.calculate();
  }

  handleRecDealSelect(e){

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
     this.setState({recordDealSelected: e}, () => {this.calculate()})
  }

  changeSliderVal(val){
      this.dealSliderRef.current.setState({values: [val]});
  }

  doSliderStuff(e){
    if(this.dealSliderRef.current.state.values !== null && this.dealSliderRef.current.state.values[0] !== this.state.sliderValue) {
      this.setState({sliderValue: this.dealSliderRef.current.state.values[0]}, () => {this.calculate();});
    }
  }

  buildRecordDealSelect(){
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
    this.calculate();
  }

  calculate(){
      //this.calcTotalCosts();
      this.getPublisherShare();
      let artistRecordShare = 0;
      let labelShare = 0;
      let artistUnrecoupedAmount = 0;
      let totalCosts = this.state.costsTotal//parseFloat(this.state.costsRecording) + parseFloat(this.state.costsMarketing) + parseFloat(this.state.costsDistribution) + parseFloat(this.state.costsMisc);
      let totalMoneyToRecoupe = parseFloat(this.state.advance) + totalCosts;
      let grossRevenue = 0;
      if(!this.state.autoRecoupChecked && !this.state.moneyGoalChecked) grossRevenue = this.state.streamNumber * this.weightedAverageOfSelected();
      if (this.state.autoRecoupChecked) grossRevenue = this.state.recoupStreamsNeeds * this.weightedAverageOfSelected();
      if (this.state.moneyGoalChecked) grossRevenue = this.state.moneyGoalStreamsNeeded * this.weightedAverageOfSelected();

      if (this.state.recordDealSelected === "royalty") {
          // Artist Split
          if((grossRevenue * (parseFloat(this.state.sliderValue)/100)) <= totalMoneyToRecoupe){
            artistRecordShare = 0;
            artistUnrecoupedAmount = Math.abs((grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe);
          } else {
            artistRecordShare = (grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe;
          }
          labelShare = grossRevenue * (1-(parseFloat(this.state.sliderValue)/100));

      } else if (this.state.recordDealSelected === "netProfit" || this.state.recordDealSelected === "distributionPercent" || this.state.recordDealSelected === "distributionFee") {
          let profit = (grossRevenue - this.state.costsTotal);
          // Artist Split
          if(((profit * (parseFloat(this.state.sliderValue)/100)) - parseFloat(this.state.advance)) < 0){
            artistRecordShare = 0;
            artistUnrecoupedAmount = Math.abs(((grossRevenue - totalCosts)*(parseFloat(this.state.sliderValue)/100)) - parseFloat(this.state.advance));
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
            artistRecordShare = 0;
          } else {
            artistRecordShare = (grossRevenue * (parseFloat(this.state.sliderValue)/100)) - totalMoneyToRecoupe;
          }
          labelShare = grossRevenue * (1-(parseFloat(this.state.sliderValue)/100)) + this.state.costsTotal;//extra menu items would be factored into costs
      }

      this.setState({
        grossRecordingRev: grossRevenue,
        totRecoupe: totalMoneyToRecoupe,
        artistRecordEarnings: artistRecordShare,
        labelShare: labelShare,
        artistUnrecoupedAmount: artistUnrecoupedAmount,
        streamValue: this.weightedAverageOfSelected()
        }, () => {

          this.getArtistTotalEarnings();
          this.getGrossTotalEarnings();
          this.updateGraphs();
          this.percentRecouped();
          this.autoRecoup();
          this.moneyGoal();
        });


  }

  updateGraphs() {
    this.setState({seriesBar:
      [{
              name: 'From Recording',
              data: [this.state.artistRecordEarnings.toFixed(0), this.state.labelShare.toFixed(0), 0]
            }, {
              name: 'From Writing',
              data: [this.state.artistWriterEarnings.toFixed(0), this.state.labelPublishingShare.toFixed(0), this.state.publisherShare.toFixed(0)]
            },{
              name: 'From Advance',
              data: [this.state.advance.toFixed(0), 0, 0]
            }
          ]
    })
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
      case 'Admin':
        publisherPercentage = 0.1;
        break;
      case 'No Deal':
        publisherPercentage = 0.0;
        break;
      default:
        publisherPercentage = 0.0;
    }

    let publisherShare = ((pubPerformanceRevenue - pubPROAdminFee) * .5) * publisherPercentage
    let artistWriterEarnings = ((pubPerformanceRevenue - pubPROAdminFee) * .5) + (((pubPerformanceRevenue - pubPROAdminFee) * .5) * (1 - publisherPercentage)) + (pubMechanicalRevenue - (pubMechanicalAdminFee + pubMechanicalRecordFee))

    this.setState({
      publisherShare: publisherShare,
      artistWriterEarnings: artistWriterEarnings,
      grossPubRev: pubGrossRevenue,
      labelPublishingShare: pubMechanicalRecordFee
    });
  }

  weightedAverageOfSelected(){

      let sum = 0.0;
      for(let i=0; i < this.state.providers.length; i++) {
        if(this.state.providers[i].includeInCalculations) {
              sum += (this.state.providers[i].payoutPerStream * this.state.providers[i].marketShareStreams)
          }
      }
      let sumOfWeights = 0.0;
      for(let i=0;i < this.state.providers.length; i++) {
        if(this.state.providers[i].includeInCalculations) {
          sumOfWeights += this.state.providers[i].marketShareStreams
        }
      }
      if(sumOfWeights <= 0.0) return 0.0
      let ret = sum/sumOfWeights
      return ret;
  }

  getArtistTotalEarnings(){
      if(this.state.role === "both") {
          this.setState({artistTotalEarnings: this.state.artistRecordEarnings + (this.state.artistWriterEarnings > 0 ? this.state.artistWriterEarnings : 0)});
      } else if(this.state.role === "artist") {
          this.setState({artistTotalEarnings: this.state.artistRecordEarnings});
      } else if(this.state.role === "writer") {
          this.setState({artistTotalEarnings: (this.state.artistWriterEarnings > 0 ? this.state.artistWriterEarnings : 0)});
      }
  }

  getGrossTotalEarnings(){
    this.setState({grossTotalRev: this.state.grossRecordingRev + this.state.grossPubRev}, () => {});
  }

  autoRecoup(){
    let recoupStreamsNeeds;

    if(this.state.recordDealSelected === "royalty" || this.state.recordDealSelected === "labelServices"){
       recoupStreamsNeeds = (this.state.totRecoupe/(parseFloat(this.state.sliderValue)/100)) / this.weightedAverageOfSelected()
     } else {
       recoupStreamsNeeds = ((this.state.costsTotal + this.state.advance) / (parseFloat(this.state.sliderValue)/100)) / this.weightedAverageOfSelected()
     }

    this.setState({
      recoupStreamsNeeds: recoupStreamsNeeds
    })
  }

  getStateMoneyGoalInput(){

    if(this.moneyGoalInputRef.current.state.value !== "" && parseInt(this.moneyGoalInputRef.current.state.value) !== this.state.moneyGoalInput)
      {
       const e = parseInt(this.moneyGoalInputRef.current.state.value);
       this.updateMoneyGoal(e);
      }
  }

  updateMoneyGoal(e){

    this.setState({moneyGoalInput: e}, () => {this.calculate();});

  }

  moneyGoal(){
    let moneyGoalInput = parseFloat(this.state.moneyGoalInput);
    let moneyGoalStreamsNeeded;

    if(this.state.recordDealSelected === "royalty" || this.state.recordDealSelected === "labelServices"){
      moneyGoalStreamsNeeded = (moneyGoalInput - parseFloat(this.state.advance) + (this.state.totRecoupe)) / ((parseFloat(this.state.sliderValue)/100) * this.weightedAverageOfSelected())
    } else {
      moneyGoalStreamsNeeded = ((moneyGoalInput / (parseFloat(this.state.sliderValue)/100)) + parseFloat(this.state.costsTotal)) / this.weightedAverageOfSelected()
    }

    this.setState({
      moneyGoalStreamsNeeded: moneyGoalStreamsNeeded
    })
  }

  percentRecouped(){
    let recoupPercent = 0;
    if(this.state.totRecoupe > 0) {
      if ((this.state.artistRecordEarnings / this.state.totRecoupe) > 1){
        recoupPercent = 100
      } else {
        if(this.state.grossRecordingRev !== 0) {
          recoupPercent = (((this.state.totRecoupe - this.state.artistUnrecoupedAmount)/this.state.totRecoupe) * 100).toFixed(0)
        } else {
          recoupPercent = 0
        }
      }
    }
    //return recoupPercent;
    this.setState({seriesRadial: [recoupPercent]},() => {
    // this.calculate();
  });
  }

  buildLabelServicesSelect(){
      let stemDistribution = {
          id: 0,
          value: "stemDistribution",
          label: 'Stem Distribution',
          amt: (parseInt(this.state.artistRecordEarnings)* 0.1),
          selected: true

      }
      let advertising = {
          id: 1,
          value: "advertising",
          label: 'Avertising',
          amt: 2500,
          selected: false

      }
      let analytics = {
          id: 2,
          value: "analytics",
          label: 'Analytics',
          amt: 2500,
          selected: false

      }
      let royaltyAccounting = {
          id: 3,
          value: "royaltyAccounting",
          label: 'Royalty Accounting',
          amt: (parseInt(this.state.artistRecordEarnings) * 0.05),
          selected: false

      }
      let splitPayments = {
          id: 4,
          value: "splitPayments",
          label: 'Split Payments',
          amt: 1000,
          selected: false

      }

      let services = [stemDistribution, advertising, analytics, royaltyAccounting, splitPayments]
      this.setState( {labelServices: services})
  }
}


export default MobileVersion;
