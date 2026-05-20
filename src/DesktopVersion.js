import React from 'react';
import NumberFormat from 'react-number-format';
import {BrowserView, MobileOnlyView} from 'react-device-detect';
import 'react-circular-progressbar/dist/styles.css';
import './App.css';
import SelectButton from './components/SelectButton.js';
import NumberInput from './components/NumberInput.js';
import SingleDropDown from './components/SingleDropDown.js';
import MarketingDropDown from './components/MarketingCostDropDown.js';
import MultiDropDown from './components/MultiDropDown.js';
import DealSplitSlider from './components/DealSplitSlider.js';
import PubDealSplitSlider from './components/PubDealSplitSlider.js';
import StreamSlider from './components/StreamSlider.js';
import ToolTip from './components/ToolTip.js';
import Popup from './components/PopUp.js';
import SwitchButton from './components/SwitchButton.js';


import './stylesheets/DesktopPage.css';
import './stylesheets/MobilePage.css';

// ---- small visual helpers used in the v2 layout ----
const COLOR_YOU = '#3F6BFF';
const COLOR_LABEL = '#22C7B6';
const COLOR_PUBLISHER = '#9B7BFF';
const COLOR_FEES = '#FFAA4D';

const fmtMoney = (n) => {
  const v = Number.isFinite(n) ? n : 0;
  return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
};

const fmtPreset = (v) => {
  if (v >= 1e9) return (v / 1e9) + 'B';
  if (v >= 1e6) return (v / 1e6) + 'M';
  if (v >= 1e3) return (v / 1e3) + 'K';
  return String(v);
};

const RecoupDonut = ({ percent, size = 196, stroke = 26 }) => {
  const pct = Math.max(0, Math.min(100, Number(percent) || 0));
  const radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const len = (pct / 100) * c;
  return (
    <div className="v2-donut-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#eef2f7" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={COLOR_YOU}
          strokeWidth={stroke}
          strokeDasharray={`${len} ${c - len}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 0.3s ease' }}
        />
      </svg>
      <div className="v2-donut-center">
        <div className="v2-donut-center-value">{pct.toFixed(0)}%</div>
        <div className="v2-donut-center-label">Recouped</div>
      </div>
    </div>
  );
};

const SegmentedBar = ({ segments }) => {
  const total = segments.reduce((s, seg) => s + Math.max(0, seg.value), 0) || 1;
  return (
    <div className="v2-segbar">
      <div className="v2-segbar-track">
        {segments.map((seg, i) => {
          const pct = (Math.max(0, seg.value) / total) * 100;
          if (pct <= 0) return null;
          return (
            <div
              key={i}
              className="v2-segbar-piece"
              style={{ width: `${pct}%`, background: seg.color }}
              title={`${seg.label}: ${pct.toFixed(0)}%`}
            >
              {pct >= 10 && <span className="v2-segbar-piece-label">{Math.round(pct)}%</span>}
            </div>
          );
        })}
      </div>
      <div className="v2-segbar-legend">
        {segments.map((seg, i) => (
          <div key={i} className="v2-segbar-legend-item">
            <span className="v2-segbar-dot" style={{ background: seg.color }} />
            <span className="v2-segbar-legend-text">{seg.label}</span>
            <span className="v2-segbar-legend-pct">{Math.round((Math.max(0, seg.value) / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Stepper = ({ steps, completed }) => (
  <ol className="v2-stepper">
    {steps.map((s, i) => {
      const isDone = completed[i];
      return (
        <li key={i} className={`v2-step ${isDone ? 'v2-step-done' : ''}`}>
          <a href={`#v2-step-${i + 1}`} className="v2-step-link">
            <span className="v2-step-num">{isDone ? '✓' : i + 1}</span>
            <span className="v2-step-label">{s}</span>
          </a>
          {i < steps.length - 1 && <span className="v2-step-bar" />}
        </li>
      );
    })}
  </ol>
);

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
      const role = this.state.role;
      const showRecord = role !== "writer";
      const showPub = role !== "artist";

      const earned = this.state.artistTotalEarnings || 0;
      const gross = this.state.grossTotalRev || 0;
      const recoupable = this.state.totRecoupe || 0;
      const perThousand = this.state.streamNumber > 0
        ? (earned / this.state.streamNumber) * 1000
        : 0;

      const stepsLabels = ['Your role', 'Your deal', 'Streams', 'Costs', 'Advanced'];
      const stepsCompleted = [
        role != null,
        (showRecord ? this.state.recordDealSelected != null : true) &&
          (showPub ? this.state.publishingDealSelected != null : true),
        this.state.streamNumber > 0,
        this.state.costsTotal > 0,
        this.state.autoRecoupChecked || this.state.moneyGoalChecked,
      ];

      // Ownership segments for publishing
      const yourShare = (this.state.writerownershippercentage / 100) * (this.state.pubSliderValue);
      const pubShare = ((100 - this.state.writerownershippercentage) / 100) * (this.state.pubSliderValue);
      const otherShare = 100 - this.state.pubSliderValue;

      // Donut segments for results
      const donutSegments = [
        { label: 'You', value: earned, color: COLOR_YOU },
        { label: 'Record label', value: this.state.labelShare || 0, color: COLOR_LABEL },
        { label: 'Publisher', value: this.state.publisherShare || 0, color: COLOR_PUBLISHER },
        { label: 'PRO & Mech. fees', value: (this.state.proFee || 0) + (this.state.pubDistributionFee || 0), color: COLOR_FEES },
      ];

      const streamPresets = [10000, 100000, 1000000, 10000000, 100000000];

      const renderRoleStep = (idx) => (
        <section className="v2-card" id={`v2-step-${idx}`}>
          <div className="v2-card-head">
            <span className="v2-eyebrow">Step {idx}</span>
            <h2 className="v2-card-title">Your role</h2>
            <p className="v2-card-help">Are you the recording artist, the writer, or both?</p>
          </div>
          <div className="v2-role-row">
            {this.state.roleTypes.map(type => (
              <SelectButton ref={type.ref}
                key={type.id}
                onChange={e => this.handleMyClick(type.id)}
                text={type.name}
              />))}
          </div>
        </section>
      );

      const renderDealStep = (idx) => (
        <section className="v2-card" id={`v2-step-${idx}`}>
          <div className="v2-card-head">
            <span className="v2-eyebrow">Step {idx}</span>
            <h2 className="v2-card-title">Your deal{role === "both" ? "s" : ""}</h2>
            <p className="v2-card-help">Tell us how you're working with a label and/or publisher.</p>
          </div>
          <div className="v2-deal-grid">
            {showRecord && (
              <div className="v2-deal-panel">
                <h3 className="v2-panel-title">Recording deal</h3>
                <label className="v2-field-label">Deal type</label>
                <SingleDropDown
                  ref={this.dealTypeRef}
                  options={labelDealOptions}
                  selectedOption={labelDealOptions[0]}
                  onChange={e => this.getStateRecDeal(e)}/>
                {this.state.recordDealSelected === "labelServices" && (
                  <div style={{ marginTop: 12 }}>
                    <label className="v2-field-label">Label services</label>
                    <MultiDropDown
                      ref={this.labelServicesSelectedRef}
                      options={this.state.labelServices}
                      default={this.state.labelServices[0]}
                      onChange={e => this.changeLabelServicesDropDown(e)}
                    />
                  </div>
                )}
                <div className="v2-field-block">
                  <label className="v2-field-label">Deal split</label>
                  <DealSplitSlider ref={this.dealSliderRef} onChange={e => this.doSliderStuff(e)} />
                </div>
                <div className="v2-field-block">
                  <label className="v2-field-label">Advance on earnings</label>
                  <NumberInput
                    ref={this.advanceRef}
                    id={"numInput"}
                    label="Advance on Earnings"
                    onChange={e => this.getStateAdvance(e)}/>
                </div>
              </div>
            )}
            {showPub && (
              <div className="v2-deal-panel">
                <h3 className="v2-panel-title">Publishing deal</h3>
                <label className="v2-field-label">Deal type</label>
                <SingleDropDown
                  ref={this.pubTypeRef}
                  options={pubDealOptions}
                  selectedOption={pubDealOptions[1]}
                  onChange={e => this.getStatePubDeal(e)}
                />
                <div className="v2-field-block">
                  <label className="v2-field-label">How much of this song did you write?</label>
                  <PubDealSplitSlider ref={this.pubDealSliderRef} onChange={e => this.pubDoSliderStuff(e)}/>
                </div>
                <div className="v2-field-block">
                  <label className="v2-field-label">Who owns the song</label>
                  <SegmentedBar segments={[
                    { label: 'You / writer', value: yourShare, color: COLOR_YOU },
                    { label: 'Publisher', value: pubShare, color: COLOR_PUBLISHER },
                    { label: 'Other writers', value: otherShare, color: '#cbd5e1' },
                  ]}/>
                </div>
              </div>
            )}
          </div>
        </section>
      );

      const renderStreamsStep = (idx) => (
        <section className="v2-card" id={`v2-step-${idx}`}>
          <div className="v2-card-head">
            <span className="v2-eyebrow">Step {idx}</span>
            <h2 className="v2-card-title">Streams</h2>
            <p className="v2-card-help">Estimate how many streams the song will get across all DSPs.</p>
          </div>
          <div className="v2-preset-row">
            {streamPresets.map(v => (
              <button
                type="button"
                key={v}
                className={`v2-preset ${this.state.streamNumber === v ? 'v2-preset-active' : ''}`}
                onClick={() => {
                  // Sync child refs BEFORE the parent setState so updateStreamSlider's
                  // guard sees consistent state on the next render and doesn't loop.
                  this.streamsSliderRef.current.setState({ values: [v] });
                  this.estStreamsRef.current.setState({ value: v });
                  this.setState({ streamNumber: v }, () => this.calculate());
                }}>
                {fmtPreset(v)}
              </button>
            ))}
          </div>
          <div className="v2-stream-row">
            <div className="v2-stream-input">
              <label className="v2-field-label">Estimated streams</label>
              <NumberInput
                ref={this.estStreamsRef}
                id={0}
                type="text"
                label="Estimated Streams"
                onChange={e => this.changeStreams(e)}/>
            </div>
            <div className="v2-stream-slider">
              <StreamSlider
                ref={this.streamsSliderRef}
                values={[this.state.streamNumber]}
                domain={[0, (this.state.streamNumber + 1) * 2]}
                onChange={e => this.updateStreamSlider(e)}/>
            </div>
          </div>

          <div className="v2-dsp-block">
            <div className="v2-dsp-head">
              <h4 className="v2-subtitle">DSPs included</h4>
              <div className="v2-dsp-rate">
                Effective rate: <strong>${this.state.streamValue.toFixed(5)}</strong> / stream
                <ToolTip content="Value is a weighted average of DSP payouts and their market share" direction="top">
                  <span className="v2-info-icon">ⓘ</span>
                </ToolTip>
              </div>
            </div>
            <div className="v2-dsp-grid">
              {this.state.providers.map((provider) => (
                <div key={provider.id} className="v2-dsp-chip">
                  <SelectButton
                    ref={provider.ref}
                    text={provider.name}
                    onChange={e => this.getButtonClick(provider.id)}/>
                  <span className="v2-dsp-chip-rate">${provider.payoutPerStream.toFixed(4)} / stream</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

      const renderCostsStep = (idx) => (
        <section className="v2-card" id={`v2-step-${idx}`}>
          <div className="v2-card-head">
            <span className="v2-eyebrow">Step {idx}</span>
            <h2 className="v2-card-title">Costs</h2>
            <p className="v2-card-help">Production, marketing, distribution, and other costs incurred.</p>
          </div>
          <div className="v2-cost-total-row">
            <span className="v2-cost-total-label">Total costs</span>
            <NumberFormat
              value={`${(this.state.costsTotal || 0).toFixed(0)}`}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={v => <span className="v2-cost-total-value">{v}</span>}
            />
          </div>
          <div className="v2-cost-rows">
            <div className="v2-cost-row-header">
              <span />
              <span className="v2-cost-col-label">Amount</span>
              <span className="v2-cost-col-label">Recoupable?</span>
            </div>
            <div className="v2-cost-row">
              <span className="v2-cost-name">Recording</span>
              <NumberInput
                id={"costsRecording"}
                type="text"
                ref={this.costsRecordingRef}
                label="Recording Costs"
                onChange={e => this.getStateCostsRecording(e)}/>
              <div className="v2-cost-toggle">
                <SwitchButton onChange={e => this.changeCheckboxes("recording")} checked={this.state.recordingCostChecked} />
              </div>
            </div>
            <div className="v2-cost-row">
              <span className="v2-cost-name">Marketing</span>
              <NumberInput
                id={"costsMarketing"}
                type="text"
                ref={this.costsMarketingRef}
                label="Marketing Costs"
                onChange={e => this.getStateCostsMarketing(e)}/>
              <div className="v2-cost-toggle v2-cost-toggle-dropdown">
                <MarketingDropDown
                  ref={this.marketingDropDownRef}
                  options={marketingSplitOptions}
                  selectedOption={marketingSplitOptions[2]}
                  onChange={e => this.calcMarketingCosts()}
                />
              </div>
            </div>
            <div className="v2-cost-row">
              <span className="v2-cost-name">Distribution</span>
              <NumberInput
                id={"costsDistribution"}
                type="text"
                ref={this.costsDistributionRef}
                label="Distribution Costs"
                onChange={e => this.getStateCostsDistribution(e)}/>
              <div className="v2-cost-toggle">
                <SwitchButton onChange={e => this.changeCheckboxes("distribution")} checked={this.state.distributionCostChecked} />
              </div>
            </div>
            <div className="v2-cost-row">
              <span className="v2-cost-name">Misc.</span>
              <NumberInput
                id={"costsMisc"}
                type="text"
                ref={this.costsMiscRef}
                label="Misc. Costs"
                onChange={e => this.getStateCostsMisc(e)}/>
              <div className="v2-cost-toggle">
                <SwitchButton onChange={e => this.changeCheckboxes("misc")} checked={this.state.miscCostChecked} />
              </div>
            </div>
          </div>

        </section>
      );

      const renderAdvancedStep = (idx) => (
        <section className="v2-card" id={`v2-step-${idx}`}>
          <div className="v2-card-head">
            <span className="v2-eyebrow">Step {idx} · Optional</span>
            <h2 className="v2-card-title">How many streams do I need?</h2>
            <p className="v2-card-help">Flip a toggle to auto-calculate the streams required. The slider and results above will update to match.</p>
          </div>
          <div className="v2-advanced-grid">
            <div className={`v2-advanced-card ${this.state.autoRecoupChecked ? 'v2-advanced-card-on' : ''}`}>
              <div className="v2-advanced-head">
                <span className="v2-advanced-title">Auto-recoup</span>
                <ToolTip content="The amount of streams needed to pay back all recoupable monies" direction="top">
                  <span className="v2-info-icon">ⓘ</span>
                </ToolTip>
                <SwitchButton onChange={e => this.handleAutoRecoup()} checked={this.state.autoRecoupChecked}/>
              </div>
              <p className="v2-advanced-help">Streams needed to pay back every recoupable cost and the advance.</p>
              <NumberFormat
                value={`${(this.state.recoupStreamsNeeds || 0).toFixed(0)}`}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => <div className="v2-advanced-streams">{value}<span className="v2-advanced-streams-suffix"> streams needed</span></div>}
              />
            </div>
            <div className={`v2-advanced-card ${this.state.moneyGoalChecked ? 'v2-advanced-card-on' : ''}`}>
              <div className="v2-advanced-head">
                <span className="v2-advanced-title">Money goal</span>
                <ToolTip content="Advance is included in revenue earned" direction="top">
                  <span className="v2-info-icon">ⓘ</span>
                </ToolTip>
                <SwitchButton onChange={e => this.handleMoneyGoalCheckbox()} checked={this.state.moneyGoalChecked}/>
              </div>
              <p className="v2-advanced-help">Set a dollar target and we'll show how many streams it takes to get there.</p>
              <NumberInput
                id={"moneyGoalInput"}
                ref={this.moneyGoalInputRef}
                type="text"
                label="I want to make..."
                onChange={e => this.getStateMoneyGoalInput(e)}/>
              <NumberFormat
                value={`${(this.state.moneyGoalStreamsNeeded || 0).toFixed(0)}`}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => <div className="v2-advanced-streams">{value}<span className="v2-advanced-streams-suffix"> streams needed</span></div>}
              />
            </div>
          </div>
        </section>
      );

      const renderResults = () => (
        <div className="v2-results-card">
          <p className="v2-results-eyebrow">You take home</p>
          <NumberFormat
            value={`${earned.toFixed(0)}`}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            renderText={v => <div className="v2-hero-number">{v}</div>}
          />
          <p className="v2-hero-context">
            from <strong>{fmtMoney(this.state.streamNumber)}</strong> streams
          </p>

          <RecoupDonut percent={Number((this.state.seriesRadial && this.state.seriesRadial[0]) || 0)} />

          <div className="v2-donut-legend">
            {(() => {
              const partySum = donutSegments.reduce((sum, s) => sum + Math.max(0, s.value), 0);
              return donutSegments.map((s, i) => {
                const pct = partySum > 0 ? (Math.max(0, s.value) / partySum) * 100 : 0;
                return (
                  <div key={i} className="v2-legend-row">
                    <span className="v2-legend-dot" style={{ background: s.color }} />
                    <span className="v2-legend-label">{s.label} <span className="v2-legend-pct">({pct.toFixed(0)}%)</span></span>
                    <span className="v2-legend-value">${fmtMoney(s.value)}</span>
                  </div>
                );
              });
            })()}
          </div>

          <div className="v2-stat-row">
            <div className="v2-stat">
              <span className="v2-stat-label">Gross revenue</span>
              <span className="v2-stat-value">${fmtMoney(gross)}</span>
            </div>
            <div className="v2-stat">
              <span className="v2-stat-label">Recoupable</span>
              <span className="v2-stat-value">${fmtMoney(recoupable)}</span>
            </div>
            <div className="v2-stat">
              <span className="v2-stat-label">Per 1k streams</span>
              <span className="v2-stat-value">${perThousand.toFixed(2)}</span>
            </div>
          </div>

          <div className="v2-breakdown">
            <h3 className="v2-breakdown-title">Detailed earnings breakdown</h3>
            <p className="v2-breakdown-context">Earnings from {fmtMoney(this.state.streamNumber)} streams</p>
            <table className="v2-breakdown-table">
              <thead>
                <tr>
                  <th colSpan={2}>You / Artist(s)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Recording earnings</td>
                  <td>${fmtMoney(this.state.artistRecordEarnings)}</td>
                </tr>
                {showRecord && this.state.advance > 0 &&
                  <tr>
                    <td>Earnings from advance</td>
                    <td>${fmtMoney(this.state.advance)}</td>
                  </tr>
                }
                <tr>
                  <td>Writer earnings — writer share</td>
                  <td>${fmtMoney(this.state.pubArtistWriterShare)}</td>
                </tr>
                <tr>
                  <td>Writer earnings — publisher share</td>
                  <td>${fmtMoney(this.state.pubArtistPubShare)}</td>
                </tr>
                <tr>
                  <td>Writer earnings — mechanical</td>
                  <td>${fmtMoney(this.state.pubArtistMechShare)}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                  <th colSpan={2}>Partners</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Record company</td>
                  <td>${fmtMoney(this.state.labelShare)}</td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>${fmtMoney(this.state.publisherShare)}</td>
                </tr>
                <tr>
                  <td>PRO fee</td>
                  <td>${fmtMoney(this.state.proFee)}</td>
                </tr>
                <tr>
                  <td>Mechanicals fee</td>
                  <td>${fmtMoney(this.state.pubDistributionFee)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

      return (
      <div>
        <BrowserView>
          <div className="v2-shell">
            <header className="v2-hero">
              <h1 className="v2-hero-title">What's My Stream?</h1>
              <p className="v2-hero-sub">Estimate your music streaming revenue. Set your deal, plug in your numbers, see what lands in your pocket.</p>
            </header>

            <div className="v2-layout">
              <main className="v2-form-column">
                <Stepper steps={stepsLabels} completed={stepsCompleted} />
                {renderRoleStep(1)}
                {renderDealStep(2)}
                {renderStreamsStep(3)}
                {renderCostsStep(4)}
                {renderAdvancedStep(5)}
              </main>
              <aside className="v2-results-rail">
                <div className="v2-results-sticky">
                  {renderResults()}
                </div>
              </aside>
            </div>

            <footer className="v2-footer">
              <div className="v2-footer-col">
                <h4 className="v2-footer-title">Created by</h4>
                <ul className="v2-footer-list">
                  <li><a href={'https://www.linkedin.com/in/nikhilanand0102/'} target={'blank'}>Nikhil Anand</a></li>
                  <li><a href={'mailto:svincent3@berklee.edu'} target={'blank'}>Sam Vincent</a></li>
                  <li><a href={'https://www.linkedin.com/in/alperrin/'} target={'blank'}>Alexandre Perrin</a></li>
                  <li><a href={'https://www.linkedin.com/in/pete-dyson-70b61b21/'} target={'blank'}>Pete Dyson</a></li>
                </ul>
              </div>
              <div className="v2-footer-col v2-footer-about">
                <h4 className="v2-footer-title">About this tool</h4>
                <p>What are your streams worth? This Streaming Calculator was made to model music streaming revenue, and give more clarity on the roles in the music industry that effect streaming revenue. These figures are estimates and can be used as a guide to know your worth. <a href={'https://nikhilanand3.medium.com/simulating-music-streaming-revenue-59ec1ad1db6'} target={'blank'}>See our full write-up here.</a></p>
              </div>
              <div className="v2-footer-col v2-footer-help">
                <h4 className="v2-footer-title">Help</h4>
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
                  buttonText="Additional Resources"
                  title="Explore Futher Into Music Streaming Economics"
                  body={
                    <div>
                      <ol>
                        <li style={{marginBottom: '10px'}}><a href="https://thetrichordist.com/2020/03/05/2019-2020-streaming-price-bible-youtube-is-still-the-1-problem-to-solve/" target="_blank" rel="noreferrer">Value of a Stream based according to Trichordist</a></li>
                        <li style={{marginBottom: '10px'}}><a href="https://loudandclear.byspotify.com" target="_blank" rel="noreferrer">Spotify Loud & Clear: Data on Artist Earnings and Streams on Spotify</a></li>
                        <li ><a href="http://futureofmusic.org/article/article/music-and-how-money-flows" target="_blank" rel="noreferrer">Music and How the Money Flows</a></li>
                      </ol>
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
            </footer>
          </div>
        </BrowserView>

        <MobileOnlyView>
          <div className="v2-mobile-shell">
            <header className="v2-hero v2-hero-mobile">
              <h1 className="v2-hero-title">What's My Stream?</h1>
              <p className="v2-hero-sub">Estimate your music streaming revenue.</p>
            </header>
            <Stepper steps={stepsLabels} completed={stepsCompleted} />
            {renderRoleStep(1)}
            {renderDealStep(2)}
            {renderStreamsStep(3)}
            {renderCostsStep(4)}
            {renderAdvancedStep(5)}
            <div className="v2-mobile-results">
              {renderResults()}
            </div>
            <footer className="v2-footer v2-footer-mobile">
              <h4 className="v2-footer-title">About this tool</h4>
              <p>This Streaming Calculator was made to model music streaming revenue. <a href={'https://nikhilanand3.medium.com/simulating-music-streaming-revenue-59ec1ad1db6'} target={'blank'}>Full write-up</a>.</p>
              <p>Created by <a href={'https://www.linkedin.com/in/nikhil-anand-/'} target={'blank'}>Nikhil Anand</a>, <a href={'mailto:svincent3@berklee.edu'} target={'blank'}>Sam Vincent</a>, <a href={'https://www.linkedin.com/in/alperrin/'} target={'blank'}>Alexandre Perrin</a>, <a href={'https://www.linkedin.com/in/pete-dyson-70b61b21/'} target={'blank'}>Pete Dyson</a>.</p>
            </footer>
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

  // Sync the slider + numeric input + streamNumber state to the value computed
  // by either the auto-recoup or money-goal toggle. Called after calculate()
  // has run so recoupStreamsNeeds / moneyGoalStreamsNeeded are fresh in state.
  syncStreamsToAdvanced() {
    let target = null;
    if (this.state.autoRecoupChecked) target = this.state.recoupStreamsNeeds;
    else if (this.state.moneyGoalChecked) target = this.state.moneyGoalStreamsNeeded;
    if (target == null || !isFinite(target) || target <= 0) return;
    const rounded = Math.round(target);
    if (rounded === this.state.streamNumber) return;
    // Sync the child refs before the parent setState so StreamSlider's
    // componentDidUpdate sees consistent state and doesn't loop.
    if (this.streamsSliderRef.current) this.streamsSliderRef.current.setState({values: [rounded]});
    if (this.estStreamsRef.current) this.estStreamsRef.current.setState({value: rounded});
    this.setState({streamNumber: rounded}, () => this.calculate());
  }

  handleMoneyGoalCheckbox() {
    const turningOn = !this.state.moneyGoalChecked;
    // Toggling either advanced option turns the other off so they don't fight.
    this.setState({
      moneyGoalChecked: turningOn,
      autoRecoupChecked: turningOn ? false : this.state.autoRecoupChecked,
    }, () => {
      this.calculate();
      if (turningOn) setTimeout(() => this.syncStreamsToAdvanced(), 0);
    })
  }

  handleAutoRecoup() {
    const turningOn = !this.state.autoRecoupChecked;
    this.setState({
      autoRecoupChecked: turningOn,
      moneyGoalChecked: turningOn ? false : this.state.moneyGoalChecked,
    }, () => {
      this.calculate();
      if (turningOn) setTimeout(() => this.syncStreamsToAdvanced(), 0);
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
    const types = roleTypes;
    if(id==="artist" && types[0].selected !== types[0].ref.current.state.button) {
      types[0].selected = true;
      types[0].ref.current.setState({button: true});
      types[1].selected = false;
      types[1].ref.current.setState({button: false});
      types[2].selected = false;
      types[2].ref.current.setState({button: false});
      this.setState({role: "artist"}, () => {this.calculate()});
    }
    if(id==="writer" && types[1].selected !== types[1].ref.current.state.button) {
      types[0].selected = false;
      types[0].ref.current.setState({button: false});
      types[1].selected = true;
      types[1].ref.current.setState({button: true});
      types[2].selected = false;
      types[2].ref.current.setState({button: false});
      this.setState({role: "writer"}, () => {this.calculate()});
    }
    if(id==="both" && types[2].selected !== types[2].ref.current.state.button) {
      types[0].selected = false;
      types[0].ref.current.setState({button: false});
      types[1].selected = false;
      types[1].ref.current.setState({button: false});
      types[2].selected = true;
      types[2].ref.current.setState({button: true});
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
    const providers = this.state.providers;
    providers[index].includeInCalculations = !providers[index].includeInCalculations;
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
    const role = this.state.role;
    const showRecording = role === "artist" || role === "both";
    const showWriting = role === "writer" || role === "both";
    const showAdvance = role === "artist" || role === "both";
    const artistRecording = showRecording ? this.state.artistRecordEarnings.toFixed(0) : 0;
    const artistWriting = showWriting ? this.state.artistWriterEarnings.toFixed(0) : 0;
    const artistAdvance = showAdvance ? this.state.advance.toFixed(0) : 0;
    this.setState({seriesBar:
      [{
              name: 'From Recording',
              data: [artistRecording, this.state.labelShare.toFixed(0), 0]
            }, {
              name: 'From Writing',
              data: [artistWriting, 0, this.state.publisherShare.toFixed(0)]
            },{
              name: 'From Advance',
              data: [artistAdvance, 0, 0]
            }
          ]
    })
  }

  getPublisherShare(){
    // let pubGrossRevenue = (avgPubPayout * this.state.streamNumber);
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
    // let artistTotalShare = artistWriterPerfShare + artistMechShare;
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
      // The advance is recoupable, but it's guaranteed money the artist keeps —
      // artistRecordEarnings is computed net of recoupment, so the advance must be
      // added back to reflect true take-home (recording deals only).
      const advanceEarnings = (this.state.role === "both" || this.state.role === "artist")
        ? parseFloat(this.state.advance) : 0;
      if(this.state.role === "both") {
          this.setState({artistTotalEarnings: advanceEarnings + this.state.artistRecordEarnings + (this.state.artistWriterEarnings > 0 ? this.state.artistWriterEarnings : 0)});
      } else if(this.state.role === "artist") {
          this.setState({artistTotalEarnings: advanceEarnings + this.state.artistRecordEarnings});
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
    let recoupPercent = 100;
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
