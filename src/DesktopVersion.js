import React from 'react';
import NumberFormat from 'react-number-format';
import {BrowserView, MobileView, MobileOnlyView} from 'react-device-detect';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
import PubDealSplitSlider from './components/PubDealSplitSlider.js';
import StreamSlider from './components/StreamSlider.js';
import Accordion from './components/Accordion.js';
import Checkbox from './components/Checkbox.js';
import ToolTip from './components/ToolTip.js';
import Popup from './components/PopUp.js';
import SwitchButton from './components/SwitchButton.js';
import Circle from './components/circle.js';


import './stylesheets/DesktopPage.css';
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
  { value: 'Co-Publishing', label: 'Co-publishing' },
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

class DesktopVersion extends React.Component{
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
        this.pubDealSliderRef = React.createRef();
        this.estStreamsRef = React.createRef();
        this.streamsSliderRef = React.createRef();
        this.marketingDropDownRef = React.createRef();
        this.labelServicesSelectedRef = React.createRef();
        this.numbWritersRef = React.createRef();
        this.writerPercentWrittenRef = React.createRef();

        this.state = {
            providers: [spotify, apple, youtube, amazon, google, pandora, deezer, amazonDig, tidal],
            streamNumber: 0,
            role: null,
            recordDeal: [],
            publishDeal: [],
            labelServices: [],
            sliderValue: 25,
            pubSliderValue: 100,
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
            // labelPublishingShare: 0,
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
          selectedOptions: [],
          roleTypes: roleTypes,
          costsTotal: 0,
          costsRecording: 0,
          costsMarketing: 0,
          costsDistribution: 0,
          costsMisc: 0,
          streamValue: 0,
          proFee: 0,
          pubDistributionFee: 0,
          pubArtistWriterShare: 0,
          pubArtistPubShare: 0,
          pubArtistMechShare: 0,
          numbWriters: 1,
          writerPercentWritten: 100,
          writerownershippercentage: 0,
        };

    }

    componentDidMount() {
        this.buildRecordDealSelect();
        this.handleRoleButton();
        this.buildPublishingDealSelect();
        this.buildLabelServicesSelect();
        this.setSliderValue(25);
        this.pubSetSliderValue(100);
        this.calculate();
    }


    render() {
      return (
      <div>
        <BrowserView>
          <div>
            <div className="main-container">
              <div style={{marginBottom: '1%', textAlign: 'center'}}>
                <TitleText className="title-text" text="What's My Stream?" />
              </div>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                <div className="calc-container">
                <SmallText className="subtitle container-title-calc" text="Calculator"/>
                  <div className="artist-role">
                    <SmallText text="Your Role: " style={{fontSize: '18px', fontWeight: 'bold', lineHeight: '1.00', color: '#323747'}}/>
                    {this.state.roleTypes.map(type => (
                      <SelectButton ref={type.ref}
                        key={type.id}
                        onChange={e => this.handleMyClick(type.id)}
                        text={type.name}
                      />))}
                  </div>
                  <div className="deal-container">
                    <div className="record-deal">
                      {this.state.role !== "writer" &&

                        <div>
                          <div>
                            <div>
                              <SmallText text="Recording Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                              <SingleDropDown
                                  ref={this.dealTypeRef}
                                  options={labelDealOptions}
                                  selectedOption={labelDealOptions[0]}
                                  onChange = {e => this.getStateRecDeal(e)}/>
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
                            </div>
                            <div>
                              <SmallText text="Deal Split" style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747', marginBottom: '-15px'}}/>
                              <DealSplitSlider ref={this.dealSliderRef}
                                  onChange = {e => this.doSliderStuff(e)}/>
                            </div>
                            <div>
                              <SmallText text="Record Deal Advance" style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747', marginBottom: '0'}}/>
                              <NumberInput
                                ref={this.advanceRef}
                                id= {"numInput"}
                                label = "Advance on Earnings"
                                onChange = {e => this.getStateAdvance(e)}/>
                            </div>
                          </div>
                        </div>
                      }
                    </div>

                    <div className="pub-deal">
                      {this.state.role !== "artist" &&
                        <div>
                          <div>
                            <SmallText text="Publishing Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                            <SingleDropDown
                                ref={this.pubTypeRef}
                                options={pubDealOptions}
                                selectedOption={pubDealOptions[1]}
                                onChange = {e => this.getStatePubDeal(e)}
                            />
                          </div>
                          {/*<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '5%'}}>
                            <div style={{width: '45%'}}>
                              <NumberInput
                                id={"numbWriters"}
                                ref={this.numbWritersRef}
                                type="number"
                                label="# of Writers"
                                max="8"
                                maxLength="1"
                                value="1"
                                onChange = {e => this.getStateNumbWriters(e)}
                                error={this.state.numbWriters > 8 ? 'Should have Max 8 writers' : ''}
                              />
                            </div>
                            <div style={{width: '45%'}}>
                              <NumberInput
                                id={"percentwritten"}
                                ref={this.writerPercentWrittenRef}
                                type="number"
                                label="% You Wrote"
                                value={(100 / this.state.numbWriters).toFixed(0)}
                                max="100"
                                onChange = {e => this.getStatewriterPercentWritten(e)}
                                error={this.state.writerPercentWritten > 100 ? '**More than 100%**' : ''}
                                />
                            </div>
                          </div>*/}
                          <div>
                            <SmallText text="Percent of Song You Wrote / Own" style={{ textAlign: 'left', fontSize: '13px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747', marginBottom: '-15px'}}/>
                            <PubDealSplitSlider ref={this.pubDealSliderRef}
                                onChange = {e => this.pubDoSliderStuff(e)}/>
                          </div>
                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'column', width: '140px'}}>
                              <SmallText text="Deal Split" style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747',marginBottom:'5px'}}/>
                              <CircularProgressbar
                                value={this.state.writerownershippercentage}
                                text={`${this.state.writerownershippercentage} / ${100 - this.state.writerownershippercentage}`}
                                styles={buildStyles({
                                  textColor: "#3F8CF3",
                                  pathColor: "#3F8CF3",
                                  trailColor: "#67E09C"
                                })}
                              />
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', width: '120px'}}>
                              <SmallText text="True Ownership" style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747',marginBottom:'5px'}}/>
                              <CircularProgressbarWithChildren
                                value={this.state.pubSliderValue}
                                text={`${this.state.pubSliderValue * (this.state.writerownershippercentage/100)}%`}
                                styles={buildStyles({
                                  pathColor: "#67E09C",
                                  trailColor: "#bbb",
                                  textColor: "#3F8CF3",
                                })}
                              >
                                {/* Foreground path */}
                                <CircularProgressbar
                                  value={this.state.pubSliderValue * (this.state.writerownershippercentage/100)}
                                  styles={buildStyles({
                                    trailColor: "transparent",
                                    pathColor: "#3F8CF3",
                                  })}
                                />
                              </CircularProgressbarWithChildren>
                            </div>
                          </div>
                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '3%'}}>
                            <Circle class={'writerdot'} text={'You/Writer'}/>
                            <Circle class={'publisherdot'} text={'Publisher'}/>
                            <Circle class={'otherdot'} text={'Other'}/>
                          </div>

                        </div>
                      }
                    </div>
                  </div>

                  <div className="stream-container">
                    <SmallText text="Estimated Streams" style={{textAlign: 'center', fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', color: '#323747'}}/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'start'}}>
                      <div style={{width: '45%'}}>
                        <NumberInput
                          ref={this.estStreamsRef}
                          id={0}
                          type="text"
                          label="Estimated Streams"
                          onChange={e => this.changeStreams(e)}/>
                      </div>
                      <div style={{marginLeft: '4%', width: '48%'}}>
                        <StreamSlider ref={this.streamsSliderRef} values={[this.state.streamNumber]} domain={[0, (this.state.streamNumber+1)*2]} onChange={e => this.updateStreamSlider(e)}/>
                      </div>
                    </div>
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
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline'}}>
                                <SmallText text={`You Make $${this.state.streamValue.toFixed(5)} per stream`}/>
                                <ToolTip content="Value is a weighted average of DSP payouts and their market share" direction="top">
                                  <SmallText text="ⓘ" style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: 'auto', marginBottom: 0, paddingLeft: '5px' }}/>
                                </ToolTip>
                              </div>
                            </div>

                          }/>
                    </div>
                  </div>
                  <div className="costs-container">
                    <NumberFormat value={`${this.state.costsTotal.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div style={{fontSize: '24px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: '2%', marginBottom: '3%'}}>{`Costs: ${value}`}</div>} />
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center'}}>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '3%', paddingRight: '2%', width: '50%'}}>
                            <NumberInput
                              id= {"costsRecording"}
                              type="text"
                              ref = {this.costsRecordingRef}
                              label="Recording Costs"
                              onChange = {e => this.getStateCostsRecording(e)}/>
                            <div>
                              <SmallText text="Recoupable" style={{fontSize: '10px', margin: '-8px 0px 2px 2px'}}/>
                              <Checkbox onChange={e => this.changeCheckboxes("recording")} checked={this.state.recordingCostChecked}/>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '3%', paddingRight: '2%', width: '50%'}}>
                            <NumberInput
                              id= {"costsMarketing"}
                              type="text"
                              ref = {this.costsMarketingRef}
                              label="Marketing Costs"
                              onChange = {e => this.getStateCostsMarketing(e)}/>
                          <div style={{marginLeft: '2%', width: '30%'}}>
                            <SmallText text="Recoupable" style={{fontSize: '10px', margin: '-8px 0px 2px 0px'}}/>
                            <MarketingDropDown
                              ref={this.marketingDropDownRef}
                              options={marketingSplitOptions}
                              selectedOption={marketingSplitOptions[2]}
                              onChange={e => this.calcMarketingCosts()}
                              />
                          </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '3%', paddingRight: '2%', width: '50%'}}>
                            <NumberInput
                              id= {"costsDistribution"}
                              type="text"
                              ref = {this.costsDistributionRef}
                              label="Distribution Costs"
                              onChange = {e => this.getStateCostsDistribution(e)}/>
                            <div>
                              <SmallText text="Recoupable" style={{fontSize: '10px', margin: '-8px 0px 2px 2px'}}/>
                              <Checkbox onChange={e => this.changeCheckboxes("distribution")}  checked={this.state.distributionCostChecked}/>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', width: '50%'}}>
                            <NumberInput
                              id= {"costsMisc"}
                              type="text"
                              ref = {this.costsMiscRef}
                              label="Misc. Costs"
                              onChange = {e => this.getStateCostsMisc(e)}/>
                            <div>
                              <SmallText text="Recoupable" style={{fontSize: '10px', margin: '-8px 0px 2px 2px'}}/>
                              <Checkbox onChange={e => this.changeCheckboxes("misc")}  checked={this.state.miscCostChecked}/>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div className="advanced-container">
                    <Accordion
                      title="Advanced Record Deal Calculations"
                      body={
                        <div>
                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                            <div style={{flexDirection: 'column', width: '50%', paddingRight: '3%', borderRight: 'thin solid #252c78'}}>
                            <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                              <SmallText text="Auto Recoup " style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: 'auto', marginBottom: 0 }}/>
                              <ToolTip content="The amount of streams needed to pay back all recoupable monies" direction="top">
                                <SmallText text="ⓘ" style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: 'auto', marginBottom: 0, paddingLeft: '5px' }}/>
                              </ToolTip>
                            </div>
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '8%'}}>
                                <SmallText text="Check" style={{fontSize: '14px', marginBottom: 0}}/>
                                <Checkbox onChange={e => this.handleAutoRecoup()}/>
                              </div>
                              <NumberFormat value={`${this.state.recoupStreamsNeeds.toFixed(0)}`} displayType={'text'} thousandSeparator={true} renderText={value => <div style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747'}}>{`Streams Needed: ${value}`}</div>} />
                            </div>
                            <div style={{flexDirection: 'column', paddingLeft: '3%', justifyContent: 'center', width: '50%'}}>
                              <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <SmallText text="Money Goal " style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: 'auto', marginBottom: 0 }}/>
                                <ToolTip content="Advance is included in revenue earned" direction="top">
                                  <SmallText text="ⓘ" style={{ fontSize: '15px', fontWeight: '600', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: 'auto', marginBottom: 0, paddingLeft: '5px' }}/>
                                </ToolTip>
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '8%'}}>
                                <SmallText text="Check" style={{fontSize: '14px', marginBottom: 0}}/>
                                <Checkbox onChange={e => this.handleMoneyGoalCheckbox()}/>
                              </div>
                              <NumberInput
                                id= {"moneyGoalInput"}
                                ref = {this.moneyGoalInputRef}
                                type="text"
                                label="I want to Make..."
                                onChange = {e => this.getStateMoneyGoalInput(e)}/>
                              <NumberFormat value={`${this.state.moneyGoalStreamsNeeded.toFixed(0)}`} displayType={'text'} thousandSeparator={true} renderText={value => <div style={{ fontSize: '16px', fontWeight: '500', lineHeight: '1.09', textAlign: 'center', color: '#323747', marginTop: '3%'}}>{`Streams Needed: ${value}`}</div>} />
                            </div>
                          </div>
                        </div>
                    }/>
                  </div>
                </div>
                <div className="results-container">
                  <div>
                    <div>
                      <SmallText className="subtitle container-title" text="Results" />
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
                    <div>
                      <Accordion
                          title="Detailed Earnings Breakdown"
                          body={
                            <div>
                              <NumberFormat value={`${this.state.streamNumber}`} displayType={'text'} thousandSeparator={true} renderText={value => <p style={{marginBottom: '0px'}}>{`Earnings from ${value} streams`}</p>} />
                              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                <div style={{flexDirection: 'column', borderRight: 'thin solid #f0f0f0', paddingRight: '4px', width: '50%'}}>
                                  <p>Artist(s)</p>
                                  <NumberFormat value={`${this.state.artistRecordEarnings.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`Recording Earnings: ${value}`}</p>} />
                                  <NumberFormat value={`${this.state.pubArtistWriterShare.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`Writer Earnings from Writer Share: ${value}`}</p>} />
                                  <NumberFormat value={`${this.state.pubArtistPubShare.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`Writer Earnings from Publisher Share: ${value}`}</p>} />
                                  <NumberFormat value={`${this.state.pubArtistMechShare.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`Writer Earnings from Mechanical Revenue: ${value}`}</p>} />
                                </div>
                                <div style={{flexDirection: 'column', paddingLeft: '4px', width: '50%'}}>
                                  <p>Partners</p>
                                  <NumberFormat value={`${this.state.labelShare.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`Record Company Earnings: ${value}`}</p>} />
                                  <NumberFormat value={`${this.state.publisherShare.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`Publisher Earnings: ${value}`}</p>} />
                                  <NumberFormat value={`${this.state.proFee.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`PRO Fee: ${value}`}</p>} />
                                  <NumberFormat value={`${this.state.pubDistributionFee.toFixed(0)}`} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <p>{`Mechanicals Fee: ${value}`}</p>} />
                                </div>
                              </div>
                            </div>}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="desktop-footer">
              <div>
                <h4 style={{marginBottom: '5px', textAlign: 'center'}}>Created By:</h4>
                <ul style={{listStyleType: 'none', textAlign: 'left', marginTop: '0'}}>
                  <li style={{marginBottom: '5px'}}><a href={'https://www.linkedin.com/in/nikhil-anand-/'} target={'blank'}>Nikhil Anand</a></li>
                  <li style={{marginBottom: '5px'}}><a href={'mailto:svincent3@berklee.edu'} target={'blank'}>Sam Vincent</a></li>
                  <li style={{marginBottom: '5px'}}><a href={'https://www.linkedin.com/in/alperrin/'} target={'blank'}>Alexandre Perrin</a></li>
                  <li><a href={'https://www.linkedin.com/in/pete-dyson-70b61b21/'} target={'blank'}>Pete Dyson</a></li>
                </ul>
              </div>
              <div style={{width: '45%'}}>
                <h3 style={{marginBottom: '4px'}}>About This Tool</h3>
                <p style={{marginTop: '0px', fontSize: '18px'}}>What are your streams worth? This Streaming Calculator was made to model music streaming revenue, and give more clarity on the roles in the music industry that effect streaming revenue. These figures are estimates and can be used as a guide to know your worth. <a href={'https://nikhilanand3.medium.com/simulating-music-streaming-revenue-59ec1ad1db6'} target={'blank'}> See our full write-up here.</a></p>
              </div>
              <div className="POPUPS">
                <h4 style={{marginBottom: '5px', textAlign: 'right'}}>Help:</h4>
                <Popup
                  buttonText="Instructions"
                  title="Best Practices for Using this Tool"
                  body={
                    <div>
                      <ol>
                        <li style={{marginBottom: '10px'}}>Enter the information in the "About You." First answer are you the recording artist of the song, the writer, or both. Then you will be prompted to enter informaton about your agreements/deals for each side of the song.</li>
                        <li style={{marginBottom: '10px'}}>Next Enter your estimated streams that you expect to recive from your song(s). You can select which DSPs (aka Streaming Services) your song will be on in this section.</li>
                        <li style={{marginBottom: '10px'}}>Enter any costs associated with the creation and marketing of this song. You can adjust if this value is recoupable or will be partially paid by you.</li>
                        <li>Results are shown in the results section, updated automatically</li>
                        <p>Bonus: In the "advanced record calculations" section you can look to see how many streams are needed to pay back your reacoupable values, and earn a certain income. (Only for Recording Information)</p>
                      </ol>
                      <p>It is important to note that not all deals are the same: A 'bad' deal for you can be an ideal situation for someone else... it's all relative. Additionally, This is only an estimate of what your <strong>streams</strong> are worth. With other revenue sources included (physical albums, synch fees, etc.) your total earnings in reality could vary</p>
                    </div>
                  }/>
                <Popup
                  buttonText="Glossary"
                  title="Glossary of Terms"
                  body={
                    <div>
                      <ul id="uglossary">
                        <li>Admin Deal: A publishing deal where the publishing company administers royalty collection for the artists, and takes a 10% commision of the publishing share of performances royalties for their work</li>
                        <li>Advance: A lump sum of cash given to an artist (usally by a label) as guarenteed earnings for the work create. Repaid against future royalty income</li>
                        <li>Co-Publishing Deal: A publishing deal where the publishing company, for their services, splits the publishing share of performance royalties 50/50 with the writer. The writer(s) maintain all of the writer share of the song</li>
                        <li>Distribution Deal (Fee Based): A record deal where artists receive distribution services from label partner. Revenues are shared with a net profit payout style</li>
                        <li>Distribution Deal (Percent Based): A recording deal where the artists and their label partner split the profits after paying off any expenses inccured</li>
                        <li>DSP: Short for Digital Streaming Platform. A fancy was of saying streaming services</li>
                        <li>Full/Traditional Deal: A publishing deal where the publishing company, for their services, maintains the entire publishing share of performance royalties. The writer(s) maintain all of the writer share of the song</li>
                        <li>Mechanical Royalties: A royalty paid for the right to copy/produce a song into a per-unit recording such as CD, or on-demand stream</li>
                        <li>Net Profit Deal: A recording deal where the artists and their label partner split the profits after paying off any expenses inccured</li>
                        <li>Performance Royalties: A royalty paid for the right to publicly play an artist's music</li>
                        <li>Recoupment: The act of paying back all of an artists owed expenses. If you have paid off all your expenses you are said to be "recouped"</li>
                        <li>PRO: Short for Performance Rights Organziation (ASCAP, BMI, SESAC, etc.). They collect and distribute performance royalties to publishing companies and writers </li>
                      </ul>
                    </div>
                }/>
                <Popup
                  buttonText="Record Deal Informaton"
                  title="Standard Record Deal Points"
                  body={
                    <div>
                      <ul id="urecdeals">
                        <li>Royalty: Artist typically maintains <strong>8-25% of revenue</strong> but first has to pay back any debts to label partner</li>
                        <li>Net Profit: Artist typically <strong>splits profits 50/50</strong> with label partner</li>
                        <li>Distribution (Percent Based): Artist typically maintains <strong>60-75% of profits</strong></li>
                        <li>Distribution (Fee Based): Example: DistroKid. Artist typically maintains <strong>100% of revenue</strong>. Pays distributor flat fees and covers all costs</li>
                        <li>Label Services: Example: AWAL. Artist typically maintains <strong>80% of revenue</strong>. Pays distributor 20% split + Additional Service Fees</li>
                      </ul>
                    </div>
                }/>
              </div>
            </div>
          </div>
        </BrowserView>

        <MobileOnlyView>
          <div>
            <div className="mobile-main-container">
                <div style={{textAlign: 'center'}}>
                  <TitleText className="title-text" text="What's My Stream?" />
                </div>
                <Accordion style={{backgroundColor: '#000'}}
                    title="About You"
                    body={
                    <div style={{flexDirection: 'column', backgroundColor: '#fff'}}>
                        <div className="artist-role-mobile">
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
                          <div style={{margin: '1% 0% 4% 0%', borderTop: 'thin solid #f0f0f0'}}>
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
                            <div>
                              <SmallText text="Publishing Deal Type" style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '1.09', textAlign: 'left', color: '#323747',marginBottom:'5px' }}/>
                              <SingleDropDown
                                  ref={this.pubTypeRef}
                                  options={pubDealOptions}
                                  onChange = {e => this.getStatePubDeal(e)}
                              />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4%'}}>
                              <div style={{width: '45%'}}>
                                <NumberInput
                                  id={"numbWriters"}
                                  ref={this.numbWritersRef}
                                  pattern="[0-9]*"
                                  type="number"
                                  label="# of Writers"
                                  max="8"
                                  value="1"
                                  onChange = {e => this.getStateNumbWriters(e)}
                                  error={this.state.numbWriters > 8 ? 'Should have Max 8 writers' : ''}
                                />
                              </div>
                              <div style={{width: '45%'}}>
                                <NumberInput
                                  id={"percentwritten"}
                                  ref={this.writerPercentWrittenRef}
                                  pattern="[0-9]*"
                                  type="number"
                                  label="% You Wrote"
                                  value={(100 / this.state.numbWriters).toFixed(0)}
                                  max="100"
                                  onChange = {e => this.getStatewriterPercentWritten(e)}
                                  error={this.state.writerPercentWritten > 100 ? '**More than 100%**' : ''}
                                  />
                              </div>
                            </div>
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
        </MobileOnlyView>
      </div>
        )
    }

// FUNCTIONS

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
      costsTotal += 0;
    } else costsTotal += (this.state.costsMarketing * this.marketingDropDownRef.current.state.selectedOption.value)

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

  getStateNumbWriters(){

     if(this.numbWritersRef.current.state.value !== "" && parseInt(this.numbWritersRef.current.state.value) !== this.state.numbWriters) {
         const e = parseInt(this.numbWritersRef.current.state.value);
         this.updateNumbWriters(e);
     }
  }

  updateNumbWriters(e){

      this.setState({numbWriters: e}, () => {
          this.writerPercentWrittenRef.current.setState({value: parseInt(100/this.state.numbWriters)});
          this.getPublisherShare();
      });
  }

  getStatewriterPercentWritten(){

     if(this.writerPercentWrittenRef.current.state.value !== "" && parseInt(this.writerPercentWrittenRef.current.state.value) !== this.state.writerPercentWritten) {
         const e = parseInt(this.writerPercentWrittenRef.current.state.value);
         this.updatewriterPercentWritten(e);
     }
  }

  updatewriterPercentWritten(e){

      this.setState({writerPercentWritten: e}, () => {
          this.getPublisherShare();
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

  pubSetSliderValue(val){
      this.setState( {pubSliderValue: val});
      this.calculate();
  }

  updatePubSlider(e){

      //val = document.getElementById("splitSlider").value()
      this.setState( {pubSliderValue: e.target.value})
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

  pubChangeSliderVal(val){
      this.pubDealSliderRef.current.setState({values: [val]});
  }

  pubDoSliderStuff(e){
    if(this.pubDealSliderRef.current.state.values !== null && this.pubDealSliderRef.current.state.values[0] !== this.state.pubSliderValue) {
      this.setState({pubSliderValue: this.pubDealSliderRef.current.state.values[0]}, () => {this.calculate();});
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
            artistUnrecoupedAmount = Math.abs(((grossRevenue - this.state.costsTotal)*(parseFloat(this.state.sliderValue)/100)) - parseFloat(this.state.advance));
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
        streamValue: this.weightedAverageOfSelected(),
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
              data: [this.state.artistWriterEarnings.toFixed(0), 0, this.state.publisherShare.toFixed(0)]
            },{
              name: 'From Advance',
              data: [this.state.advance.toFixed(0), 0, 0]
            }
          ]
    })
  }

  getPublisherShare(){
    let pubGrossRevenue = (avgPubPayout * this.state.streamNumber);
    let pubOwnedGrossRevenue = (avgPubPayout * this.state.streamNumber) * (this.state.pubSliderValue/100);
    let pubPerformanceRevenue = pubOwnedGrossRevenue * .5;
    let pubPROAdminFee = pubPerformanceRevenue * .165;
    let pubMechanicalRevenue = pubOwnedGrossRevenue * .5;
    let pubMechanicalAdminFee = pubMechanicalRevenue * .15;
    // let pubMechanicalRecordFee = (pubMechanicalRevenue - pubMechanicalAdminFee) * .3;
    let pubNetMechanicalRevenue = (pubMechanicalRevenue - pubMechanicalAdminFee);
    let pubNetPerformanceRevenue = (pubPerformanceRevenue - pubPROAdminFee);
    let publisherPerfPercentage;
    let publisherMechPercentage;

    switch(this.state.publishingDealSelected) {
      case 'Full/Traditional':
        publisherPerfPercentage = 1.0;
        break;
      case 'Co-Publishing':
        publisherPerfPercentage = 0.5;
        break;
      case 'Admin':
        publisherPerfPercentage = 0.1;
        break;
      case 'No Deal':
        publisherPerfPercentage = 0.0;
        break;
      default:
        publisherPerfPercentage = 0.0;
    }

    if(this.state.publishingDealSelected === "No Deal"){
      publisherMechPercentage = 0.0
    } else {
      publisherMechPercentage = 0.5
    }

    let publisherPerfShare = (pubNetPerformanceRevenue * .5);
    let publisherMechShare = pubNetMechanicalRevenue * publisherMechPercentage;
    let artistWriterPerfShare = (pubNetPerformanceRevenue * .5);
    let artistMechShare = pubNetMechanicalRevenue * (1 - publisherMechPercentage);
    let artistTotalShare = artistWriterPerfShare + artistMechShare;
    // let artistPubShare = (((pubPerformanceRevenue - pubPROAdminFee) * .5) * (1 - publisherPerfPercentage));

    let writerXWriterShare = artistWriterPerfShare * (this.state.writerPercentWritten/100);
    let pubXShare = (publisherPerfShare * publisherPerfPercentage) + (publisherMechShare * (this.state.writerPercentWritten/100));
    let writerXPubShare = (publisherPerfShare) * (1 - publisherPerfPercentage);
    let writerXTotalShare = writerXWriterShare + writerXPubShare;
    let writerXMechShare = artistMechShare * (this.state.writerPercentWritten/100);
    let artistWriterEarnings = writerXTotalShare + writerXMechShare

    this.setState({
      grossPubRev: pubOwnedGrossRevenue,
      pubDistributionFee: pubMechanicalAdminFee,
      proFee: pubPROAdminFee,
      publisherShare: pubXShare,
      // labelPublishingShare: pubMechanicalRecordFee,
      artistWriterEarnings: artistWriterEarnings,
      pubArtistWriterShare: writerXWriterShare,
      pubArtistPubShare: writerXPubShare,
      pubArtistMechShare: writerXMechShare,
    }, () => {
      this.getArtistTotalEarnings();
      this.updateGraphs();
      this.pubdealsplitinfo();
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


  pubdealsplitinfo(){
    let writerownershippercentage = 0;
    switch(this.state.publishingDealSelected) {
      case 'Full/Traditional':
        writerownershippercentage = 50;
        break;
      case 'Co-Publishing':
        writerownershippercentage = 75;
        break;
      case 'Admin':
        writerownershippercentage = 90;
        break;
      case 'No Deal':
        writerownershippercentage = 100;
        break;
      default:
        writerownershippercentage = 100;
    }
    //return recoupPercent;
    this.setState({writerownershippercentage: writerownershippercentage},() => {
    // this.calculate();
  });
  }

}


export default DesktopVersion;
