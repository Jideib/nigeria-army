// =============================================
// DOCUMENTED, DENIED, DERELICT
// BusinessDay Investigation Scripts
// =============================================

'use strict';

// GSAP REGISTRATION
gsap.registerPlugin(ScrollTrigger);

// DOM ELEMENTS
const DOM = {
    dotsLayer: document.querySelector('#dots-layer'),
    incidentCard: document.querySelector('.incident-card'),
    progressLine: document.querySelector('#global-progress'),
    forensicRail: document.querySelector('.forensic-rail'),
    patternTextsContainer: document.getElementById('pattern-texts'),
    titleContent: document.getElementById('title-content'),
    incMeta: document.getElementById('inc-meta'),
    incTitle: document.getElementById('inc-title'),
    incDesc: document.getElementById('inc-desc'),
    incCasualties: document.getElementById('inc-casualties'),
    incLocYear: document.getElementById('inc-loc-year'),
    svgBarChart: document.getElementById('svg-bar-chart'),
    svgTimeline: document.getElementById('svg-timeline'),
    svgDonut: document.getElementById('svg-donut'),
    svgWord: document.getElementById('svg-word'),
    svgPhrases: document.getElementById('svg-phrases'),
    patternVizs: Array.from(document.querySelectorAll('.pattern-viz')),
    patternVizContainer: document.getElementById('pattern-viz-container'),
    footerYear: document.getElementById('footer-year')
};

// DATA DEFINITIONS
function project(lat, lon) {
    const x = (lon - 2.6) * (900 / (14.6 - 2.6)) + 50;
    const y = 812 - ((lat - 4.2) * (700 / (13.9 - 4.2)) + 50);
    return { x, y };
}

const INCIDENTS = [
    { id: "odi-1999", year: 1999, location: "Odi, Bayelsa", title: "Odi Massacre", casualties: "900+", coords: [5.1764, 6.2954], desc: "A full-scale military reprisal flattened the riverside community." },
    { id: "zaki-biam-2001", year: 2001, location: "Zaki-Biam, Benue", title: "Zaki-Biam Killings", casualties: "200+", coords: [7.5833, 9.6167], desc: "Villagers assembled for a 'peace meeting' were executed." },
    { id: "gbeji-2001", year: 2001, location: "Gbeji, Benue", title: "Gbeji Massacre", casualties: "160", coords: [7.7167, 9.5333], desc: "One of multiple Tiv villages raided." },
    { id: "vaase-2001", year: 2001, location: "Vaase, Benue", title: "Vaase Attack", casualties: "160", coords: [7.3833, 9.4333], desc: "Village invaded, homes burned in reprisal operation." },
    { id: "jos-2008", year: 2008, location: "Jos, Plateau", title: "Jos Crises", casualties: "47", coords: [9.8965, 8.8583], desc: "Young unarmed Muslim men killed during unrest." },
    { id: "baga-2013", year: 2013, location: "Baga, Borno", title: "Baga Destruction", casualties: "185+", coords: [13.1167, 13.8500], desc: "Mass destruction after Boko Haram attack, reprisal 'mop-up'." },
    { id: "bama-2013", year: 2014, location: "Bama, Borno", title: "Bama Executions", casualties: "35", coords: [11.5218, 13.6884], desc: "Mass shooting of detainees after screening for Boko Haram links." },
    { id: "zaria-shia-2014", year: 2014, location: "Zaria, Kaduna", title: "Zaria Shia Killings", casualties: "33", coords: [11.0667, 7.7000], desc: "IMN protesters shot; detainees killed during protest suppression." },
    { id: "nkpor-2016", year: 2016, location: "Nkpor, Anambra", title: "Nkpor Massacre", casualties: "150+", coords: [6.1500, 6.8333], desc: "Pro-Biafran commemoration massacre, security forces opened fire." },
    { id: "okporo-2021", year: 2021, location: "Okporo, Imo", title: "Okporo Raid", casualties: "5", coords: [5.7860, 6.9800], desc: "Military raid in ESN zone targeting IPOB/ESN." },
    { id: "izombe-2021", year: 2021, location: "Izombe, Imo", title: "Izombe Reprisal", casualties: "3", coords: [5.6262, 6.8691], desc: "Reprisal after soldiers killed; 50+ houses burned." },
    { id: "amangwu-2022", year: 2022, location: "Amangwu, Abia", title: "Amangwu Attack", casualties: "10", coords: [5.3961, 7.8832], desc: "Homes razed; missing soldier trigger for military operation." },
    { id: "lamurde-2025", year: 2025, location: "Lamurde, Adamawa", title: "Lamurde Killings", casualties: "8", coords: [9.6000, 11.7833], desc: "Nine women shot during protest. Military denies responsibility." }
].map(inc => {
    const p = project(inc.coords[0], inc.coords[1]); 
    return { ...inc, x: p.x, y: p.y };
});

const SYSTEM_PATTERNS = [
    { id: "reprisal", title: "Reprisal & Collective Punishment", viz: "bar", finding: "Large-scale violence consistently follows the killing of soldiers.", question: "What happens after security forces suffer casualties?", data: [{ label: "Odi", value: 900, severity: 10 }, { label: "Benue", value: 560, severity: 8 }, { label: "Baga", value: 185, severity: 6 }, { label: "Izombe", value: 3, severity: 2 }, { label: "Amangwu", value: 10, severity: 3 }], implication: "Reprisal logic fuels cycles of violence." },
    { id: "phases", title: "Three Phases of Military Violence", viz: "timeline", finding: "Military violence evolved in form — but not in logic.", question: "How has violence changed over time?", phases: [{ label: "Niger Delta Era", period: "1999–2009", description: "Large-scale reprisals", geographic: "South-South", intensity: "High", bandWidth: 70 }, { label: "Northeast Conflict", period: "2009–2015", description: "Detention deaths", geographic: "North-East", intensity: "Medium-High", bandWidth: 60 }, { label: "Southeast Operations", period: "2016–2025", description: "Targeted raids", geographic: "South-East", intensity: "Medium", bandWidth: 50 }] },
    { id: "modality", title: "Modality Shift", viz: "stack", finding: "Shift from open massacres to deaths in custody.", question: "How did the method of killing change?", stacks: [{ label: "Open-air Massacres", value: 1300, color: "#e10600" }, { label: "Custody/Detention", value: 1800, color: "#ff6b6b" }, { label: "Raid & Checkpoint", value: 400, color: "#ff8e53" }] },
    { id: "targeting", title: "Target Profile Evolution", viz: "word", finding: "Victim targeting narrowed over time.", question: "Who was targeted?", terms: [{ text: "Ijaw communities", weight: 8, category: "ethnic" }, { text: "Tiv civilians", weight: 7, category: "ethnic" }, { text: "Young men", weight: 9, category: "demographic" }, { text: "Detainees", weight: 8, category: "legal-status" }, { text: "IPOB suspects", weight: 6, category: "political" }, { text: "Protesters", weight: 5, category: "activity" }] },
    { id: "denial", title: "Official Narrative & Deniability", viz: "text", finding: "Civilian deaths are routinely reframed.", question: "How are killings officially explained?", phrases: [{ text: "neutralised terrorists", category: "tactical", frequency: 18 }, { text: "armed confrontation", category: "tactical", frequency: 15 }, { text: "within rules of engagement", category: "legal", frequency: 12 }, { text: "unknown gunmen", category: "denial", frequency: 22 }, { text: "no civilian casualties", category: "denial", frequency: 25 }, { text: "security clearance operation", category: "tactical", frequency: 10 }], implication: "Framing obscures civilian harm." }
];

// Full Forensic Rail Cases Data - Verified January 2026
const FORENSIC_CASES = [
    {
        id: "intro",
        type: "intro",
        title: "The Pattern of Violence",
        subtitle: "Satellite imagery, witness testimonies from media and human right reports, and judicial findings reveal a systematic approach to violence and denial."
    },
    {
        id: "odi-1999",
        type: "case",
        year: 1999,
        title: "Odi — Bayelsa (1999)",
        location: "Odi, Bayelsa State",
        casualties: 900,
        before: "images/forensic/odi-before.jpg",
        after: "images/forensic/odi-after.jpg",
        beforeCaption: "Odi village before military operation - August 1999",
        afterCaption: "Complete destruction after military reprisal - November 1999",
        imageAnalysis: "Satellite imagery comparison shows near-total destruction of Odi village. Before images show the thermal level of the community, being a riverine community, the blue color shows the natural order of things. After images reveal thermal level changed to red which indicates systematic burning and demolition of buildings and infrastructure.",
        imageCredits: "Before: Landsat 7 satellite imagery Thermal level, August 1999 / After: Landsat 7 satellite imagery Thermal level, November 1999",
        summary: "900+ civilian deaths. 250+ structures destroyed. The military operation that set the pattern for decades to come.",
        official: "Military operation against militants following killing of police officers",
        evidence: "Satellite imagery shows 250+ structures destroyed. Human Rights Watch documents 900+ civilian deaths. Mass grave identified 2km from village. Journalists documented near-total destruction.",
        sources: [
            { text: "Amnesty: Nigeria - Time for Justice (PDF)", url: "https://www.amnesty.org/en/wp-content/uploads/2021/06/afr440142000en.pdf" },
            { text: "Human Rights Watch: The Destruction of Odi", url: "https://www.hrw.org/report/1999/12/22/destruction-odi/military-reprisal-bayelsa-state" },
            { text: "BBC News: Odi Military Attack", url: "http://news.bbc.co.uk/2/hi/africa/530174.stm" },
            { text: "The Guardian: Nigerian village wiped out", url: "https://www.theguardian.com/world/1999/dec/01/1" }
        ],
        bgColor: "bg-white"
    },
    {
        id: "zakibiam-2001",
        type: "case",
        year: 2001,
        title: "Benue Cluster — Zaki-Biam / Vaase (2001)",
        location: "Zaki-Biam, Vaase, Gbeji, Benue State",
        casualties: 200,
        before: "images/forensic/zaki-biam-before.jpg",
        after: "images/forensic/zaki-biam-after.jpg",
        beforeCaption: "Zaki-Biam community before military operation",
        afterCaption: "Burned structures affected the vegetation area after military operation",
        imageAnalysis: "Aerial imagery shows multiple Tiv communities systematically targeted. Burn patterns consistent with intentional arson changes vegetation. Satellite imagery reveals widespread destruction across residential areas rather than isolated combat zones.",
        imageCredits: "Before: Landsat 7 satellite imagery, October 2001 / After: Landsat 7 satellite imagery, November 2001",
        summary: "Over 200 unarmed civilians killed. Villagers assembled for 'peace meetings' then executed.",
        official: "Lawful operation following killing of 19 soldiers. Targeted 'militants'.",
        evidence: "Villagers assembled for 'peace meetings' then executed. Over 200 unarmed civilians killed. Witness testimony of planned executions.",
        sources: [
            { text: "Amnesty: Killings by Government Soldiers", url: "https://www.amnesty.org/en/documents/afr44/006/2001/en/" },
            { text: "Human Rights Watch: Military Revenge in Benue", url: "https://www.hrw.org/reports/2002/nigeria/" },
            { text: "The Guardian: Soldiers kill hundreds", url: "https://www.theguardian.com/world/2001/oct/25/1" },
            { text: "BBC News: Army 'killed 200' in Benue", url: "http://news.bbc.co.uk/2/hi/africa/1615591.stm" }
        ],
        bgColor: "bg-zinc-50"
    },
    {
        id: "baga-2013",
        type: "case",
        year: 2013,
        title: "Baga — Borno (2013)",
        location: "Baga, Kukawa LGA, Borno State",
        casualties: 185,
        before: "images/forensic/baga-before.png",
        after: "images/forensic/baga-after.jpg",
        beforeCaption: "Baga fishing community before military operations - April 2013",
        afterCaption: "Mass destruction of Baga after joint military operation - May 2013",
        imageAnalysis: "High-resolution satellite imagery reveals 2,300+ buildings destroyed, over 70% of structures. Scorch patterns concentrated in residential areas.",
        imageCredits: "Before: Landsat 7 satellite imagery, January 2013 / After: Landsat 7 satellite imagery, April 2013",
        summary: "185+ civilian deaths. 2,300+ buildings destroyed. Satellite evidence contradicts official narrative.",
        official: "Operation against Boko Haram. Minimal civilian damage asserted.",
        evidence: "Satellite imagery shows 2,300+ buildings destroyed. Scorch patterns inside residential grid. Local accounts contradict official timeline.",
        sources: [
            { text: "Amnesty: Satellite imagery evidence", url: "https://www.amnesty.org/en/latest/news/2013/05/nigeria-satellite-images-show-massive-destruction-baga-military-raid/" },
            { text: "Human Rights Watch: Baga Investigation", url: "https://www.hrw.org/news/2013/05/01/nigeria-star-satellite-images-show-massive-baga-destruction" },
            { text: "BBC News: Baga Satellite evidence", url: "https://www.bbc.com/news/world-africa-22619282" },
            { text: "Premium Times: Baga massacre investigation", url: "https://www.premiumtimesng.com/news/131587-exclusive-how-military-raided-baga-killed-185-residents.html" }
        ],
        bgColor: "bg-white"
    },
    {
        id: "giwa-2014",
        type: "case",
        year: 2014,
        title: "Giwa Barracks — Maiduguri (2014)",
        location: "Giwa Barracks, Maiduguri, Borno State",
        casualties: 640,
        before: "images/forensic/giwa-before.png",
        after: "images/forensic/giwa-after.png",
        beforeCaption: "Giwa Barracks detention facility - March 2014",
        afterCaption: "Evidence of mass executions and body disposal - March 2014",
        imageAnalysis: "Satellite imagery shows mass grave sites within barracks perimeter. Video evidence verified showing summary executions.",
        imageCredits: "Satellite analysis and images from Amnesty International report",
        summary: "640+ recaptured detainees executed. Systematic killing under custody.",
        official: "Detainees were 'hardcore terrorists'. Claimed detainees died in crossfire.",
        evidence: "Amnesty documented 640+ recaptured detainees executed. Bodies dumped in mass piles visible in satellite imagery.",
        sources: [
            { text: "Amnesty: Stars on Their Shoulders (Index: AFR 44/1657/2015)", url: "https://www.amnesty.org/en/documents/afr44/1657/2015/en/" },
            { text: "CNN: Video shows soldiers executing detainees", url: "https://www.cnn.com/2014/08/05/world/africa/nigeria-video-executions-amnesty/index.html" },
            { text: "The Guardian: Giwa Barracks executions", url: "https://www.theguardian.com/world/2014/mar/31/nigeria-military-killed-hundreds-boko-haram-giwa-barracks" }
        ],
        bgColor: "bg-zinc-50"
    },
    {
        id: "bama-2014",
        type: "case",
        year: 2014,
        title: "Bama — Borno (2014)",
        location: "Bama, Borno State",
        casualties: "Hundreds",
        before: "images/forensic/bama-before.png",
        after: "images/forensic/bama-after.png",
        beforeCaption: "Bama town during military screening operation - May 2014",
        afterCaption: "Bodies of victims killed - June 2014",
        imageAnalysis: "Imagery shows bodies of victims killed during screening operations near barracks perimeter.",
        imageCredits: "Amnesty International Investigation report",
        summary: "Hundreds executed after 'screening'. Mass graves discovered by locals.",
        official: "Counter-terror screening operation. No civilian casualties reported.",
        evidence: "Men rounded up during 'screening' never returned. Burn patterns visible in satellite imagery.",
        sources: [
            { text: "Amnesty: Military must end killings", url: "https://www.amnesty.org/en/latest/news/2014/05/nigeria-military-must-end-unlawful-killings-during-boko-haram-counter-insurgency/" },
            { text: "Human Rights Watch: Nigeria rampant killings", url: "https://www.hrw.org/news/2014/05/01/nigeria-rampant-killings-pillage-boko-haram" },
            { text: "BBC News: Bama screening report", url: "https://www.bbc.com/news/world-africa-27245591" }
        ],
        bgColor: "bg-white"
    },
    {
        id: "lamurde-2025",
        type: "conclusion",
        year: 2025,
        title: "Lamurde - The Pattern Continues",
        location: "Lamurde, Adamawa State",
        casualties: 8,
        summary: "8 unarmed women shot during protest. Video shows uniform firing pattern.",
        official: "Casualties caused by untrained militias. Army not involved.",
        evidence: "Video shows uniform firing pattern contradicting militia claim. Medical reports show military-grade wounds.",
        sources: [
            { text: "HumAngle: 8 Unarmed Protesters Dead in Adamawa", url: "https://humanglemedia.com/8-unarmed-protesters-dead-16-injured-in-nigerias-adamawa-state/" },
            { text: "Daily Trust: How soldiers killed nine women", url: "https://dailytrust.com/how-soldiers-killed-nine-protesting-women-in-adamawa/" },
            { text: "Genocide Watch: Troops shoot anti-terrorist protesters", url: "https://www.genocidewatch.com/single-post/nigerian-troops-shoot-anti-terrorist-protesters" },
            { text: "Nigeria Info: Amnesty Demands Probe", url: "https://www.nigeriainfo.fm/news/national/amnesty-international-demands-probe-into-military-killing-of-protesters-in-adamawa/" }
        ],
        conclusion: "Twenty-five years. The pattern remains unbroken."
    }
];

const SHARE_DATA = { url: window.location.href, title: 'DOCUMENTED, DENIED, DERELICT', text: 'Mapping 25 years of extrajudicial killings.' };

const AppState = { dotGroups: new Map(), dripTweens: new Map(), scrollTriggerIds: new Set(), isInitialized: false };

function safeExecute(fn) { try { return fn(); } catch (error) { console.error(error); return null; } }
function getPattern(id) { return SYSTEM_PATTERNS.find(p => p.id === id); }
function createSVGElement(tag, attributes = {}) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
}
function debounce(func, wait = 150) {
    let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); };
}

// INCIDENT CARD
function updateIncidentCard(index) {
    if (!DOM.incidentCard) return;
    const data = INCIDENTS[index];
    if (!data) { gsap.to(DOM.incidentCard, { opacity: 0, y: 10, duration: 0.25 }); return; }
    DOM.incMeta.textContent = `Incident ${String(index + 1).padStart(2, '0')} | ${data.location} | ${data.year}`;
    DOM.incTitle.textContent = data.title;
    DOM.incDesc.textContent = data.desc;
    DOM.incCasualties.textContent = data.casualties;
    DOM.incLocYear.textContent = `${data.location} | ${data.year}`;
    gsap.to(DOM.incidentCard, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
    if (DOM.progressLine) gsap.to(DOM.progressLine, { width: `${((index + 1) / INCIDENTS.length) * 100}%`, duration: 0.35, ease: "power2.out" });
}

// DOTS
function createDrippingDot(index) {
    if (!DOM.dotsLayer) return;
    const data = INCIDENTS[index];
    const groupId = `dot-group-${index}`;
    if (AppState.dotGroups.has(groupId)) return;

    const g = createSVGElement('g', { id: groupId });
    const label = createSVGElement('text', { x: data.x, y: data.y - 25, 'text-anchor': 'middle', class: 'dot-label-svg' });
    label.textContent = data.location;
    label.style.cssText = `font-size: 10px; font-family: 'JetBrains Mono', monospace; fill: white; opacity: 0; pointer-events: none; user-select: none; paint-order: stroke; stroke: rgba(15, 15, 15, 0.9); stroke-width: 8px; stroke-linecap: round; stroke-linejoin: round;`;

    const pool = createSVGElement('circle', { cx: data.x, cy: data.y, r: 0, fill: '#2a0000', class: 'blood-pool' });
    pool.style.opacity = 0;
    const dot = createSVGElement('circle', { cx: data.x, cy: data.y, r: 0, fill: '#8b0000' });
    const drip = createSVGElement('circle', { cx: data.x, cy: data.y + 8, r: 2.5, fill: '#8b0000' });
    drip.style.opacity = 0;
    const trail = createSVGElement('line', { x1: data.x, x2: data.x, y1: data.y + 6, y2: data.y + 22, stroke: '#6e0000', 'stroke-width': '1.5', 'stroke-linecap': 'round' });
    trail.style.opacity = 0;

    g.append(label, pool, trail, dot, drip);
    DOM.dotsLayer.appendChild(g);
    AppState.dotGroups.set(groupId, { g, pool, dot, drip, trail, label });

    const tl = gsap.timeline();
    tl.to(pool, { attr: { r: 34 }, opacity: 0.65, duration: 0.6, ease: "power2.out" })
      .to(pool, { opacity: 0.0, duration: 1.8, ease: "power1.out" }, "+=0.1")
      .to(dot, { attr: { r: 7 }, duration: 0.7, ease: "back.out(2)" }, 0.05)
      .to(label, { opacity: 0.9, duration: 0.4, ease: "power2.out" }, 0.3)
      .to(trail, { opacity: 0.55, duration: 0.35, ease: "power2.out" }, 0.15);

    const dripTween = gsap.timeline({ repeat: -1, repeatDelay: 0.25 });
    dripTween.set(drip, { opacity: 0, attr: { cy: data.y + 8, r: 2.6 } })
             .to(drip, { opacity: 0.95, duration: 0.12 })
             .to(drip, { attr: { cy: data.y + 26, r: 2.0 }, opacity: 0.0, duration: 0.65, ease: "power1.in" })
             .to({}, { duration: 0.15 });
    AppState.dripTweens.set(groupId, dripTween);
}

function removeDot(index) {
    const groupId = `dot-group-${index}`;
    const entry = AppState.dotGroups.get(groupId);
    if (!entry) return;
    const { g, dot, drip, trail } = entry;
    const tween = AppState.dripTweens.get(groupId);
    if (tween) { tween.kill(); AppState.dripTweens.delete(groupId); }
    gsap.timeline({ onComplete: () => { g.remove(); AppState.dotGroups.delete(groupId); } })
        .to([drip, trail], { opacity: 0, duration: 0.2 }, 0)
        .to(dot, { attr: { r: 0 }, duration: 0.25, ease: "power2.in" }, 0.05)
        .to(g, { opacity: 0, duration: 0.2 }, 0.1);
}

function setupMapTriggers() {
    document.querySelectorAll('.incident-trigger').forEach((trigger, i) => {
        const scrollTrigger = ScrollTrigger.create({
            trigger, start: "top center",
            onEnter: () => { createDrippingDot(i); updateIncidentCard(i); },
            onEnterBack: () => { createDrippingDot(i); updateIncidentCard(i); },
            onLeaveBack: () => {
                removeDot(i);
                const prev = i - 1;
                if (prev >= 0) { updateIncidentCard(prev); if (DOM.progressLine) gsap.to(DOM.progressLine, { width: `${((prev + 1) / INCIDENTS.length) * 100}%` }); } 
                else { if (DOM.progressLine) gsap.to(DOM.progressLine, { width: '0%' }); if (DOM.incidentCard) gsap.to(DOM.incidentCard, { opacity: 0, y: 10 }); }
            }
        });
        AppState.scrollTriggerIds.add(scrollTrigger);
    });
}

function generateForensicRail() {
    if (!DOM.forensicRail) return;
    DOM.forensicRail.innerHTML = '';
    FORENSIC_CASES.forEach((caseData) => {
        let cardHTML = '';
        if (caseData.type === 'intro') {
            cardHTML = `<div class="rail-card flex items-center justify-center px-12 bg-zinc-950 text-white"><div class="max-w-2xl text-center"><span class="mono text-red-600 text-xs tracking-widest uppercase mb-4 block">Section 02 / Forensic Evidence</span><h2 class="editorial-title text-5xl mb-6">${caseData.title}</h2><p class="text-zinc-400 text-lg">${caseData.subtitle}</p></div></div>`;
        } else if (caseData.type === 'conclusion') {
            cardHTML = `<div class="rail-card flex items-center justify-center p-12 bg-black text-white"><div class="max-w-4xl text-center"><div class="mb-8"><span class="mono text-xs text-red-600">${caseData.year}</span><h3 class="editorial-title text-5xl mb-6">${caseData.title}</h3><p class="text-zinc-400 text-lg mb-8">${caseData.summary}</p></div><div class="max-w-2xl mx-auto text-left border-l-2 border-red-600 pl-6 space-y-2"><p class="text-sm"><strong>Official:</strong> "${caseData.official}"</p><p class="text-sm"><strong>Evidence:</strong> ${caseData.evidence}</p><div class="pt-4 space-y-1">${caseData.sources.map(s => `<a href="${s.url}" class="text-xs mono text-red-400 block hover:underline" target="_blank" rel="noopener">${s.text}</a>`).join('')}</div></div><p class="text-center text-zinc-500 mt-12 italic">${caseData.conclusion}</p></div></div>`;
        } else {
            const beforeSrc = caseData.before || `images/forensic/${caseData.id}-before.jpg`;
            const afterSrc = caseData.after || `images/forensic/${caseData.id}-after.jpg`;
            cardHTML = `<div class="rail-card flex items-center justify-center p-12 ${caseData.bgColor}"><div class="max-w-6xl w-full"><div class="mb-8"><div class="flex items-center gap-4 mb-4"><span class="mono text-xs text-red-600">${caseData.year}</span><span class="text-4xl font-black text-red-600">${caseData.casualties}+</span><span class="mono text-xs text-zinc-400 uppercase">casualties</span></div><h3 class="text-3xl font-bold mb-4">${caseData.title}</h3><p class="text-zinc-600 mb-4">${caseData.summary}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"><figure class="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 aspect-video group"><div class="relative w-full h-full overflow-hidden"><img src="${beforeSrc}" alt="${caseData.beforeCaption}" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-100" loading="lazy" style="brightness: 0.95;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div></div><figcaption class="absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.22em] bg-black/80 text-white px-3 py-1.5 rounded transition-all duration-300 group-hover:bg-black group-hover:px-4 z-10">${caseData.beforeCaption}</figcaption><div class="absolute bottom-3 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">Hover to zoom • Click for full size</div></figure><figure class="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 aspect-video group"><div class="relative w-full h-full overflow-hidden"><img src="${afterSrc}" alt="${caseData.afterCaption}" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" /><div class="absolute inset-0 bg-red-900/20 group-hover:bg-red-900/10 transition-all duration-500"></div><div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div></div><figcaption class="absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.22em] bg-red-900/80 text-white px-3 py-1.5 rounded transition-all duration-300 group-hover:bg-red-900 group-hover:px-4 z-10">${caseData.afterCaption}</figcaption><div class="absolute bottom-3 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">Hover to zoom • ${caseData.casualties}+ casualties</div></figure></div><div class="mt-8 p-6 bg-zinc-50 border border-zinc-200 rounded-lg"><h4 class="mono text-xs uppercase tracking-wider text-zinc-600 mb-3">Visual Evidence Analysis</h4><p class="text-sm text-zinc-700 leading-relaxed">${caseData.imageAnalysis}</p><div class="mt-4 pt-4 border-t border-zinc-300"><p class="text-xs text-zinc-500"><strong>Image Credits:</strong> ${caseData.imageCredits}</p></div></div><div class="border-l-2 border-zinc-900 pl-6 space-y-2 mt-8"><p class="text-sm"><strong>Official Narrative:</strong> "${caseData.official}"</p><p class="text-sm"><strong>Documented Evidence:</strong> ${caseData.evidence}</p><div class="pt-4 space-y-1">${caseData.sources.map(s => `<a href="${s.url}" class="text-xs mono text-blue-600 block hover:underline" target="_blank" rel="noopener">${s.text}</a>`).join('')}</div></div></div></div>`;
        }
        DOM.forensicRail.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function setupRailScroll() {
    const existing = ScrollTrigger.getById("forensic-rail");
    if (existing) existing.kill(true);
    gsap.set(DOM.forensicRail, { clearProps: "all" });
    if (window.innerWidth < 1024) return;
    if (!DOM.forensicRail) return;
    gsap.set(DOM.forensicRail, { x: 0 });
    const scrollDistance = Math.max(0, DOM.forensicRail.scrollWidth - window.innerWidth);
    gsap.to(DOM.forensicRail, {
        x: -scrollDistance, ease: "none",
        scrollTrigger: { id: "forensic-rail", trigger: "#forensic-rail-section", pin: true, scrub: 1, invalidateOnRefresh: true, end: () => `+=${scrollDistance}` }
    });
}

// PATTERNS & CHARTS
function generatePatternTexts() {
    if (!DOM.patternTextsContainer) return;
    DOM.patternTextsContainer.innerHTML = SYSTEM_PATTERNS.map((pattern, index) => {
        const implicationHTML = pattern.implication ? `<div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-4">Implication</div><div class="text-sm text-zinc-600 mt-1">${pattern.implication}</div>` : '';
        return `<div class="pattern-text" data-pattern-index="${index}"><span class="mono text-red-600 text-xs tracking-widest uppercase mb-4 block">Pattern 0${index + 1}</span><h2 class="text-4xl font-bold mb-4">${pattern.title}</h2><p class="text-lg text-zinc-600 leading-relaxed">${pattern.finding}</p><div class="mt-6 border-l-2 border-red-600 pl-5"><div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Question</div><div class="text-sm text-zinc-700 mt-1">${pattern.question}</div>${implicationHTML}</div></div>`;
    }).join('');
}

function createSVGContainer(container) {
    if (!container) return null;
    container.innerHTML = '';
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const svg = createSVGElement('svg', { viewBox: `0 0 ${width} ${height}`, preserveAspectRatio: 'xMidYMid meet' });
    container.appendChild(svg);
    return { svg, width, height };
}

function addChartTitle(svg, width, text) {
    const title = createSVGElement('text', { x: width / 2, y: 26, 'text-anchor': 'middle', class: 'mono' });
    title.style.cssText = 'font-size: 10px; fill: #71717a; text-transform: uppercase; letter-spacing: 0.12em;';
    title.textContent = text;
    svg.appendChild(title);
}

function createBarChart() {
    const container = DOM.svgBarChart; if (!container) return; const result = createSVGContainer(container); if (!result) return;
    const { svg, width, height } = result; const p = getPattern('reprisal');
    const margin = { top: 52, right: 30, bottom: 32, left: 140 }; addChartTitle(svg, width, p.question);
    const innerWidth = width - margin.left - margin.right; const innerHeight = height - margin.top - margin.bottom;
    const maxValue = Math.max(...p.data.map(d => d.value)); const g = createSVGElement('g', { transform: `translate(${margin.left},${margin.top})` }); svg.appendChild(g);
    const bandHeight = innerHeight / p.data.length; const padding = bandHeight * 0.28; const barHeight = bandHeight - padding;
    p.data.forEach((d, i) => {
        const barWidth = (d.value / maxValue) * innerWidth; const yPos = i * bandHeight + padding / 2; const redIntensity = Math.floor(225 - (d.severity * 15));
        const bar = createSVGElement('rect', { x: 0, y: yPos, width: 0, height: barHeight, fill: `rgb(${redIntensity}, 0, 0)` }); g.appendChild(bar);
        const label = createSVGElement('text', { x: -12, y: yPos + barHeight / 2, 'text-anchor': 'end' }); label.style.cssText = 'font-size: 11px; fill: #3f3f46; dominant-baseline: middle;'; label.textContent = d.label; g.appendChild(label);
        const value = createSVGElement('text', { x: barWidth + 10, y: yPos + barHeight / 2 }); value.style.cssText = 'font-size: 12px; font-weight: 800; fill: #8b0000; dominant-baseline: middle;'; value.textContent = `${d.value}+`; g.appendChild(value);
        setTimeout(() => bar.setAttribute('width', barWidth), 110 * i);
    });
}

function createTimeline() {
    const container = DOM.svgTimeline; if (!container) return; const result = createSVGContainer(container); if (!result) return;
    const { svg, width, height } = result; const p = getPattern('phases');
    const margin = { top: 52, right: 24, bottom: 22, left: 24 }; addChartTitle(svg, width, p.question);
    const innerWidth = width - margin.left - margin.right; const innerHeight = height - margin.top - margin.bottom;
    const g = createSVGElement('g', { transform: `translate(${margin.left},${margin.top})` }); svg.appendChild(g);
    const bandHeight = innerHeight / p.phases.length; const colors = ["#7f1d1d", "#b91c1c", "#dc2626"];
    p.phases.forEach((phase, i) => {
        const yPos = i * bandHeight; const barW = Math.max(12, (phase.bandWidth / 100) * innerWidth);
        const bar = createSVGElement('rect', { x: 0, y: yPos + 10, width: 0, height: bandHeight - 20, rx: 6, fill: colors[i % colors.length] }); bar.style.opacity = 0.9; g.appendChild(bar);
        const label = createSVGElement('text', { x: 14, y: yPos + bandHeight / 2 - 10 }); label.style.cssText = 'font-size: 12px; font-weight: 800; fill: #fff;'; label.textContent = phase.label; g.appendChild(label);
        const period = createSVGElement('text', { x: 14, y: yPos + bandHeight / 2 + 8 }); period.style.cssText = 'font-size: 10px; fill: #fecaca;'; period.textContent = `${phase.period} • ${phase.geographic}`; g.appendChild(period);
        const desc = createSVGElement('text', { x: innerWidth - 8, y: yPos + bandHeight / 2, 'text-anchor': 'end' }); desc.style.cssText = 'font-size: 10px; fill: #52525b; dominant-baseline: middle;'; desc.textContent = phase.description; g.appendChild(desc);
        setTimeout(() => bar.setAttribute('width', barW), 160 * i);
    });
}

function createDonutChart() {
    const container = DOM.svgDonut; if (!container) return; const result = createSVGContainer(container); if (!result) return;
    const { svg, width, height } = result; const p = getPattern('modality');
    const radius = Math.min(width, height) / 2 - 64; addChartTitle(svg, width, p.question);
    const g = createSVGElement('g', { transform: `translate(${width / 2},${height / 2})` }); svg.appendChild(g);
    const total = p.stacks.reduce((sum, d) => sum + d.value, 0); let currentAngle = -Math.PI / 2;
    p.stacks.forEach((d, i) => {
        const sliceAngle = (d.value / total) * 2 * Math.PI; const endAngle = currentAngle + sliceAngle; const midAngle = currentAngle + sliceAngle / 2; const largeArcFlag = sliceAngle > Math.PI ? 1 : 0; const innerRadius = radius * 0.55;
        const x1 = Math.cos(currentAngle) * radius; const y1 = Math.sin(currentAngle) * radius; const x2 = Math.cos(endAngle) * radius; const y2 = Math.sin(endAngle) * radius; const x3 = Math.cos(endAngle) * innerRadius; const y3 = Math.sin(endAngle) * innerRadius; const x4 = Math.cos(currentAngle) * innerRadius; const y4 = Math.sin(currentAngle) * innerRadius;
        const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
        const path = createSVGElement('path', { d: pathData, fill: d.color, stroke: '#fff', 'stroke-width': 2 }); path.style.opacity = 0; g.appendChild(path);
        const labelX = Math.cos(midAngle) * (radius * 0.78); const labelY = Math.sin(midAngle) * (radius * 0.78);
        const text = createSVGElement('text', { x: labelX, y: labelY, 'text-anchor': 'middle' }); text.style.cssText = 'font-size: 10px; fill: #fff; font-weight: 800; dominant-baseline: middle;'; text.textContent = d.value; g.appendChild(text);
        setTimeout(() => path.style.opacity = 1, 200 * i); currentAngle = endAngle;
    });
    const totalText = createSVGElement('text', { 'text-anchor': 'middle' }); totalText.style.cssText = 'font-size: 24px; font-weight: 900; fill: #8b0000; dominant-baseline: middle;'; totalText.textContent = total.toLocaleString(); g.appendChild(totalText);
    const totalLabel = createSVGElement('text', { y: 22, 'text-anchor': 'middle' }); totalLabel.style.cssText = 'font-size: 10px; fill: #71717a;'; totalLabel.textContent = 'Total deaths'; g.appendChild(totalLabel);
    const legend = createSVGElement('g', { transform: `translate(${20},${height - 44})` }); svg.appendChild(legend);
    p.stacks.forEach((d, i) => {
        const item = createSVGElement('g', { transform: `translate(${i * 160},0)` }); legend.appendChild(item);
        const rect = createSVGElement('rect', { width: 10, height: 10, fill: d.color }); item.appendChild(rect);
        const text = createSVGElement('text', { x: 14, y: 9 }); text.style.cssText = 'font-size: 9px; fill: #52525b;'; text.textContent = d.label; item.appendChild(text);
    });
}

function createWordViz() {
    const container = DOM.svgWord; if (!container) return; const result = createSVGContainer(container); if (!result) return;
    const { svg, width, height } = result; const p = getPattern('targeting'); addChartTitle(svg, width, p.question);
    const colorMap = { "ethnic": "#7f1d1d", "demographic": "#b91c1c", "legal-status": "#dc2626", "political": "#f97316", "activity": "#a1a1aa" };
    const terms = p.terms.slice().sort((a, b) => b.weight - a.weight);
    const centerX = width / 2; const centerY = height / 2 + 10;
    const minWeight = Math.min(...terms.map(d => d.weight)); const maxWeight = Math.max(...terms.map(d => d.weight));
    const fontScale = (weight) => 14 + ((weight - minWeight) / (maxWeight - minWeight)) * 28;
    const positions = [{ x: 0, y: -70 }, { x: -120, y: -10 }, { x: 120, y: -10 }, { x: -90, y: 70 }, { x: 90, y: 70 }, { x: 0, y: 120 }];
    const g = createSVGElement('g', { transform: `translate(${centerX},${centerY})` }); svg.appendChild(g);
    terms.forEach((term, i) => {
        const pos = positions[i] || { x: (i % 2 ? -140 : 140), y: 0 };
        const text = createSVGElement('text', { x: pos.x, y: pos.y, 'text-anchor': 'middle' });
        text.style.cssText = `font-size: ${fontScale(term.weight)}px; font-weight: 900; fill: ${colorMap[term.category] || '#a1a1aa'}; opacity: 0;`; text.textContent = term.text; g.appendChild(text);
        setTimeout(() => text.style.opacity = 1, 120 * i);
    });
    const legend = createSVGElement('g', { transform: `translate(${22},${height - 44})` }); svg.appendChild(legend);
    const categories = Array.from(new Set(terms.map(d => d.category)));
    categories.forEach((cat, i) => {
        const item = createSVGElement('g', { transform: `translate(${i * 120},0)` }); legend.appendChild(item);
        const circle = createSVGElement('circle', { r: 5, cx: 5, cy: 5, fill: colorMap[cat] }); item.appendChild(circle);
        const text = createSVGElement('text', { x: 14, y: 9 }); text.style.cssText = 'font-size: 9px; fill: #52525b;'; text.textContent = cat; item.appendChild(text);
    });
}

function createPhraseMatrix() {
    const container = DOM.svgPhrases; if (!container) return; const result = createSVGContainer(container); if (!result) return;
    const { svg, width, height } = result; const p = getPattern('denial'); addChartTitle(svg, width, p.question);
    const phrases = p.phrases.slice().sort((a, b) => b.frequency - a.frequency); const catColor = { "tactical": "#7f1d1d", "legal": "#f97316", "denial": "#111827" };
    const cols = 2; const rows = Math.ceil(phrases.length / cols); const padding = 20; const horizontalPadding = 40; const verticalPadding = 60;
    const availableWidth = width - horizontalPadding * 2; const availableHeight = height - verticalPadding;
    const cardW = availableWidth / cols - padding; const cardH = availableHeight / rows - padding; const startX = horizontalPadding; const startY = verticalPadding; const minCardHeight = 70; const actualCardH = Math.max(cardH, minCardHeight);
    phrases.forEach((phrase, i) => {
        const col = i % cols; const row = Math.floor(i / cols); const x = startX + col * (cardW + padding); const y = startY + row * (actualCardH + padding);
        const cardBg = createSVGElement('rect', { x, y, width: cardW, height: actualCardH, rx: 10, fill: '#fff', stroke: '#e4e4e7', 'stroke-width': 1.5 }); cardBg.style.opacity = 0; svg.appendChild(cardBg);
        const catRect = createSVGElement('rect', { x: x + 16, y: y + 16, width: 10, height: 10, rx: 2, fill: catColor[phrase.category] }); catRect.style.opacity = 0; svg.appendChild(catRect);
        const phraseText = createSVGElement('text', { x: x + 34, y: y + 26 }); const phraseFontSize = Math.min(14, cardW / 15); phraseText.style.cssText = `font-size: ${phraseFontSize}px; font-weight: 800; fill: #111827; opacity: 0; font-family: 'Inter', sans-serif;`; phraseText.textContent = phrase.text; svg.appendChild(phraseText);
        const freqText = createSVGElement('text', { x: x + 34, y: y + 46 }); const freqFontSize = Math.min(12, cardW / 18); freqText.style.cssText = `font-size: ${freqFontSize}px; fill: #71717a; font-family: 'JetBrains Mono', monospace; opacity: 0;`; freqText.textContent = `Frequency: ${phrase.frequency}`; svg.appendChild(freqText);
        setTimeout(() => { cardBg.style.opacity = 1; catRect.style.opacity = 1; phraseText.style.opacity = 1; freqText.style.opacity = 1; }, 120 * i);
    });
    if (height > 500) {
        const legendY = height - 40; const legend = createSVGElement('g', { transform: `translate(${width / 2 - 100},${legendY})` }); svg.appendChild(legend);
        Object.entries(catColor).forEach(([category, color], i) => {
            const item = createSVGElement('g', { transform: `translate(${i * 120},0)` }); legend.appendChild(item);
            const rect = createSVGElement('rect', { width: 12, height: 12, rx: 2, fill: color }); item.appendChild(rect);
            const text = createSVGElement('text', { x: 18, y: 11 }); text.style.cssText = 'font-size: 12px; fill: #333; font-family: "Inter", sans-serif;'; text.textContent = category; item.appendChild(text);
        });
    }
}

function initSVGCharts() {
    createBarChart(); createTimeline(); createDonutChart(); createWordViz(); createPhraseMatrix();
}

function setupPatternScrollTriggers() {
    const patternTexts = Array.from(document.querySelectorAll('.pattern-text'));
    const hideAllPatternViz = (immediate = false) => { DOM.patternVizs.forEach(v => { v.classList.add('opacity-0'); if (immediate) gsap.set(v, { opacity: 0, scale: 1 }); }); };
    const showPatternViz = (i, direction = 1) => {
        if (!DOM.patternVizs[i]) return;
        DOM.patternVizs.forEach((v, idx) => { if (idx !== i) { v.classList.add('opacity-0'); gsap.set(v, { opacity: 0, scale: 1 }); } });
        const v = DOM.patternVizs[i]; v.classList.remove('opacity-0');
        if (i === 0) createBarChart(); if (i === 1) createTimeline(); if (i === 2) createDonutChart(); if (i === 3) createWordViz(); if (i === 4) createPhraseMatrix();
        const fromScale = direction === -1 ? 1.05 : 0.95; gsap.fromTo(v, { opacity: 0, scale: fromScale }, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' });
    };
    hideAllPatternViz(true);
    patternTexts.forEach((textEl) => {
        const i = Number(textEl.getAttribute('data-pattern-index') || 0);
        const scrollTrigger = ScrollTrigger.create({ trigger: textEl, start: 'top center', end: 'bottom center', onEnter: (self) => showPatternViz(i, self.direction), onEnterBack: (self) => showPatternViz(i, self.direction), onLeave: () => hideAllPatternViz(), onLeaveBack: () => hideAllPatternViz() });
        AppState.scrollTriggerIds.add(scrollTrigger);
    });
    const sectionTrigger = ScrollTrigger.create({ trigger: '#system-patterns', start: 'top top+=52', end: 'bottom top+=52', onLeave: () => hideAllPatternViz(), onLeaveBack: () => hideAllPatternViz() });
    AppState.scrollTriggerIds.add(sectionTrigger);
}

// =============================================
// MOBILE LOGIC
// =============================================
function initMobilePatterns() {
    const container = document.getElementById('mobile-flip-container');
    if (!container || window.innerWidth >= 1024) return;
    container.innerHTML = '';
    SYSTEM_PATTERNS.forEach((pattern, index) => {
        const cardHTML = `<div class="pattern-flip-card" id="flip-card-${index}" onclick="toggleFlip(${index})"><div class="pattern-flip-inner"><div class="pattern-flip-front"><div><span class="mono text-red-600 text-xs tracking-widest uppercase mb-3 block">Pattern 0${index + 1}</span><h2 class="text-3xl font-bold mb-3">${pattern.title}</h2><p class="text-base text-zinc-600 leading-relaxed mb-4">${pattern.finding}</p><div class="border-l-2 border-red-600 pl-4 bg-red-50/50 p-3 rounded-r"><div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Question</div><div class="text-sm text-zinc-800 mt-1 font-medium">${pattern.question}</div></div></div><div class="flip-trigger-btn"><span>Tap card to reveal</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></div></div><div class="pattern-flip-back"><div class="absolute top-4 right-4 text-zinc-400 text-xs uppercase tracking-widest">Tap to return</div><div id="mobile-viz-${index}" class="w-full h-full flex items-center justify-center"></div></div></div></div>`;
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
    DOM.svgBarChart = document.getElementById('mobile-viz-0'); createBarChart();
    DOM.svgTimeline = document.getElementById('mobile-viz-1'); createTimeline();
    DOM.svgDonut = document.getElementById('mobile-viz-2'); createDonutChart();
    DOM.svgWord = document.getElementById('mobile-viz-3'); createWordViz();
    DOM.svgPhrases = document.getElementById('mobile-viz-4'); createPhraseMatrix();
}

window.toggleFlip = function(index) {
    const card = document.getElementById(`flip-card-${index}`);
    if (card) card.classList.toggle('flipped');
};

/* ==========================================
   MOBILE MAP INTERACTION LOGIC (UPDATED)
   ========================================== */

function setupMobileMapInteraction() {
    if (window.innerWidth >= 1024) return;

    // 1. INITIAL CLEANUP
    const incidentDisplay = document.getElementById('incident-display');
    const dotsLayer = document.getElementById('dots-layer');
    
    if (incidentDisplay) gsap.set(incidentDisplay, { opacity: 0, autoAlpha: 0 });
    if (dotsLayer) dotsLayer.innerHTML = '';

    // 2. STATE MANAGEMENT
    let sequenceStarted = false;
    let renderedDots = []; // Track which dots are currently on screen

    // 3. SCROLL LEDE LOGIC
    const introBoxes = gsap.utils.toArray('.intro-box');
    
    introBoxes.forEach((box, i) => {
        gsap.fromTo(box, 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1, y: 0, duration: 0.5,
                scrollTrigger: {
                    trigger: box,
                    start: "top 75%",
                    end: "top 15%",
                    toggleActions: "play reverse play reverse",
                    // TRIGGER START: When last text leaves viewport going down
                    onLeave: () => {
                        if (i === introBoxes.length - 1) {
                            startMapSequence();
                        }
                    },
                    // TRIGGER RESET: When last text enters viewport coming back up
                    onEnterBack: () => {
                        if (i === introBoxes.length - 1) {
                            resetMapState();
                        }
                    }
                }
            }
        );
    });

    // 4. SEQUENCE CONTROLLERS
    function startMapSequence() {
        if (sequenceStarted) return;
        sequenceStarted = true;
        spawnInteractiveDot(0);
    }

    function resetMapState() {
        sequenceStarted = false;
        
        // Hide Card immediately if open
        if (incidentDisplay) {
            gsap.to(incidentDisplay, { opacity: 0, autoAlpha: 0, duration: 0.2 });
        }

        // Animate removal of all dots "Like Desktop"
        renderedDots.forEach(index => {
            removeDot(index);
        });
        renderedDots = []; // Clear tracker
        
        if (DOM.progressLine) {
            gsap.to(DOM.progressLine, { width: '0%', duration: 0.3 });
        }
    }

    // 5. DOT LOGIC
    function spawnInteractiveDot(index) {
        if (index >= INCIDENTS.length) return;

        // Create standard dot & track it
        createDrippingDot(index);
        renderedDots.push(index); 
        
        const groupId = `dot-group-${index}`;
        
        setTimeout(() => {
            const groupEntry = AppState.dotGroups.get(groupId);
            if (!groupEntry) return;

            const group = groupEntry.g;
            
            // Hit Area
            const hitArea = createSVGElement('circle', { 
                cx: INCIDENTS[index].x, cy: INCIDENTS[index].y, r: 40, fill: 'transparent' 
            });
            group.appendChild(hitArea);
            
            // Pointer Animation
            const pointerObj = createSVGElement('foreignObject', {
                x: INCIDENTS[index].x - 20, y: INCIDENTS[index].y - 20,
                width: 40, height: 40, class: 'pointer-overlay'
            });
            const pointerDiv = document.createElement('div');
            pointerDiv.className = 'tap-pointer';
            pointerObj.appendChild(pointerDiv);
            group.appendChild(pointerObj);

            group.style.cursor = 'pointer';
            group.style.pointerEvents = 'all';

            // CLICK: DOT -> OPEN CARD
            group.onclick = (e) => {
                e.stopPropagation();
                pointerObj.remove();
                openIncidentCard(index);
            };
        }, 100);
    }

    // 6. CARD LOGIC
    function openIncidentCard(index) {
        updateIncidentCard(index);
        
        if (incidentDisplay) {
            gsap.to(incidentDisplay, { opacity: 1, autoAlpha: 1, duration: 0.3 });
            
            // Pointer on Card
            const card = document.querySelector('.incident-card');
            const existingPointers = card.querySelectorAll('.tap-pointer');
            existingPointers.forEach(p => p.remove());

            const ptr = document.createElement('div');
            ptr.className = 'tap-pointer card-pointer-container';
            card.appendChild(ptr);

            // CLICK: CARD -> CLOSE & NEXT
            card.onclick = (e) => {
                e.stopPropagation();
                ptr.remove();
                closeAndNext(index);
            };
        }
    }

    function closeAndNext(currentIndex) {
        gsap.to(incidentDisplay, { opacity: 0, autoAlpha: 0, duration: 0.3 });

        const nextIndex = currentIndex + 1;
        if (DOM.progressLine) {
            gsap.to(DOM.progressLine, { width: `${(nextIndex / INCIDENTS.length) * 100}%`, duration: 0.5 });
        }

        if (nextIndex < INCIDENTS.length) {
            setTimeout(() => {
                spawnInteractiveDot(nextIndex);
            }, 600);
        }
    }
}

function setupMobileRailNav() {
    if (window.innerWidth >= 1024) return;
    const navContainer = document.getElementById('mobile-rail-nav');
    if(!navContainer) return;
    navContainer.innerHTML = '';
    const cards = document.querySelectorAll('.rail-card');
    cards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full bg-zinc-400 transition-colors duration-300 dot-${i}`;
        navContainer.appendChild(dot);
    });
    ScrollTrigger.create({ trigger: '#forensic-rail-section', start: 'top center', end: 'bottom center', onToggle: self => navContainer.style.opacity = self.isActive ? 1 : 0 });
    cards.forEach((card, i) => {
        ScrollTrigger.create({ trigger: card, start: "top center", end: "bottom center", onEnter: () => updateActiveDot(i), onEnterBack: () => updateActiveDot(i) });
    });
    function updateActiveDot(index) {
        document.querySelectorAll('#mobile-rail-nav div').forEach((d, i) => {
            d.className = `w-2 h-2 rounded-full transition-colors duration-300 ${i === index ? 'bg-red-600 scale-125' : 'bg-zinc-300'}`;
        });
    }
}

function setupShareButtons() {
    const twitterBtn = document.getElementById('share-twitter'); if (twitterBtn) twitterBtn.addEventListener('click', (e) => { e.preventDefault(); window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(SHARE_DATA.url)}&text=${encodeURIComponent(SHARE_DATA.text)}`, '_blank', 'width=550,height=420'); });
    const facebookBtn = document.getElementById('share-facebook'); if (facebookBtn) facebookBtn.addEventListener('click', (e) => { e.preventDefault(); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_DATA.url)}`, '_blank', 'width=550,height=420'); });
    const linkedinBtn = document.getElementById('share-linkedin'); if (linkedinBtn) linkedinBtn.addEventListener('click', (e) => { e.preventDefault(); window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_DATA.url)}`, '_blank', 'width=550,height=420'); });
    
    const footerShareText = encodeURIComponent(SHARE_DATA.text);
    const footerShareUrl = encodeURIComponent(SHARE_DATA.url);
    document.getElementById('footer-share-twitter')?.addEventListener('click', () => { window.open(`https://twitter.com/intent/tweet?text=${footerShareText}&url=${footerShareUrl}`, '_blank', 'noopener,noreferrer'); });
    document.getElementById('footer-share-whatsapp')?.addEventListener('click', () => { window.open(`https://wa.me/?text=${footerShareText}%20${footerShareUrl}`, '_blank', 'noopener,noreferrer'); });
    document.getElementById('footer-share-facebook')?.addEventListener('click', () => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${footerShareUrl}`, '_blank', 'noopener,noreferrer'); });
    document.getElementById('footer-share-linkedin')?.addEventListener('click', () => { window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${footerShareUrl}`, '_blank', 'noopener,noreferrer'); });
    if (DOM.footerYear) DOM.footerYear.textContent = new Date().getFullYear();
}

function setupTitleAnimation() {
    if (!DOM.titleContent) return;
    ScrollTrigger.create({ trigger: "#title-block", start: "center center", end: "bottom top", scrub: true, animation: gsap.to("#title-content", { opacity: 0, y: -60 }) });
}

function setupIntroBoxAnimations() {
    gsap.utils.toArray('.intro-box').forEach((box) => {
        gsap.to(box, { opacity: 1, x: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: box, start: "top 65%", end: "bottom 35%", toggleActions: "play none none reverse" } });
    });
}

function cleanup() {
    AppState.scrollTriggerIds.forEach(id => { const trigger = ScrollTrigger.getById(id); if (trigger) trigger.kill(); });
    AppState.scrollTriggerIds.clear();
    AppState.dripTweens.forEach(tween => tween.kill());
    AppState.dripTweens.clear();
    AppState.dotGroups.clear();
    ScrollTrigger.refresh();
}

function init() {
    if (AppState.isInitialized) cleanup();
    safeExecute(() => {
        generatePatternTexts();
        generateForensicRail();
        setupRailScroll();
        if (window.innerWidth < 1024) {
            // MOBILE
            initMobilePatterns();
            setupMobileMapInteraction();
            setupMobileRailNav();
            if(DOM.forensicRail) gsap.set(DOM.forensicRail, { clearProps: "all" });
        } else {
            // DESKTOP
            setupPatternScrollTriggers();
            if (DOM.dotsLayer && INCIDENTS.length > 0) setupMapTriggers();
            initSVGCharts();
        }
        setupShareButtons();
        setupTitleAnimation();
        setupIntroBoxAnimations();
    }, 'Initialization');
    AppState.isInitialized = true;
}

const handleResize = debounce(() => { safeExecute(() => { init(); }, 'Resize'); }, 150);
window.addEventListener('resize', handleResize);
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }