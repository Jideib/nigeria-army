// =============================================
// REGISTER GSAP PLUGINS
// =============================================
gsap.registerPlugin(ScrollTrigger);

// =============================================
// INTRO STEPS DATA (LEDE)
// =============================================
const introSteps = [
    {
        id: "intro-1",
        text: "On December 8, 2025, nine women were killed during a protest in Lamurde, followed by a swift military denial that blamed local militias—a claim the survivors vehemently reject.",
        type: "intro-box"
    },
    {
        id: "intro-2",
        text: "This tragedy is not an isolated event, but the latest entry in a twenty-five-year ledger of scorched-earth operations and shattered communities that spans the Nigerian landscape.",
        type: "intro-box"
    },
    {
        id: "intro-3",
        text: "While the country celebrates a quarter-century of stable democracy, from the 1999 ruins of Odi to the streets of Lamurde today, these killings remain meticulously documented, consistently denied, and left derelict by a justice system that refuses to act. Across five presidential administrations, the evidence has never been stronger; the accountability has never been weaker and the promise of democratic dividend never arrived for the families left behind.",
        type: "intro-box"
    }
];

// =============================================
// INCIDENT CASES DATA (MAP)
// =============================================
const incidents = [
        { id: "odi-1999", year: 1999, location: "Odi, Bayelsa", title: "Odi Massacre", casualties: "900+", coords: [6.2717, 4.7969], desc: "A full-scale military reprisal flattened the riverside community." },
        { id: "zaki-biam-2001", year: 2001, location: "Zaki-Biam, Benue", title: "Zaki-Biam Killings", casualties: "200+", coords: [7.5167, 9.6167], desc: "Villagers assembled for a 'peace meeting' were executed." },
        { id: "gbeji-2001", year: 2001, location: "Gbeji, Benue", title: "Gbeji Massacre", casualties: "160", coords: [7.4500, 9.6333], desc: "One of multiple Tiv villages raided." },
        { id: "vaase-2001", year: 2001, location: "Vaase, Benue", title: "Vaase Attack", casualties: "160", coords: [7.3333, 9.5667], desc: "Village invaded, homes burned in reprisal operation." },
        { id: "jos-2008", year: 2008, location: "Jos, Plateau", title: "Jos Crises", casualties: "47", coords: [9.8965, 8.8583], desc: "Young unarmed Muslim men killed during unrest." },
        { id: "baga-2013", year: 2013, location: "Baga, Borno", title: "Baga Destruction", casualties: "185+", coords: [13.1200, 13.8500], desc: "Mass destruction after Boko Haram attack, reprisal 'mop-up'." },
        { id: "bama-2013", year: 2013, location: "Bama, Borno", title: "Bama Executions", casualties: "35", coords: [11.8704, 13.6900], desc: "Mass shooting of detainees after screening for Boko Haram links." },
        { id: "zaria-shia-2014", year: 2014, location: "Zaria, Kaduna", title: "Zaria Shia Killings", casualties: "33", coords: [11.0667, 7.7000], desc: "IMN protesters shot; detainees killed during protest suppression." },
        { id: "nkpor-2016", year: 2016, location: "Nkpor, Anambra", title: "Nkpor Massacre", casualties: "150+", coords: [6.1500, 6.8000], desc: "Pro-Biafran commemoration massacre, security forces opened fire." },
        { id: "okporo-2021", year: 2021, location: "Okporo, Imo", title: "Okporo Raid", casualties: "5", coords: [5.7860, 7.0288], desc: "Military raid in ESN zone targeting IPOB/ESN." },
        { id: "izombe-2021", year: 2021, location: "Izombe, Imo", title: "Izombe Reprisal", casualties: "3", coords: [5.6950, 6.9660], desc: "Reprisal after soldiers killed; 50+ houses burned." },
        { id: "amangwu-2022", year: 2022, location: "Amangwu, Abia", title: "Amangwu Attack", casualties: "10", coords: [5.6125, 7.8200], desc: "Homes razed; missing soldier trigger for military operation." },
        { id: "lamurde-2025", year: 2025, location: "Lamurde, Adamawa", title: "Lamurde Killings", casualties: "9", coords: [9.2833, 11.4833], desc: "Nine women shot during protest. Military denies responsibility." }
        ].map(inc => {
            const p = project(inc.coords[1], inc.coords[0]);
            return { ...inc, x: p.x, y: p.y };
        });


// =============================================
// FORENSIC RAIL DATA
// =============================================
const forensicRailCases = [
    {
        id: "intro",
        type: "intro",
        title: "The Pattern of Violence",
        subtitle: "Satellite imagery, witness testimonies from media and human right report, and judicial findings reveal a systematic approach to violence and denial."
    },
    {
    id: "odi-1999",
    type: "case",
    year: 1999,
    title: "Odi — Bayelsa (1999)",
    location: "Odi, Bayelsa State",
    casualties: 900,
    before: "/images/forensic/odi-before.jpg",
    after: "/images/forensic/odi-after.jpg",
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
    before: "/images/forensic/zakibiam-before.jpg",
    after: "/images/forensic/zakibiam-after.jpg",
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
    before: "/images/forensic/baga-before.png",
    after: "/images/forensic/baga-after.png",
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
    before: "/images/facts/giwa-before.jpg",
    after: "/images/facts/giwa-after.jpg",
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
    before: "/images/forensic/bama-before.png",
    after: "/images/forensic/bama-after.png",
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
    id: "zaria-imn-2015",
    type: "case",
    year: 2015,
    title: "Zaria IMN — Kaduna (2015)",
    location: "Zaria, Kaduna State",
    casualties: 300,
    before: "/images/facts/zaria-before.png",
    after: "/images/facts/zaria-after.png",
    summary: "300+ killed despite official claim of 7 fatalities. Mass graves discovered and verified. Systematic denial despite judicial findings.",
    official: "Protesters resisted arrest. Only 7 fatalities claimed. Operation described as 'law enforcement'.",
    evidence: "Judicial inquiry documented 300+ killed. Mass graves discovered and verified. Satellite analysis shows trench burials. Hospital records show overwhelming casualties.",
    sources: [
        { text: "Kaduna State Judicial Commission of Inquiry Report", url: "https://kadunastate.gov.ng/wp-content/uploads/2016/08/Report-of-the-Judicial-Commission-of-Inquiry-into-the-Zaria-Clashes.pdf" },
        { text: "Amnesty International satellite evidence", url: "https://www.amnesty.org/en/latest/news/2016/03/nigeria-zaria-massacre-one-year-on-no-justice-for-shia-mass-killings/" },
        { text: "Human Rights Watch documentation", url: "https://www.hrw.org/news/2016/03/15/nigeria-massacre-justice-shia-muslims" },
        { text: "Al Jazeera investigation", url: "https://www.aljazeera.com/news/2016/3/15/nigeria-inquiry-confirms-zaria-mass-killings-by-army" }
    ],
    bgColor: "bg-zinc-50"
},
{
    id: "izombe-2021",
    type: "case",
    year: 2021,
    title: "Izombe — Imo (2021)",
    location: "Izombe, Oguta LGA, Imo State",
    casualties: 10,
    before: "/images/forensic/izombe-before.jpg",
    after: "/images/forensic/izombe-after.jpg",
    summary: "50+ houses systematically burned. 10 civilians killed. Classic reprisal operation pattern repeating 1999 Odi model.",
    official: "Lawful security response. Targeted militants only. Minimal property damage claimed.",
    evidence: "50+ houses systematically burned. Residents killed during home invasions. Clear scorch grid visible in satellite imagery. Pattern matches previous reprisal operations.",
    sources: [
        { text: "Satellite imagery analysis by SBM Intelligence", url: "https://www.sbmintel.com/2021/06/satellite-imagery-shows-extensive-damage-in-izombe-imo-state-after-military-raid/" },
        { text: "Premium Times investigation", url: "https://www.premiumtimesng.com/news/headlines/464055-investigation-how-military-burned-50-houses-killed-10-in-imo-community.html" },
        { text: "The Cable report", url: "https://www.thecable.ng/security-forces-razed-our-homes-south-east-communities-allege" },
        { text: "International Crisis Group analysis", url: "https://www.crisisgroup.org/africa/west-africa/nigeria/stopping-nigerias-spiralling-farmer-herder-violence" }
    ],
    bgColor: "bg-white"
},
{
    id: "amangwu-2022",
    type: "case",
    year: 2022,
    title: "Amangwu — Ohafia (2022)",
    location: "Amangwu, Ohafia LGA, Abia State",
    casualties: "Multiple",
    before: "/images/forensic/amangwu-before.jpg",
    after: "/images/forensic/amangwu-after.jpg",
    summary: "Homes razed across community. Civilians killed during operation. Modern denial playbook despite satellite evidence.",
    official: "Search-and-rescue mission for missing officer. No invasion occurred. Denied property destruction.",
    evidence: "Homes razed across community. Civilians killed during operation. Satellite scorch patterns contradict denial. Residents displaced without compensation.",
    sources: [
        { text: "Satellite imagery analysis by Agence France-Presse", url: "https://factcheck.afp.com/http%253A%252F%252Fdoc.afp.com%252F9FE9BS-1" },
        { text: "Human Rights Watch documentation", url: "https://www.hrw.org/news/2022/07/27/nigerian-security-forces-allegedly-burned-homes-southeastern-community" },
        { text: "The Guardian Nigeria investigation", url: "https://guardian.ng/news/soldiers-raze-14-houses-kill-two-in-abia-community/" },
        { text: "BBC Pidgin coverage", url: "https://www.bbc.com/pidgin/articles/cp82pz2p7pjo" }
    ],
    bgColor: "bg-zinc-50"
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

// =============================================
// SYSTEM PATTERNS DATA (FULL 5-PATTERN STRUCTURE)
// =============================================
const systemPatterns = [
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

// =============================================
// D3 MAP & PROJECTION
// =============================================
let projection;

function project(lat, lon) {
    const coords = projection([lon, lat]);
    return { x: coords[0], y: coords[1] };
}

function initMap() {
    const container = document.getElementById('d3-map');
    const width = container.clientWidth || 1000;
    const height = 812;

    // Create SVG
    const svg = d3.select('#d3-map')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

    // Nigeria bounds for projection
    projection = d3.geoMercator()
        .center([8, 9.5])
        .scale(3000)
        .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Create dots layer
    svg.append('g').attr('id', 'dots-layer');

    // Try to load GeoJSON file
    d3.json('images/nigeria.geojson').then(function(geojson) {
        svg.append('g')
            .selectAll('path')
            .data(geojson.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', '#1a1a1a')
            .attr('stroke', '#333')
            .attr('stroke-width', 0.5);

        // Recalculate incident positions with proper projection
        incidents.forEach((inc, i) => {
            const p = project(inc.coords[0], inc.coords[1]);
            inc.x = p.x;
            inc.y = p.y;
        });
    }).catch(function(error) {
        console.log('GeoJSON not loaded, using projection calculation');
    });
}

// =============================================
// INCIDENT CARD & BLOOD ANIMATION
// =============================================
const dotsLayer = document.querySelector('#dots-layer');
const incidentCard = document.querySelector('.incident-card');
const progressLine = document.querySelector('#global-progress');

const dotGroups = new Map();
const dripTweens = new Map();

function setCard(index) {
    const data = incidents[index];
    if (!data) {
        gsap.to(incidentCard, { opacity: 0, y: 10, duration: 0.25 });
        return;
    }

    const meta = `Incident ${String(index + 1).padStart(2, '0')} | ${data.location} | ${data.year}`;
    document.getElementById('inc-meta').innerText = meta;
    document.getElementById('inc-title').innerText = data.title;
    document.getElementById('inc-desc').innerText = data.desc;
    document.getElementById('inc-casualties').innerText = data.casualties;
    document.getElementById('inc-loc-year').innerText = `${data.location} | ${data.year}`;

    gsap.to(incidentCard, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
    gsap.to(progressLine, { width: `${((index + 1) / incidents.length) * 100}%`, duration: 0.35, ease: "power2.out" });
}

function createDrippingDot(index) {
    const data = incidents[index];
    const groupId = `dot-group-${index}`;
    if (dotGroups.has(groupId)) return;

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("id", groupId);

    // Pool
    const pool = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pool.setAttribute("cx", data.x);
    pool.setAttribute("cy", data.y);
    pool.setAttribute("r", "0");
    pool.setAttribute("fill", "#2a0000");
    pool.setAttribute("class", "blood-pool");
    pool.style.opacity = 0;

    // Main dot (bigger)
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", data.x);
    dot.setAttribute("cy", data.y);
    dot.setAttribute("r", "0");
    dot.setAttribute("fill", "#8b0000");

    // Drip droplet
    const drip = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    drip.setAttribute("cx", data.x);
    drip.setAttribute("cy", data.y + 8);
    drip.setAttribute("r", "2.5");
    drip.setAttribute("fill", "#8b0000");
    drip.style.opacity = 0;

    // Thin drip trail
    const trail = document.createElementNS("http://www.w3.org/2000/svg", "line");
    trail.setAttribute("x1", data.x);
    trail.setAttribute("x2", data.x);
    trail.setAttribute("y1", data.y + 6);
    trail.setAttribute("y2", data.y + 22);
    trail.setAttribute("stroke", "#6e0000");
    trail.setAttribute("stroke-width", "1.5");
    trail.setAttribute("stroke-linecap", "round");
    trail.style.opacity = 0;

    g.appendChild(pool);
    g.appendChild(trail);
    g.appendChild(dot);
    g.appendChild(drip);

    dotsLayer.appendChild(g);
    dotGroups.set(groupId, { g, pool, dot, drip, trail });

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

    dripTweens.set(groupId, dripTween);
}

function removeDot(index) {
    const groupId = `dot-group-${index}`;
    const entry = dotGroups.get(groupId);
    if (!entry) return;

    const { g, dot, drip, trail } = entry;
    const tween = dripTweens.get(groupId);
    if (tween) {
        tween.kill();
        dripTweens.delete(groupId);
    }

    gsap.timeline({
        onComplete: () => {
            g.remove();
            dotGroups.delete(groupId);
        }
    })
    .to([drip, trail], { opacity: 0, duration: 0.2 }, 0)
    .to(dot, { attr: { r: 0 }, duration: 0.25, ease: "power2.in" }, 0.05)
    .to(g, { opacity: 0, duration: 0.2 }, 0.1);
}

// Scroll triggers for incidents
document.querySelectorAll('.incident-trigger').forEach((trigger, i) => {
    ScrollTrigger.create({
        trigger,
        start: "top center",
        onEnter: () => {
            createDrippingDot(i);
            setCard(i);
        },
        onEnterBack: () => {
            createDrippingDot(i);
            setCard(i);
        },
        onLeaveBack: () => {
            removeDot(i);
            const prev = i - 1;
            if (prev >= 0) {
                setCard(prev);
                gsap.to(progressLine, { width: `${((prev + 1) / incidents.length) * 100}%`, duration: 0.25 });
            } else {
                gsap.to(progressLine, { width: `0%`, duration: 0.25 });
                gsap.to(incidentCard, { opacity: 0, y: 10, duration: 0.25 });
            }
        }
    });
});

// =============================================
// FORENSIC RAIL GENERATION
// =============================================
function generateForensicRail() {
    const container = document.getElementById('forensic-rail-container');
    
    forensicRailCases.forEach((caseData, index) => {
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
                                ${caseData.sources.map(s => `<a href="${s.url}" class="text-xs mono text-red-400 block hover:underline">${s.text}</a>`).join('')}
                            </div>
                        </div>
                        <p class="text-center text-zinc-500 mt-12 italic">${caseData.conclusion}</p>
                    </div>
                </div>
            `;
        } else {
            // Regular case card - ALL cards get before/after images
            const beforeSrc = caseData.before || `images/forensic/${caseData.id}-before.jpg`;
            const afterSrc  = caseData.after  || `images/forensic/${caseData.id}-after.jpg`;

            const satelliteHTML = `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <figure class="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 aspect-video">
                        <img
                            src="${beforeSrc}"
                            alt="Before: ${caseData.location}"
                            class="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                        <div class="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-300">
                            <div class="text-center p-4">
                                <div class="mono text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Before (missing image)</div>
                                <div class="text-xs text-zinc-600">${caseData.location}</div>
                                <div class="text-[10px] text-zinc-500 mt-2 mono">${beforeSrc}</div>
                            </div>
                        </div>
                        <figcaption class="absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.22em] bg-black/70 text-white px-2 py-1 rounded">Before</figcaption>
                    </figure>

                    <figure class="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 aspect-video">
                        <img
                            src="${afterSrc}"
                            alt="After: ${caseData.location}"
                            class="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                        <div class="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-zinc-800 to-black">
                            <div class="text-center p-4">
                                <div class="mono text-[10px] uppercase tracking-widest text-red-300 mb-1">After (missing image)</div>
                                <div class="text-xs text-zinc-300">${caseData.casualties}+ casualties</div>
                                <div class="text-[10px] text-zinc-500 mt-2 mono">${afterSrc}</div>
                            </div>
                        </div>
                        <div class="absolute inset-0 bg-red-900/15"></div>
                        <figcaption class="absolute top-3 left-3 mono text-[10px] uppercase tracking-[0.22em] bg-red-900/80 text-white px-2 py-1 rounded">After</figcaption>
                    </figure>
                </div>
            `;
            
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
                        ${satelliteHTML}
                        <div class="border-l-2 border-zinc-900 pl-6 space-y-2">
                            <p class="text-sm"><strong>Official:</strong> "${caseData.official}"</p>
                            <p class="text-sm"><strong>Evidence:</strong> ${caseData.evidence}</p>
                            <div class="pt-4 space-y-1">
                                ${caseData.sources.map(s => `<a href="${s.url}" class="text-xs mono text-blue-600 block hover:underline">${s.text}</a>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// =============================================
// FORENSIC RAIL SCROLL
// =============================================
function setupRailScroll() {
    const rail = document.querySelector('.forensic-rail');
    const existing = ScrollTrigger.getById("forensic-rail");
    if (existing) existing.kill(true);

    gsap.killTweensOf(rail);
    gsap.set(rail, { x: 0 });

    const scrollDistance = Math.max(0, rail.scrollWidth - window.innerWidth);

    gsap.to(rail, {
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
// SYSTEM PATTERNS - NARRATIVE GENERATION
// =============================================
function generatePatternTexts() {
    const container = document.getElementById('pattern-texts');
    container.innerHTML = systemPatterns.map((pattern, index) => {
        let implicationHTML = '';
        if (pattern.implication) {
            implicationHTML = `
                <div class="mt-6 border-l-2 border-red-600 pl-5">
                    <div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Question</div>
                    <div class="text-sm text-zinc-700 mt-1">${pattern.question}</div>
                    <div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500 mt-4">Implication</div>
                    <div class="text-sm text-zinc-600 mt-1">${pattern.implication}</div>
                </div>
            `;
        } else {
            implicationHTML = `
                <div class="mt-6 border-l-2 border-red-600 pl-5">
                    <div class="mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Question</div>
                    <div class="text-sm text-zinc-700 mt-1">${pattern.question}</div>
                </div>
            `;
        }

        return `
            <div class="pattern-text" data-pattern-index="${index}">
                <span class="mono text-red-600 text-xs tracking-widest uppercase mb-4 block">Pattern 0${index + 1}</span>
                <h2 class="text-4xl font-bold mb-4">${pattern.title}</h2>
                <p class="text-lg text-zinc-600 leading-relaxed">${pattern.finding}</p>
                ${implicationHTML}
            </div>
        `;
    }).join('');
}

// =============================================
// D3 VISUALIZATION FUNCTIONS
// =============================================
function getPattern(id) {
    return systemPatterns.find(p => p.id === id);
}

function createBarChart() {
    const p = getPattern('reprisal');
    const container = document.getElementById('d3-bar-chart');
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const margin = { top: 52, right: 30, bottom: 32, left: 140 };

    d3.select(container).selectAll("*").remove();

    const svg = d3.select(container)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    const data = p.data;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 26)
        .attr("text-anchor", "middle")
        .attr("class", "mono")
        .style("font-size", "10px")
        .style("fill", "#71717a")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.12em")
        .text(p.question);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerHeight])
        .padding(0.28);

    g.selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("x", 0)
        .attr("y", d => yScale(d.label))
        .attr("height", yScale.bandwidth())
        .attr("width", 0)
        .attr("fill", d => d3.interpolateReds((d.severity || 5) / 10))
        .transition()
        .duration(850)
        .delay((d, i) => i * 110)
        .attr("width", d => xScale(d.value));

    g.selectAll(".label")
        .data(data)
        .join("text")
        .attr("x", -12)
        .attr("y", d => yScale(d.label) + yScale.bandwidth() / 2)
        .attr("text-anchor", "end")
        .attr("dominant-baseline", "middle")
        .style("font-size", "11px")
        .style("fill", "#3f3f46")
        .text(d => d.label);

    g.selectAll(".value")
        .data(data)
        .join("text")
        .attr("x", d => xScale(d.value) + 10)
        .attr("y", d => yScale(d.label) + yScale.bandwidth() / 2)
        .attr("dominant-baseline", "middle")
        .style("font-size", "12px")
        .style("font-weight", "800")
        .style("fill", "#8b0000")
        .text(d => `${d.value}+`);
}

function createTimeline() {
    const p = getPattern('phases');
    const container = document.getElementById('d3-timeline');
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const margin = { top: 52, right: 24, bottom: 22, left: 24 };

    d3.select(container).selectAll("*").remove();

    const svg = d3.select(container)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 26)
        .attr("text-anchor", "middle")
        .attr("class", "mono")
        .style("font-size", "10px")
        .style("fill", "#71717a")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.12em")
        .text(p.question);

    const data = p.phases;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const bandHeight = innerHeight / data.length;
    const colors = ["#7f1d1d", "#b91c1c", "#dc2626"];

    data.forEach((phase, i) => {
        const yPos = i * bandHeight;
        const barW = Math.max(12, (phase.bandWidth / 100) * innerWidth);

        g.append("rect")
            .attr("x", 0)
            .attr("y", yPos + 10)
            .attr("width", 0)
            .attr("height", bandHeight - 20)
            .attr("rx", 6)
            .attr("fill", colors[i % colors.length])
            .attr("opacity", 0.9)
            .transition()
            .duration(700)
            .delay(i * 160)
            .attr("width", barW);

        g.append("text")
            .attr("x", 14)
            .attr("y", yPos + bandHeight / 2 - 10)
            .style("font-size", "12px")
            .style("font-weight", "800")
            .style("fill", "#fff")
            .text(phase.label);

        g.append("text")
            .attr("x", 14)
            .attr("y", yPos + bandHeight / 2 + 8)
            .style("font-size", "10px")
            .style("fill", "#fecaca")
            .text(`${phase.period} • ${phase.geographic}`);

        g.append("text")
            .attr("x", innerWidth - 8)
            .attr("y", yPos + bandHeight / 2)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "middle")
            .style("font-size", "10px")
            .style("fill", "#52525b")
            .text(phase.description);
    });
}

function createDonutChart() {
    const p = getPattern('modality');
    const container = document.getElementById('d3-donut');
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;
    const radius = Math.min(width, height) / 2 - 64;

    d3.select(container).selectAll("*").remove();

    const svg = d3.select(container)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 26)
        .attr("text-anchor", "middle")
        .attr("class", "mono")
        .style("font-size", "10px")
        .style("fill", "#71717a")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.12em")
        .text(p.question);

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = p.stacks;
    const total = d3.sum(data, d => d.value);

    const pie = d3.pie().value(d => d.value).sort(null).padAngle(0.018);
    const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);

    const arcs = g.selectAll(".arc")
        .data(pie(data))
        .join("g")
        .attr("class", "arc");

    arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => d.data.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .style("opacity", 0)
        .transition()
        .duration(850)
        .delay((d, i) => i * 200)
        .style("opacity", 1);

    const labelArc = d3.arc().innerRadius(radius * 0.78).outerRadius(radius * 0.78);
    arcs.append("text")
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .style("fill", "#fff")
        .style("font-weight", "800")
        .text(d => d.data.value);

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "24px")
        .style("font-weight", "900")
        .style("fill", "#8b0000")
        .text(total.toLocaleString());

    g.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 22)
        .style("font-size", "10px")
        .style("fill", "#71717a")
        .text("Total deaths");

    const legend = svg.append("g")
        .attr("transform", `translate(${20},${height - 44})`);

    data.forEach((d, i) => {
        const item = legend.append("g").attr("transform", `translate(${i * 160},0)`);
        item.append("rect").attr("width", 10).attr("height", 10).attr("fill", d.color);
        item.append("text")
            .attr("x", 14)
            .attr("y", 9)
            .style("font-size", "9px")
            .style("fill", "#52525b")
            .text(d.label);
    });
}

function createWordViz() {
    const p = getPattern('targeting');
    const container = document.getElementById('d3-word');
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    d3.select(container).selectAll("*").remove();

    const svg = d3.select(container)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 26)
        .attr("text-anchor", "middle")
        .attr("class", "mono")
        .style("font-size", "10px")
        .style("fill", "#71717a")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.12em")
        .text(p.question);

    const color = d3.scaleOrdinal()
        .domain(["ethnic", "demographic", "legal-status", "political", "activity"])
        .range(["#7f1d1d", "#b91c1c", "#dc2626", "#f97316", "#a1a1aa"]);

    const terms = p.terms.slice().sort((a, b) => b.weight - a.weight);
    const centerX = width / 2;
    const centerY = height / 2 + 10;

    const fontScale = d3.scaleLinear()
        .domain([d3.min(terms, d => d.weight), d3.max(terms, d => d.weight)])
        .range([14, 42]);

    const positions = [
        { x: 0, y: -70 },
        { x: -120, y: -10 },
        { x: 120, y: -10 },
        { x: -90, y: 70 },
        { x: 90, y: 70 },
        { x: 0, y: 120 }
    ];

    const g = svg.append("g").attr("transform", `translate(${centerX},${centerY})`);

    g.selectAll("text")
        .data(terms)
        .join("text")
        .attr("text-anchor", "middle")
        .attr("x", (d, i) => (positions[i] ? positions[i].x : (i % 2 ? -140 : 140)))
        .attr("y", (d, i) => (positions[i] ? positions[i].y : 0))
        .style("font-size", d => `${fontScale(d.weight)}px`)
        .style("font-weight", 900)
        .style("fill", d => color(d.category))
        .style("opacity", 0)
        .text(d => d.text)
        .transition()
        .duration(650)
        .delay((d, i) => i * 120)
        .style("opacity", 1);

    const legend = svg.append("g").attr("transform", `translate(${22},${height - 44})`);
    const cats = Array.from(new Set(terms.map(d => d.category)));
    cats.forEach((c, i) => {
        const item = legend.append("g").attr("transform", `translate(${i * 120},0)`);
        item.append("circle").attr("r", 5).attr("cx", 5).attr("cy", 5).attr("fill", color(c));
        item.append("text")
            .attr("x", 14)
            .attr("y", 9)
            .style("font-size", "9px")
            .style("fill", "#52525b")
            .text(c);
    });
}

function createPhraseMatrix() {
    const p = getPattern('denial');
    const container = document.getElementById('d3-phrases');
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    d3.select(container).selectAll("*").remove();

    const svg = d3.select(container)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", 26)
        .attr("text-anchor", "middle")
        .attr("class", "mono")
        .style("font-size", "10px")
        .style("fill", "#71717a")
        .style("text-transform", "uppercase")
        .style("letter-spacing", "0.12em")
        .text(p.question);

    const phrases = p.phrases.slice().sort((a, b) => b.frequency - a.frequency);

    const catColor = d3.scaleOrdinal()
        .domain(["tactical", "legal", "denial"])
        .range(["#7f1d1d", "#f97316", "#111827"]);

    const cols = 2;
    const cardW = (width - 48) / cols;
    const cardH = 62;
    const startX = 24;
    const startY = 60;

    const g = svg.append("g");

    const cards = g.selectAll("g.card")
        .data(phrases)
        .join("g")
        .attr("class", "card")
        .attr("transform", (d, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            return `translate(${startX + col * cardW},${startY + row * (cardH + 14)})`;
        })
        .style("opacity", 0);

    cards.append("rect")
        .attr("width", cardW - 14)
        .attr("height", cardH)
        .attr("rx", 10)
        .attr("fill", "#fff")
        .attr("stroke", "#e4e4e7");

    cards.append("rect")
        .attr("x", 14)
        .attr("y", 14)
        .attr("width", 8)
        .attr("height", 8)
        .attr("fill", d => catColor(d.category));

    cards.append("text")
        .attr("x", 30)
        .attr("y", 22)
        .style("font-size", "12px")
        .style("font-weight", "800")
        .style("fill", "#111827")
        .text(d => d.text);

    cards.append("text")
        .attr("x", 30)
        .attr("y", 44)
        .attr("class", "mono")
        .style("font-size", "10px")
        .style("fill", "#71717a")
        .text(d => `Frequency: ${d.frequency}`);

    cards.transition()
        .duration(550)
        .delay((d, i) => i * 120)
        .style("opacity", 1);
}

function initD3Charts() {
    createBarChart();
    createTimeline();
    createDonutChart();
    createWordViz();
    createPhraseMatrix();
}

// =============================================
// SYSTEM PATTERNS SCROLL CONTROLLER
// =============================================
const patternVizs = Array.from(document.querySelectorAll('.pattern-viz'));

function hideAllPatternViz(immediate = false) {
    patternVizs.forEach(v => {
        v.classList.add('opacity-0');
        if (immediate) gsap.set(v, { opacity: 0, scale: 1 });
    });
}

function renderVizForIndex(i) {
    if (i === 0) createBarChart();
    if (i === 1) createTimeline();
    if (i === 2) createDonutChart();
    if (i === 3) createWordViz();
    if (i === 4) createPhraseMatrix();
}

function showPatternViz(i, direction = 1) {
    if (!patternVizs[i]) return;

    patternVizs.forEach((v, idx) => {
        if (idx !== i) {
            v.classList.add('opacity-0');
            gsap.set(v, { opacity: 0, scale: 1 });
        }
    });

    const v = patternVizs[i];
    v.classList.remove('opacity-0');

    renderVizForIndex(i);

    const fromScale = direction === -1 ? 1.05 : 0.95;
    gsap.fromTo(v,
        { opacity: 0, scale: fromScale },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
    );
}

function setupPatternScrollTriggers() {
    document.querySelectorAll('.pattern-text').forEach((textEl) => {
        const i = Number(textEl.getAttribute('data-pattern-index') || 0);

        ScrollTrigger.create({
            trigger: textEl,
            start: 'top center',
            end: 'bottom center',
            onEnter: self => showPatternViz(i, self.direction),
            onEnterBack: self => showPatternViz(i, self.direction),
            onLeave: () => hideAllPatternViz(),
            onLeaveBack: () => hideAllPatternViz()
        });
    });

    ScrollTrigger.create({
        trigger: '#system-patterns',
        start: 'top top+=52',
        end: 'bottom top+=52',
        onLeave: () => hideAllPatternViz(true),
        onLeaveBack: () => hideAllPatternViz(true)
    });
}

// =============================================
// SHARE FUNCTIONALITY
// =============================================
const shareData = {
    url: window.location.href,
    title: 'DOCUMENTED, DENIED, DERELICT | BusinessDay Investigation',
    text: 'Mapping 25 years of the Nigerian Army\'s extrajudicial killings without justice.'
};

// Header share buttons
document.getElementById('share-twitter').addEventListener('click', (e) => {
    e.preventDefault();
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.text)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
});

document.getElementById('share-facebook').addEventListener('click', (e) => {
    e.preventDefault();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
});

document.getElementById('share-linkedin').addEventListener('click', (e) => {
    e.preventDefault();
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(linkedinUrl, '_blank', 'width=550,height=420');
});

document.getElementById('share-link').addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        await navigator.clipboard.writeText(shareData.url);
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
        alert('Failed to copy link. Please copy manually: ' + shareData.url);
    }
});

// Footer share buttons
const footerShareText = encodeURIComponent('DOCUMENTED, DENIED, DERELICT: 25 Years of Nigeria Army Operations - A BusinessDay Investigation');
const footerShareUrl = encodeURIComponent(window.location.href);

document.getElementById('footer-share-twitter').addEventListener('click', () => {
    window.open(`https://twitter.com/intent/tweet?text=${footerShareText}&url=${footerShareUrl}`, '_blank', 'noopener,noreferrer');
});

document.getElementById('footer-share-whatsapp').addEventListener('click', () => {
    window.open(`https://wa.me/?text=${footerShareText}%20${footerShareUrl}`, '_blank', 'noopener,noreferrer');
});

document.getElementById('footer-share-facebook').addEventListener('click', () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${footerShareUrl}`, '_blank', 'noopener,noreferrer');
});

document.getElementById('footer-share-linkedin').addEventListener('click', () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${footerShareUrl}`, '_blank', 'noopener,noreferrer');
});

// Set current year
document.getElementById('footer-year').textContent = new Date().getFullYear();

// =============================================
// INITIALIZE ON LOAD
// =============================================
window.addEventListener('DOMContentLoaded', () => {
    // Generate pattern texts
    generatePatternTexts();
    
    // Generate forensic rail
    generateForensicRail();
    
    // Setup rail scroll
    setupRailScroll();
    
    // Setup pattern scroll triggers
    setupPatternScrollTriggers();
    
    // Initialize map (will load GeoJSON if available)
    initMap();
    
    // Initialize D3 charts
    initD3Charts();
});

// Title animation
gsap.to("#title-content", {
    scrollTrigger: {
        trigger: "#title-block",
        start: "center center",
        end: "bottom top",
        scrub: true
    },
    opacity: 0,
    y: -60
});

// Intro boxes animation
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

// Window resize handler
window.addEventListener('resize', () => {
    setupRailScroll();
    ScrollTrigger.refresh();
    initD3Charts();
});
