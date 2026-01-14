// =============================================
// DOCUMENTED, DENIED, DERELICT
// BusinessDay Investigation Scripts
// =============================================

'use strict';

// =============================================
// GSAP REGISTRATION
// =============================================
gsap.registerPlugin(ScrollTrigger);

// =============================================
// DOM ELEMENTS - CACHED REFERENCES
// =============================================
const DOM = {
    dotsLayer: document.querySelector('#dots-layer'),
    incidentCard: document.querySelector('.incident-card'),
    progressLine: document.querySelector('#global-progress'),
    forensicRail: document.querySelector('.forensic-rail'),
    patternTextsContainer: document.getElementById('pattern-texts'),
    titleContent: document.getElementById('title-content'),
    
    // Incident card elements
    incMeta: document.getElementById('inc-meta'),
    incTitle: document.getElementById('inc-title'),
    incDesc: document.getElementById('inc-desc'),
    incCasualties: document.getElementById('inc-casualties'),
    incLocYear: document.getElementById('inc-loc-year'),
    
    // SVG containers
    svgBarChart: document.getElementById('svg-bar-chart'),
    svgTimeline: document.getElementById('svg-timeline'),
    svgDonut: document.getElementById('svg-donut'),
    svgWord: document.getElementById('svg-word'),
    svgPhrases: document.getElementById('svg-phrases'),
    
    // Pattern visualizations
    patternVizs: Array.from(document.querySelectorAll('.pattern-viz')),
    patternVizContainer: document.getElementById('pattern-viz-container'),
    
    // Footer elements
    footerYear: document.getElementById('footer-year')
};

// =============================================
// DATA DEFINITIONS
// =============================================

// Intro steps for lede section
const INTRO_STEPS = [
    {
        id: "intro-1",
        text: "On December 8, 2025, nine women were killed during a protest in Lamurde, followed by a swift military denial that blamed local militias—a claim the survivors vehemently reject."
    },
    {
        id: "intro-2",
        text: "This tragedy is not an isolated event, but the latest entry in a twenty-five-year ledger of scorched-earth operations and shattered communities that spans the Nigerian landscape."
    },
    {
        id: "intro-3",
        text: "While the country celebrates a quarter-century of stable democracy, from the 1999 ruins of Odi to the streets of Lamurde today, these killings remain meticulously documented, consistently denied, and left derelict by a justice system that refuses to act. Across five presidential administrations, the evidence has never been stronger; the accountability has never been weaker and the promise of democratic dividend never arrived for the families left behind."
    }
];

// Map projection function
function project(lat, lon) {
    const x = (lon - 2.6) * (900 / (14.6 - 2.6)) + 50;
    const y = 812 - ((lat - 4.2) * (700 / (13.9 - 4.2)) + 50);
    return { x, y };
}

// Incident data for map
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
    { id: "lamurde-2025", year: 2025, location: "Lamurde, Adamawa", title: "Lamurde Killings", casualties: "9", coords: [9.6000, 11.7833], desc: "Nine women shot during protest. Military denies responsibility." }
].map(inc => {
    // Ensuring the projection uses [0] as Latitude and [1] as Longitude
    const p = project(inc.coords[0], inc.coords[1]); 
    return { ...inc, x: p.x, y: p.y };
});

// System patterns data
const SYSTEM_PATTERNS = [
    {
        id: "reprisal",
        title: "Reprisal & Collective Punishment",
        viz: "bar",
        finding: "Large-scale violence consistently follows the killing of soldiers, with civilian populations punished far beyond the original provocation.",
        question: "What happens after security forces suffer casualties?",
        data: [
            { label: "Odi (1999)", value: 900, severity: 10 },
            { label: "Benue Cluster (2001)", value: 560, severity: 8 },
            { label: "Baga (2013)", value: 185, severity: 6 },
            { label: "Izombe (2021)", value: 3, severity: 2 },
            { label: "Amangwu (2022)", value: 10, severity: 3 }
        ],
        implication: "Reprisal logic fuels cycles of violence and erodes the legitimacy of counter-insurgency operations."
    },
    {
        id: "phases",
        title: "Three Phases of Military Violence",
        viz: "timeline",
        finding: "As Nigeria's primary security threats shifted, military violence evolved in form — but not in logic.",
        question: "How has military violence changed over time?",
        phases: [
            {
                label: "Niger Delta Era",
                period: "1999–2009",
                description: "Large-scale reprisals against entire communities",
                geographic: "South-South region",
                intensity: "High",
                bandWidth: 70
            },
            {
                label: "Northeast Conflict",
                period: "2009–2015",
                description: "Detention deaths and mass executions during screening",
                geographic: "North-East region",
                intensity: "Medium-High",
                bandWidth: 60
            },
            {
                label: "Southeast Operations",
                period: "2016–2025",
                description: "Targeted raids, checkpoints, and community invasions",
                geographic: "South-East region",
                intensity: "Medium",
                bandWidth: 50
            }
        ]
    },
    {
        id: "modality",
        title: "Modality Shift",
        viz: "stack",
        finding: "The dominant form of killing shifted from open massacres to deaths in custody, and later to raid-based executions.",
        question: "How did the method of killing change?",
        stacks: [
            { label: "Open-air Massacres", value: 1300, color: "#e10600" },
            { label: "Custody/Detention Deaths", value: 1800, color: "#ff6b6b" },
            { label: "Raid & Checkpoint Killings", value: 400, color: "#ff8e53" }
        ]
    },
    {
        id: "targeting",
        title: "Target Profile Evolution",
        viz: "word",
        finding: "Victim targeting narrowed over time but remained rooted in broad profiling rather than individual culpability.",
        question: "Who was targeted?",
        terms: [
            { text: "Ijaw communities", weight: 8, category: "ethnic" },
            { text: "Tiv civilians", weight: 7, category: "ethnic" },
            { text: "Young men", weight: 9, category: "demographic" },
            { text: "Detainees", weight: 8, category: "legal-status" },
            { text: "IPOB suspects", weight: 6, category: "political" },
            { text: "Protesters", weight: 5, category: "activity" }
        ]
    },
    {
        id: "denial",
        title: "Official Narrative & Deniability",
        viz: "text",
        finding: "Civilian deaths are routinely reframed as legitimate engagements with 'terrorists' or 'militants'.",
        question: "How are killings officially explained?",
        phrases: [
            { text: "neutralised terrorists", category: "tactical", frequency: 18 },
            { text: "armed confrontation", category: "tactical", frequency: 15 },
            { text: "within rules of engagement", category: "legal", frequency: 12 },
            { text: "unknown gunmen", category: "denial", frequency: 22 },
            { text: "no civilian casualties", category: "denial", frequency: 25 },
            { text: "security clearance operation", category: "tactical", frequency: 10 }
        ],
        implication: "This narrative framing obscures civilian harm and makes accountability nearly impossible."
    }
];

// Forensic rail cases data
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
            { text: "Human Rights Watch Report", url: "https://www.hrw.org/reports/2003/nigeria1103/nigeria1103.pdf" },
            { text: "Amnesty International investigation", url: "https://www.amnesty.org/en/latest/news/1999/11/nigeria-villagers-killed-in-military-attack/" },
            { text: "BBC News coverage", url: "https://news.bbc.co.uk/2/hi/africa/530174.stm" },
            { text: "The Guardian investigation", url: "https://www.theguardian.com/world/1999/dec/01/1" }
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
        imageAnalysis: "Aerial imagery shows multiple Tiv communities systematically targeted. Burn patterns consistent with intentional arson changes vegetation. Satellite imagery reveals widespread destruction across residential areas rather than isolated combat zones. Ground reports confirm mass executions following 'peace meetings'.",
        imageCredits: "Before: Landsat 7 satellite imagery, October 2001 / After: Landsat 7 satellite imagery, November 2001",
        summary: "Over 200 unarmed civilians killed. Villagers assembled for 'peace meetings' then executed. Homes systematically burned across multiple communities.",
        official: "Lawful operation following killing of 19 soldiers. Targeted 'militants' and 'troublemakers'. Denied deliberate civilian targeting.",
        evidence: "Villagers assembled for 'peace meetings' then executed. Over 200 unarmed civilians killed. Homes systematically burned across multiple communities. Witness testimony of planned executions.",
        sources: [
            { text: "Human Rights Watch report - 'Jos: A City Torn Apart'", url: "https://www.hrw.org/reports/2001/nigeria/" },
            { text: "The Guardian investigation", url: "https://www.theguardian.com/world/2001/oct/27/2" },
            { text: "Amnesty International documentation", url: "https://www.amnesty.org/en/documents/afr44/021/2001/en/" },
            { text: "BBC News coverage", url: "https://news.bbc.co.uk/2/hi/africa/1623498.stm" }
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
        imageAnalysis: "High-resolution satellite imagery reveals unprecedented scale of destruction. Approximately 2,300+ buildings destroyed, representing over 70% of structures. Scorch patterns concentrated in residential areas rather than combat zones. Fishing boats and market infrastructure specifically targeted, indicating economic warfare against civilian population.",
        imageCredits: "Before: Landsat 7 satellite imagery, January 2013 / After: Landsat 7 satellite imagery, April 2013",
        summary: "185+ civilian deaths. 2,300+ buildings destroyed. Satellite-era evidence contradicts official narrative.",
        official: "Operation against Boko Haram militants. Claimed only militants targeted. Minimal civilian damage asserted.",
        evidence: "Satellite imagery shows 2,300+ buildings destroyed. Scorch patterns inside residential grid, not combat zones. Fishermen and traders among the dead. Local accounts contradict official timeline.",
        sources: [
            { text: "Amnesty International satellite analysis", url: "https://www.amnesty.org/en/latest/news/2013/05/nigeria-war-crimes-and-crimes-against-humanity-as-boko-haram-unleashes-terror/" },
            { text: "Human Rights Watch investigation", url: "https://www.hrw.org/reports/2013/05/01/nigeria-war-crimes-and-crimes-against-humanity" },
            { text: "BBC News satellite evidence", url: "https://www.bbc.com/news/world-africa-22619282" },
            { text: "Premium Times investigation", url: "https://www.premiumtimesng.com/news/135147-breaking-1200-people-killed-as-soldiers-boko-haram-clash-in-baga.html" }
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
        imageAnalysis: "Satellite imagery shows mass grave sites within barracks perimeter. Bodies of victims killed in executions.",
        imageCredits: "Satellite analysis and images from Amnesty International report",
        summary: "640+ recaptured detainees executed. Video evidence verified showing summary executions. Systematic killing under custody.",
        official: "Detainees were 'hardcore terrorists'. Denied extrajudicial executions. Claimed detainees died in crossfire.",
        evidence: "Amnesty documented 640+ recaptured detainees executed. Video evidence verified showing summary executions. Bodies dumped in mass piles visible in satellite imagery. Survivor testimonies of systematic killings.",
        sources: [
            { text: "Amnesty International 'Stars on their Shoulders' report", url: "https://www.amnesty.org/en/documents/afr44/021/2015/en/" },
            { text: "CNN video investigation", url: "https://www.cnn.com/2014/03/14/world/africa/nigeria-video-executions/index.html" },
            { text: "Human Rights Watch follow-up", url: "https://www.hrw.org/news/2015/06/03/nigeria-massacre-investigation-needed-giwa-barracks" },
            { text: "The Guardian coverage", url: "https://www.theguardian.com/world/2014/mar/17/nigeria-boko-haram-executions-giwa-barracks-maiduguri" }
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
        imageAnalysis: "imagery shows bodies of victims killed during screening operations.",
        imageCredits: "Amnesty Internation Investigation report",
        summary: "Hundreds of men executed after 'screening'. Mass graves discovered by locals. Screening operations used as cover for executions.",
        official: "Counter-terror screening operation. No civilian casualties reported. Lawful detention of suspects claimed.",
        evidence: "Men rounded up during 'screening' never returned. Residents executed near barracks perimeter. Burn patterns visible in satellite imagery. Mass graves discovered by locals.",
        sources: [
            { text: "Human Rights Watch investigation", url: "https://www.hrw.org/news/2014/05/01/nigeria-rampant-killings-pillage-boko-haram" },
            { text: "Amnesty International satellite analysis", url: "https://www.amnesty.org/en/latest/news/2014/05/nigeria-military-must-end-unlawful-killings-during-boko-haram-counter-insurgency/" },
            { text: "BBC News report", url: "https://www.bbc.com/news/world-africa-27245591" },
            { text: "Vanguard newspaper investigation", url: "https://www.vanguardngr.com/2014/05/400-civilians-killed-bama-army-allegedly-buried-mass-grave/" }
        ],
        bgColor: "bg-white"
    },
    
    {
        id: "lamurde-2025",
        type: "conclusion",
        year: 2025,
        title: "Lamurde - The Pattern Continues",
        location: "Lamurde, Adamawa State",
        casualties: 9,
        before: "images/forensic/lamurde-before.jpg",
        after: "images/forensic/lamurde-after.jpg",
        summary: "9 unarmed women shot during protest. Video shows uniform firing pattern. Shifting blame to non-state actors while evidence points to military.",
        official: "Casualties caused by untrained militias. Army not involved in shooting. Protest turned violent.",
        evidence: "Amnesty: unarmed women shot during protest. Video shows uniform firing pattern contradicting militia claim. Eyewitness accounts point to military involvement. Medical reports show military-grade wounds.",
        sources: [
            { text: "Amnesty International report", url: "https://www.amnesty.org/en/latest/news/2025/01/nigeria-adamawa-shooting/" },
            { text: "Daily Trust investigation", url: "https://dailytrust.com/how-soldiers-killed-nine-protesting-women-in-adamawa/" },
            { text: "Premium Times video analysis", url: "https://www.premiumtimesng.com/news/headlines/679175-video-shows-soldiers-shooting-at-protesters-in-adamawa-community.html" },
            { text: "International Centre for Investigative Reporting", url: "https://www.icirnigeria.org/army-disclaims-responsibility-for-killing-of-nine-women-in-adamawa/" }
        ],
        conclusion: "Twenty-five years. The pattern remains unbroken."
    }
];

// Share data
const SHARE_DATA = {
    url: window.location.href,
    title: 'DOCUMENTED, DENIED, DERELICT | BusinessDay Investigation',
    text: 'Mapping 25 years of the Nigerian Army\'s extrajudicial killings without justice.'
};

// =============================================
// STATE MANAGEMENT
// =============================================
const AppState = {
    dotGroups: new Map(),
    dripTweens: new Map(),
    scrollTriggerIds: new Set(),
    isInitialized: false
};

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Safely execute a function with error handling
 */
function safeExecute(fn, context = 'Unknown') {
    try {
        return fn();
    } catch (error) {
        console.error(`[${context}] Error:`, error);
        return null;
    }
}

/**
 * Get pattern by ID
 */
function getPattern(id) {
    return SYSTEM_PATTERNS.find(p => p.id === id);
}

/**
 * Create SVG element with attributes
 */
function createSVGElement(tag, attributes = {}) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });
    return element;
}

/**
 * Debounce function for resize events
 */
function debounce(func, wait = 150) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// =============================================
// INCIDENT CARD FUNCTIONS
// =============================================

function updateIncidentCard(index) {
    if (!DOM.incidentCard) return;
    
    const data = INCIDENTS[index];
    if (!data) {
        gsap.to(DOM.incidentCard, { opacity: 0, y: 10, duration: 0.25 });
        return;
    }

    const meta = `Incident ${String(index + 1).padStart(2, '0')} | ${data.location} | ${data.year}`;
    
    DOM.incMeta.textContent = meta;
    DOM.incTitle.textContent = data.title;
    DOM.incDesc.textContent = data.desc;
    DOM.incCasualties.textContent = data.casualties;
    DOM.incLocYear.textContent = `${data.location} | ${data.year}`;

    gsap.to(DOM.incidentCard, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
    
    if (DOM.progressLine) {
        gsap.to(DOM.progressLine, { 
            width: `${((index + 1) / INCIDENTS.length) * 100}%`, 
            duration: 0.35, 
            ease: "power2.out" 
        });
    }
}

function createDrippingDot(index) {
    if (!DOM.dotsLayer) return;
    
    const data = INCIDENTS[index];
    const groupId = `dot-group-${index}`;
    
    if (AppState.dotGroups.has(groupId)) return;

    const g = createSVGElement('g', { id: groupId });
    
    // Pool
    const pool = createSVGElement('circle', {
        cx: data.x, cy: data.y, r: 0,
        fill: '#2a0000', class: 'blood-pool'
    });
    pool.style.opacity = 0;
    
    // Main dot
    const dot = createSVGElement('circle', {
        cx: data.x, cy: data.y, r: 0,
        fill: '#8b0000'
    });
    
    // Drip droplet
    const drip = createSVGElement('circle', {
        cx: data.x, cy: data.y + 8, r: 2.5,
        fill: '#8b0000'
    });
    drip.style.opacity = 0;
    
    // Drip trail
    const trail = createSVGElement('line', {
        x1: data.x, x2: data.x,
        y1: data.y + 6, y2: data.y + 22,
        stroke: '#6e0000', 'stroke-width': '1.5',
        'stroke-linecap': 'round'
    });
    trail.style.opacity = 0;

    g.append(pool, trail, dot, drip);
    DOM.dotsLayer.appendChild(g);
    
    AppState.dotGroups.set(groupId, { g, pool, dot, drip, trail });

    // Entrance animation
    const tl = gsap.timeline();
    tl.to(pool, { attr: { r: 34 }, opacity: 0.65, duration: 0.6, ease: "power2.out" })
      .to(pool, { opacity: 0.0, duration: 1.8, ease: "power1.out" }, "+=0.1")
      .to(dot, { attr: { r: 7 }, duration: 0.7, ease: "back.out(2)" }, 0.05)
      .to(trail, { opacity: 0.55, duration: 0.35, ease: "power2.out" }, 0.15);

    // Drip loop
    const dripTween = gsap.timeline({ repeat: -1, repeatDelay: 0.25 });
    dripTween
        .set(drip, { opacity: 0, attr: { cy: data.y + 8, r: 2.6 } })
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
    
    if (tween) {
        tween.kill();
        AppState.dripTweens.delete(groupId);
    }

    gsap.timeline({
        onComplete: () => {
            g.remove();
            AppState.dotGroups.delete(groupId);
        }
    })
    .to([drip, trail], { opacity: 0, duration: 0.2 }, 0)
    .to(dot, { attr: { r: 0 }, duration: 0.25, ease: "power2.in" }, 0.05)
    .to(g, { opacity: 0, duration: 0.2 }, 0.1);
}

function setupMapTriggers() {
    const triggers = document.querySelectorAll('.incident-trigger');
    
    triggers.forEach((trigger, i) => {
        const scrollTrigger = ScrollTrigger.create({
            trigger,
            start: "top center",
            onEnter: () => {
                createDrippingDot(i);
                updateIncidentCard(i);
            },
            onEnterBack: () => {
                createDrippingDot(i);
                updateIncidentCard(i);
            },
            onLeaveBack: () => {
                removeDot(i);
                const prev = i - 1;
                if (prev >= 0) {
                    updateIncidentCard(prev);
                    if (DOM.progressLine) {
                        gsap.to(DOM.progressLine, { 
                            width: `${((prev + 1) / INCIDENTS.length) * 100}%`, 
                            duration: 0.25 
                        });
                    }
                } else {
                    if (DOM.progressLine) {
                        gsap.to(DOM.progressLine, { width: '0%', duration: 0.25 });
                    }
                    if (DOM.incidentCard) {
                        gsap.to(DOM.incidentCard, { opacity: 0, y: 10, duration: 0.25 });
                    }
                }
            }
        });
        
        AppState.scrollTriggerIds.add(scrollTrigger);
    });
}

// =============================================
// FORENSIC RAIL FUNCTIONS
// =============================================

function generateForensicRail() {
    if (!DOM.forensicRail) return;
    
    DOM.forensicRail.innerHTML = '';
    
    FORENSIC_CASES.forEach((caseData) => {
        let cardHTML = '';
        
        if (caseData.type === 'intro') {
            cardHTML = `
                <div class="rail-card flex items-center justify-center px-12 bg-zinc-950 text-white">
                    <div class="max-w-2xl text-center">
                        <span class="mono text-red-600 text-xs tracking-widest uppercase mb-4 block">Section 02 / Forensic Evidence</span>
                        <h2 class="editorial-title text-5xl mb-6">${caseData.title}</h2>
                        <p class="text-zinc-400 text-lg">${caseData.subtitle}</p>
                    </div>
                </div>
            `;
        } else if (caseData.type === 'conclusion') {
            cardHTML = `
                <div class="rail-card flex items-center justify-center p-12 bg-black text-white">
                    <div class="max-w-4xl text-center">
                        <div class="mb-8">
                            <span class="mono text-xs text-red-600">${caseData.year}</span>
                            <h3 class="editorial-title text-5xl mb-6">${caseData.title}</h3>
                            <p class="text-zinc-400 text-lg mb-8">${caseData.summary}</p>
                        </div>
                        <div class="max-w-2xl mx-auto text-left border-l-2 border-red-600 pl-6 space-y-2">
                            <p class="text-sm"><strong>Official:</strong> "${caseData.official}"</p>
                            <p class="text-sm"><strong>Evidence:</strong> ${caseData.evidence}</p>
                            <div class="pt-4 space-y-1">
                                ${caseData.sources.map(s => `<a href="${s.url}" class="text-xs mono text-red-400 block hover:underline" target="_blank" rel="noopener">${s.text}</a>`).join('')}
                            </div>
                        </div>
                        <p class="text-center text-zinc-500 mt-12 italic">${caseData.conclusion}</p>
                    </div>
                </div>
            `;
        } else {
            const beforeSrc = caseData.before || `images/forensic/${caseData.id}-before.jpg`;
            const afterSrc = caseData.after || `images/forensic/${caseData.id}-after.jpg`;

            cardHTML = `
                <div class="rail-card flex items-center justify-center p-12 ${caseData.bgColor}">
                    <div class="max-w-6xl w-full">
                        <div class="mb-8">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="mono text-xs text-red-600">${caseData.year}</span>
                                <span class="text-4xl font-black text-red-600">${caseData.casualties}+</span>
                                <span class="mono text-xs text-zinc-400 uppercase">casualties</span>
                            </div>
                            <h3 class="text-3xl font-bold mb-4">${caseData.title}</h3>
                            <p class="text-zinc-600 mb-4">${caseData.summary}</p>
                        </div>
                        
                        <!-- IMAGE COMPARISON SECTION -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <!-- BEFORE IMAGE -->
                            <figure class="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 aspect-video group">
                                <div class="relative w-full h-full overflow-hidden">
                                    <img src="${beforeSrc}" 
                                        alt="${caseData.beforeCaption}" 
                                        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-100"
                                        loading="lazy"
                                        style="brightness: 0.95;"
                                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <figcaption class="absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.22em] bg-black/80 text-white px-3 py-1.5 rounded transition-all duration-300 group-hover:bg-black group-hover:px-4 z-10">
                                    ${caseData.beforeCaption}
                                </figcaption>
                                <div class="absolute bottom-3 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                    Hover to zoom • Click for full size
                                </div>
                            </figure>
                            
                            <!-- AFTER IMAGE -->
                            <figure class="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 aspect-video group">
                                <div class="relative w-full h-full overflow-hidden">
                                    <img src="${afterSrc}" 
                                        alt="${caseData.afterCaption}" 
                                        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                        loading="lazy"
                                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                                    <div class="absolute inset-0 bg-red-900/20 group-hover:bg-red-900/10 transition-all duration-500"></div>
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <figcaption class="absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.22em] bg-red-900/80 text-white px-3 py-1.5 rounded transition-all duration-300 group-hover:bg-red-900 group-hover:px-4 z-10">
                                    ${caseData.afterCaption}
                                </figcaption>
                                <div class="absolute bottom-3 left-3 right-3 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                                    Hover to zoom • ${caseData.casualties}+ casualties
                                </div>
                            </figure>
                        </div>
                        
                        <!-- IMAGE EXPLANATION SECTION -->
                        <div class="mt-8 p-6 bg-zinc-50 border border-zinc-200 rounded-lg">
                            <h4 class="mono text-xs uppercase tracking-wider text-zinc-600 mb-3">Visual Evidence Analysis</h4>
                            <p class="text-sm text-zinc-700 leading-relaxed">
                                ${caseData.imageAnalysis}
                            </p>
                            <div class="mt-4 pt-4 border-t border-zinc-300">
                                <p class="text-xs text-zinc-500">
                                    <strong>Image Credits:</strong> ${caseData.imageCredits}
                                </p>
                            </div>
                        </div>
                        
                        <!-- EVIDENCE SECTION -->
                        <div class="border-l-2 border-zinc-900 pl-6 space-y-2 mt-8">
                            <p class="text-sm"><strong>Official Narrative:</strong> "${caseData.official}"</p>
                            <p class="text-sm"><strong>Documented Evidence:</strong> ${caseData.evidence}</p>
                            <div class="pt-4 space-y-1">
                                ${caseData.sources.map(s => `<a href="${s.url}" class="text-xs mono text-blue-600 block hover:underline" target="_blank" rel="noopener">${s.text}</a>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        DOM.forensicRail.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function setupRailScroll() {
    if (!DOM.forensicRail) return;
    
    const existing = ScrollTrigger.getById("forensic-rail");
    if (existing) existing.kill(true);

    gsap.killTweensOf(DOM.forensicRail);
    gsap.set(DOM.forensicRail, { x: 0 });

    const scrollDistance = Math.max(0, DOM.forensicRail.scrollWidth - window.innerWidth);

    gsap.to(DOM.forensicRail, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
            id: "forensic-rail",
            trigger: "#forensic-rail-section",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            end: () => `+=${scrollDistance}`
        }
    });
}

// =============================================
// SYSTEM PATTERNS FUNCTIONS
// =============================================

function generatePatternTexts() {
    if (!DOM.patternTextsContainer) return;
    
    DOM.patternTextsContainer.innerHTML = SYSTEM_PATTERNS.map((pattern, index) => {
        const implicationHTML = pattern.implication ? `
            <div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-4">Implication</div>
            <div class="text-sm text-zinc-600 mt-1">${pattern.implication}</div>
        ` : '';

        return `
            <div class="pattern-text" data-pattern-index="${index}">
                <span class="mono text-red-600 text-xs tracking-widest uppercase mb-4 block">Pattern 0${index + 1}</span>
                <h2 class="text-4xl font-bold mb-4">${pattern.title}</h2>
                <p class="text-lg text-zinc-600 leading-relaxed">${pattern.finding}</p>
                <div class="mt-6 border-l-2 border-red-600 pl-5">
                    <div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Question</div>
                    <div class="text-sm text-zinc-700 mt-1">${pattern.question}</div>
                    ${implicationHTML}
                </div>
            </div>
        `;
    }).join('');
}

// SVG Chart Creation Functions

function createSVGContainer(container) {
    if (!container) return null;
    container.innerHTML = '';
    
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    
    const svg = createSVGElement('svg', {
        viewBox: `0 0 ${width} ${height}`,
        preserveAspectRatio: 'xMidYMid meet'
    });
    
    container.appendChild(svg);
    return { svg, width, height };
}

function addChartTitle(svg, width, text) {
    const title = createSVGElement('text', {
        x: width / 2, y: 26,
        'text-anchor': 'middle',
        class: 'mono'
    });
    title.style.cssText = 'font-size: 10px; fill: #71717a; text-transform: uppercase; letter-spacing: 0.12em;';
    title.textContent = text;
    svg.appendChild(title);
}

function createBarChart() {
    const container = DOM.svgBarChart;
    if (!container) return;
    
    const result = createSVGContainer(container);
    if (!result) return;
    
    const { svg, width, height } = result;
    const p = getPattern('reprisal');
    const margin = { top: 52, right: 30, bottom: 32, left: 140 };
    
    addChartTitle(svg, width, p.question);
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const maxValue = Math.max(...p.data.map(d => d.value));
    
    const g = createSVGElement('g', {
        transform: `translate(${margin.left},${margin.top})`
    });
    svg.appendChild(g);
    
    const bandHeight = innerHeight / p.data.length;
    const padding = bandHeight * 0.28;
    const barHeight = bandHeight - padding;
    
    p.data.forEach((d, i) => {
        const barWidth = (d.value / maxValue) * innerWidth;
        const yPos = i * bandHeight + padding / 2;
        const redIntensity = Math.floor(225 - (d.severity * 15));
        
        // Bar
        const bar = createSVGElement('rect', {
            x: 0, y: yPos,
            width: 0, height: barHeight,
            fill: `rgb(${redIntensity}, 0, 0)`
        });
        g.appendChild(bar);
        
        // Label
        const label = createSVGElement('text', {
            x: -12, y: yPos + barHeight / 2,
            'text-anchor': 'end'
        });
        label.style.cssText = 'font-size: 11px; fill: #3f3f46; dominant-baseline: middle;';
        label.textContent = d.label;
        g.appendChild(label);
        
        // Value
        const value = createSVGElement('text', {
            x: barWidth + 10, y: yPos + barHeight / 2
        });
        value.style.cssText = 'font-size: 12px; font-weight: 800; fill: #8b0000; dominant-baseline: middle;';
        value.textContent = `${d.value}+`;
        g.appendChild(value);
        
        // Animate
        setTimeout(() => {
            bar.setAttribute('width', barWidth);
        }, 110 * i);
    });
}

function createTimeline() {
    const container = DOM.svgTimeline;
    if (!container) return;
    
    const result = createSVGContainer(container);
    if (!result) return;
    
    const { svg, width, height } = result;
    const p = getPattern('phases');
    const margin = { top: 52, right: 24, bottom: 22, left: 24 };
    
    addChartTitle(svg, width, p.question);
    
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const g = createSVGElement('g', {
        transform: `translate(${margin.left},${margin.top})`
    });
    svg.appendChild(g);
    
    const bandHeight = innerHeight / p.phases.length;
    const colors = ["#7f1d1d", "#b91c1c", "#dc2626"];
    
    p.phases.forEach((phase, i) => {
        const yPos = i * bandHeight;
        const barW = Math.max(12, (phase.bandWidth / 100) * innerWidth);
        
        const bar = createSVGElement('rect', {
            x: 0, y: yPos + 10,
            width: 0, height: bandHeight - 20,
            rx: 6,
            fill: colors[i % colors.length]
        });
        bar.style.opacity = 0.9;
        g.appendChild(bar);
        
        // Label
        const label = createSVGElement('text', {
            x: 14, y: yPos + bandHeight / 2 - 10
        });
        label.style.cssText = 'font-size: 12px; font-weight: 800; fill: #fff;';
        label.textContent = phase.label;
        g.appendChild(label);
        
        // Period
        const period = createSVGElement('text', {
            x: 14, y: yPos + bandHeight / 2 + 8
        });
        period.style.cssText = 'font-size: 10px; fill: #fecaca;';
        period.textContent = `${phase.period} • ${phase.geographic}`;
        g.appendChild(period);
        
        // Description
        const desc = createSVGElement('text', {
            x: innerWidth - 8, y: yPos + bandHeight / 2,
            'text-anchor': 'end'
        });
        desc.style.cssText = 'font-size: 10px; fill: #52525b; dominant-baseline: middle;';
        desc.textContent = phase.description;
        g.appendChild(desc);
        
        setTimeout(() => {
            bar.setAttribute('width', barW);
        }, 160 * i);
    });
}

function createDonutChart() {
    const container = DOM.svgDonut;
    if (!container) return;
    
    const result = createSVGContainer(container);
    if (!result) return;
    
    const { svg, width, height } = result;
    const p = getPattern('modality');
    const radius = Math.min(width, height) / 2 - 64;
    
    addChartTitle(svg, width, p.question);
    
    const g = createSVGElement('g', {
        transform: `translate(${width / 2},${height / 2})`
    });
    svg.appendChild(g);
    
    const total = p.stacks.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = -Math.PI / 2;
    
    p.stacks.forEach((d, i) => {
        const sliceAngle = (d.value / total) * 2 * Math.PI;
        const endAngle = currentAngle + sliceAngle;
        const midAngle = currentAngle + sliceAngle / 2;
        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
        
        const innerRadius = radius * 0.55;
        
        const x1 = Math.cos(currentAngle) * radius;
        const y1 = Math.sin(currentAngle) * radius;
        const x2 = Math.cos(endAngle) * radius;
        const y2 = Math.sin(endAngle) * radius;
        const x3 = Math.cos(endAngle) * innerRadius;
        const y3 = Math.sin(endAngle) * innerRadius;
        const x4 = Math.cos(currentAngle) * innerRadius;
        const y4 = Math.sin(currentAngle) * innerRadius;
        
        const pathData = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
        
        const path = createSVGElement('path', {
            d: pathData,
            fill: d.color,
            stroke: '#fff',
            'stroke-width': 2
        });
        path.style.opacity = 0;
        g.appendChild(path);
        
        // Label
        const labelX = Math.cos(midAngle) * (radius * 0.78);
        const labelY = Math.sin(midAngle) * (radius * 0.78);
        const text = createSVGElement('text', {
            x: labelX, y: labelY,
            'text-anchor': 'middle'
        });
        text.style.cssText = 'font-size: 10px; fill: #fff; font-weight: 800; dominant-baseline: middle;';
        text.textContent = d.value;
        g.appendChild(text);
        
        setTimeout(() => {
            path.style.opacity = 1;
        }, 200 * i);
        
        currentAngle = endAngle;
    });
    
    // Center text
    const totalText = createSVGElement('text', {
        'text-anchor': 'middle'
    });
    totalText.style.cssText = 'font-size: 24px; font-weight: 900; fill: #8b0000; dominant-baseline: middle;';
    totalText.textContent = total.toLocaleString();
    g.appendChild(totalText);
    
    const totalLabel = createSVGElement('text', {
        y: 22, 'text-anchor': 'middle'
    });
    totalLabel.style.cssText = 'font-size: 10px; fill: #71717a;';
    totalLabel.textContent = 'Total deaths';
    g.appendChild(totalLabel);
    
    // Legend
    const legend = createSVGElement('g', {
        transform: `translate(${20},${height - 44})`
    });
    svg.appendChild(legend);
    
    p.stacks.forEach((d, i) => {
        const item = createSVGElement('g', {
            transform: `translate(${i * 160},0)`
        });
        legend.appendChild(item);
        
        const rect = createSVGElement('rect', {
            width: 10, height: 10,
            fill: d.color
        });
        item.appendChild(rect);
        
        const text = createSVGElement('text', {
            x: 14, y: 9
        });
        text.style.cssText = 'font-size: 9px; fill: #52525b;';
        text.textContent = d.label;
        item.appendChild(text);
    });
}

function createWordViz() {
    const container = DOM.svgWord;
    if (!container) return;
    
    const result = createSVGContainer(container);
    if (!result) return;
    
    const { svg, width, height } = result;
    const p = getPattern('targeting');
    
    addChartTitle(svg, width, p.question);
    
    const colorMap = {
        "ethnic": "#7f1d1d",
        "demographic": "#b91c1c",
        "legal-status": "#dc2626",
        "political": "#f97316",
        "activity": "#a1a1aa"
    };
    
    const terms = p.terms.slice().sort((a, b) => b.weight - a.weight);
    const centerX = width / 2;
    const centerY = height / 2 + 10;
    
    const minWeight = Math.min(...terms.map(d => d.weight));
    const maxWeight = Math.max(...terms.map(d => d.weight));
    const fontScale = (weight) => 14 + ((weight - minWeight) / (maxWeight - minWeight)) * 28;
    
    const positions = [
        { x: 0, y: -70 },
        { x: -120, y: -10 },
        { x: 120, y: -10 },
        { x: -90, y: 70 },
        { x: 90, y: 70 },
        { x: 0, y: 120 }
    ];
    
    const g = createSVGElement('g', {
        transform: `translate(${centerX},${centerY})`
    });
    svg.appendChild(g);
    
    terms.forEach((term, i) => {
        const pos = positions[i] || { x: (i % 2 ? -140 : 140), y: 0 };
        
        const text = createSVGElement('text', {
            x: pos.x, y: pos.y,
            'text-anchor': 'middle'
        });
        text.style.cssText = `font-size: ${fontScale(term.weight)}px; font-weight: 900; fill: ${colorMap[term.category] || '#a1a1aa'}; opacity: 0;`;
        text.textContent = term.text;
        g.appendChild(text);
        
        setTimeout(() => {
            text.style.opacity = 1;
        }, 120 * i);
    });
    
    // Legend
    const legend = createSVGElement('g', {
        transform: `translate(${22},${height - 44})`
    });
    svg.appendChild(legend);
    
    const categories = Array.from(new Set(terms.map(d => d.category)));
    categories.forEach((cat, i) => {
        const item = createSVGElement('g', {
            transform: `translate(${i * 120},0)`
        });
        legend.appendChild(item);
        
        const circle = createSVGElement('circle', {
            r: 5, cx: 5, cy: 5,
            fill: colorMap[cat]
        });
        item.appendChild(circle);
        
        const text = createSVGElement('text', {
            x: 14, y: 9
        });
        text.style.cssText = 'font-size: 9px; fill: #52525b;';
        text.textContent = cat;
        item.appendChild(text);
    });
}

function createPhraseMatrix() {
    const container = DOM.svgPhrases;
    if (!container) return;
    
    const result = createSVGContainer(container);
    if (!result) return;
    
    const { svg, width, height } = result;
    const p = getPattern('denial');
    
    addChartTitle(svg, width, p.question);
    
    const phrases = p.phrases.slice().sort((a, b) => b.frequency - a.frequency);
    
    const catColor = {
        "tactical": "#7f1d1d",
        "legal": "#f97316",
        "denial": "#111827"
    };
    
    // Calculate optimal layout
    const cols = 2;
    const rows = Math.ceil(phrases.length / cols);
    const padding = 20;
    const horizontalPadding = 40;
    const verticalPadding = 60;
    
    const availableWidth = width - horizontalPadding * 2;
    const availableHeight = height - verticalPadding;
    
    const cardW = availableWidth / cols - padding;
    const cardH = availableHeight / rows - padding;
    
    const startX = horizontalPadding;
    const startY = verticalPadding;
    
    // Ensure cards don't get too small
    const minCardHeight = 70;
    const actualCardH = Math.max(cardH, minCardHeight);
    
    phrases.forEach((phrase, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * (cardW + padding);
        const y = startY + row * (actualCardH + padding);
        
        // Card background - fill available space
        const cardBg = createSVGElement('rect', {
            x, y,
            width: cardW, 
            height: actualCardH,
            rx: 10,
            fill: '#fff',
            stroke: '#e4e4e7',
            'stroke-width': 1.5
        });
        cardBg.style.opacity = 0;
        svg.appendChild(cardBg);
        
        // Category indicator
        const catRect = createSVGElement('rect', {
            x: x + 16, 
            y: y + 16,
            width: 10, 
            height: 10,
            rx: 2,
            fill: catColor[phrase.category]
        });
        catRect.style.opacity = 0;
        svg.appendChild(catRect);
        
        // Phrase text - dynamic font size
        const phraseText = createSVGElement('text', {
            x: x + 34, 
            y: y + 26
        });
        const phraseFontSize = Math.min(14, cardW / 15);
        phraseText.style.cssText = `font-size: ${phraseFontSize}px; font-weight: 800; fill: #111827; opacity: 0; font-family: 'Inter', sans-serif;`;
        phraseText.textContent = phrase.text;
        svg.appendChild(phraseText);
        
        // Frequency text - dynamic font size
        const freqText = createSVGElement('text', {
            x: x + 34, 
            y: y + 46
        });
        const freqFontSize = Math.min(12, cardW / 18);
        freqText.style.cssText = `font-size: ${freqFontSize}px; fill: #71717a; font-family: 'JetBrains Mono', monospace; opacity: 0;`;
        freqText.textContent = `Frequency: ${phrase.frequency}`;
        svg.appendChild(freqText);
        
        // Animate entrance
        setTimeout(() => {
            cardBg.style.opacity = 1;
            catRect.style.opacity = 1;
            phraseText.style.opacity = 1;
            freqText.style.opacity = 1;
        }, 120 * i);
    });
    
    // Add legend at the bottom if space permits
    if (height > 500) {
        const legendY = height - 40;
        const legend = createSVGElement('g', {
            transform: `translate(${width / 2 - 100},${legendY})`
        });
        svg.appendChild(legend);
        
        Object.entries(catColor).forEach(([category, color], i) => {
            const item = createSVGElement('g', {
                transform: `translate(${i * 120},0)`
            });
            legend.appendChild(item);
            
            const rect = createSVGElement('rect', {
                width: 12, 
                height: 12,
                rx: 2,
                fill: color
            });
            item.appendChild(rect);
            
            const text = createSVGElement('text', {
                x: 18, 
                y: 11
            });
            text.style.cssText = 'font-size: 12px; fill: #333; font-family: "Inter", sans-serif;';
            text.textContent = category;
            item.appendChild(text);
        });
    }
}

function initSVGCharts() {
    createBarChart();
    createTimeline();
    createDonutChart();
    createWordViz();
    createPhraseMatrix();
}

// Pattern Scroll Triggers

function setupPatternScrollTriggers() {
    const patternTexts = Array.from(document.querySelectorAll('.pattern-text'));
    
    const hideAllPatternViz = (immediate = false) => {
        DOM.patternVizs.forEach(v => {
            v.classList.add('opacity-0');
            if (immediate) gsap.set(v, { opacity: 0, scale: 1 });
        });
    };
    
    const showPatternViz = (i, direction = 1) => {
        if (!DOM.patternVizs[i]) return;
        
        DOM.patternVizs.forEach((v, idx) => {
            if (idx !== i) {
                v.classList.add('opacity-0');
                gsap.set(v, { opacity: 0, scale: 1 });
            }
        });
        
        const v = DOM.patternVizs[i];
        v.classList.remove('opacity-0');
        
        // Render correct chart
        if (i === 0) createBarChart();
        if (i === 1) createTimeline();
        if (i === 2) createDonutChart();
        if (i === 3) createWordViz();
        if (i === 4) createPhraseMatrix();
        
        const fromScale = direction === -1 ? 1.05 : 0.95;
        gsap.fromTo(v,
            { opacity: 0, scale: fromScale },
            { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
        );
    };
    
    // Start hidden
    hideAllPatternViz(true);
    
    // Set up triggers
    patternTexts.forEach((textEl) => {
        const i = Number(textEl.getAttribute('data-pattern-index') || 0);
        
        const scrollTrigger = ScrollTrigger.create({
            trigger: textEl,
            start: 'top center',
            end: 'bottom center',
            onEnter: (self) => showPatternViz(i, self.direction),
            onEnterBack: (self) => showPatternViz(i, self.direction),
            onLeave: () => hideAllPatternViz(),
            onLeaveBack: () => hideAllPatternViz()
        });
        
        AppState.scrollTriggerIds.add(scrollTrigger);
    });
    
    // Hide all when leaving section
    const sectionTrigger = ScrollTrigger.create({
        trigger: '#system-patterns',
        start: 'top top+=52',
        end: 'bottom top+=52',
        onLeave: () => hideAllPatternViz(),
        onLeaveBack: () => hideAllPatternViz()
    });
    
    AppState.scrollTriggerIds.add(sectionTrigger);
}

// =============================================
// SHARE FUNCTIONALITY
// =============================================

function setupShareButtons() {
    // Twitter
    const twitterBtn = document.getElementById('share-twitter');
    if (twitterBtn) {
        twitterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(SHARE_DATA.url)}&text=${encodeURIComponent(SHARE_DATA.text)}`;
            window.open(url, '_blank', 'width=550,height=420');
        });
    }
    
    // Facebook
    const facebookBtn = document.getElementById('share-facebook');
    if (facebookBtn) {
        facebookBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_DATA.url)}`;
            window.open(url, '_blank', 'width=550,height=420');
        });
    }
    
    // LinkedIn
    const linkedinBtn = document.getElementById('share-linkedin');
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_DATA.url)}`;
            window.open(url, '_blank', 'width=550,height=420');
        });
    }
    
    // Copy Link
    const linkBtn = document.getElementById('share-link');
    if (linkBtn) {
        linkBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await navigator.clipboard.writeText(SHARE_DATA.url);
                const btn = e.currentTarget;
                const originalOpacity = btn.style.opacity;
                btn.style.opacity = '1';
                btn.style.transform = 'scale(1.1)';
                
                const tooltip = document.createElement('div');
                tooltip.textContent = 'Link copied!';
                tooltip.className = 'absolute top-full mt-2 right-0 bg-white text-black text-xs px-3 py-1 rounded shadow-lg mono';
                btn.parentElement.appendChild(tooltip);
                
                setTimeout(() => {
                    btn.style.opacity = originalOpacity;
                    btn.style.transform = 'scale(1)';
                    tooltip.remove();
                }, 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
                alert('Failed to copy link. Please copy manually: ' + SHARE_DATA.url);
            }
        });
    }
    
    // Footer share buttons (if they exist)
    const footerShareText = encodeURIComponent(SHARE_DATA.text);
    const footerShareUrl = encodeURIComponent(SHARE_DATA.url);
    
    document.getElementById('footer-share-twitter')?.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?text=${footerShareText}&url=${footerShareUrl}`, '_blank', 'noopener,noreferrer');
    });
    
    document.getElementById('footer-share-whatsapp')?.addEventListener('click', () => {
        window.open(`https://wa.me/?text=${footerShareText}%20${footerShareUrl}`, '_blank', 'noopener,noreferrer');
    });
    
    document.getElementById('footer-share-facebook')?.addEventListener('click', () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${footerShareUrl}`, '_blank', 'noopener,noreferrer');
    });
    
    document.getElementById('footer-share-linkedin')?.addEventListener('click', () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${footerShareUrl}`, '_blank', 'noopener,noreferrer');
    });
    
    // Set footer year
    if (DOM.footerYear) {
        DOM.footerYear.textContent = new Date().getFullYear();
    }
}

// =============================================
// GSAP ANIMATIONS
// =============================================

function setupTitleAnimation() {
    if (!DOM.titleContent) return;
    
    ScrollTrigger.create({
        trigger: "#title-block",
        start: "center center",
        end: "bottom top",
        scrub: true,
        animation: gsap.to("#title-content", {
            opacity: 0,
            y: -60
        })
    });
}

function setupIntroBoxAnimations() {
    gsap.utils.toArray('.intro-box').forEach((box) => {
        gsap.to(box, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
                trigger: box,
                start: "top 65%",
                end: "bottom 35%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// =============================================
// INITIALIZATION
// =============================================

function initMap() {
    // Initialize map triggers for incident markers
    if (DOM.dotsLayer && INCIDENTS.length > 0) {
        setupMapTriggers();
    }
}

function cleanup() {
    // Kill all scroll triggers
    AppState.scrollTriggerIds.forEach(id => {
        const trigger = ScrollTrigger.getById(id);
        if (trigger) trigger.kill();
    });
    AppState.scrollTriggerIds.clear();
    
    // Kill all tweens
    AppState.dripTweens.forEach(tween => tween.kill());
    AppState.dripTweens.clear();
    
    AppState.dotGroups.clear();
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
}

function init() {
    if (AppState.isInitialized) {
        cleanup();
    }
    
    // Initialize components
    safeExecute(() => {
        generatePatternTexts();
        generateForensicRail();
        setupRailScroll();
        setupPatternScrollTriggers();
        initMap();
        initSVGCharts();
        setupShareButtons();
        setupTitleAnimation();
        setupIntroBoxAnimations();
    }, 'Initialization');
    
    AppState.isInitialized = true;
}

// =============================================
// EVENT LISTENERS
// =============================================

// Debounced resize handler
const handleResize = debounce(() => {
    safeExecute(() => {
        setupRailScroll();
        ScrollTrigger.refresh();
        initSVGCharts();
    }, 'Resize');
}, 150);

window.addEventListener('resize', handleResize);

// DOM Content Loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// =============================================
// EXPORT FOR EXTERNAL USE (OPTIONAL)
// =============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, cleanup };
}
