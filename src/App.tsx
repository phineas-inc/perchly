import { FormEvent, useEffect, useMemo, useState } from "react";

const navItems = [
  ["Platform", "#platform"],
  ["Ground Network", "#network"],
  ["Operations", "#operations"],
  ["Pricing", "#pricing"],
  ["Company", "#company"],
];

const stations = [
  { name: "Nashik", x: 42, y: 44, aos: "14:32", los: "14:41", elevation: "72°", band: "S", price: "₹8,400" },
  { name: "Bengaluru", x: 48, y: 73, aos: "16:08", los: "16:19", elevation: "54°", band: "UHF", price: "₹5,200" },
  { name: "Lucknow", x: 57, y: 30, aos: "18:44", los: "18:51", elevation: "31°", band: "S", price: "₹6,900" },
  { name: "Port Blair", x: 78, y: 68, aos: "21:12", los: "21:23", elevation: "66°", band: "X", price: "₹11,600" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Sahyadri Mission Control home">
      <span className="wordmark-mark">
        <i />
        <i />
        <i />
      </span>
      <span>SAHYADRI <b>MC</b></span>
    </a>
  );
}

function Sparkline({ color = "teal", path }: { color?: "teal" | "gold"; path: string }) {
  return (
    <svg className={`sparkline ${color}`} viewBox="0 0 160 38" preserveAspectRatio="none" aria-hidden="true">
      <path className="spark-grid" d="M0 12.5h160M0 25.5h160" />
      <path className="spark-path" d={path} />
    </svg>
  );
}

function ConsolePreview() {
  const [seconds, setSeconds] = useState(12 * 60 + 47);

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 14 * 60)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="console-wrap">
      <div className="console-topbar">
        <div>
          <span className="eyebrow">SPACECRAFT</span>
          <strong>PRARAMBH-01</strong>
        </div>
        <span className="status"><i /> NOMINAL</span>
      </div>
      <div className="orbit-strip">
        <div className="orbit-graphic" aria-hidden="true">
          <svg viewBox="0 0 220 80">
            <path d="M-5 68C53-9 142 11 226 62" />
            <path d="M-5 51C56 87 146 66 226 8" />
            <circle cx="104" cy="39" r="4" />
            <circle cx="104" cy="39" r="8" className="orbit-ring" />
          </svg>
        </div>
        <div className="next-pass">
          <span className="eyebrow">NEXT PASS · NASHIK</span>
          <strong>{countdown}</strong>
          <div><span>09:02:14 UTC</span><span>14:32:14 IST</span></div>
        </div>
      </div>
      <div className="telemetry-stack">
        <div className="telemetry-row">
          <div><span>BATTERY VOLTAGE</span><strong>7.62 <small>V</small></strong></div>
          <Sparkline path="M0 25 C15 23,21 25,33 21 S55 17,67 20 S88 26,99 20 S125 14,160 17" />
        </div>
        <div className="telemetry-row">
          <div><span>OBC TEMPERATURE</span><strong>22.4 <small>°C</small></strong></div>
          <Sparkline path="M0 22 C22 18,30 25,49 22 S71 13,88 17 S116 27,128 21 S147 14,160 19" color="gold" />
        </div>
        <div className="telemetry-row">
          <div><span>LINK MARGIN</span><strong>8.7 <small>dB</small></strong></div>
          <Sparkline path="M0 29 C13 28,23 20,36 23 S56 28,70 21 S91 11,106 16 S130 26,160 10" />
        </div>
      </div>
      <div className="console-footer"><span>LAST FRAME · 12:19:44.032 UTC</span><span>PACKETS <b>142,892</b></span></div>
    </div>
  );
}

function Fragment({ type }: { type: string }) {
  if (type === "alarm") return (
    <div className="fragment alarm-fragment">
      <div><span className="dot teal" /> EPS.BAT.VOLTAGE <b>7.62 V</b></div>
      <div><span className="dot gold" /> ADCS.MODE <b>FINE_POINT</b></div>
      <div><span className="dot red" /> THERM.PANEL_2 <b>42.8 °C</b></div>
    </div>
  );
  if (type === "command") return (
    <div className="fragment command-fragment">
      <span>QUEUE / 03</span>
      <div><i>01</i><b>ADCS_SET_MODE</b><em>VALID</em></div>
      <div><i>02</i><b>PAYLOAD_PWR_ON</b><em>14:42Z</em></div>
    </div>
  );
  if (type === "schedule") return (
    <div className="fragment schedule-fragment">
      <div className="time-labels"><span>14:00</span><span>16:00</span><span>18:00</span></div>
      <div><span>NSK-01</span><i className="block b1" /></div>
      <div><span>BLR-04</span><i className="block b2" /></div>
      <div><span>SGP-02</span><i className="block b3" /></div>
    </div>
  );
  if (type === "automation") return (
    <div className="fragment flow-fragment">
      <span>IF</span><b>LINK_MARGIN &lt; 3 dB</b><i />
      <span>THEN</span><b>SWITCH_LOW_RATE</b>
    </div>
  );
  if (type === "log") return (
    <div className="fragment log-fragment">
      <div className="search-box">⌕&nbsp;&nbsp; safe mode</div>
      <p><span>12:14:08</span> SAFE_MODE cleared by operator</p>
      <p><span>11:58:31</span> Anomaly note added</p>
    </div>
  );
  return (
    <div className="fragment dashboard-fragment">
      <div><span>POWER</span><Sparkline path="M0 25 C16 27,25 16,38 18 S59 29,73 20 S98 12,115 17 S138 25,160 14" /></div>
      <div className="gauge"><i /><strong>98.7<small>%</small></strong></div>
    </div>
  );
}

function PlatformCard({ index, title, copy, type }: { index: string; title: string; copy: string; type: string }) {
  return (
    <article className={`platform-card ${type}`}>
      <div className="card-heading"><span>{index}</span><h3>{title}</h3></div>
      <p>{copy}</p>
      <Fragment type={type} />
    </article>
  );
}

function IndiaMap({ active, setActive }: { active: string; setActive: (name: string) => void }) {
  return (
    <div className="map-panel">
      <div className="map-meta"><span>GROUND NETWORK / SOUTH ASIA</span><span><i /> LIVE NETWORK</span></div>
      <svg className="india-map" viewBox="0 0 700 430" role="img" aria-label="Ground station network map centred on India">
        <defs>
          <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M35 0H0V35" fill="none" stroke="#262c32" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="700" height="430" fill="url(#grid)" />
        <g className="map-outline">
          <path d="M309 42l35 31 52 9 19 28 47 10-22 37 22 33-38 34-18 58-26 75-18 39-13-42-28-58-18-56-33-52 12-37-30-33 27-29 4-45z" />
          <path d="M464 121l64-23 66 12 36 34-41 17-39-12-38 26-42-5" />
          <path d="M411 384l10 26" />
        </g>
        <g className="pass-arcs">
          <path d="M55 360Q278 55 640 72" />
          <path d="M89 90Q356 390 659 195" />
          <path d="M178 418Q360 148 667 324" />
        </g>
        {stations.map((station) => {
          const cx = station.x * 7;
          const cy = station.y * 4.3;
          return (
            <g
              key={station.name}
              className={`station-point ${station.name === "Nashik" ? "primary" : ""} ${active === station.name ? "active" : ""}`}
              onMouseEnter={() => setActive(station.name)}
              onMouseLeave={() => setActive("")}
              onFocus={() => setActive(station.name)}
              onBlur={() => setActive("")}
              tabIndex={0}
              role="button"
              aria-label={`${station.name} station`}
            >
              <circle className="pulse" cx={cx} cy={cy} r="11" />
              <circle cx={cx} cy={cy} r="4" />
              <text x={cx + 10} y={cy - 8}>{station.name.toUpperCase()}</text>
            </g>
          );
        })}
      </svg>
      <div className="map-scale">500 KM <span /></div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const todayLabel = useMemo(() => new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase(), []);
  const [annual, setAnnual] = useState(false);
  const [activeStation, setActiveStation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const prices = useMemo(() => ({
    campus: annual ? "₹20,000" : "₹24,000",
    mission: annual ? "₹66,000" : "₹78,000",
  }), [annual]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="top">
      <header className="site-header">
        <div className="nav-shell">
          <Wordmark />
          <nav className={menuOpen ? "open" : ""} aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            <a className="button button-primary mobile-cta" href="#demo">Book a demo <ArrowIcon /></a>
          </nav>
          <a className="button button-primary desktop-cta" href="#demo">Book a demo <ArrowIcon /></a>
          <button className={`menu-button ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy">
          <div className="section-kicker"><span>01</span> MISSION CONTROL AS A SERVICE</div>
          <h1>Fly your satellite<br />from a browser.</h1>
          <p>One platform for telemetry, commanding and ground station passes. Operated 24×7 from Nashik, India.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#demo">Book a demo <ArrowIcon /></a>
            <a className="text-link" href="#platform">See the console <ArrowIcon /></a>
          </div>
          <div className="hero-proof"><i /><span>Operations desk online</span><b>12:19:44 IST</b></div>
        </div>
        <ConsolePreview />
      </section>

      <section className="trust-strip section-shell">
        <p>Built for teams flying from India</p>
        <div className="logo-row">
          {["ORBITAL", "AKASH", "VYOM", "ANTARIKSH", "DHRUVA", "KALPANA"].map((logo, i) => (
            <div key={logo} className={`placeholder-logo logo-${i}`}><i />{logo}</div>
          ))}
        </div>
      </section>

      <section className="stats section-shell" aria-label="Key metrics">
        <article><span className="eyebrow">GROUND SEGMENT COST SAVED</span><strong>65<span>%</span></strong><p>Placeholder based on a typical single-satellite mission.</p></article>
        <article><span className="eyebrow">TYPICAL ONBOARDING</span><strong>14<span> DAYS</span></strong><p>From interface document to first simulated pass.</p></article>
        <article><span className="eyebrow">MISSION OPERATIONS</span><strong>24<span>×</span>7</strong><p>Staffed operations centre in Nashik, Maharashtra.</p></article>
      </section>

      <section className="section-block section-shell" id="platform">
        <div className="section-heading">
          <div><div className="section-kicker"><span>02</span> THE PLATFORM</div><h2>Ground software without<br />the ground-up build.</h2></div>
          <p>One operational view from first contact to routine mission. Your team keeps control. We maintain the infrastructure.</p>
        </div>
        <div className="bento-grid">
          <PlatformCard index="01" title="Telemetry and alarms" copy="Decode, plot and alert on live spacecraft data. Trace every value to its source frame." type="alarm" />
          <PlatformCard index="02" title="Telecommanding" copy="Queue, time-tag and validate commands against current telemetry before uplink." type="command" />
          <PlatformCard index="03" title="Pass scheduling" copy="Plan contacts across multiple ground networks from one mission calendar." type="schedule" />
          <PlatformCard index="04" title="Event automation" copy="Run approved procedures when mission conditions are met. Keep an operator in the loop." type="automation" />
          <PlatformCard index="05" title="Mission log" copy="A searchable, time-synchronised record of commands, alarms, notes and passes." type="log" />
          <PlatformCard index="06" title="Custom dashboards" copy="Build views for power, thermal, ADCS and payload teams without code." type="dashboard" />
        </div>
        <p className="compatibility">CCSDS, CSP and AX.25 supported. <span /> Runs on any cloud. <span /> Data hosted in India.</p>
      </section>

      <section className="section-block network-section" id="network">
        <div className="section-shell">
          <div className="section-heading">
            <div><div className="section-kicker"><span>03</span> GROUND NETWORK</div><h2>Coverage when your orbit<br />crosses South Asia.</h2></div>
            <p>Book compatible antennas by the pass. Review availability, elevation and cost before committing.</p>
          </div>
          <div className="network-grid">
            <IndiaMap active={activeStation} setActive={setActiveStation} />
            <div className="pass-panel">
              <div className="pass-heading"><div><span className="eyebrow">UPCOMING CONTACTS</span><strong>{todayLabel}</strong></div><button aria-label="More pass options">•••</button></div>
              <div className="table-scroll">
                <table>
                  <thead><tr><th>STATION</th><th>AOS / LOS</th><th>MAX EL.</th><th>BAND</th><th>PRICE</th></tr></thead>
                  <tbody>
                    {stations.map((station) => (
                      <tr key={station.name} className={activeStation === station.name ? "active" : ""} onMouseEnter={() => setActiveStation(station.name)} onMouseLeave={() => setActiveStation("")}>
                        <td><i className={station.name === "Nashik" ? "gold" : ""} />{station.name}</td>
                        <td>{station.aos}<small>{station.los}</small></td>
                        <td>{station.elevation}</td><td>{station.band}</td><td>{station.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="outline-button">Explore network availability <ArrowIcon /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block marketplace section-shell">
        <div className="section-kicker"><span>04</span> GROUND STATION MARKETPLACE</div>
        <div className="market-grid">
          <article>
            <span className="market-number">FOR OPERATORS / 01</span>
            <h3>Buy passes<br />on demand.</h3>
            <p>Add coverage without network contracts. Pay only for completed passes and manage bookings in the console.</p>
            <ul><li>Transparent per-pass rates</li><li>One integration across networks</li><li>Quality records for every contact</li></ul>
            <a className="text-link" href="#demo">Find a station <ArrowIcon /></a>
          </article>
          <article>
            <span className="market-number">FOR STATION OWNERS / 02</span>
            <h3>Sell idle<br />antenna time.</h3>
            <p>List available capacity, set technical constraints and receive qualified mission bookings.</p>
            <ul><li>You control price and availability</li><li>Automated booking workflow</li><li>Monthly settlement in INR</li></ul>
            <a className="text-link" href="#demo">List your station <ArrowIcon /></a>
          </article>
        </div>
      </section>

      <section className="section-block operations-section" id="operations">
        <div className="section-shell">
          <div className="section-heading">
            <div><div className="section-kicker"><span>05</span> MISSION OPERATIONS</div><h2>A real desk when the<br />mission needs one.</h2></div>
            <p>Our Nashik operations team can run routine passes or join your team for the phases that carry more risk.</p>
          </div>
          <div className="ops-grid">
            <div className="ops-copy">
              <article><span>01</span><div><h3>Routine operations</h3><p>Monitored passes, daily health review and mission reporting.</p></div></article>
              <article><span>02</span><div><h3>Launch and early orbit</h3><p>Procedure rehearsals, first contact and round-the-clock LEOP shifts.</p></div></article>
              <article><span>03</span><div><h3>Anomaly response</h3><p>On-call operators, controlled procedures and a complete incident timeline.</p></div></article>
            </div>
            <div className="timeline-panel">
              <div className="timeline-head"><span>NASHIK OPS / SHIFT PLAN</span><strong><i /> STAFFED NOW</strong></div>
              <div className="clock-row">{["00", "04", "08", "12", "16", "20", "24"].map((t) => <span key={t}>{t}:00</span>)}</div>
              <div className="shift-row"><label>SHIFT A</label><div><i style={{ width: "33%" }} /><span>MEERA K.</span></div></div>
              <div className="shift-row"><label>SHIFT B</label><div><i style={{ left: "33%", width: "34%" }} /><span style={{ left: "37%" }}>ARJUN R.</span></div></div>
              <div className="shift-row"><label>SHIFT C</label><div><i style={{ left: "67%", width: "33%" }} /><span style={{ left: "71%" }}>NEHA S.</span></div></div>
              <div className="now-line"><span>NOW / 14:32 IST</span></div>
              <div className="timeline-foot"><span>3 OPERATORS ON SHIFT</span><span>1 MISSION ACTIVE</span><span>0 OPEN ALARMS</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block security section-shell">
        <div className="section-heading compact">
          <div><div className="section-kicker"><span>06</span> COMPLIANCE & SECURITY</div><h2>Built for controlled operations.</h2></div>
          <p>Practical controls for regulated mission data and command access.</p>
        </div>
        <div className="security-grid">
          {[
            ["01", "IN-SPACe support", "Documentation support for ground segment authorisation."],
            ["02", "India data residency", "Mission data hosted and backed up within India."],
            ["03", "Role-based access", "Separate permissions for view, procedure and command."],
            ["04", "Audit and encryption", "Full audit trail with encrypted command links."],
          ].map(([n, title, copy]) => <article key={n}><span>{n}</span><div className="security-glyph"><i /><i /><i /></div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="section-block pricing-section" id="pricing">
        <div className="section-shell">
          <div className="section-heading">
            <div><div className="section-kicker"><span>07</span> PRICING</div><h2>Start with one mission.<br />Add capacity as you fly.</h2></div>
            <div className="billing-toggle" role="group" aria-label="Billing period">
              <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button>
              <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Annual <span>−15%</span></button>
            </div>
          </div>
          <div className="pricing-grid">
            <article>
              <div className="tier-head"><span>01</span><h3>Campus</h3><p>For university CubeSat teams preparing their first mission.</p></div>
              <div className="price"><strong>{prices.campus}</strong><span>/ month<br />+ passes</span></div>
              <a className="outline-button" href="#demo">Request campus access <ArrowIcon /></a>
              <ul><li>1 spacecraft</li><li>5 operator seats</li><li>Telemetry and commanding</li><li>Email support</li></ul>
            </article>
            <article className="featured">
              <div className="popular">MOST USED</div>
              <div className="tier-head"><span>02</span><h3>Mission</h3><p>For a commercial team operating a single satellite.</p></div>
              <div className="price"><strong>{prices.mission}</strong><span>/ month<br />+ passes</span></div>
              <a className="button button-primary" href="#demo">Book a technical demo <ArrowIcon /></a>
              <ul><li>1 spacecraft</li><li>15 operator seats</li><li>Automation and custom dashboards</li><li>24×7 operations support</li></ul>
            </article>
            <article>
              <div className="tier-head"><span>03</span><h3>Constellation</h3><p>For multi-satellite teams with shared operational workflows.</p></div>
              <div className="price"><strong>Custom</strong><span>volume<br />pricing</span></div>
              <a className="outline-button" href="#demo">Talk to us <ArrowIcon /></a>
              <ul><li>Multiple spacecraft</li><li>Unlimited viewers</li><li>Dedicated environment</li><li>Custom SLA and integrations</li></ul>
            </article>
          </div>
          <p className="pricing-note">Pay per pass. GST invoice. UPI and card accepted. <span>All prices exclude GST.</span></p>
        </div>
      </section>

      <section className="demo-section" id="demo">
        <div className="section-shell demo-grid">
          <div>
            <div className="section-kicker light"><span>08</span> BOOK A DEMO</div>
            <h2>Bring your mission<br />interface document.</h2>
            <p>We will show you the console against a mission profile close to yours. No generic sales deck.</p>
            <div className="demo-meta"><span>RESPONSE TIME</span><strong>Within 1 business day</strong><span>LOCATION</span><strong>Nashik, Maharashtra</strong></div>
          </div>
          {submitted ? (
            <div className="form-success"><span>REQUEST RECEIVED / 200</span><h3>Thank you.</h3><p>Our mission team will contact you within one business day.</p><button onClick={() => setSubmitted(false)}>Submit another request</button></div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label><span>YOUR NAME</span><input required name="name" autoComplete="name" placeholder="Full name" /></label>
              <label><span>WORK EMAIL</span><input required name="email" type="email" autoComplete="email" placeholder="you@organisation.in" /></label>
              <label><span>ORGANISATION</span><input required name="organisation" placeholder="Company or university" /></label>
              <div className="form-row">
                <label><span>NUMBER OF SATELLITES</span><select name="satellites" defaultValue=""><option value="" disabled>Select</option><option>1</option><option>2–5</option><option>6–20</option><option>20+</option></select></label>
                <label><span>PLANNED LAUNCH</span><input name="launch" type="month" /></label>
              </div>
              <label><span>MESSAGE</span><textarea name="message" rows={3} placeholder="Mission, orbit, protocol and current ground segment" /></label>
              <button className="button form-submit" type="submit">Request a technical demo <ArrowIcon /></button>
              <small>By submitting, you agree to our privacy policy.</small>
            </form>
          )}
        </div>
      </section>

      <footer id="company">
        <div className="section-shell">
          <div className="footer-main">
            <div><Wordmark /><p>Mission control infrastructure<br />for small satellite teams.</p></div>
            <div><span>NAVIGATE</span>{navItems.slice(0, 4).map(([l, h]) => <a key={l} href={h}>{l}</a>)}</div>
            <div><span>COMPANY</span><a href="#company">About</a><a href="#company">Careers</a><a href="#company">Privacy</a><a href="#company">Terms</a></div>
            <div><span>CONTACT</span><p>Plot 00, Satpur MIDC<br />Nashik, Maharashtra 422007<br />India</p><a href="mailto:ops@sahyadrimc.in">ops@sahyadrimc.in</a></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} SAHYADRI MISSION CONTROL PVT. LTD.</span><div><a href="#company">LINKEDIN</a><a href="#company">X / TWITTER</a></div><span className="system-online"><i /> ALL SYSTEMS NOMINAL</span></div>
        </div>
      </footer>
    </main>
  );
}

export default App;
