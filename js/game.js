/*!
 * Quality Quest: Stop the Defects
 * A five-stage quality inspection training game hosted by Mister Quality.
 *
 * Structure (top to bottom):
 *   1. Artwork paths, icons and shared game data
 *   2. Stage 1  The Gatekeeper        (incoming inspection)
 *   3. Stage 2  Catch It Before It Ships (production line)
 *   4. Stage 3  Measure Twice          (metrology lab)
 *   5. Stage 4  Find the Why           (root cause investigation)
 *   6. Stage 5  Quality Under Pressure (final audit, boss level)
 *   7. Badges, win screen, certificate, router and boot
 *
 * No build step and no dependencies. Progress is saved per browser in
 * localStorage under the keys "qq-sum" and "qq-name".
 */

// Artwork. Host portraits live in assets/img/host/.
const IMG = {
  logo: "assets/img/logo.jpg",
  hero: "assets/img/hero.jpg",
  crate: "assets/img/crate.jpg",
  scene: "assets/img/scene.jpg",
  flange: "assets/img/flange.jpg",
  bg: "assets/img/bg.jpg",
  s2scene: "assets/img/s2scene.jpg",
  s2bg: "assets/img/s2bg.jpg",
  s3scene: "assets/img/s3scene.jpg",
  s3bg: "assets/img/s3bg.jpg",
  s4scene: "assets/img/s4scene.jpg",
  s4bg: "assets/img/s4bg.jpg",
  s5scene: "assets/img/s5scene.jpg",
  s5bg: "assets/img/s5bg.jpg",
  alert: "assets/img/host/alert.jpg",
  approving: "assets/img/host/approving.jpg",
  confident: "assets/img/host/confident.jpg",
  frustrated: "assets/img/host/frustrated.jpg",
  motivational: "assets/img/host/motivational.jpg",
  serious: "assets/img/host/serious.jpg",
  surprised: "assets/img/host/surprised.jpg",
  thinking: "assets/img/host/thinking.jpg"
};
document.getElementById("bgart").style.backgroundImage = `url(${IMG.bg})`;

// ---------- Icons ----------
const ICON = {
  box:`<svg viewBox="0 0 24 24"><path d="M3 7l9-4 9 4v10l-9 4-9-4z" fill="#c98a2e" stroke="#5a3a0c" stroke-width="1.2"/><path d="M3 7l9 4 9-4M12 11v10" stroke="#5a3a0c" stroke-width="1.2" fill="none"/><path d="M7.5 5l9 4" stroke="#f0c070" stroke-width="2"/></svg>`,
  star:`<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8z" fill="#ffcc1f" stroke="#a36a00" stroke-width="1.2"/></svg>`,
  flame:`<svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 01-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3 0-6 1-9z" fill="#ff7a1a"/><path d="M12 12c1 2 3 3 3 5a3 3 0 01-6 0c0-1.5 1-2.5 1.5-3 .2 1 .8 1.5 1.5 1.5 0-1.5-.3-2.5 0-3.5z" fill="#ffd23a"/></svg>`,
  check:`<svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  q:`<svg viewBox="0 0 24 24"><path d="M8.5 8.5a3.5 3.5 0 117 0c0 2.5-3.5 3-3.5 6" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><circle cx="12" cy="19.5" r="1.9" fill="currentColor"/></svg>`,
  x:`<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="3.8" stroke-linecap="round"/></svg>`,
  chev:`<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warn:`<svg viewBox="0 0 24 24"><path d="M12 3l10 18H2z" fill="#e23b3b" stroke="#7a0e0e" stroke-width="1"/><path d="M12 9v6" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="18" r="1.3" fill="#fff"/></svg>`,
  redx:`<svg viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19" stroke="#ff4848" stroke-width="4.5" stroke-linecap="round"/></svg>`,
  goldq:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10.5" fill="#ffcc1f" stroke="#a36a00"/><path d="M9.5 9.5a2.5 2.5 0 115 0c0 1.8-2.5 2.1-2.5 4.2" fill="none" stroke="#3a2600" stroke-width="2.4" stroke-linecap="round"/><circle cx="12" cy="17" r="1.4" fill="#3a2600"/></svg>`,
  doc:`<svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z" fill="#e9eef5" stroke="#6f8bb0"/><path d="M15 2v5h5" fill="#c7d3e3" stroke="#6f8bb0"/><path d="M9 11h8M9 14h8M9 17h5" stroke="#6f8bb0" stroke-width="1.3"/></svg>`,
  tag:`<svg viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8z" fill="#ffcc1f" stroke="#a36a00"/><circle cx="7.5" cy="8.5" r="1.6" fill="#3a2600"/></svg>`,
  cert:`<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="14" rx="1.5" fill="#e9eef5" stroke="#6f8bb0"/><path d="M6 7h12M6 10h8" stroke="#6f8bb0" stroke-width="1.3"/><circle cx="16" cy="16" r="3.5" fill="#e23b3b"/><path d="M14 19l-1 3 3-1.5 3 1.5-1-3" fill="#e23b3b"/></svg>`,
  gauge:`<svg viewBox="0 0 24 24"><rect x="2" y="9" width="20" height="5" rx="1" fill="#c9d2dc" stroke="#5a6e86"/><path d="M5 9V4h3v5M15 14v6h3v-6" fill="#9fb0c4" stroke="#5a6e86"/><path d="M6 11.5h1M9 11.5h1M12 11.5h1M15 11.5h1M18 11.5h1" stroke="#18304f"/></svg>`,
  truck:`<svg viewBox="0 0 24 24"><rect x="2" y="6" width="12" height="10" fill="#3b7cc4" stroke="#163a63"/><path d="M14 9h4l3 3v4h-7z" fill="#ffcc1f" stroke="#7a5a00"/><circle cx="6" cy="17.5" r="2" fill="#18304f"/><circle cx="17" cy="17.5" r="2" fill="#18304f"/></svg>`,
  sound:`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`,
  mute:`<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 9.5l5 5M21.5 9.5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  trophy:`<svg viewBox="0 0 64 64"><path d="M18 8h28v14a14 14 0 01-28 0z" fill="#ffcc1f" stroke="#a36a00" stroke-width="2"/><path d="M18 12H9a9 9 0 009 12M46 12h9a9 9 0 01-9 12" fill="none" stroke="#ffcc1f" stroke-width="4"/><path d="M28 36h8v8h-8z" fill="#e0a400"/><rect x="20" y="44" width="24" height="8" rx="2" fill="#ffcc1f" stroke="#a36a00" stroke-width="2"/><rect x="16" y="52" width="32" height="6" rx="2" fill="#7a4f00"/><path d="M24 12v8" stroke="#fff6cc" stroke-width="3" stroke-linecap="round"/></svg>`
};

// ---------- Game data: QF-2210 Mounting Flange, Rev C ----------
const DRAWING = {
  part:"QF-2210", title:"Mounting Flange", rev:"C", material:"Al 6061-T6",
  features:[
    {k:"od",   name:"Outside Ø",  short:"OD",    nom:"50.00",   tol:"± 0.10"},
    {k:"bore", name:"Bore Ø",     short:"Bore",  nom:"20.00",   tol:"+0.05 / −0.00"},
    {k:"thk",  name:"Thickness",  short:"Thick", nom:"8.00",    tol:"± 0.05"},
    {k:"holes",name:"Bolt holes", short:"Holes", nom:"6X Ø6.6", tol:"on Ø40 BC"},
  ],
  notes:[
    "No scratches, dents or tool marks on Datum A sealing face.",
    "Cosmetic marks permitted on non-sealing surfaces.",
    "Material cert and Certificate of Conformance required with each shipment.",
    "Heat number on material cert must match part tag.",
  ]
};
const TODAY = "2026-10-21";
const BASE = {
  poRev:"C", tagRev:"C", coc:true, certMat:"Al 6061-T6", certHeat:"H-44718", tagHeat:"H-44718",
  gauge:"Caliper CAL-0417", calDue:"2027-03-15", qty:"12 / 12",
  meas:{od:[50.02,49.98,50.01], bore:[20.02,20.01,20.03], thk:[8.01,7.99,8.00], holes:[6,6,6]},
  visual:"clean", visualText:"Sealing face clean. No visible damage."
};
const LOTS = [
  {supplier:"Delta Precision", answer:"ACCEPT",
   why:"Every dimension is inside its limits, material and heat number match the cert, CoC is present, and the gauge is in calibration. Good parts with good paperwork go to production.", ref:"All characteristics conform"},
  {supplier:"Delta Precision", answer:"REJECT", meas:{od:[50.03,50.21,49.99]},
   why:"Sample 2 measures Ø50.21 against an upper limit of Ø50.10. One confirmed out-of-tolerance part makes the lot nonconforming. Reject it and write the NCR.", ref:"OD sample 2 out of tolerance"},
  {supplier:"Bluff City Machining", answer:"HOLD", coc:false,
   why:"The parts may be fine, but Note 3 requires a Certificate of Conformance and it is missing. You can't prove conformance, so the lot goes on hold until the supplier sends the CoC.", ref:"Note 3: CoC missing"},
  {supplier:"Bluff City Machining", answer:"REJECT", visual:"scratch", visualText:"Radial scratch across the sealing face. Catches a fingernail.",
   why:"Note 1 prohibits scratches on the Datum A sealing face. A scratch there becomes a leak path. Passing dimensions don't save a part with a functional defect.", ref:"Note 1: sealing face damage"},
  {supplier:"Ridgeway Components", answer:"REJECT", visual:"holes4", meas:{holes:[4,4,4]}, visualText:"Four bolt holes instead of six.",
   why:"The drawing calls for 6X Ø6.6 holes. These parts have four. That's a wrong part, not a dimensional miss. Reject and ask the supplier about a mix-up with another part number.", ref:"Hole count: 4 vs 6X"},
  {supplier:"Delta Precision", answer:"ACCEPT", meas:{od:[50.10,50.09,50.10]},
   why:"Ø50.10 is exactly the upper limit. Tolerance limits are inclusive, so 50.10 conforms. Rejecting good parts at the limit is a false reject, and those cost money too.", ref:"Limits are inclusive"},
  {supplier:"Ridgeway Components", answer:"REJECT", certMat:"Al 6063-T5",
   why:"The drawing specifies 6061-T6. The cert says 6063-T5, a softer alloy and temper. The parts are the wrong material, so they're nonconforming no matter how good the dimensions look.", ref:"Material: 6063-T5 vs 6061-T6"},
  {supplier:"Bluff City Machining", answer:"HOLD", tagRev:"B",
   why:"The drawing and PO are Rev C, but the part tag says Rev B. The dimensions you checked pass Rev C, but you don't know what changed between B and C. Hold and get engineering to confirm.", ref:"Tag Rev B vs drawing Rev C"},
  {supplier:"Delta Precision", answer:"ACCEPT", visual:"edge", visualText:"Small handling mark on the outer diameter. Sealing face clean.",
   why:"The mark is on the OD, a non-sealing surface, and Note 2 permits cosmetic marks there. Dimensions and paperwork are good. Read the notes before you reject on looks.", ref:"Note 2: cosmetic mark permitted"},
  {supplier:"Ridgeway Components", answer:"REJECT", meas:{bore:[20.02,19.99,20.03]},
   why:"The bore tolerance is unilateral: +0.05 / −0.00. The lower limit is 20.00, so 19.99 is undersize even though it's only 0.01 off nominal. A pin won't fit.", ref:"Bore sample 2 below Ø20.00"},
  {supplier:"Bluff City Machining", answer:"HOLD", tagHeat:"H-44781",
   why:"Cert heat H-44718, tag heat H-44781. Two digits are transposed. Probably a typo, but traceability is broken until the supplier confirms the heat. Hold, don't guess.", ref:"Note 4: heat number mismatch"},
  {supplier:"Delta Precision", answer:"HOLD", calDue:"2026-09-30",
   why:"Everything passes, but the caliper's calibration expired on 2026-09-30. Readings from an out-of-cal gauge can't be trusted. Hold, re-measure with a calibrated gauge, and tag the caliper.", ref:"Gauge calibration expired"},
];
LOTS.forEach((l,i)=>{ const m=Object.assign({},BASE.meas,l.meas||{}); Object.assign(l,Object.assign({},BASE,l),{meas:m,id:"L-"+(1001+i)}); });

// ---------- Scoring ----------
// Correct +100 plus streak bonus (+20 per prior consecutive correct, max +100).
// ACCEPT on a bad lot = escape −150. Non-ACCEPT on a good lot = false reject −50.
// HOLD on a REJECT lot = +25 (contained). REJECT on a HOLD lot = −25.
function grade(call,truth){
  if(call===truth) return "correct";
  if(call==="ACCEPT") return "escape";
  if(truth==="ACCEPT") return "false";
  return call==="HOLD" ? "safe" : "over";
}
const PTS = {escape:-150,false:-50,safe:25,over:-25};
const MAX = LOTS.reduce((s,_,i)=>s+100+Math.min(20*i,100),0);
const RANKS = ["Trainee","Inspector","Quality Specialist","Quality Champion","MISTER QUALITY"];
function rankFor(score,escapes){
  const p=score/MAX; let r=0;
  if(p>=.35) r=1; if(p>=.55) r=2; if(p>=.75) r=3; if(p>=.9&&escapes===0) r=4;
  return escapes>0 ? Math.min(r,2) : r;
}

let S = {phase:"intro", i:0, score:0, streak:0, best:0, results:[], sound:true};

// ---------- Sound (starts only after a tap) ----------
let AC=null;
function tone(seq){
  if(!S.sound) return;
  try{ AC = AC || new (window.AudioContext||window.webkitAudioContext)(); let t=AC.currentTime;
    seq.forEach(([f,d,type])=>{ const o=AC.createOscillator(), g=AC.createGain(); o.type=type||"square"; o.frequency.value=f;
      g.gain.setValueAtTime(.08,t); g.gain.exponentialRampToValueAtTime(.001,t+d); o.connect(g).connect(AC.destination); o.start(t); o.stop(t+d); t+=d*.8; });
  }catch(e){}
}
const SFX = {correct:[[660,.12],[990,.22]], escape:[[180,.35,"sawtooth"],[120,.4,"sawtooth"]], false:[[260,.25,"sawtooth"]], safe:[[520,.15],[440,.2]], over:[[300,.25,"triangle"]], click:[[880,.05]], win:[[523,.15],[659,.15],[784,.15],[1046,.35]]};

// ---------- Part view ----------
function partSVG(v){
  const holes=v==="holes4"?4:6, c=48, o=[];
  o.push(`<defs><radialGradient id="mg" cx="40%" cy="35%"><stop offset="0" stop-color="#f4f7fa"/><stop offset=".6" stop-color="#b9c4d0"/><stop offset="1" stop-color="#7f8ea0"/></radialGradient></defs>`);
  o.push(`<circle cx="${c}" cy="${c}" r="44" fill="url(#mg)" stroke="#5a6e86" stroke-width="2"/>`);
  for(let k=0;k<holes;k++){const a=k*2*Math.PI/holes-Math.PI/2;
    o.push(`<circle cx="${(c+34*Math.cos(a)).toFixed(1)}" cy="${(c+34*Math.sin(a)).toFixed(1)}" r="5" fill="#0b1a2e" stroke="#5a6e86"/>`);}
  o.push(`<circle cx="${c}" cy="${c}" r="16" fill="#0b1a2e" stroke="#5a6e86" stroke-width="2"/>`);
  if(v==="scratch") o.push(`<path d="M54 26 L70 40" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><path d="M54 26 L70 40" stroke="#ff4848" stroke-width="1" stroke-linecap="round"/>`);
  if(v==="edge") o.push(`<path d="M86 58 l5 -3" stroke="#6b5b3e" stroke-width="3" stroke-linecap="round"/>`);
  return `<svg viewBox="0 0 96 96" role="img" aria-label="Part top view">${o.join("")}</svg>`;
}
const fmt=(k,v)=>k==="holes"?String(v):v.toFixed(2);

// ---------- Render ----------
const app=document.getElementById("app"), modalRoot=document.getElementById("modalRoot");
const faceImg=n=>`<img alt="Mister Quality" src="${IMG[n]||IMG.confident}">`;

function topbar(st){
  st = st===true?2:(st||1);
  const RB={1:["","STAGE 1 · THE GATEKEEPER"],2:[" blue","STAGE 2 · PRODUCTION LINE"],3:[" green","STAGE 3 · METROLOGY LAB"],4:[" crimson","STAGE 4 · ROOT CAUSE"],5:[" violet","STAGE 5 · FINAL AUDIT"]}[st];
  return `<div class="topbar">
    <img class="mini" src="${IMG.logo}" alt="Quality Quest">
    <div class="ribbon${RB[0]}">${RB[1]}</div>
    <button class="iconbtn" id="snd" aria-label="${S.sound?"Mute sound":"Turn sound on"}">${S.sound?ICON.sound:ICON.mute}</button>
  </div>`;
}
function stats(bump){
  return `<div class="stats">
    <div class="stat"><div class="k">Lot</div><div class="v">${ICON.box}${Math.min(S.i+1,LOTS.length)}/${LOTS.length}</div></div>
    <div class="stat"><div class="k">Score</div><div class="v${bump?" bump":""}">${S.score}${ICON.star}</div></div>
    <div class="stat"><div class="k">Streak</div><div class="v${bump&&S.streak?" bump":""}">×${S.streak}${ICON.flame}</div></div>
  </div>`;
}
function wireTop(){
  const b=document.getElementById("snd"); if(b) b.onclick=()=>{S.sound=!S.sound; b.innerHTML=S.sound?ICON.sound:ICON.mute; b.setAttribute("aria-label",S.sound?"Mute sound":"Turn sound on");};
}

function renderIntro(){
  app.innerHTML = `
  <img class="logo" src="${IMG.logo}" alt="Quality Quest: Stop the Defects">
  <div class="hero"><img src="${IMG.hero}" alt="Mister Quality pointing at you">
    <div class="bubble"><small>Mister Quality · Host</small>Welcome to the receiving dock. Nothing gets into production without getting past you.</div></div>
  <div class="ribbon" style="flex:none;align-self:flex-start;padding-right:34px">STAGE 1 · THE GATEKEEPER</div>
  ${stats()}
  <section class="panel stagecard">
    <img src="${IMG.crate}" alt="Crate of QF-2210 flanges at receiving inspection">
    <div class="body">
      <h2>Stage 1:<br>The Gatekeeper</h2>
      <p>Twelve lots of QF-2210 mounting flanges are on the dock. For each one, compare the drawing against the receiving packet: paperwork, measurements and a visual check.</p>
      <button class="cta" id="go"><span>START INSPECTING<small>LOT L-1001 IS WAITING</small></span>${ICON.chev}</button>
      <div class="stagemap"><button class="cta alt" id="jump2"><span>STAGE 2<small>THE LINE</small></span></button><button class="cta alt" id="jump3"><span>STAGE 3<small>METROLOGY</small></span></button><button class="cta alt" id="jump4"><span>STAGE 4<small>ROOT CAUSE</small></span></button><button class="cta alt" id="jump5"><span>STAGE 5<small>BOSS AUDIT</small></span></button></div>
    </div>
  </section>
  <div class="banner"><span>SCORING RULES</span></div>
  <section class="panel rules">
    <div>${ICON.star}<b class="pos">+100</b><span>Correct call, plus a streak bonus.</span></div>
    <div>${ICON.warn}<b class="neg">−150</b><span>Accepting a bad lot is an escape and caps your rank at Quality Specialist.</span></div>
    <div>${ICON.redx}<b class="neg">−50</b><span>Rejecting good parts is a false reject.</span></div>
    <div>${ICON.goldq}<b class="pos">+25</b><span>Holding a lot you should have rejected still earns points, because you contained it.</span></div>
  </section>
  <div class="banner"><span>BADGES · ${Object.keys(getSum().badges||{}).length}/${BADGES.length}</span></div>
  <section class="panel">${badgeRow()}</section>`;
  document.getElementById("go").onclick=()=>{tone(SFX.click); S.phase="play"; render(); scrollTo(0,0);};
  document.getElementById("jump2").onclick=()=>{tone(SFX.click); S.phase="s2intro"; render(); scrollTo(0,0);};
  document.getElementById("jump3").onclick=()=>{tone(SFX.click); S.phase="s3intro"; render(); scrollTo(0,0);};
  document.getElementById("jump4").onclick=()=>{tone(SFX.click); S.phase="s4intro"; render(); scrollTo(0,0);};
  document.getElementById("jump5").onclick=()=>{tone(SFX.click); S.phase="s5intro"; render(); scrollTo(0,0);};
}

function renderLot(bump){
  const L=LOTS[S.i], D=DRAWING;
  const doc=(ic,k,v,miss)=>`<div class="doc${miss?" missing":""}">${ICON[ic]}<div><div class="k">${k}</div><div class="v">${v}</div></div></div>`;
  app.innerHTML = topbar() + stats(bump) + `
  <section class="panel scene">
    <div class="art"><img src="${IMG.scene}" alt="Mister Quality inspecting parts at receiving">
      <div class="plate"><div class="k">Incoming lot</div><div class="id">${L.id}</div><div class="sup">${L.supplier}</div><div class="qty">QF-2210 · QTY ${L.qty}</div><ul class="pcheck" aria-label="Receiving inspection checklist"><li>Drawing</li><li>Paperwork</li><li>Measurements</li><li>Visual check</li></ul></div>
    </div>
      <div class="say s1say"><div class="face">${faceImg(S.i===0?"confident":"thinking")}</div>
        <div class="bubble">${S.i===0?"Check the drawing, check the packet, then make the call.":["Read everything. Twice.","Don't trust it. Verify it.","Paperwork is part of the part.","The notes matter.","Check every sample, not just the first."][S.i%5]}</div></div>
  </section>

  <div class="banner"><span>THE DRAWING</span></div>
  <section class="sheet" aria-label="Engineering drawing">
    <div class="head"><b>${D.part} ${D.title}</b><span>REV ${D.rev}</span></div>
    <table><thead><tr><th>Feature</th><th>Nominal (mm)</th><th>Tolerance</th></tr></thead>
    <tbody>${D.features.map(f=>`<tr><td>${f.name}</td><td class="n">${f.nom}</td><td class="n">${f.tol}</td></tr>`).join("")}</tbody></table>
    <div class="mat"><b>Material</b>${D.material}</div>
    <ol class="notes">${D.notes.map(n=>`<li>${n}</li>`).join("")}</ol>
  </section>

  <div class="banner"><span>RECEIVING PACKET</span></div>
  <section class="panel">
    <div class="docs">
      ${doc("truck","PO line",D.part+" Rev "+L.poRev)}
      ${doc("tag","Part tag","Rev "+L.tagRev+" · "+L.tagHeat)}
      ${doc("cert","Material cert",L.certMat+" · "+L.certHeat)}
      ${doc("doc","Cert of Conformance",L.coc?"Received, signed":"Not in packet",!L.coc)}
      ${doc("gauge","Gauge used",L.gauge+" · cal due "+L.calDue)}
      ${doc("box","Received",TODAY)}
    </div>
  </section>

  <div class="banner"><span>MEASUREMENTS (MM)</span></div>
  <section class="panel">
    <table class="lcdtable"><thead><tr><th>Feature</th><th>S1</th><th>S2</th><th>S3</th></tr></thead>
    <tbody>${D.features.map(f=>`<tr><td>${f.short}</td>${L.meas[f.k].map(v=>`<td><div class="lcd">${fmt(f.k,v)}</div></td>`).join("")}</tr>`).join("")}</tbody></table>
    <div class="visual">${partSVG(L.visual)}<p><span class="k">Visual check</span>${L.visualText}</p></div>
  </section>

  <div class="banner"><span>WHAT DO YOU DO?</span></div>
  <div class="choices">
    ${choice("ACCEPT","c-acc","check","Parts and paperwork both conform. Release to production.")}
    ${choice("HOLD","c-hold","q","You can't prove conformance yet. Quarantine and investigate.")}
    ${choice("REJECT","c-rej","x","The evidence proves the parts are nonconforming. Write the NCR.")}
  </div>`;
  wireTop();
  app.querySelectorAll(".choice").forEach(b=>b.onclick=()=>decide(b.dataset.c));
}
function choice(c,cls,ic,txt){
  return `<button class="choice ${cls}" data-c="${c}"><div class="ic">${ICON[ic]}</div><img class="fl" src="${IMG.flange}" alt=""><div><b>${c}</b><span>${txt}</span></div><div class="chev">${ICON.chev}</div></button>`;
}

function decide(call){
  const L=LOTS[S.i], kind=grade(call,L.answer);
  let pts;
  if(kind==="correct"){ pts=100+Math.min(20*S.streak,100); S.streak++; S.best=Math.max(S.best,S.streak); }
  else { pts=PTS[kind]; S.streak=0; }
  S.score+=pts;
  S.results.push({id:L.id,call,answer:L.answer,kind,ref:L.ref,pts});
  tone(SFX[kind]);
  render(true);
  showVerdict();
}

function showVerdict(){
  const r=S.results[S.results.length-1], L=LOTS[S.i];
  const M={correct:["approving","CORRECT!","v-good","That's how a gatekeeper works."],
           escape:["alert","ESCAPE!","v-bad","That lot just walked onto the line."],
           false:["frustrated","FALSE REJECT","v-bad","Those were good parts."],
           safe:["thinking","CONTAINED","v-part","Safe, but the evidence was already conclusive."],
           over:["surprised","TOO HASTY","v-part","You condemned parts that might be good."]}[r.kind];
  const last=S.i===LOTS.length-1;
  modalRoot.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Verdict">
    <div class="panel vcard ${M[2]}">
      <div class="bigface">${faceImg(M[0])}</div>
      <h2>${M[1]}</h2>
      <div class="quote">“${M[3]}”</div>
      <div class="pts">${r.pts>=0?"+":""}${r.pts}</div>
      <div class="calls"><span class="chip">You called <i class="t-${r.call}">${r.call}</i></span><span class="chip">Correct <i class="t-${r.answer}">${r.answer}</i></span></div>
      <p>${L.why}</p>
      <div class="ev">Key evidence: ${L.ref}</div>
      <button class="cta" id="next"><span>${last?"SEE YOUR RANK":"NEXT LOT"}<small>${last?"STAGE 1 COMPLETE":"LOT "+LOTS[S.i+1].id}</small></span>${ICON.chev}</button>
    </div></div>`;
  const n=document.getElementById("next"); n.focus({preventScroll:true});
  n.onclick=()=>{ tone(SFX.click); modalRoot.innerHTML=""; S.i++; S.phase=S.i>=LOTS.length?"end":"play"; render(); scrollTo(0,0); if(S.phase==="end") tone(SFX.win); };
}

function renderEnd(){
  const n=LOTS.length, R=S.results;
  const correct=R.filter(r=>r.kind==="correct").length, escapes=R.filter(r=>r.kind==="escape").length, falses=R.filter(r=>r.kind==="false").length;
  const rank=rankFor(S.score,escapes);
  saveSum("s1", Math.round(correct/n*100)); saveSum("r1",rank); saveSum("e1",escapes); checkZero();
  const line=rank===4?"Twelve lots, zero escapes. You've earned the name.":escapes?"An escape is the one mistake a gatekeeper can't afford. Run it again.":"Solid work. Tighten up the judgment calls and you're there.";
  const col={correct:"var(--go-hi)",escape:"var(--stop-hi)",false:"var(--stop-hi)",safe:"var(--hold-hi)",over:"var(--hold-hi)"};
  const lab={correct:"Correct",escape:"Escape",false:"False rej.",safe:"Partial",over:"Partial"};
  app.innerHTML = topbar() + stats() + `
  <section class="panel">
    <div class="say" style="position:static"><div class="face">${faceImg(rank>=3?"motivational":rank>=1?"confident":"frustrated")}</div><div class="bubble">${line}</div></div>
  </section>
  <section class="panel trophy">
    ${ICON.trophy}
    <div class="ptitle" style="margin:6px 0 0;color:var(--muted);font-size:16px">STAGE 1 RANK</div>
    <div class="rankname">${RANKS[rank]}</div>
    <div class="ladder">${RANKS.map((r,i)=>`<span class="${i===rank?"on":""}">${r}</span>`).join("")}</div>
  </section>
  <div class="kpis">
    <div class="kpi"><b>${Math.round(correct/n*100)}%</b><span>Inspection accuracy</span></div>
    <div class="kpi"><b>${S.score}</b><span>Score of ${MAX}</span></div>
    <div class="kpi"><b style="color:${escapes?"var(--stop-hi)":"var(--go-hi)"}">${escapes}</b><span>Escapes</span></div>
    <div class="kpi"><b>×${S.best}</b><span>Best streak</span></div>
  </div>
  <div class="banner"><span>LOT REVIEW</span></div>
  <section class="panel review">
    ${R.map(r=>`<div class="rrow" style="--rc:${col[r.kind]}"><b>${r.id}</b><div class="why">${r.ref}<br>You: ${r.call} · Correct: ${r.answer}${falses&&0?"":""}</div><div class="res">${lab[r.kind]}<br>${r.pts>=0?"+":""}${r.pts}</div></div>`).join("")}
  </section>
  <button class="cta" id="cont"><span>CONTINUE TO STAGE 2<small>PRODUCTION LINE</small></span>${ICON.chev}</button>
  <button class="cta alt" id="again"><span>REPLAY STAGE 1<small>BEAT YOUR SCORE</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("cont").onclick=()=>{ tone(SFX.click); S.phase="s2intro"; render(); scrollTo(0,0); };
  document.getElementById("again").onclick=()=>{ tone(SFX.click); goHome(); };
}

/* =====================================================================
   STAGE 2 · PRODUCTION LINE — "Catch it before it ships"
   Two conveyor lanes. Tap defective housings before they reach the exit.
   ===================================================================== */
const DEFECTS = {
  missing:  {name:"Missing fastener", tier:0, lesson:"An empty bolt hole means the joint can loosen under load. Count every fastener, every time."},
  scratch:  {name:"Surface scratch",  tier:0, lesson:"A scratch across a sealing face becomes a leak path."},
  contam:   {name:"Contamination",    tier:0, lesson:"Oil and chips cause downstream failures, bad coatings and seal damage."},
  wrongpart:{name:"Wrong component",  tier:1, lesson:"A brass bushing where the BOM calls for steel. Verify components, not just presence."},
  misalign: {name:"Misaligned bore",  tier:1, lesson:"An off-center bore won't line up with the mating part. Check geometry, not just the surface."},
  crack:    {name:"Hairline crack",   tier:2, lesson:"Cracks grow. Hairline today, field failure tomorrow. Look closely at the bore edge."},
};
const S2_TIME = 60, SHIELDS = 5;

// Housing, top view. defect = null | key of DEFECTS. seed varies cosmetic details.
function housingSVG(defect, seed=0){
  const o=[], bx=defect==="misalign"?58:50, by=defect==="misalign"?43:50;
  o.push(`<rect x="6" y="6" width="88" height="88" rx="12" fill="url(#steel)" stroke="#4d5c6d" stroke-width="2"/>`);
  o.push(`<rect x="12" y="12" width="76" height="76" rx="8" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.2"/>`);
  // machining marks for realism
  o.push(`<circle cx="50" cy="50" r="30" fill="none" stroke="rgba(80,95,112,.25)" stroke-width="0.8"/><circle cx="50" cy="50" r="34" fill="none" stroke="rgba(80,95,112,.18)" stroke-width="0.8"/>`);
  // bore
  o.push(`<circle cx="${bx}" cy="${by}" r="19" fill="#8c99a8"/>`);
  if(defect==="wrongpart") o.push(`<circle cx="${bx}" cy="${by}" r="17" fill="url(#brass)" stroke="#7a5212"/>`);
  o.push(`<circle cx="${bx}" cy="${by}" r="${defect==="wrongpart"?12:15}" fill="url(#boreg)"/>`);
  // bolts
  const pos=[[20,20],[80,20],[20,80],[80,80]], miss=defect==="missing"?(seed%4):-1;
  pos.forEach(([x,y],k)=>{
    if(k===miss){ o.push(`<circle cx="${x}" cy="${y}" r="6.5" fill="#0b121b" stroke="#5a6e86" stroke-width="1.5"/><circle cx="${x}" cy="${y}" r="4" fill="none" stroke="#2a3644" stroke-dasharray="1.5 1.5"/>`); return; }
    const h=[0,1,2,3,4,5].map(i=>{const a=Math.PI/3*i+Math.PI/6; return `${(x+7*Math.cos(a)).toFixed(1)},${(y+7*Math.sin(a)).toFixed(1)}`}).join(" ");
    o.push(`<polygon points="${h}" fill="url(#bolt)" stroke="#4d5c6d" stroke-width="1"/><circle cx="${x}" cy="${y}" r="2.6" fill="#8c99a8"/>`);
  });
  if(defect==="scratch"){ const v=seed%2; o.push(v?`<path d="M30 64 L72 34" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M30 64 L72 34" stroke="#ff8a8a" stroke-width=".8"/>`:`<path d="M28 36 Q50 30 70 66" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="M28 36 Q50 30 70 66" fill="none" stroke="#ff8a8a" stroke-width=".8"/>`); }
  if(defect==="contam") o.push(`<path d="M60 64 q8 -6 14 2 q4 8 -6 10 q-10 3 -12 -4 q-2 -5 4 -8z" fill="#3a2a12" opacity=".85"/><path d="M28 60 q3 -4 6 0 q-3 3 -6 0z M34 70 q4 -1 3 4 M24 66 q2 3 6 1" stroke="#d9a63a" stroke-width="1.6" fill="none"/>`);
  if(defect==="crack") o.push(`<path d="M${bx+14} ${by-9} l6 -4 l3 3 l6 -5 l4 1" fill="none" stroke="#1a222c" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>`);
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${o.join("")}</svg>`;
}

const S2 = {}; // live game state (not snapshotted)
function s2reset(){
  Object.assign(S2,{t:0, score:0, combo:0, bestCombo:0, shields:SHIELDS, parts:[], nextId:1, running:false,
    caught:0, escaped:0, falseRej:0, passed:0, byType:{}, last:0, spawnGap:[0,0], shutdown:false, talkUntil:0, warned1:false, warned2:false});
  Object.keys(DEFECTS).forEach(k=>S2.byType[k]={caught:0,missed:0});
}
const mult=()=>Math.min(1+Math.floor(S2.combo/2),5);

function renderS2Intro(){
  const guide=[[null,"Good part"],["missing",DEFECTS.missing.name],["scratch",DEFECTS.scratch.name],["contam",DEFECTS.contam.name],
               ["wrongpart",DEFECTS.wrongpart.name],["misalign",DEFECTS.misalign.name],["crack",DEFECTS.crack.name]];
  app.innerHTML = topbar(true) + `
  <section class="panel stagecard">
    <img src="${IMG.s2scene}" alt="Production line with a missing-fastener defect highlighted" style="aspect-ratio:303/340">
    <div class="body">
      <h2>Stage 2:<br>Catch It Before It Ships</h2>
      <p>Housings are coming down two conveyor lanes. Tap every defective part before it reaches the red exit zone. Leave the good parts alone. The line speeds up the longer you survive.</p>
    </div>
  </section>
  <div class="banner"><span>KNOW YOUR DEFECTS</span></div>
  <section class="panel">
    <div class="guide">${guide.map(([d,n])=>`<div class="g${d?"":" good"}">${housingSVG(d,1)}<b>${n}</b></div>`).join("")}
      <div class="g" style="display:grid;place-items:center"><b style="color:var(--muted)">Harder defects show up later in the shift</b></div></div>
  </section>
  <div class="banner"><span>HOW IT SCORES</span></div>
  <section class="panel howto">
    <div>${ICON.star}<span><b class="pos">+50 × combo</b> for every defect you catch. Chain catches to build the combo up to ×5.</span></div>
    <div>${ICON.warn}<span><b class="neg">−75</b> and a lost shield when a defect escapes. Lose all ${SHIELDS} shields and the line shuts down.</span></div>
    <div>${ICON.redx}<span><b class="neg">−40</b> for pulling a good part. Your combo resets.</span></div>
    <div>${ICON.goldq}<span><b class="pos">+10</b> for every good part that ships. ${S2_TIME} seconds on the clock.</span></div>
  </section>
  <button class="cta" id="s2go"><span>START THE LINE<small>${S2_TIME}-SECOND SHIFT</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s2back"><span>BACK TO STAGE 1<small>THE GATEKEEPER</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("s2go").onclick=()=>{ tone(SFX.click); S.phase="s2play"; render(); scrollTo(0,0); };
  document.getElementById("s2back").onclick=()=>{ tone(SFX.click); goHome(); };
}

const shieldSVG=`<svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" fill="#3b7cc4" stroke="#bfe0ff" stroke-width="1.4"/><path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
function s2hudHTML(){
  return `<div class="s2hud">
    <div class="stat"><div class="k">Score</div><div class="v" id="h-score">${S2.score}${ICON.star}</div></div>
    <div class="stat"><div class="k">Combo</div><div class="v" id="h-combo">×${mult()}${ICON.flame}</div></div>
    <div class="stat"><div class="k">Time</div><div class="v" id="h-time">${Math.max(0,Math.ceil(S2_TIME-S2.t))}</div></div>
  </div>
  <div class="timebar"><i id="h-bar" style="width:100%"></i></div>
  <div class="shields"><span class="k">Quality shields</span><div class="row" id="h-shields">${Array.from({length:SHIELDS},(_,k)=>`<span class="${k<S2.shields?"":"lost"}">${shieldSVG}</span>`).join("")}</div></div>`;
}

function renderS2Play(){
  s2reset();
  app.innerHTML = topbar(true) + s2hudHTML() + `
  <section class="panel callout" style="padding:10px"><div class="face" id="s2face">${faceImg("confident")}</div><div class="bubble" id="s2say">Eyes on the line. Tap the bad ones.</div></section>
  <div class="line" id="line">
    <div class="lane" id="lane0"><div class="exit"><span>SHIPPING</span></div></div>
    <div class="lane" id="lane1"><div class="exit"><span>SHIPPING</span></div></div>
    <div class="countdown" id="cd"><b>3</b></div>
  </div>
  <p style="margin:0;text-align:center;color:var(--muted);font-size:13.5px">Parts move left to right. Tap a defect to pull it off the line.</p>`;
  wireTop();
  const cd=document.getElementById("cd"); let n=3; tone([[440,.1]]);
  // make sure both lanes are on screen before the shift starts (short phones, landscape)
  requestAnimationFrame(()=>{ const ln=document.getElementById("line"); if(ln && ln.getBoundingClientRect().bottom>innerHeight) ln.scrollIntoView({block:"end",behavior:"smooth"}); });
  const tick=setInterval(()=>{ n--; if(!document.getElementById("cd")){clearInterval(tick);return;}
    if(n>0){cd.innerHTML=`<b>${n}</b>`; tone([[440,.1]]);} else if(n===0){cd.innerHTML=`<b>GO!</b>`; tone([[880,.2]]);} else {clearInterval(tick); cd.remove(); s2start();} },700);
}

function say(face,text,ms=1400){
  const f=document.getElementById("s2face"), b=document.getElementById("s2say"); if(!f) return;
  f.innerHTML=faceImg(face); b.textContent=text; S2.talkUntil=S2.t+ms/1000;
}

let rafId=0;
function s2start(){
  S2.running=true; S2.last=performance.now(); S2.spawnGap=[0,60];
  cancelAnimationFrame(rafId); rafId=requestAnimationFrame(s2loop);
}
const REF_BELT = 566;                                           // desktop belt width the speeds were tuned on
function beltScale(){ return (S2.W||REF_BELT)/REF_BELT; }
function speed(){ return (62 + S2.t*1.5) * beltScale(); }       // px per second, ramps up; scaled so a part takes the same TIME to cross on any screen
function defectChance(){ return 0.32 + Math.min(S2.t/S2_TIME,1)*0.14; }
function pickDefect(){
  const tierMax = S2.t<15?0 : S2.t<32?1 : 2;
  const pool = Object.keys(DEFECTS).filter(k=>DEFECTS[k].tier<=tierMax);
  return pool[Math.floor(Math.random()*pool.length)];
}
function spawn(lane){
  const el=document.createElement("button");
  const defect = Math.random()<defectChance() ? pickDefect() : null;
  const p={id:S2.nextId++, lane, x:-96, defect, el, state:"live"};
  el.className="part"; el.setAttribute("aria-label",defect?"Housing":"Housing");
  el.innerHTML=housingSVG(defect, p.id);
  el.style.transform=`translateX(${p.x}px)`;
  el.addEventListener("pointerdown",e=>{e.preventDefault(); hit(p);});
  el.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault(); hit(p);} });
  document.getElementById("lane"+lane).appendChild(el);
  S2.parts.push(p);
  S2.spawnGap[lane] = (28 + Math.random()*120) * beltScale(); // empty belt before next part, scaled to belt width
}
function floatText(p,html,cls){
  const lane=document.getElementById("lane"+p.lane); if(!lane) return;
  const f=document.createElement("div"); f.className="float "+cls; f.innerHTML=html;
  f.style.left=Math.max(50,Math.min(p.x+46,lane.clientWidth-50))+"px"; f.style.top="14px";
  lane.appendChild(f); setTimeout(()=>f.remove(),1000);
}
function updateHUD(){
  const s=document.getElementById("h-score"); if(!s) return;
  s.innerHTML=`${S2.score}${ICON.star}`;
  const c=document.getElementById("h-combo"); c.innerHTML=`×${mult()}${ICON.flame}`; c.classList.toggle("combo-hot",mult()>=3);
  document.getElementById("h-time").textContent=Math.max(0,Math.ceil(S2_TIME-S2.t));
  document.getElementById("h-bar").style.width=Math.max(0,(1-S2.t/S2_TIME)*100)+"%";
  document.getElementById("h-shields").innerHTML=Array.from({length:SHIELDS},(_,k)=>`<span class="${k<S2.shields?"":"lost"}">${shieldSVG}</span>`).join("");
}
function bumpEl(id){ const e=document.getElementById(id); if(!e) return; e.classList.remove("bump"); void e.offsetWidth; e.classList.add("bump"); }

function hit(p){
  if(!S2.running || p.state!=="live") return;
  p.el.style.setProperty("--tf",`translateX(${p.x}px)`);
  if(p.defect){
    S2.combo++; S2.bestCombo=Math.max(S2.bestCombo,S2.combo);
    const pts=50*mult(); S2.score+=pts; S2.caught++; S2.byType[p.defect].caught++;
    p.state="caught"; p.el.classList.add("caught");
    floatText(p,`+${pts}<small>${DEFECTS[p.defect].name}</small>`,"f-good");
    tone([[660+S2.combo*40,.08],[990+S2.combo*40,.12]]);
    if(mult()>=3 && S2.combo%2===0) say("approving",`Combo ×${mult()}! Keep it going!`); else say("approving",["Good catch!","Stop! That's a defect.","Pulled it.","That's the eye."][S2.combo%4]);
    bumpEl("h-score"); bumpEl("h-combo");
  } else {
    S2.combo=0; S2.score-=40; S2.falseRej++;
    p.state="wrong"; p.el.classList.add("wrong");
    floatText(p,`−40<small>Good part</small>`,"f-bad");
    tone(SFX.false); say("frustrated","That one was good. Look before you pull.");
  }
  setTimeout(()=>p.el.remove(),460);
  updateHUD();
}

function s2loop(now){
  if(!S2.running) return;
  const line=document.getElementById("lane0"); if(!line){ S2.running=false; return; }
  let dt=(now-S2.last)/1000; S2.last=now;
  if(document.hidden || dt>0.25) dt=0.016;   // don't jump after a tab switch
  S2.t+=dt;
  const W=line.clientWidth; S2.W=W; const v=speed();
  // spawn per lane when the belt behind the last part is clear enough
  [0,1].forEach(l=>{
    const lastX=S2.parts.filter(p=>p.lane===l&&p.state==="live").reduce((m,p)=>Math.min(m,p.x),Infinity);
    if(l===1 && S2.t<0.8) return; // stagger the second lane
    if(S2.t<S2_TIME-1.5 && (lastX===Infinity ? true : lastX > S2.spawnGap[l])) spawn(l);
  });
  S2.parts.forEach(p=>{
    if(p.state!=="live") return;
    p.x+=v*dt; p.el.style.transform=`translateX(${p.x}px)`;
    if(p.x>W-50){ // reached shipping
      p.state="gone"; p.el.remove();
      if(p.defect){
        S2.escaped++; S2.byType[p.defect].missed++; S2.combo=0; S2.score-=75; S2.shields--;
        floatText({lane:p.lane,x:W-120},`ESCAPE −75<small>${DEFECTS[p.defect].name}</small>`,"f-bad");
        tone(SFX.escape); say("alert",`Escape! ${DEFECTS[p.defect].name} just shipped.`,1800);
        const ex=document.querySelector(`#lane${p.lane} .exit`); ex.classList.remove("flash"); void ex.offsetWidth; ex.classList.add("flash");
      } else { S2.passed++; S2.score+=10; floatText({lane:p.lane,x:W-110},"+10 shipped","f-pass"); }
      updateHUD();
    }
  });
  S2.parts=S2.parts.filter(p=>p.state==="live");
  if(S2.t>S2.talkUntil && S2.t>1){ say("thinking", S2.t>32?"Watch the bore edges now. Cracks are hard to see.":S2.t>15?"New defects coming. Check the bore.":"Eyes on the line."); S2.talkUntil=S2.t+999; }
  if(!S2.warned1 && S2.t>15){ S2.warned1=true; say("surprised","New defects on the line: wrong components and misaligned bores!",2200); }
  if(!S2.warned2 && S2.t>32){ S2.warned2=true; say("surprised","Speeding up. Hairline cracks start now. Look at the bore edge!",2200); }
  if(Math.floor(S2.t*5)!==Math.floor((S2.t-dt)*5)) updateHUD();
  if(S2.shields<=0){ S2.shutdown=true; return s2finish(); }
  if(S2.t>=S2_TIME && S2.parts.length===0) return s2finish();
  if(S2.t>=S2_TIME+6) return s2finish();
  rafId=requestAnimationFrame(s2loop);
}

function s2finish(){
  S2.running=false; cancelAnimationFrame(rafId);
  S.s2 = {score:S2.score, caught:S2.caught, escaped:S2.escaped, falseRej:S2.falseRej, passed:S2.passed,
          bestCombo:S2.bestCombo, byType:S2.byType, shutdown:S2.shutdown};
  saveSum("s2", Math.round(S2.caught/Math.max(1,S2.caught+S2.escaped)*100)); saveSum("r2", s2rank(S.s2).k); saveSum("e2", S2.shutdown?99:S2.escaped); checkZero();
  tone(S2.shutdown?SFX.escape:SFX.win);
  S.phase="s2end"; render(); scrollTo(0,0);
}

function s2rank(r){
  const total=r.caught+r.escaped, det= total? r.caught/total : 0;
  let k=0; if(det>=.5) k=1; if(det>=.75) k=2; if(det>=.9) k=3; if(det===1 && r.falseRej<=1 && total>=8) k=4;
  if(r.shutdown) k=Math.min(k,1);
  return {k, det};
}

function renderS2End(){
  const r=S.s2; if(!r){ S.phase="s2intro"; return render(); }
  const {k,det}=s2rank(r);
  const line = r.shutdown ? "Too many escapes. The customer shut us down. Run it back." :
    k===4 ? "Nothing got past you. That's Mister Quality work." :
    r.escaped ? "Every escape is a part in the customer's hands. Tighten it up." : "Clean shift. Now be faster.";
  const types=Object.keys(DEFECTS).filter(t=>r.byType[t].caught+r.byType[t].missed>0);
  app.innerHTML = topbar(true) + `
  <section class="panel callout" style="padding:10px"><div class="face">${faceImg(r.shutdown?"frustrated":k>=3?"motivational":"confident")}</div><div class="bubble">${line}</div></section>
  <section class="panel trophy">
    ${ICON.trophy}
    <div class="ptitle" style="margin:6px 0 0;color:${r.shutdown?"var(--stop-hi)":"var(--muted)"};font-size:16px">${r.shutdown?"LINE SHUTDOWN":"STAGE 2 RANK"}</div>
    <div class="rankname">${RANKS[k]}</div>
    <div class="ladder">${RANKS.map((n,i)=>`<span class="${i===k?"on":""}">${n}</span>`).join("")}</div>
  </section>
  <div class="kpis">
    <div class="kpi"><b>${Math.round(det*100)}%</b><span>Defect detection</span></div>
    <div class="kpi"><b>${r.score}</b><span>Score</span></div>
    <div class="kpi"><b style="color:${r.escaped?"var(--stop-hi)":"var(--go-hi)"}">${r.escaped}</b><span>Escapes</span></div>
    <div class="kpi"><b>${r.falseRej}</b><span>False rejects</span></div>
    <div class="kpi"><b>${r.caught}</b><span>Defects caught</span></div>
    <div class="kpi"><b>×${Math.min(1+Math.floor(r.bestCombo/2),5)}</b><span>Best combo (${r.bestCombo} in a row)</span></div>
  </div>
  <div class="banner"><span>DEFECT REPORT</span></div>
  <section class="panel dtable">
    ${types.length? types.map(t=>{const b=r.byType[t]; return `<div class="drow">${housingSVG(t,2)}<div><b>${DEFECTS[t].name}</b><p>${DEFECTS[t].lesson}</p></div>
      <div class="n"><span style="color:var(--go-hi)">${b.caught}</span> / <span style="color:${b.missed?"var(--stop-hi)":"var(--muted)"}">${b.missed}</span></div></div>`}).join("")
      + `<p style="margin:4px 0 0;font-size:13px;color:var(--muted);text-align:right">caught / escaped</p>`
      : `<p style="margin:0">No defects reached you this shift.</p>`}
  </section>
  <button class="cta" id="s2s3"><span>CONTINUE TO STAGE 3<small>METROLOGY LAB</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s2again"><span>RUN THE LINE AGAIN<small>BEAT ${r.score}</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s2s1"><span>BACK TO STAGE 1<small>THE GATEKEEPER</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("s2s3").onclick=()=>{ tone(SFX.click); S.phase="s3intro"; render(); scrollTo(0,0); };
  document.getElementById("s2again").onclick=()=>{ tone(SFX.click); S.phase="s2play"; render(); scrollTo(0,0); };
  document.getElementById("s2s1").onclick=()=>{ tone(SFX.click); goHome(); };
}


/* =====================================================================
   STAGE 3 · METROLOGY LAB — "Measure twice"
   Pick the right gauge, take the reading, judge it against the tolerance.
   ===================================================================== */
const TOOLS = {
  caliper:{name:"Caliper",        res:"0.01 mm",  dec:2},
  mic:    {name:"Micrometer",     res:"0.001 mm", dec:3},
  bore:   {name:"Bore gauge",     res:"0.001 mm", dec:3},
  height: {name:"Height gauge",   res:"0.01 mm",  dec:2},
  plug:   {name:"Go/No-Go plug",  res:"Attribute", attr:true},
  ring:   {name:"Thread ring",    res:"Attribute", attr:true},
};
const TOOL_SVG = {
  caliper:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="5" y="17" width="54" height="7" rx="1"/><path d="M8 24v20h5l2-20M8 17V9h4v8"/><path d="M30 24v16h6V24M30 17v-6h4v6"/><rect x="38" y="7" width="15" height="10" rx="2"/><path d="M40 12h11" stroke-width="1.6"/><path d="M16 21h2M20 21h2M24 21h2M42 21h2M46 21h2M50 21h2" stroke-width="1.2"/></svg>`,
  mic:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M22 14H14C5 22 5 42 14 50H30"/><path d="M22 10v8"/><rect x="26" y="11" width="8" height="6"/><rect x="34" y="9" width="10" height="10"/><rect x="44" y="7" width="14" height="14" rx="2"/><path d="M47 7v14M51 7v14M55 7v14" stroke-width="1.2"/><path d="M34 14h10" stroke-width="1.2"/></svg>`,
  bore:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><circle cx="32" cy="13" r="9"/><path d="M32 13l4-4" stroke-width="1.8"/><rect x="28" y="22" width="8" height="24"/><rect x="23" y="46" width="18" height="8" rx="2"/><path d="M23 50h-6M41 50h6M32 54v5"/></svg>`,
  height:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="8" y="50" width="40" height="8" rx="1"/><rect x="18" y="6" width="7" height="44"/><rect x="15" y="26" width="20" height="9" rx="1"/><path d="M35 30h18l5 3"/><rect x="28" y="10" width="16" height="9" rx="2"/><path d="M30 14.5h12" stroke-width="1.4"/></svg>`,
  plug:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><rect x="20" y="27" width="24" height="10" rx="2"/><path d="M24 27v10M28 27v10M32 27v10M36 27v10M40 27v10" stroke-width="1"/><rect x="4" y="28" width="16" height="8" rx="1" stroke="#56f08a"/><rect x="44" y="28.5" width="16" height="7" rx="1" stroke="#ff6060"/><text x="12" y="50" font-size="8" fill="#56f08a" stroke="none" text-anchor="middle" font-family="sans-serif" font-weight="700">GO</text><text x="52" y="50" font-size="8" fill="#ff6060" stroke="none" text-anchor="middle" font-family="sans-serif" font-weight="700">NO</text></svg>`,
  ring:`<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="11"/><circle cx="32" cy="32" r="14" stroke-dasharray="2 2" stroke-width="1.4"/><path d="M32 7v4M32 53v4M7 32h4M53 32h4M14 14l3 3M47 47l3 3M14 50l3-3M47 17l3-3" stroke-width="2"/></svg>`,
};
const NO = (why)=>["no",why];
const MEAS = [
  {title:"Shaft overall length", part:"shaft", dim:"len", feat:"Length", spec:"120.00 ± 0.50", lo:119.50, hi:120.50, truth:120.18,
   tools:{caliper:"best", mic:"ok", height:"ok", bore:NO("A bore gauge only measures inside diameters."), plug:NO("A plug gauge checks holes, not lengths."), ring:NO("A thread ring only checks external threads.")},
   lesson:"±0.50 is a 1.00 mm tolerance band. A caliper's 0.01 mm resolution is 100:1 against that. Fast and more than good enough."},
  {title:"Bearing journal diameter", part:"shaft", dim:"od", feat:"Journal Ø", spec:"Ø25.000 ± 0.010", lo:24.990, hi:25.010, truth:25.013,
   tools:{caliper:"coarse", mic:"best", height:NO("A height gauge measures heights off a surface plate, not diameters."), bore:NO("A bore gauge measures inside diameters. This is an outside diameter."), plug:NO("A plug gauge checks holes."), ring:NO("This journal isn't threaded.")},
   lesson:"The band is only 0.020 mm, so by the 10:1 rule you need 0.002 mm resolution or better. That's a micrometer. A caliper rounds 25.013 down to 25.01 and hides an oversize part."},
  {title:"Bushing bore", part:"bush", dim:"bore", feat:"Bore Ø", spec:"Ø20.000 +0.021 / −0", lo:20.000, hi:20.021, truth:20.008,
   tools:{bore:"best", plug:"ok", caliper:"coarse", mic:NO("An outside micrometer can't reach inside a bore."), height:NO("A height gauge can't measure an inside diameter."), ring:NO("A thread ring checks external threads.")},
   plugText:"GO pin enters · NO-GO pin stops",
   lesson:"An H7 bore with a 0.021 mm band needs a bore gauge for a real number. A Go/No-Go plug is fine for a pass/fail production check but won't tell you where in the band you are."},
  {title:"Step height from datum", part:"step", dim:"step", feat:"Step height", spec:"15.00 ± 0.05", lo:14.95, hi:15.05, truth:14.94,
   tools:{height:"best", caliper:"ok", mic:NO("This needs a depth or height measurement off the datum. An outside mic can't reference the base."), bore:NO("A bore gauge only measures inside diameters."), plug:NO("A plug gauge checks holes."), ring:NO("There's no thread here.")},
   lesson:"Heights are measured from the datum. Put the part on the surface plate and use a height gauge so the base is your reference. 14.94 is under the 14.95 lower limit."},
  {title:"Mounting stud thread", part:"stud", dim:"thread", feat:"Thread", spec:"M10 × 1.5 – 6g", thread:true,
   truthIn:true,
   tools:{ring:"best", caliper:NO("A caliper reads the major diameter but can't check pitch diameter or thread form."), mic:NO("A plain micrometer can't check pitch diameter. You'd need thread wires or a thread mic."), bore:NO("A bore gauge is for inside diameters."), plug:NO("A plug gauge checks internal threads and holes. This is an external thread."), height:NO("A height gauge can't check a thread.")},
   ringText:"GO ring threads on fully · NO-GO ring stops within 2 turns",
   lesson:"External threads are checked with Go/No-Go thread rings. GO must thread on the full length, and NO-GO must stop within two turns. This thread passes."},
  {title:"Plate hole · 50-piece run", part:"plate", dim:"hole", feat:"Hole Ø", spec:"Ø8.00 +0.10 / −0", lo:8.00, hi:8.10, truth:8.13,
   tools:{plug:"best", bore:"ok", caliper:"coarse", mic:NO("An outside mic can't reach inside a hole."), height:NO("A height gauge can't measure a hole diameter."), ring:NO("A thread ring checks external threads.")},
   plugText:"GO pin enters · NO-GO pin ALSO enters",
   lesson:"For 50 parts, a Go/No-Go plug is the fast, correct check. If the NO-GO pin enters, the hole is oversize. That's a fail, every time."},
  {title:"Block width", part:"block", dim:"width", feat:"Width", spec:"40.000 ± 0.030", lo:39.970, hi:40.030, truth:40.030,
   tools:{mic:"best", height:"ok", caliper:"coarse", bore:NO("A bore gauge only measures inside diameters."), plug:NO("A plug gauge checks holes."), ring:NO("There's no thread here.")},
   lesson:"A 0.060 mm band calls for 0.006 mm resolution or better, so a micrometer. The reading is exactly 40.030, the upper limit. Limits are inclusive, so it passes."},
  {title:"Flange outside diameter", part:"flange", dim:"od", feat:"Flange Ø", spec:"Ø50.00 ± 0.10", lo:49.90, hi:50.10, truth:49.886,
   tools:{caliper:"best", mic:"ok", height:NO("A height gauge measures heights, not outside diameters."), bore:NO("A bore gauge measures inside diameters."), plug:NO("A plug gauge checks holes."), ring:NO("There's no thread here.")},
   lesson:"A 0.20 mm band with a 0.01 mm caliper is 20:1, so the caliper is the right call. 49.89 is under the 49.90 lower limit. Undersize."},
];
MEAS.forEach(m=>{ if(!m.thread) m.truthIn = m.truth >= m.lo-1e-9 && m.truth <= m.hi+1e-9; });

// Part drawings. mode "bp" = blueprint line work with the measured dimension; "metal" = part on the table.
function s3part(t, mode){
  const bp=mode==="bp", cls=bp?"bp-lines":"p-metal", hid=bp?"bp-hidden":"p-dark", o=[];
  const ah=`<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#38e1ff"/></marker></defs>`;
  const dim=(d,ext)=>bp?`<path class="bp-ext" d="${ext}"/><path class="bp-dim" d="${d}" marker-start="url(#ah)" marker-end="url(#ah)"/>`:"";
  switch(t.part){
    case "shaft":
      o.push(`<rect class="${cls}" x="30" y="40" width="180" height="40" rx="3"/>`);
      if(bp) o.push(`<path class="bp-hidden" d="M20 60H220" stroke-dasharray="14 4 3 4"/>`);
      if(t.dim==="len") o.push(dim("M30 102H210","M30 82V108M210 82V108"));
      else o.push(dim("M224 40V80","M212 40H230M212 80H230"));
      break;
    case "bush":
      o.push(`<rect class="${cls}" x="60" y="20" width="120" height="80" rx="3"/>`);
      o.push(bp?`<path class="bp-hidden" d="M60 42H180M60 78H180"/>`:`<rect class="p-dark" x="60" y="42" width="10" height="36"/>`);
      o.push(dim("M206 42V78","M182 42H212M182 78H212"));
      break;
    case "step":
      o.push(`<path class="${cls}" d="M30 100H210V60H120V30H30Z"/>`);
      o.push(dim("M226 60V100","M212 60H232M212 100H232"));
      if(bp) o.push(`<text class="bp-text" x="34" y="114">DATUM A</text><path class="bp-ext" d="M30 104H90"/>`);
      break;
    case "stud": {
      o.push(`<rect class="${cls}" x="30" y="32" width="40" height="56" rx="3"/><rect class="${cls}" x="70" y="47" width="140" height="26"/>`);
      let z="M90 47"; for(let x=90;x<208;x+=8) z+=` L${x+4} 43 L${x+8} 47`; let z2="M90 73"; for(let x=90;x<208;x+=8) z2+=` L${x+4} 77 L${x+8} 73`;
      o.push(`<path class="${bp?"bp-lines":"p-thread"}" d="${z}"/><path class="${bp?"bp-lines":"p-thread"}" d="${z2}"/>`);
      if(bp) o.push(`<path class="bp-dim" d="M150 43L176 16H226" marker-start="url(#ah)"/><text class="bp-text" x="178" y="12">THREAD</text>`);
      break; }
    case "plate":
      o.push(`<rect class="${cls}" x="30" y="40" width="180" height="40" rx="2"/>`);
      o.push(bp?`<path class="bp-hidden" d="M112 40V80M128 40V80"/>`:`<rect class="p-dark" x="112" y="40" width="16" height="40" opacity=".9"/>`);
      o.push(dim("M112 22H128","M112 38V16M128 38V16"));
      break;
    case "block":
      o.push(`<rect class="${cls}" x="50" y="26" width="140" height="62" rx="3"/>`);
      o.push(dim("M50 106H190","M50 90V112M190 90V112"));
      break;
    case "flange":
      o.push(`<path class="${cls}" d="M40 48H95V20H145V48H200V72H145V100H95V72H40Z"/>`);
      o.push(bp?`<path class="bp-hidden" d="M110 20V100M130 20V100"/>`:`<rect class="p-dark" x="110" y="20" width="20" height="5"/>`);
      o.push(dim("M40 110H200","M40 74V116M200 74V116"));
      break;
  }
  return `<svg viewBox="0 0 240 ${bp?122:120}" aria-hidden="true">${bp?ah:""}${o.join("")}</svg>`;
}

function s3reset(){ S.s3={i:0, score:0, results:[]}; }
let T3=null; // per-task working state

function renderS3Intro(){
  app.innerHTML = topbar(3) + `
  <section class="panel stagecard">
    <img src="${IMG.s3scene}" alt="Mister Quality measuring a part with a caliper in the metrology lab" style="aspect-ratio:282/340">
    <div class="body">
      <h2>Stage 3:<br>Measure Twice</h2>
      <p>Eight parts are waiting on the inspection table. For each one, read the blueprint, pull the right gauge off the tool wall, take the reading, and decide whether it's in tolerance.</p>
    </div>
  </section>
  <div class="banner"><span>THE GOLDEN RULE</span></div>
  <section class="rule10"><div class="big">10:1</div><p>Your gauge's resolution should be one-tenth of the tolerance band or finer. A ±0.010 band is 0.020 wide, so you need 0.002 or better. Pick a gauge that's too coarse and the reading can lie to you.</p></section>
  <div class="banner"><span>HOW IT SCORES</span></div>
  <section class="panel howto">
    <div>${ICON.star}<span><b class="pos">+100</b> for the best gauge on your first pick, <b class="pos">+50</b> for one that works.</span></div>
    <div>${ICON.goldq}<span><b class="pos">+100</b> for the correct IN or OUT of tolerance call.</span></div>
    <div>${ICON.warn}<span><b class="neg">−100</b> if you pass a part that's out of tolerance. That's an escape.</span></div>
    <div>${ICON.redx}<span><b class="neg">−50</b> if you fail a good part.</span></div>
  </section>
  <button class="cta" id="s3go"><span>ENTER THE LAB<small>8 MEASUREMENTS</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s3back"><span>BACK TO STAGE 2<small>PRODUCTION LINE</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("s3go").onclick=()=>{ tone(SFX.click); s3reset(); S.phase="s3play"; render(); scrollTo(0,0); };
  document.getElementById("s3back").onclick=()=>{ tone(SFX.click); S.phase="s2intro"; render(); scrollTo(0,0); };
}

function s3hud(){
  const R=S.s3.results, best=R.filter(r=>r.fit==="best").length;
  const streak=(()=>{let n=0; for(let k=R.length-1;k>=0&&R[k].ok;k--) n++; return n;})();
  return `<div class="stats">
    <div class="stat"><div class="k">Score</div><div class="v" id="s3score">${S.s3.score}${ICON.star}</div></div>
    <div class="stat"><div class="k">Best gauge</div><div class="v">${best}/${R.length}</div></div>
    <div class="stat"><div class="k">Streak</div><div class="v">×${streak}${ICON.flame}</div></div>
  </div>`;
}

function renderS3Play(){
  if(!S.s3) s3reset();
  const m=MEAS[S.s3.i];
  T3={fit:null, tool:null, phase:"pick"};
  app.innerHTML = topbar(3) + s3hud() + `
  <section class="panel lab">
    <div class="bpcard">
      <div class="bphead"><span>${m.title}</span><span>Part ${S.s3.i+1}/${MEAS.length}</span></div>
      ${s3part(m,"bp")}
      <div class="bp-callout"><small>${m.feat}</small>${m.spec}</div>
    </div>
    <div class="table3d" id="table"><div class="surface"></div><div class="onplate">${s3part(m,"metal")}</div></div>
    <div class="dro">
      <div><div class="lbl"><span id="dro-tool">No gauge selected</span><span id="dro-res"></span></div><div class="val idle" id="dro-val">--.---</div></div>
      <div class="leds"><i class="led" id="led1"></i><i class="led" id="led2"></i><i class="led" id="led3"></i></div>
    </div>
    <div class="watcher"><div class="bubble" id="w-say">${S.s3.i===0?"Read the print first. Then pick your gauge.":"What's the right tool for this tolerance?"}</div><div class="face" id="w-face">${faceImg("thinking")}</div></div>
  </section>
  <div class="steps" id="steps">${["Read print","Pick gauge","Measure","Judge"].map((t,k)=>`<div class="stp" data-n="${k+1}"><i>${k+1}</i>${t}</div>`).join("")}</div>
  <section class="wall">
    <div class="wall-h">TOOL WALL</div>
    <div class="tools">${Object.entries(TOOLS).map(([k,t])=>`<button class="tool" data-k="${k}">${TOOL_SVG[k]}<b>${t.name}</b><span>${t.res}</span></button>`).join("")}</div>
  </section>
  <div class="judge" id="judge" hidden>
    <button class="jbtn in" id="j-in" disabled>IN TOLERANCE<small>ACCEPT THE PART</small></button>
    <button class="jbtn out" id="j-out" disabled>OUT OF TOLERANCE<small>REJECT THE PART</small></button>
  </div>`;
  wireTop();
  app.querySelectorAll(".tool").forEach(b=>b.onclick=()=>s3pick(b.dataset.k,b));
  document.getElementById("j-in").onclick=()=>s3judge("IN");
  document.getElementById("j-out").onclick=()=>s3judge("OUT");
  s3step(1);
  T3.phase="read";
  setTimeout(()=>{ if(T3&&T3.phase==="read"&&document.getElementById("steps")){ T3.phase="pick"; s3step(2);
    const t=app.querySelector(".tool"); if(t && t.getBoundingClientRect().bottom>innerHeight) t.scrollIntoView({behavior:"smooth",block:"end"}); } },1300);
}

function s3step(n){ app.querySelectorAll(".stp").forEach(e=>{const k=+e.dataset.n; e.classList.toggle("done",k<n); e.classList.toggle("on",k===n);}); }
function wsay(face,text){ const f=document.getElementById("w-face"), b=document.getElementById("w-say"); if(f){f.innerHTML=faceImg(face); b.textContent=text;} }

function s3pick(k,btn){
  if(T3.phase==="read"){ T3.phase="pick"; s3step(2); }
  if(T3.phase!=="pick") return;
  const m=MEAS[S.s3.i], fit=m.tools[k];
  if(Array.isArray(fit)){
    if(!T3.fit) T3.fit="no";
    btn.classList.add("nope"); btn.disabled=true;
    tone(SFX.over); wsay("frustrated",fit[1]);
    return;
  }
  if(!T3.fit) T3.fit=fit;
  T3.tool=k; T3.phase="measuring"; tone(SFX.click);
  app.querySelectorAll(".tool").forEach(b=>{ b.disabled=true; if(b===btn) b.classList.add("sel"); });
  const table=document.getElementById("table");
  table.insertAdjacentHTML("beforeend",`<div class="toolfly">${TOOL_SVG[k]}</div><div class="scanline"></div>`);
  document.getElementById("dro-tool").textContent=TOOLS[k].name;
  document.getElementById("dro-res").textContent="RES "+TOOLS[k].res;
  s3step(3);
  wsay("thinking", fit==="coarse" ? "Hmm." : "Let's see what it reads.");
  const val=document.getElementById("dro-val"); val.classList.remove("idle");
  const tool=TOOLS[k];
  // final reading: attribute text, or the true value rounded to the gauge's resolution
  const reading = tool.attr ? (k==="plug"?m.plugText:m.ringText) : m.truth.toFixed(tool.dec);
  let n=0; document.getElementById("led1").className="led on-c";
  const roll=setInterval(()=>{
    n++; if(!document.getElementById("dro-val")){clearInterval(roll);return;}
    if(tool.attr){ val.className="val attr"; val.textContent=["GO ▸ checking…","NO-GO ▸ checking…"][n%2]; }
    else val.textContent=(m.truth+(Math.random()-.5)*Math.max(.4/(n+1),.002)).toFixed(tool.dec);
    if(n%3===0) tone([[1400+Math.random()*400,.02,"sine"]]);
    if(n>=16){ clearInterval(roll);
      val.textContent=reading; T3.reading=reading; T3.phase="judge";
      document.getElementById("led2").className="led on-c"; document.getElementById("led3").className="led on-g";
      tone([[1046,.12,"sine"]]);
      s3step(4);
      const jg=document.getElementById("judge"); jg.hidden=false; jg.classList.add("reveal");
      document.getElementById("j-in").disabled=false; document.getElementById("j-out").disabled=false;
      wsay(fit==="best"?"approving":"thinking", fit==="best"?"Right tool. Now, is it in tolerance?":fit==="ok"?"That'll work. Read it and decide.":"That's your reading. Make the call.");
      document.getElementById("judge").scrollIntoView({behavior:"smooth",block:"center"});
    }
  },70);
}

function s3judge(call){
  if(T3.phase!=="judge") return; T3.phase="done";
  const m=MEAS[S.s3.i], truth=m.truthIn?"IN":"OUT", ok=call===truth;
  const toolPts = T3.fit==="best"?100 : T3.fit==="ok"?50 : 0;
  const callPts = ok?100 : (call==="IN"?-100:-50);
  const kind = ok?"correct" : call==="IN"?"escape":"false";
  S.s3.score += toolPts+callPts;
  S.s3.results.push({title:m.title, fit:T3.fit, tool:T3.tool, call, truth, ok, kind, pts:toolPts+callPts});
  tone(SFX[kind]);
  const bestTool = Object.keys(m.tools).find(k=>m.tools[k]==="best");
  const H={correct:["approving","MEASURED RIGHT","v-good","That's how you measure."],
           escape:["alert","ESCAPE!","v-bad","That part's out of tolerance."],
           false:["frustrated","GOOD PART FAILED","v-bad","That part was in tolerance."]}[kind];
  const fitTxt={best:"Best gauge",ok:"Works, not the best",coarse:"Too coarse for this tolerance",no:"Wrong gauge on first pick"}[T3.fit];
  const limits = m.thread ? `<b>Spec</b> ${m.spec}<br><b>Reading</b> ${T3.reading}<br><b>Result</b> ${truth}` :
    `<b>Limits</b> ${m.lo.toFixed(3)} – ${m.hi.toFixed(3)}<br><b>Your reading</b> ${T3.reading}<br><b>True size</b> ${m.truth.toFixed(3)} → ${truth==="IN"?"IN TOLERANCE":"OUT OF TOLERANCE"}`;
  modalRoot.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="Measurement result">
    <div class="panel vcard ${H[2]}">
      <div class="bigface">${faceImg(H[0])}</div>
      <h2>${H[1]}</h2>
      <div class="quote">“${H[3]}”</div>
      <div class="pts">${toolPts+callPts>=0?"+":""}${toolPts+callPts}</div>
      <div class="calls"><span class="chip">Gauge: ${TOOLS[T3.tool].name} · ${toolPts>=0?"+":""}${toolPts}</span><span class="chip">Call <i class="t-${call==="IN"?"ACCEPT":"REJECT"}">${call}</i> · ${callPts>=0?"+":""}${callPts}</span></div>
      <div class="vlimits">${limits}</div>
      <p><b>${fitTxt}.</b> Best gauge: ${TOOLS[bestTool].name}. ${m.lesson}</p>
      <button class="cta" id="s3next"><span>${S.s3.i===MEAS.length-1?"SEE YOUR RANK":"NEXT PART"}<small>${S.s3.i===MEAS.length-1?"STAGE 3 COMPLETE":MEAS[S.s3.i+1].title.toUpperCase()}</small></span>${ICON.chev}</button>
    </div></div>`;
  const n=document.getElementById("s3next"); n.focus({preventScroll:true});
  n.onclick=()=>{ tone(SFX.click); modalRoot.innerHTML=""; S.s3.i++; S.phase=S.s3.i>=MEAS.length?"s3end":"s3play"; render(); scrollTo(0,0); if(S.phase==="s3end") tone(SFX.win); };
}

function renderS3End(){
  if(!S.s3){ S.phase="s3intro"; return render(); }
  const R=S.s3.results, n=MEAS.length, max=n*200;
  const best=R.filter(r=>r.fit==="best").length, right=R.filter(r=>r.ok).length, esc=R.filter(r=>r.kind==="escape").length;
  saveSum("s3", Math.round(right/n*100));
  const p=S.s3.score/max; let k=0; if(p>=.35)k=1; if(p>=.55)k=2; if(p>=.75)k=3; if(p>=.9&&esc===0)k=4; if(esc) k=Math.min(k,2);
  saveSum("r3",k); if(best===n) earn("gauge");
  const line = k===4?"Right gauge, right reading, right call. Every time.": esc?"A coarse gauge or a rushed read lets bad parts through. Measure twice.":"Good measuring. Sharpen your gauge choices against the 10:1 rule.";
  app.innerHTML = topbar(3) + `
  <section class="panel callout" style="padding:10px"><div class="face">${faceImg(k>=3?"motivational":esc?"frustrated":"confident")}</div><div class="bubble">${line}</div></section>
  <section class="panel trophy">${ICON.trophy}
    <div class="ptitle" style="margin:6px 0 0;color:var(--muted);font-size:16px">STAGE 3 RANK</div>
    <div class="rankname">${RANKS[k]}</div>
    <div class="ladder">${RANKS.map((r,i)=>`<span class="${i===k?"on":""}">${r}</span>`).join("")}</div>
  </section>
  <div class="kpis">
    <div class="kpi"><b>${Math.round(right/n*100)}%</b><span>Judgment accuracy</span></div>
    <div class="kpi"><b>${best}/${n}</b><span>Best gauge picks</span></div>
    <div class="kpi"><b>${S.s3.score}</b><span>Score of ${max}</span></div>
    <div class="kpi"><b style="color:${esc?"var(--stop-hi)":"var(--go-hi)"}">${esc}</b><span>Escapes</span></div>
  </div>
  <div class="banner"><span>MEASUREMENT LOG</span></div>
  <section class="panel review">
    ${R.map(r=>`<div class="rrow" style="--rc:${r.ok?"var(--go-hi)":"var(--stop-hi)"}"><b>${TOOLS[r.tool].name.split(" ")[0]}</b><div class="why">${r.title}<br>Called ${r.call} · actual ${r.truth} · ${r.fit==="best"?"best gauge":r.fit==="ok"?"workable gauge":r.fit==="coarse"?"gauge too coarse":"wrong first pick"}</div><div class="res">${r.ok?"Right":r.kind==="escape"?"Escape":"False rej."}<br>${r.pts>=0?"+":""}${r.pts}</div></div>`).join("")}
  </section>
  <button class="cta" id="s3s4"><span>CONTINUE TO STAGE 4<small>ROOT CAUSE INVESTIGATION</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s3again"><span>RUN THE LAB AGAIN<small>BEAT ${S.s3.score}</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s3home"><span>BACK TO TITLE<small>ALL STAGES</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("s3s4").onclick=()=>{ tone(SFX.click); S.phase="s4intro"; render(); scrollTo(0,0); };
  document.getElementById("s3again").onclick=()=>{ tone(SFX.click); s3reset(); S.phase="s3play"; render(); scrollTo(0,0); };
  document.getElementById("s3home").onclick=()=>{ tone(SFX.click); goHome(); };
}


/* =====================================================================
   STAGE 4 · ROOT CAUSE INVESTIGATION — "Find the why"
   Case: QF-2210 flanges cracking at assembly. Review evidence, write the
   problem statement, build the 5 Whys, choose the corrective action.
   ===================================================================== */
const FIG = {
  photo:`<svg viewBox="0 0 200 120"><rect width="200" height="120" fill="#2b313a"/><circle cx="100" cy="60" r="50" fill="url(#steel)" stroke="#59677a" stroke-width="2"/><circle cx="100" cy="60" r="18" fill="#0b1a2e" stroke="#59677a" stroke-width="2"/>
    ${[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3-Math.PI/2;return `<circle cx="${(100+36*Math.cos(a)).toFixed(1)}" cy="${(60+36*Math.sin(a)).toFixed(1)}" r="5.5" fill="#0b1a2e" stroke="#59677a"/>`}).join("")}
    <path d="M131 42 l5 -3 l3 3 l5 -4 l2 3 l4 -2" fill="none" stroke="#120a0a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="140" cy="40" r="17" fill="none" stroke="#ffcc1f" stroke-width="3"/><path d="M152 52 l14 14" stroke="#ffcc1f" stroke-width="5" stroke-linecap="round"/>
    <text x="8" y="112" font-size="9" fill="#cfd6df" font-family="monospace">S/N 1547 · CRACK AT HOLE 2</text></svg>`,
  hard:(()=>{const lots=[["10/06",16.5],["10/08",16.8],["10/10",16.2],["10/12",16.6],["10/14",10.2],["10/16",9.6],["10/18",9.9],["10/20",10.6]];
    return `<svg viewBox="0 0 220 130"><rect width="220" height="130" fill="#fff"/>
    ${[0,5,10,15,20].map(v=>`<line x1="30" x2="214" y1="${110-v*4.5}" y2="${110-v*4.5}" stroke="#e1e6ec"/><text x="24" y="${113-v*4.5}" font-size="8" fill="#6b7585" text-anchor="end" font-family="monospace">${v}</text>`).join("")}
    ${lots.map(([d,v],i)=>`<rect x="${36+i*22}" y="${110-v*4.5}" width="14" height="${v*4.5}" fill="${v<15?"#d42a2a":"#2a64b0"}"/><text x="${43+i*22}" y="122" font-size="7" fill="#6b7585" text-anchor="middle" font-family="monospace">${d}</text>`).join("")}
    <line x1="30" x2="214" y1="${110-15*4.5}" y2="${110-15*4.5}" stroke="#1e8a42" stroke-width="2" stroke-dasharray="5 3"/><text x="212" y="${106-15*4.5}" font-size="8" fill="#1e8a42" text-anchor="end" font-family="sans-serif" font-weight="700">SPEC ≥ 15</text>
    <text x="34" y="12" font-size="9" fill="#18304f" font-family="sans-serif" font-weight="700">Webster B hardness by aging date</text></svg>`})(),
  furnace:(probe)=>{const y=t=>110-(t-280)*1.1;
    return `<svg viewBox="0 0 220 130"><rect width="220" height="130" fill="#fff"/>
    ${[280,300,320,340,360].map(t=>`<line x1="34" x2="214" y1="${y(t)}" y2="${y(t)}" stroke="#e1e6ec"/><text x="30" y="${y(t)+3}" font-size="8" fill="#6b7585" text-anchor="end" font-family="monospace">${t}</text>`).join("")}
    <path d="M34 ${y(350)} H214" stroke="#2a64b0" stroke-width="3"/><text x="38" y="${y(350)-5}" font-size="8.5" fill="#2a64b0" font-family="sans-serif" font-weight="700">Controller display: 350 °F</text>
    ${probe?`<path d="M34 ${y(310)} H214" stroke="#d42a2a" stroke-width="2" stroke-dasharray="4 3"/>${[50,70,90,110,130,150,170,190,206].map((x,i)=>`<circle cx="${x}" cy="${y(308+(i*7)%5)}" r="3.5" fill="#d42a2a"/>`).join("")}<text x="38" y="${y(310)+14}" font-size="8.5" fill="#d42a2a" font-family="sans-serif" font-weight="700">Survey probes: 308–312 °F</text>`:""}
    <text x="34" y="12" font-size="9" fill="#18304f" font-family="sans-serif" font-weight="700">Aging furnace AF-2 · temperature °F</text></svg>`},
};
const EVID = [
  {id:"photo",  title:"Defect photo",       sub:"Cracked flange", fig:FIG.photo,
   src:"Lab · failure analysis", body:"The crack starts at a bolt hole and runs out to the OD. The fracture surface is dull and grainy across the whole section. There are no tool marks or burrs at the origin."},
  {id:"torque", title:"Torque audit",       sub:"Line 2 assembly",
   src:"Assembly · Line 2", body:"Wrench T-112 was calibrated Oct 1 and is due Jan 1. An audit of 30 joints read 24–26 N·m against a 25 ± 2 N·m spec. Same wrench, same operators and same procedure as before the cracking started."},
  {id:"hard",   title:"Hardness log",       sub:"Webster B readings", fig:FIG.hard,
   src:"Lab · hardness test", body:"Spec for 6061-T6 is Webster B 15 or higher. Lots aged Oct 6–12 read 16–17. Lots aged Oct 13–20 read 9–11. Every cracked part came from the Oct 13–20 lots."},
  {id:"cert",   title:"Material certs",     sub:"Mill cert + spectro",
   src:"Receiving · supplier docs", body:"Mill certs and a spectrometer check on three cracked parts confirm Al 6061. Chemistry is within spec on every element."},
  {id:"furnace",title:"Furnace log",        sub:"Aging furnace AF-2", fig:FIG.furnace(false),
   src:"Heat treat · AF-2 recorder", body:"Recipe T6-AGE was loaded on every run: 350 °F setpoint, 8 hour soak. The controller displayed 350 °F on every run from Oct 6 to Oct 20. No alarms."},
  {id:"survey", title:"Temperature survey", sub:"Independent probes", fig:FIG.furnace(true),
   src:"Metrology · run Oct 21", body:"A calibrated independent probe set was run at a 350 °F setpoint. All 9 locations read 308–312 °F, within ±2 °F of each other. The controlling thermocouple reads 40 °F higher than the real temperature."},
  {id:"pm",     title:"PM records",         sub:"Procedure QP-118",
   src:"Maintenance · PM system", body:"QP-118 requires a monthly system accuracy test (SAT) on the controlling thermocouple. Last sign-off: Aug 28. September and October are blank. The PM system has no overdue alert for this task."},
];
const TORQUE_ICON = `<svg viewBox="0 0 24 24"><path d="M4.5 19.5l9.8-9.8" stroke="#6f8bb0" stroke-width="3.4" stroke-linecap="round"/><circle cx="16.6" cy="7.4" r="4.4" fill="#c9d2dc" stroke="#5a6e86" stroke-width="1.3"/><circle cx="16.6" cy="7.4" r="1.9" fill="#5a6e86"/><path d="M3 21l2.6-2.6" stroke="#e23b3b" stroke-width="3.4" stroke-linecap="round"/></svg>`;
const EVICON = {torque:TORQUE_ICON, cert:ICON.cert, pm:ICON.doc};

const STATEMENTS = [
  {t:"The flanges are bad and need to be fixed.", why:"Too vague. It doesn't say which parts, how many, where or when. You can't investigate \"bad.\""},
  {t:"Operators on Line 2 are over-torquing the flanges.", why:"That's a guess at the cause, not a problem statement. Describe what happened. Don't diagnose it yet."},
  {t:"7 of 200 QF-2210 flanges cracked at a bolt hole during assembly torque on Line 2, all from lots received Oct 15–21.", ok:true,
   why:"What, how many, where, when, and no assumed cause. That's a problem statement you can investigate."},
];
const WHYS = [
  {q:"Why did the flanges crack during assembly torque?", opts:[
    {t:"The flanges are too weak to carry normal bolt load.", ok:true, ev:"hard", note:"Flanges too weak for normal bolt load"},
    {t:"Operators over-torqued the bolts.", ev:"torque", why:"Dead end. The torque audit shows 24–26 N·m on a 25 ± 2 spec, with a calibrated wrench and the same operators as before."},
    {t:"Machining left a stress riser at the bolt hole.", ev:"photo", why:"Dead end. The photo shows no tool marks at the origin, and the grainy fracture runs across the whole section."}]},
  {q:"Why are the flanges too weak?", opts:[
    {t:"They didn't reach full T6 temper. Hardness is low.", ok:true, ev:"hard", note:"Not fully aged to T6 (hardness 9–11 vs ≥15)"},
    {t:"The supplier used the wrong alloy.", ev:"cert", why:"Dead end. Mill certs and a spectro check confirm 6061, in spec."},
    {t:"The parts were damaged in shipping.", ev:"hard", why:"Dead end. Shipping damage would be random. Low hardness lines up exactly with the Oct 13–20 aging dates."}]},
  {q:"Why didn't they reach full T6 temper?", opts:[
    {t:"The aging furnace actually ran about 40 °F below its 350 °F setpoint.", ok:true, ev:"survey", note:"Furnace ran ~310 °F, not 350 °F"},
    {t:"The soak time was cut short.", ev:"furnace", why:"Dead end. The furnace log shows a full 8 hour soak on every run."},
    {t:"The wrong recipe was loaded.", ev:"furnace", why:"Dead end. T6-AGE was loaded on every run."}]},
  {q:"Why did the furnace run cold while the controller showed 350 °F?", opts:[
    {t:"The controlling thermocouple drifted and reads 40 °F high.", ok:true, ev:"survey", note:"Control thermocouple drifted, reads 40 °F high"},
    {t:"A heating element failed.", ev:"survey", why:"Dead end. A failed element makes hot and cold zones. The survey shows all 9 locations within ±2 °F of each other, just offset."},
    {t:"The door seal is leaking heat.", ev:"survey", why:"Dead end. A leak makes cold spots near the door. The survey shows even temperature everywhere."}]},
  {q:"Why wasn't the thermocouple drift caught?", opts:[
    {t:"The monthly accuracy test (SAT) was skipped, and nothing flags an overdue test.", ok:true, ev:"pm", note:"Monthly SAT skipped, no overdue alert in PM system"},
    {t:"The thermocouple was old.", ev:"pm", why:"Not the root cause. Thermocouples drift with age. That's exactly why the monthly SAT exists. Replacing it fixes one sensor, not the system that missed it."},
    {t:"The furnace operator wasn't paying attention.", ev:"furnace", why:"Dead end. The display read 350 °F. The operator had nothing to notice. Blaming people ends the investigation before you fix the system."}]},
];
const ACTIONS = [
  {t:"Replace the thermocouple and restart production.", pts:30, why:"Fixes today's sensor. The next one drifts the same way, and nothing catches it. Suspect parts stay in the field."},
  {t:"Retrain the furnace operator and post a reminder at the furnace.", pts:0, why:"The operator didn't cause this. Retraining doesn't stop sensor drift, and a sign doesn't run a test."},
  {t:"Replace the thermocouple and run a SAT. Add the SAT to the PM system with an automatic furnace lockout when overdue. Hardness-test every lot aged since the last good SAT on Aug 28.", pts:150, best:true,
   why:"Fixes the cause, makes a missed test impossible to ignore, and contains every suspect part since the last known good check."},
];
const S4_MAX = 100 + WHYS.length*100 + 150 + EVID.length*10;

function shuffleIdx(n){ const a=[...Array(n).keys()]; for(let i=n-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function s4reset(){
  S.s4={phase:"statement", k:0, score:0, dead:0, first:0, seen:{}, out:[], tries:0, notes:[], stmt:null, action:null,
        order:{st:shuffleIdx(STATEMENTS.length), w:WHYS.map(w=>shuffleIdx(w.opts.length)), act:shuffleIdx(ACTIONS.length)}};
}

function renderS4Intro(){
  app.innerHTML = topbar(4) + `
  <section class="panel stagecard">
    <img src="${IMG.s4scene}" alt="Quality investigation room with fishbone and 5 Whys whiteboards" style="aspect-ratio:304/250">
    <div class="body">
      <h2>Stage 4:<br>Find the Why</h2>
      <p>Flanges are cracking on the assembly line. Work the case like a real investigation: review the evidence board, write a proper problem statement, build the 5 Whys, and pick a corrective action that actually stops it from happening again.</p>
    </div>
  </section>
  <div class="banner"><span>HOW IT SCORES</span></div>
  <section class="panel howto">
    <div>${ICON.star}<span><b class="pos">+100</b> for each step of the chain on your first try, <b class="pos">+40</b> on your second.</span></div>
    <div>${ICON.warn}<span>Wrong answers are <b class="neg">dead ends</b>. The evidence shows you why, and you try again.</span></div>
    <div>${ICON.goldq}<span><b class="pos">+10</b> for every piece of evidence you review. Good investigators read everything.</span></div>
    <div>${ICON.trophy.replace('viewBox="0 0 64 64"','viewBox="0 0 64 64" width="28" height="28"')}<span><b class="pos">+150</b> for a corrective action that fixes the system, not just the symptom.</span></div>
  </section>
  <button class="cta" id="s4go"><span>OPEN THE CASE<small>CASE QA-4471</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s4back"><span>BACK TO STAGE 3<small>METROLOGY LAB</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("s4go").onclick=()=>{ tone(SFX.click); s4reset(); S.phase="s4play"; render(); scrollTo(0,0); };
  document.getElementById("s4back").onclick=()=>{ tone(SFX.click); S.phase="s3intro"; render(); scrollTo(0,0); };
}

function s4say(){
  const s=S.s4;
  if(s.phase==="statement") return ["thinking","Before we chase causes, define the problem. What, how many, where, when."];
  if(s.phase==="action") return ["serious","You found the root cause. Now fix the system, not just the part."];
  if(s.out.length) return ["frustrated","Dead end. Go back to the evidence."];
  return [["thinking","confident","thinking","surprised","thinking"][s.k], ["Don't just fix it. Find the real cause.","Follow the evidence, not your gut.","Something changed on Oct 13. What was it?","The display says 350. Does the furnace agree?","Last one. Why did the system let this happen?"][s.k]];
}

function renderS4Play(){
  if(!S.s4) s4reset();
  const s=S.s4, reviewed=Object.keys(s.seen).length;
  const [face,line]=s4say();
  let h = topbar(4) + `<div class="stats">
    <div class="stat"><div class="k">Score</div><div class="v">${s.score}${ICON.star}</div></div>
    <div class="stat"><div class="k">5 Whys</div><div class="v">${s.notes.length}/5</div></div>
    <div class="stat"><div class="k">Dead ends</div><div class="v" style="color:${s.dead?"var(--stop-hi)":"inherit"}">${s.dead}</div></div>
  </div>
  <section class="casefile"><div class="stamp">OPEN</div><h3>Flanges cracking at assembly</h3>
    <p>${s.stmt!==null?STATEMENTS[s.stmt].t:"Line 2 reports QF-2210 flanges cracking at a bolt hole when the bolts are torqued. Production is on hold."}</p></section>
  <section class="panel callout" style="padding:10px"><div class="face">${faceImg(face)}</div><div class="bubble">${line}</div></section>
  <div class="banner"><span>EVIDENCE BOARD · ${reviewed}/${EVID.length}</span></div>
  <section class="cork"><div class="evgrid">
    ${EVID.map((e,i)=>`<button class="evcard" data-ev="${e.id}" style="--r:${[-2,1.5,-1,2,-1.5,1,-2.5][i]}deg">
      ${s.seen[e.id]?`<span class="seen">REVIEWED</span>`:""}
      <div class="ic">${e.fig?e.fig:(EVICON[e.id]||ICON.doc).replace("<svg",'<svg width="40" height="40"')}</div>
      <b>${e.title}</b><span>${e.sub}</span></button>`).join("")}
  </div></section>`;

  // chain built so far
  if(s.notes.length){
    h += `<div class="banner"><span>5 WHYS CHAIN</span></div><div class="chain">`+
      s.notes.map((n,i)=>`${i?'<div class="arrow"></div>':""}<div class="sticky${i===4?" root":""}" style="--r:${[-1.2,1,-.8,1.2,0][i]}deg"><small>${i===4?"ROOT CAUSE · WHY 5":"WHY "+(i+1)}</small><p>${n}</p></div>`).join("")+`</div>`;
  }

  // current question
  if(s.phase==="statement"){
    h += `<div class="banner"><span>STEP 1 · PROBLEM STATEMENT</span></div>
    <section class="panel qbox"><div class="qlabel">DEFINE IT</div><div class="qtext">Which problem statement should open this investigation?</div>
      <div class="opts">${s.order.st.map((ix,j)=>optHTML(ix,j,STATEMENTS[ix].t,s.out.includes(ix)?STATEMENTS[ix].why:null)).join("")}</div></section>`;
  } else if(s.phase==="why"){
    const W=WHYS[s.k];
    h += `<div class="banner"><span>STEP 2 · 5 WHYS</span></div>
    <section class="panel qbox"><div class="qlabel">WHY ${s.k+1}?</div><div class="qtext">${W.q}</div>
      <div class="opts">${s.order.w[s.k].map((ix,j)=>{const o=W.opts[ix]; return optHTML(ix,j,o.t,s.out.includes(ix)?o.why:null,EVID.find(e=>e.id===o.ev).title);}).join("")}</div></section>`;
  } else if(s.phase==="action"){
    h += `<div class="banner"><span>STEP 3 · CORRECTIVE ACTION</span></div>
    <section class="panel qbox"><div class="qlabel">FIX IT</div><div class="qtext">Which corrective action do you put your name on? You only get one pick.</div>
      <div class="opts">${s.order.act.map((ix,j)=>optHTML(ix,j,ACTIONS[ix].t,null)).join("")}</div></section>`;
  }
  app.innerHTML=h;
  wireTop();
  app.querySelectorAll(".evcard").forEach(b=>b.onclick=()=>s4evidence(b.dataset.ev));
  app.querySelectorAll(".opt:not(.out)").forEach(b=>b.onclick=()=>s4answer(+b.dataset.ix));
}
function optHTML(ix,j,text,deadWhy,evTitle){
  return `<button class="opt${deadWhy?" out":""}" data-ix="${ix}" ${deadWhy?"disabled":""}><span class="let">${deadWhy?"✕":"ABCDE"[j]}</span>
    <span><span class="t">${text}</span>${deadWhy?`<span class="dead">${deadWhy}</span>`:""}${evTitle&&!deadWhy?`<span class="evref">Check: ${evTitle}</span>`:""}</span></button>`;
}

function s4evidence(id){
  const e=EVID.find(x=>x.id===id), s=S.s4, first=!s.seen[id];
  if(first){ s.seen[id]=true; s.score+=10; }
  tone([[520,.06],[780,.08]]);
  modalRoot.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="${e.title}"><div class="evmodal">
    <h3>${e.title}</h3><div class="src">${e.src}${first?" · +10 reviewed":""}</div>
    ${e.fig?`<div class="fig">${e.fig}</div>`:""}
    <p>${e.body}</p>
    <button class="close" id="evclose">BACK TO THE BOARD</button></div></div>`;
  const c=document.getElementById("evclose"); c.focus({preventScroll:true});
  const y=scrollY;
  c.onclick=()=>{ modalRoot.innerHTML=""; renderS4Play(); scrollTo(0,y); };
}

function s4answer(ix){
  const s=S.s4, y=scrollY;
  if(s.phase==="statement"){
    const o=STATEMENTS[ix];
    if(o.ok){ const p=[100,40,0][Math.min(s.tries,2)]; s.score+=p; if(!s.tries) s.first++;
      s.stmt=ix; s.phase="why"; s.k=0; s.out=[]; s.tries=0; tone(SFX.correct);
      return s4toast("approving","PROBLEM DEFINED",`+${p}`,o.why,"v-good"); }
    s.out.push(ix); s.tries++; s.dead++; tone(SFX.over); renderS4Play(); scrollTo(0,y); shakeLast(ix); return;
  }
  if(s.phase==="why"){
    const o=WHYS[s.k].opts[ix];
    if(o.ok){ const p=[100,40,0][Math.min(s.tries,2)]; s.score+=p; if(!s.tries) s.first++;
      s.notes.push(o.note); s.out=[]; s.tries=0; tone(SFX.correct);
      const last=s.k===WHYS.length-1;
      if(last){ s.phase="action"; return s4toast("motivational","ROOT CAUSE FOUND",`+${p}`,"The furnace didn't fail. The system that should have caught the drift did. That's the cause you can fix for good.","v-good"); }
      s.k++; renderS4Play(); scrollTo(0,y);
      const say=["Good. Keep pulling the thread.","Now we're getting somewhere.","That's what the data says.","That's it. One more why."][s.k-1];
      const b=app.querySelector(".callout .bubble"); if(b) b.textContent=say;
      const f=app.querySelector(".callout .face"); if(f) f.innerHTML=faceImg("approving");
      const q=app.querySelector(".qbox"); if(q) q.scrollIntoView({behavior:"smooth",block:"center"});
      return;
    }
    s.out.push(ix); s.tries++; s.dead++; tone(SFX.over); renderS4Play(); scrollTo(0,y); shakeLast(ix); return;
  }
  if(s.phase==="action"){
    const a=ACTIONS[ix]; s.action=ix; s.score+=a.pts; tone(a.best?SFX.win:SFX.false);
    s.phase="done";
    return s4toast(a.best?"motivational":"frustrated", a.best?"CASE CLOSED":"WEAK FIX", `+${a.pts}`, a.why, a.best?"v-good":"v-part", true);
  }
}
function shakeLast(ix){ const b=app.querySelector(`.opt[data-ix="${ix}"]`); if(b){ b.classList.add("deadflash"); } }

function s4toast(face,title,pts,text,cls,final){
  modalRoot.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
    <div class="panel vcard ${cls}"><div class="bigface">${faceImg(face)}</div><h2>${title}</h2>
    <div class="pts">${pts}</div><p>${text}</p>
    <button class="cta" id="s4next"><span>${final?"SEE YOUR RANK":"CONTINUE"}<small>${final?"STAGE 4 COMPLETE":S.s4.phase==="action"?"CHOOSE THE CORRECTIVE ACTION":"BUILD THE 5 WHYS"}</small></span>${ICON.chev}</button></div></div>`;
  const n=document.getElementById("s4next"); n.focus({preventScroll:true});
  n.onclick=()=>{ tone(SFX.click); modalRoot.innerHTML=""; S.phase=final?"s4end":"s4play"; render();
    if(final) scrollTo(0,0); else { const q=app.querySelector(".qbox"); if(q) q.scrollIntoView({block:"center"}); } };
}

function renderS4End(){
  const s=S.s4; if(!s||s.phase!=="done"){ S.phase="s4intro"; return render(); }
  const p=s.score/S4_MAX, best=ACTIONS[s.action].best;
  saveSum("s4", Math.max(0,Math.round(p*100)));
  let k=0; if(p>=.35)k=1; if(p>=.55)k=2; if(p>=.75)k=3; if(p>=.9&&best)k=4; if(!best) k=Math.min(k,2);
  saveSum("r4",k); if(s.dead===0) earn("nodead");
  const line = k===4?"Evidence first, no blame, system fix. That's a real root cause analysis.":!best?"You found the cause, then fixed the symptom. It'll be back.":"Solid investigation. Fewer dead ends next time. Read the board first.";
  app.innerHTML = topbar(4) + `
  <section class="panel callout" style="padding:10px"><div class="face">${faceImg(k>=3?"motivational":best?"confident":"frustrated")}</div><div class="bubble">${line}</div></section>
  <section class="panel trophy">${ICON.trophy}
    <div class="ptitle" style="margin:6px 0 0;color:var(--muted);font-size:16px">STAGE 4 RANK</div>
    <div class="rankname">${RANKS[k]}</div>
    <div class="ladder">${RANKS.map((r,i)=>`<span class="${i===k?"on":""}">${r}</span>`).join("")}</div>
  </section>
  <div class="kpis">
    <div class="kpi"><b>${s.first}/6</b><span>Right on first try</span></div>
    <div class="kpi"><b style="color:${s.dead?"var(--stop-hi)":"var(--go-hi)"}">${s.dead}</b><span>Dead ends</span></div>
    <div class="kpi"><b>${Object.keys(s.seen).length}/${EVID.length}</b><span>Evidence reviewed</span></div>
    <div class="kpi"><b>${s.score}</b><span>Score of ${S4_MAX}</span></div>
  </div>
  <div class="banner"><span>CASE SUMMARY</span></div>
  <section class="panel a3">
    <div class="row"><b>Problem</b><div>${STATEMENTS[s.stmt].t}</div></div>
    <div class="row"><b>5 Whys</b><div><ol>${s.notes.map(n=>`<li>${n}</li>`).join("")}</ol></div></div>
    <div class="row"><b>Root cause</b><div>${s.notes[4]}</div></div>
    <div class="row"><b>Action</b><div>${ACTIONS[s.action].t}${best?"":` <span style="color:var(--stop-hi);font-weight:700">Weak: treats the symptom.</span>`}</div></div>
    ${best?"":`<div class="row"><b>Best fix</b><div>${ACTIONS.find(a=>a.best).t}</div></div>`}
  </section>
  <button class="cta" id="s4s5"><span>CONTINUE TO STAGE 5<small>THE FINAL AUDIT</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s4again"><span>REOPEN THE CASE<small>BEAT ${s.score}</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s4home"><span>BACK TO TITLE<small>ALL STAGES</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("s4s5").onclick=()=>{ tone(SFX.click); S.phase="s5intro"; render(); scrollTo(0,0); };
  document.getElementById("s4again").onclick=()=>{ tone(SFX.click); s4reset(); S.phase="s4play"; render(); scrollTo(0,0); };
  document.getElementById("s4home").onclick=()=>{ tone(SFX.click); goHome(); };
}


/* =====================================================================
   STAGE 5 · FINAL AUDIT — "Quality under pressure" (boss level)
   Shipment SH-9902, 500 QF-3300 pump housings. The truck is waiting.
   ===================================================================== */
const S5_TIME = 180;
const MSTEPS = ["Inspect","Measure","Contain","Cause","Fix","Docs","Decide"];
const S5_SAMPLES = [null,"missing",null,null,"contam",null];      // audit samples A–F
const S5_DOCS = [
  {t:"NCR-5521", d:"Oversize bores, CNC-4. Signed by QE and production.", bad:false},
  {t:"Sort record", d:"Lots 9901–9903: 500 inspected, 459 good, 41 rejected.", bad:false},
  {t:"First-piece check", d:"After offset correction: bore Ø32.011. Signed 02:15.", bad:false},
  {t:"Certificate of Conformance", d:"QF-3300, drawing Rev D, qty 459.", bad:true, why:"The PO and drawing are Rev E. A CoC certifying the wrong revision is a nonconforming document."},
  {t:"Gauge certificate", d:"Bore gauge BG-07, calibrated Sep 30, due Mar 31.", bad:false},
];
const S5_CONTAIN = [
  {t:"Hold the 3 audit samples you measured.", pts:0, why:"Three samples represent hundreds of parts. If one sample is oversize, the lot it came from is suspect."},
  {t:"Hold this shipment, SH-9902, only.", pts:30, why:"Closer, but lots 9901–9903 also have parts in WIP and finished goods that came off CNC-4 after the tool change."},
  {t:"Hold SH-9902 plus everything from CNC-4 since the 22:40 tool change: lots 9901–9903 in WIP and finished goods.", pts:120, best:true, why:"Containment follows the evidence. The 18:00 first-piece check on lot 9900 was good, and everything after the 22:40 change is suspect."},
  {t:"Recall every QF-3300 shipped this year.", pts:0, why:"Overkill. Lot 9900 passed its check before the tool change. Containment has a boundary, and the evidence sets it."},
];
const S5_CLUES = [
  ["gauge","Tool change log","CNC-4 boring bar insert replaced at 22:40, night shift. New insert."],
  ["doc","Offset history","Offset before change: +0.002. Offset entered at 22:40: +0.020. The control accepted it with no warning."],
  ["cert","Gauge check","BG-07 verified against the Ø32.000 master ring this morning. Reads true."],
];
const S5_RC = [
  {t:"The tool offset was keyed in as +0.020 instead of +0.002, and the CNC accepts any offset with no limit check.", ok:true},
  {t:"The boring bar insert is worn.", why:"Dead end. The insert was brand new at 22:40. A worn insert cuts undersize, not oversize."},
  {t:"The bore gauge is out of calibration.", why:"Dead end. BG-07 was verified against the master ring this morning and has a valid cert."},
  {t:"The operator was careless.", why:"Not a root cause. Anyone can mistype a digit. The real question is why the machine let a 10× offset through."},
];
const S5_FIX = [
  {t:"Write up the night-shift operator.", pts:0, why:"Blame doesn't change the system. The next mistyped offset goes straight through again."},
  {t:"Correct the offset and resume production.", pts:30, why:"Fixes tonight. Nothing stops the same keying error next week, and the suspect lots still need sorting."},
  {t:"Correct the offset. Add a CNC macro that rejects offsets outside ±0.010, require a first-piece bore check after every tool change, and 100% sort lots 9901–9903.", pts:120, best:true, why:"Error-proofs the entry, verifies every tool change, and protects the customer from what's already been made."},
];
const S5_MAX = 80+150+120+100+120+80+150+S5_TIME;

let s5timer=null;
function s5reset(){ S.s5={step:0, score:0, conf:100, time:S5_TIME, flags:{}, docflags:{}, tool:null, tries:0, out:[], marks:[], log:[]}; }
function s5stop(){ clearInterval(s5timer); s5timer=null; }
function s5tick(){
  s5stop();
  s5timer=setInterval(()=>{
    if(S.phase!=="s5play"||!S.s5||modalRoot.innerHTML){ return; }
    if(S.s5.time>0){ S.s5.time--; const t=document.getElementById("t5");
      if(t){ const m=Math.floor(S.s5.time/60), sec=String(S.s5.time%60).padStart(2,"0"); t.textContent=`${m}:${sec}`;
        t.closest(".timer").classList.toggle("ok",S.s5.time>45);
        if(S.s5.time<=10&&S.s5.time>0) tone([[880,.05,"sine"]]); }
      if(S.s5.time===0){ const b=app.querySelector(".callout .bubble"); if(b) b.textContent="The truck's gone. Finish the audit anyway. Do it right, not fast."; }
    }
  },1000);
}

function renderS5Intro(){
  s5stop();
  app.innerHTML = topbar(5) + `
  <section class="panel stagecard">
    <img src="${IMG.s5scene}" alt="Automated factory floor with robots and a green SHIP sign" style="aspect-ratio:312/250">
    <div class="body">
      <h2>Stage 5:<br>Quality Under Pressure</h2>
      <p>Final audit. Shipment SH-9902, 500 QF-3300 pump housings, and the truck is at the dock. Multiple issues just hit the dashboard. Use everything you've learned: inspect, measure, contain, find the cause, fix it, check the paperwork, then make the call.</p>
    </div>
  </section>
  <div class="banner"><span>THE BOSS LEVEL</span></div>
  <section class="panel howto">
    <div>${ICON.warn}<span><b class="neg">${S5_TIME / 60} minutes</b> on the clock. Time left over is bonus points. The clock pauses while you read feedback.</span></div>
    <div>${ICON.star}<span>Seven missions in a row. Each one builds on the last.</span></div>
    <div>${ICON.goldq}<span>Customer confidence drops with every mistake. Shipping a problem drops it hard.</span></div>
    <div>${ICON.trophy.replace('viewBox="0 0 64 64"','viewBox="0 0 64 64" width="28" height="28"')}<span>Finish to see the factory dashboard and your overall Quality Quest rank.</span></div>
  </section>
  <button class="cta" id="s5go"><span>START THE AUDIT<small>THE TRUCK IS WAITING</small></span>${ICON.chev}</button>
  <button class="cta alt" id="s5back"><span>BACK TO STAGE 4<small>ROOT CAUSE</small></span>${ICON.chev}</button>`;
  wireTop();
  document.getElementById("s5go").onclick=()=>{ tone(SFX.click); s5reset(); S.phase="s5play"; render(); scrollTo(0,0); };
  document.getElementById("s5back").onclick=()=>{ tone(SFX.click); S.phase="s4intro"; render(); scrollTo(0,0); };
}

function s5head(){
  const s=S.s5, m=Math.floor(s.time/60), sec=String(s.time%60).padStart(2,"0");
  const cc = s.conf>=70?"var(--go-hi)":s.conf>=40?"var(--hold-hi)":"var(--stop-hi)";
  return topbar(5) + `
  <div class="alertbar${s.step>=6?" calm":""}">${s.step>=6?"FINAL DECISION":`${ICON.warn} ALERT · MULTIPLE ISSUES`}</div>
  <div class="bosshud">
    <div class="stat timer${s.time>45?" ok":""}"><div class="k">Truck departs</div><div class="v" id="t5">${m}:${sec}</div></div>
    <div class="stat"><div class="k">Score</div><div class="v">${s.score}</div></div>
    <div class="stat"><div class="k">Confidence</div><div class="v" style="color:${cc}">${s.conf}%</div><div class="conf"><i style="width:${s.conf}%;background:${cc}"></i></div></div>
  </div>
  <div class="mission">${MSTEPS.map((n,k)=>`<div class="ms ${k<s.step?(s.marks[k]?"done":"bad"):k===s.step?"on":""}"><i>${k+1}</i>${n}</div>`).join("")}</div>`;
}
function s5callout(face,line){ return `<section class="panel callout" style="padding:10px"><div class="face">${faceImg(face)}</div><div class="bubble">${line}</div></section>`; }

function renderS5Play(){
  if(!S.s5) s5reset();
  const s=S.s5; let h=s5head();
  const L=["Pull six samples. Find what's wrong.","Critical bore. Get a real number.","Bad parts are out there. Draw the line.","Don't just fix it. Find the real cause.","Fix the system, not the person.","Parts are only half of it. Check the paperwork.","Your call. Release, hold or reject?"][s.step];
  const F=["serious","thinking","alert","thinking","serious","thinking","serious"][s.step];
  h += s5callout(F,L);
  const optBtns=(arr,used)=>arr.map((o,ix)=>optHTML(ix,ix,o.t,used&&used.includes(ix)?o.why:null)).join("");

  if(s.step===0){
    h += `<section class="panel bossp"><div class="qlabel">1 · INSPECT</div><div class="qtext">Tap every defective audit sample, then confirm.</div>
      <div class="samples">${S5_SAMPLES.map((d,i)=>`<button class="smp${s.flags[i]?" flag":""}" data-i="${i}" aria-pressed="${!!s.flags[i]}">${housingSVG(d,i+7)}<span>SAMPLE ${"ABCDEF"[i]}</span></button>`).join("")}</div>
      <button class="cta confirm" id="c5"><span>CONFIRM FLAGS<small>${Object.values(s.flags).filter(Boolean).length} FLAGGED</small></span>${ICON.chev}</button></section>`;
  }
  if(s.step===1){
    const t=s.tool;
    h += `<section class="panel bossp"><div class="qlabel">2 · MEASURE</div><div class="qtext">Critical bore: Ø32.000 +0.025 / −0. Pick your gauge.</div>
      <div class="tools3">${["caliper","mic","bore"].map(k=>`<button class="tool${t===k?" sel":""}${s.out.includes(k)?" nope":""}" data-k="${k}" ${t||s.out.includes(k)?"disabled":""}>${TOOL_SVG[k]}<b>${TOOLS[k].name}</b><span>${TOOLS[k].res}</span></button>`).join("")}</div>
      ${s.out.includes("mic")&&!t?`<p style="margin:0 0 10px;color:#ffb3b3;font-weight:600">An outside micrometer can't reach inside a bore. Pick again.</p>`:""}
      ${t?`<div class="dro3">${[32.012,32.031,32.018].map((v,i)=>`<div><small>SAMPLE ${i+1}</small><b>${v.toFixed(TOOLS[t].dec)}</b></div>`).join("")}</div>
        <div class="opts">${["All three are in tolerance.","Sample 2 is oversize.","Sample 2 is undersize."].map((x,ix)=>optHTML(ix,ix,x,null)).join("")}</div>`:""}
    </section>`;
  }
  if(s.step===2){
    h += `<section class="panel bossp"><div class="qlabel">3 · CONTAIN</div><div class="qtext">Where do you draw the containment line? One pick.</div>
      <div class="brief"><b>18:00</b> lot 9900 first-piece bore: Ø32.010 ✓<br><b>22:40</b> CNC-4 boring tool change<br><b>Since:</b> lots 9901–9903 machined</div>
      <div class="opts">${optBtns(S5_CONTAIN)}</div></section>`;
  }
  if(s.step===3){
    h += `<section class="panel bossp"><div class="qlabel">4 · ROOT CAUSE</div><div class="qtext">Why are the bores oversize?</div>
      <div class="clues">${S5_CLUES.map(([ic,t,d])=>`<div class="clue">${ICON[ic]}<div><b>${t}</b><br>${d}</div></div>`).join("")}</div>
      <div class="opts">${optBtns(S5_RC,s.out)}</div></section>`;
  }
  if(s.step===4){
    h += `<section class="panel bossp"><div class="qlabel">5 · CORRECTIVE ACTION</div><div class="qtext">Which fix do you sign? One pick.</div>
      <div class="opts">${optBtns(S5_FIX)}</div></section>`;
  }
  if(s.step===5){
    h += `<section class="panel bossp"><div class="qlabel">6 · DOCUMENTATION</div><div class="qtext">The PO calls for QF-3300 <b>Rev E</b>. Flag any document that can't ship, then confirm.</div>
      <div class="docs5">${S5_DOCS.map((d,i)=>`<button class="doc5${s.docflags[i]?" flag":""}" data-i="${i}" aria-pressed="${!!s.docflags[i]}">${ICON.doc}<span><b>${d.t}</b><span>${d.d}</span></span><span class="box">${s.docflags[i]?ICON.x:""}</span></button>`).join("")}</div>
      <button class="cta confirm" id="c5d"><span>CONFIRM REVIEW<small>${Object.values(s.docflags).filter(Boolean).length} FLAGGED</small></span>${ICON.chev}</button></section>`;
  }
  if(s.step===6){
    h += `<section class="panel bossp"><div class="qlabel">7 · FINAL DECISION</div><div class="qtext">Shipment SH-9902. What do you do?</div>
      <div class="brief"><b>Sorted:</b> 459 good, 41 rejected<br><b>Process:</b> offset fixed, first piece in tolerance<br><b>Root cause:</b> closed, error-proofed<br><b>CoC:</b> ${s.docflags[3]?"flagged, certifies Rev D (PO is Rev E)":"certifies Rev D"}</div>
      <div class="choices">
        ${choice("RELEASE","c-acc","check","Ship the 459 good parts now.")}
        ${choice("HOLD","c-hold","q","Keep it at the dock until the issue is cleared.")}
        ${choice("REJECT","c-rej","x","Scrap the shipment.")}
      </div></section>`;
  }
  app.innerHTML=h; wireTop();
  // wire step controls
  app.querySelectorAll(".smp").forEach(b=>b.onclick=()=>{ s.flags[+b.dataset.i]=!s.flags[+b.dataset.i]; tone([[620,.04]]); renderS5Play(); });
  const c5=document.getElementById("c5"); if(c5) c5.onclick=s5inspect;
  app.querySelectorAll(".tools3 .tool").forEach(b=>b.onclick=()=>s5tool(b.dataset.k));
  app.querySelectorAll(".opt:not(.out)").forEach(b=>b.onclick=()=>s5opt(+b.dataset.ix));
  app.querySelectorAll(".doc5").forEach(b=>b.onclick=()=>{ s.docflags[+b.dataset.i]=!s.docflags[+b.dataset.i]; tone([[620,.04]]); renderS5Play(); });
  const cd=document.getElementById("c5d"); if(cd) cd.onclick=s5docs;
  app.querySelectorAll(".choice").forEach(b=>b.onclick=()=>s5decide(b.dataset.c));
  if(!s5timer) s5tick();
}

function s5award(pts,confHit,good,title,text,face){
  const s=S.s5; s.score+=pts; s.conf=Math.max(0,s.conf-confHit); s.marks[s.step]=good;
  s.log.push({step:MSTEPS[s.step],pts,good});
  tone(good?SFX.correct:confHit>=20?SFX.escape:SFX.over);
  const last=s.step===6;
  modalRoot.innerHTML=`<div class="modal" role="dialog" aria-modal="true" aria-label="${title}">
    <div class="panel vcard ${good?"v-good":confHit>=20?"v-bad":"v-part"}"><div class="bigface">${faceImg(face||(good?"approving":confHit>=20?"alert":"frustrated"))}</div>
    <h2>${title}</h2><div class="pts">${pts>=0?"+":""}${pts}</div>
    ${confHit?`<div class="calls"><span class="chip">Customer confidence −${confHit}%</span></div>`:""}
    <p>${text}</p>
    <button class="cta" id="s5n"><span>${last?"OPEN THE DASHBOARD":"NEXT MISSION"}<small>${last?"AUDIT COMPLETE":MSTEPS[s.step+1].toUpperCase()}</small></span>${ICON.chev}</button></div></div>`;
  const n=document.getElementById("s5n"); n.focus({preventScroll:true});
  n.onclick=()=>{ tone(SFX.click); modalRoot.innerHTML=""; s.out=[]; s.tries=0;
    if(last){ const bonus=s.time; s.score+=bonus; s.bonus=bonus; s5stop(); s5save(); S.phase="s5end"; render(); scrollTo(0,0); tone(SFX.win); return; }
    s.step++; renderS5Play(); scrollTo(0,0); };
}

function s5inspect(){
  const s=S.s5; let hit=0, fa=0, miss=0;
  S5_SAMPLES.forEach((d,i)=>{ if(d&&s.flags[i]) hit++; else if(d) miss++; else if(s.flags[i]) fa++; });
  const pts=Math.max(-60,hit*40-fa*30-miss*40), good=miss===0&&fa===0;
  s5award(pts, miss*15+fa*5, good, good?"BOTH DEFECTS FOUND":miss?"DEFECT MISSED":"FALSE FLAG",
    `Sample B is missing a fastener and sample E has oil and chips on the face. ${miss?`You missed ${miss}.`:""} ${fa?`${fa} good sample${fa>1?"s were":" was"} flagged.`:""} Both go on the NCR, and both get added to the sort.`);
}
function s5tool(k){
  const s=S.s5;
  if(k==="mic"){ s.out.push("mic"); s.tries++; tone(SFX.over); return renderS5Play(); }
  s.tool=k; tone(SFX.click); renderS5Play();
  const o=app.querySelector(".dro3"); if(o) o.scrollIntoView({behavior:"smooth",block:"center"});
}
function s5opt(ix){
  const s=S.s5;
  if(s.step===1){
    const toolPts = s.tool==="bore"&&!s.tries?50 : s.tool==="bore"?30 : 10;
    const ok=ix===1, pts=toolPts+(ok?100:0);
    return s5award(pts, ok?0:20, ok&&s.tool==="bore", ok?"OVERSIZE FOUND":"YOU MISSED IT",
      `Limits are 32.000 to 32.025. Sample 2 reads 32.031, so it's 0.006 oversize. ${s.tool==="bore"?"Bore gauge was the right tool.":"A caliper caught it this time, but with a 0.025 band you need a bore gauge for a reading you can trust."}`);
  }
  if(s.step===2){ const o=S5_CONTAIN[ix]; return s5award(o.pts, o.best?0:15, !!o.best, o.best?"CONTAINED":"CONTAINMENT GAP", o.why); }
  if(s.step===3){
    const o=S5_RC[ix];
    if(o.ok){ const pts=[100,40,0][Math.min(s.tries,2)]; return s5award(pts,0,s.tries===0,"ROOT CAUSE FOUND","The person made a typo. The system let a ten-times offset through with no check. Fix the system and the typo can't reach a part."); }
    s.out.push(ix); s.tries++; S.s5.conf=Math.max(0,S.s5.conf-5); tone(SFX.over); renderS5Play();
    const b=app.querySelector(`.opt[data-ix="${ix}"]`); if(b){ b.classList.add("deadflash"); b.scrollIntoView({block:"center"}); }
    return;
  }
  if(s.step===4){ const o=S5_FIX[ix]; return s5award(o.pts, o.best?0:15, !!o.best, o.best?"ERROR-PROOFED":"WEAK FIX", o.why); }
}
function s5docs(){
  const s=S.s5; let hit=0, fa=0, miss=0;
  S5_DOCS.forEach((d,i)=>{ if(d.bad&&s.docflags[i]) hit++; else if(d.bad) miss++; else if(s.docflags[i]) fa++; });
  const pts=Math.max(-40,hit*80-fa*30-miss*60), good=hit===1&&fa===0;
  s5award(pts, miss*15+fa*5, good, good?"PAPERWORK CAUGHT":miss?"DOC ISSUE MISSED":"FALSE FLAG", S5_DOCS[3].why+" Everything else is complete and signed.");
}
function s5decide(c){
  S.s5.lastCall=c;
  const R={HOLD:[150,0,true,"RIGHT CALL","The parts are good, the paperwork isn't. Hold at the dock for a corrected Rev E CoC. That's usually an hour, not a lost shipment."],
           RELEASE:[-150,40,false,"ESCAPE!","A CoC certifying the wrong revision is a nonconformance at the customer's dock. Good parts with bad paperwork still fail the audit."],
           REJECT:[-50,10,false,"OVERKILL","459 sorted, good parts scrapped over a document error. Hold and fix the paperwork instead."]}[c];
  s5award(R[0],R[1],R[2],R[3],R[4], c==="HOLD"?"motivational":null);
}

// ---------- Factory dashboard: progress across all stages ----------
function loadSum(){ try{ return JSON.parse(localStorage.getItem("qq-sum")||"{}"); }catch(e){ return {}; } }
function saveSum(k,v){ S.sum=Object.assign(loadSum(),S.sum||{}); S.sum[k]=v; try{ localStorage.setItem("qq-sum",JSON.stringify(S.sum)); }catch(e){} }
function s5save(){
  const s=S.s5, p=Math.max(0,s.score/S5_MAX), right=!!(s.log[6]&&s.log[6].good);
  let k=0; if(p>=.35)k=1; if(p>=.55)k=2; if(p>=.75)k=3; if(p>=.9&&right)k=4; if(!right) k=Math.min(k,2);
  saveSum("s5", Math.round(p*100)); saveSum("r5",k);
  if(s.marks[2]) earn("contain"); if(right) earn("final");
}


// ---------- Badges ----------
const BADGES = [
  {id:"zero",    name:"Zero Escapes",        how:"No escapes in Stage 1 and Stage 2", icon:`<path d="M32 14l14 5v10c0 9-6 16-14 20-8-4-14-11-14-20V19z" fill="none" stroke="currentColor" stroke-width="3.4"/><path d="M25 31l5 5 9-10" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>`},
  {id:"gauge",   name:"Perfect Gauge Picks", how:"Best gauge on all 8 parts in Stage 3", icon:`<circle cx="32" cy="27" r="13" fill="none" stroke="currentColor" stroke-width="3"/><path d="M32 16v3M32 35v3M21 27h3M40 27h3M24.2 19.2l2.1 2.1M37.7 19.2l-2.1 2.1" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M32 27l6-7" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="27" r="2.2" fill="currentColor"/><path d="M29 40h6v8h-6zM32 48v5" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`},
  {id:"nodead",  name:"No Dead Ends",        how:"Solve Stage 4 without a single dead end", icon:`<circle cx="29" cy="29" r="10" fill="none" stroke="currentColor" stroke-width="3.6"/><path d="M36.5 36.5L47 47" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>`},
  {id:"contain", name:"Containment Pro",     how:"Draw the right containment line in Stage 5", icon:`<path d="M18 24l14-7 14 7v16l-14 7-14-7z" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"/><path d="M18 24l14 7 14-7M32 31v16" fill="none" stroke="currentColor" stroke-width="3"/><path d="M38 19l-4 2" stroke="currentColor" stroke-width="5"/>`},
  {id:"final",   name:"Perfect Final Call",  how:"Make the right call on shipment SH-9902", icon:`<path d="M23 17h18v8a9 9 0 01-18 0zM23 20h-5a5 5 0 005 7M41 20h5a5 5 0 01-5 7M29 34h6v5h-6zM24 39h16v5H24z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/>`},
];
function medal(b,on){
  return `<div class="medal${on?" on":""}" title="${b.how}"><svg viewBox="0 0 64 64"><polygon points="32,3 57,17.5 57,46.5 32,61 7,46.5 7,17.5" class="hex"/>${b.icon}</svg><b>${b.name}</b>${on?"":`<span>${b.how}</span>`}</div>`;
}
function getSum(){ return Object.assign(loadSum(),S.sum||{}); }
function earn(id){ const b=Object.assign({},getSum().badges||{}); if(b[id]) return; b[id]=true; saveSum("badges",b); }
function checkZero(){ const s=getSum(); if(s.e1===0 && s.e2===0) earn("zero"); }
function badgeRow(){ const b=getSum().badges||{}; return `<div class="medals">${BADGES.map(x=>medal(x,b[x.id])).join("")}</div>`; }

// ---------- Confetti (skipped for reduced motion) ----------
function confetti(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c=document.createElement("canvas"); c.className="confetti"; document.body.appendChild(c);
  const x=c.getContext("2d"); let W,H; const fit=()=>{W=c.width=innerWidth;H=c.height=innerHeight}; fit();
  const cols=["#ffcc1f","#ffe066","#56f08a","#38e1ff","#b07cff","#ff6060","#ffffff"];
  const P=Array.from({length:160},()=>({x:Math.random()*W,y:-20-Math.random()*H,vx:(Math.random()-.5)*2,vy:2+Math.random()*3,r:Math.random()*6.28,vr:(Math.random()-.5)*.3,w:6+Math.random()*6,h:8+Math.random()*8,c:cols[Math.floor(Math.random()*cols.length)]}));
  const t0=performance.now();
  (function f(t){ x.clearRect(0,0,W,H); const age=(t-t0)/1000;
    P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=p.vr; if(p.y>H+20&&age<3){p.y=-20;p.x=Math.random()*W;}
      x.save();x.translate(p.x,p.y);x.rotate(p.r);x.globalAlpha=Math.max(0,1-Math.max(0,age-4.5));x.fillStyle=p.c;x.fillRect(-p.w/2,-p.h/2,p.w,p.h*.6);x.restore();});
    if(age<5.6&&document.body.contains(c)) requestAnimationFrame(f); else c.remove(); })(t0);
}

const STAGE_META=[["s1","Stage 1","Receiving","Inspection accuracy","box"],["s2","Stage 2","Production","Defect detection","truck"],["s3","Stage 3","Metrology","Measurement","gauge"],["s4","Stage 4","Root cause","Root cause analysis","doc"],["s5","Stage 5","Final audit","Quality judgment","cert"]];
const laurel=(flip)=>`<svg viewBox="0 0 60 120" class="laurel${flip?" flip":""}" aria-hidden="true"><path d="M50 116C18 98 8 62 22 8" fill="none" stroke="#ffcc1f" stroke-width="3"/>${[0,1,2,3,4,5,6].map(i=>{const y=104-i*14,xx=40-i*3.2+(i>3?(i-3)*1.5:0);return `<ellipse cx="${xx-8}" cy="${y}" rx="9" ry="4.2" transform="rotate(-35 ${xx-8} ${y})" fill="#ffcc1f"/><ellipse cx="${xx+4}" cy="${y-5}" rx="8" ry="3.8" transform="rotate(35 ${xx+4} ${y-5})" fill="#e0a400"/>`}).join("")}</svg>`;

function certificate(rankName){
  let nm=""; try{ nm=localStorage.getItem("qq-name")||""; }catch(e){}
  const d=new Date().toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
  return `<div class="banner"><span>CERTIFICATE</span></div>
  <section class="cert">
    <div class="seal"><span>QUALITY<br>QUEST</span></div>
    <h3>Quality Quest<br>Certificate of Completion</h3>
    <p class="small">This certifies that</p>
    <div class="nm" id="certName">${nm?escapeHTML(nm):"Your name"}</div>
    <p class="small">has completed all five stages of Quality Quest and earned the rank of</p>
    <div class="rk">${rankName}</div>
    <div class="foot"><span>Date: ${d}</span><span class="sig">Mister Quality<small>HOST, QUALITY QUEST</small></span></div>
    <p class="disc">A game achievement, not a professional quality certification.</p>
  </section>
  <label class="namebox" for="playerName"><span>Name on certificate</span>
    <input id="playerName" type="text" maxlength="32" autocomplete="name" placeholder="Type your name" value="${escapeHTML(nm)}"></label>`;
}
function escapeHTML(t){ return String(t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function wireCert(){
  const i=document.getElementById("playerName"), n=document.getElementById("certName"); if(!i) return;
  i.addEventListener("input",()=>{ n.textContent=i.value.trim()||"Your name"; try{ localStorage.setItem("qq-name",i.value.trim()); }catch(e){} });
}

function renderS5End(){
  s5stop();
  const s=S.s5; if(!s||!s.log.length){ S.phase="s5intro"; return render(); }
  const sum=getSum();
  const played=STAGE_META.filter(([k])=>typeof sum[k]==="number");
  const avg=played.length?Math.round(played.reduce((a,[k])=>a+sum[k],0)/played.length):0;
  const rightCall=!!(s.log[6]&&s.log[6].good);
  const all5=played.length===5;
  let k=0; if(avg>=35)k=1; if(avg>=55)k=2; if(avg>=75)k=3; if(avg>=88&&all5&&rightCall)k=4; if(!rightCall) k=Math.min(k,2); // shipping the wrong call caps the title
  const win=k===4;
  const tiles=STAGE_META.map(([key,st,nm,,ic])=>{const v=sum[key], r=sum["r"+key.slice(1)];
    return `<div class="stile${typeof v==="number"?"":" none"}"><small>${st}</small><b class="nm">${nm}</b>${ICON[ic].replace("<svg",'<svg class="ti"')}
      <b class="pct">${typeof v==="number"?v+"%":"—"}</b><span class="rk r${typeof r==="number"?r:"x"}">${typeof r==="number"?RANKS[r]:"Not played"}</span></div>`}).join("");
  const scorecard=`<div class="banner"><span>YOUR RESULTS</span></div>
    <section class="panel results"><div class="stiles">${tiles}</div>
      <div class="overallt${win?" gold":""}"><small>Overall score</small><b>${avg}%</b><span>Rank</span><em>${RANKS[k]}</em></div></section>`;
  const badges=`<div class="banner"><span>BADGES · ${Object.keys(sum.badges||{}).length}/${BADGES.length}</span></div><section class="panel">${badgeRow()}</section>`;
  const auditKpis=`<div class="kpis">
    <div class="kpi"><b>${s.score}</b><span>Audit score of ${S5_MAX}</span></div>
    <div class="kpi"><b style="color:${s.conf>=70?"var(--go-hi)":s.conf>=40?"var(--hold-hi)":"var(--stop-hi)"}">${s.conf}%</b><span>Customer confidence</span></div>
    <div class="kpi"><b>+${s.bonus||0}</b><span>Time bonus</span></div>
    <div class="kpi"><b>${s.marks.filter(Boolean).length}/7</b><span>Missions clean</span></div></div>`;
  const buttons=`<button class="cta" id="s5again"><span>RUN THE AUDIT AGAIN<small>BEAT ${s.score}</small></span>${ICON.chev}</button>
    <button class="cta alt" id="s5home"><span>BACK TO TITLE<small>ALL STAGES</small></span>${ICON.chev}</button>`;

  if(win){
    app.innerHTML = `
    <section class="winhero">
      <div class="wintag">QUALITY QUEST · COMPLETE</div>
      <div class="crown">${laurel(false)}<div class="mq"><svg viewBox="0 0 64 40" class="crownic"><path d="M6 34L2 8l16 12L32 2l14 18 16-12-4 26z" fill="#ffcc1f" stroke="#a36a00" stroke-width="2"/></svg>MISTER<br>QUALITY</div>${laurel(true)}</div>
      <div class="winhost"><div class="face big">${faceImg("approving")}</div><div class="bubble">Five stages. Real skills. You've earned the name. Welcome, Mister Quality.</div></div>
    </section>` + scorecard + `
    <section class="road win"><div class="roadh"><span>ROAD TO MISTER QUALITY</span><b>3/3 MET</b></div>
      ${[["Play all five stages","5/5"],["Overall score",avg+"%"],["Final call on SH-9902","HOLD"]].map(([t,v])=>`<div class="req ok"><div class="mark">${ICON.check}</div><div class="rt"><b>${t}</b><small>Requirement met</small></div><div class="rv">${v}</div></div>`).join("")}
    </section>` + badges + certificate("MISTER QUALITY") + auditKpis + buttons;
    setTimeout(confetti,250);
    setTimeout(()=>tone([[523,.14],[659,.14],[784,.14],[1046,.28],[784,.12],[1046,.5]]),900);
  } else {
    const gaps=[[all5,"Play all five stages",`${played.length}/5`,"5/5"],[avg>=88,"Overall score",`${avg}%`,"88%+"],[rightCall,"Final call on SH-9902",s.lastCall||"—","HOLD"]];
    const met=gaps.filter(g=>g[0]).length;
    const road=`<section class="road"><div class="roadh"><span>ROAD TO MISTER QUALITY</span><b>${met}/3 MET</b></div>
      ${gaps.map(([ok,t,have,need])=>`<div class="req ${ok?"ok":"no"}"><div class="mark">${ok?ICON.check:ICON.x}</div>
        <div class="rt"><b>${t}</b><small>${ok?"Requirement met":"Required: "+need}</small></div>
        <div class="rv">${have}</div></div>`).join("")}</section>`;
    // what went wrong: pulled from saved stage results and this audit
    const wrong=[];
    const esc=(typeof sum.e1==="number"&&sum.e1<99?sum.e1:0)+(typeof sum.e2==="number"&&sum.e2<99?sum.e2:0);
    if(esc) wrong.push(["warn",String(esc),"Escapes","Defective parts shipped in Stages 1–2."]);
    if(sum.e2===99) wrong.push(["warn","!","Line shutdown","Too many escapes in Stage 2."]);
    const missed=s.log.filter((r,i)=>i<6&&!r.good).map(r=>r.step);
    if(missed.length) wrong.push(["redx",String(missed.length),"Missions missed",missed.join(", ")+"."]);
    if(!rightCall){ const c=s.lastCall||"?"; wrong.push(["doc",c,"Wrong final decision","The shipment should have been HOLD."]); }
    if(!all5) wrong.push(["box",`${5-played.length}`,"Stages unplayed","Every stage counts toward the title."]);
    if(all5&&avg<88) wrong.push(["goldq",`${avg}%`,"Overall score","88% or higher earns the title."]);
    const badCustomer = esc>0 || !rightCall&&s.lastCall==="RELEASE";
    app.innerHTML = `
    <section class="losehero">
      <div class="losetitle">${ICON.warn}<span>${all5?"MISTER QUALITY<br>NOT YET":"QUALITY QUEST<br>IN PROGRESS"}</span></div>
      <div class="winhost"><div class="face big red">${faceImg("frustrated")}</div><div class="bubble">${all5?`Close, but not this time.${badCustomer?" Bad parts could still reach the customer.":""} Review the results and try again.`:`Good start. Finish all five stages to go for the title.`}</div></div>
    </section>
    ${scorecard}
    ${road}
    ${wrong.length?`<section class="panel wrongp"><div class="wh">WHAT WENT WRONG?</div><div class="wgrid">${wrong.map(([ic,n,t,d])=>`<div class="w">${ICON[ic]}<div><b>${n}</b><em>${t}</em><span>${d}</span></div></div>`).join("")}</div></section>`:""}
    <div class="banner"><span>NEXT STEPS</span></div>
    <div class="nexts">
      <button class="nx" id="nxAgain">${ICON.flame}<b>Try Stage 5 again</b><span>Same case. Better decisions.</span></button>
      <button class="nx" id="nxReview">${ICON.doc}<b>Review results</b><span>See the audit log below.</span></button>
      <button class="nx" id="nxHome">${ICON.box}<b>Back to menu</b><span>Replay any stage.</span></button>
    </div>
    ${badges}${all5?certificate(RANKS[k]):""}${auditKpis}
    <div class="banner" id="auditlog"><span>AUDIT LOG</span></div>
    <section class="panel review">${s.log.map(r=>`<div class="rrow" style="--rc:${r.good?"var(--go-hi)":"var(--stop-hi)"}"><b>${r.step}</b><div class="why">${r.good?"Clean":"Needs work"}</div><div class="res">${r.pts>=0?"+":""}${r.pts}</div></div>`).join("")}</section>
    ${buttons}`;
    document.getElementById("nxAgain").onclick=()=>{ tone(SFX.click); s5reset(); S.phase="s5play"; render(); scrollTo(0,0); };
    document.getElementById("nxReview").onclick=()=>document.getElementById("auditlog").scrollIntoView({behavior:"smooth"});
    document.getElementById("nxHome").onclick=()=>{ tone(SFX.click); goHome(); };
  }
  wireTop(); wireCert();
  document.getElementById("s5again").onclick=()=>{ tone(SFX.click); s5reset(); S.phase="s5play"; render(); scrollTo(0,0); };
  document.getElementById("s5home").onclick=()=>{ tone(SFX.click); goHome(); };
}

function goHome(){ s5stop(); S={phase:"intro",i:0,score:0,streak:0,best:0,results:[],sound:S.sound,sum:S.sum}; render(); scrollTo(0,0); }

function render(bump){
  app.classList.toggle("p2", S.phase==="s2play");
  const s2 = S.phase.startsWith("s2"), s3=S.phase.startsWith("s3"), s4=S.phase.startsWith("s4"), s5=S.phase.startsWith("s5");
  if(S.phase!=="s5play") s5stop();
  document.getElementById("bgart").style.backgroundImage=`url(${s5?IMG.s5bg:s4?IMG.s4bg:s3?IMG.s3bg:s2?IMG.s2bg:IMG.bg})`;
  ({intro:renderIntro, play:renderLot, end:renderEnd, s2intro:renderS2Intro, s2play:renderS2Play, s2end:renderS2End, s3intro:renderS3Intro, s3play:renderS3Play, s3end:renderS3End, s4intro:renderS4Intro, s4play:renderS4Play, s4end:renderS4End, s5intro:renderS5Intro, s5play:renderS5Play, s5end:renderS5End})[S.phase](bump);
}

function start(data){ if(data&&data.S) S=data.S; S.sum=Object.assign(loadSum(),S.sum||{}); render(); }
start();
