import styles from "./_index.module.css";
import { Link } from "react-router-dom";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
export default function Index() {
  return <main className={styles.page}><SiteNav/>
    <section className={styles.heroSection}><div><p className={styles.kicker}>THE GHETTO CHOIR · UGANDA</p><h1>OUR VOICES.<br/><span>OUR STORY.</span><br/>OUR FUTURE.</h1><p className={styles.lead}>Voices from the streets. Harmonies for the world.</p><div className={styles.actions}><Link to="/join">Join the choir</Link><Link to="/about">Discover our story →</Link></div></div><img className={styles.hero} src="/_cdn/static/1c1447a2-57b0-4d55-b0ce-3693347d942c-ghetto-choir-recruitment.png" alt="The Ghetto Choir UG"/></section>
    <section className={styles.section}><div><p className={styles.kicker}>01 / ABOUT US</p><h2>From the heart of struggle, <span>beauty rises.</span></h2></div><div><p>The Ghetto Choir is a community-based vocal group built around talented individuals from underprivileged and marginalized communities.</p><p>We use music as a vehicle for hope, healing and empowerment, blending African rhythms, gospel, soul and contemporary sounds.</p><Link to="/about" className={styles.textLink}>Read our story →</Link></div></section>
    <section className={styles.band}><div><p className={styles.kicker}>02 / THE MOVEMENT</p><h2>Talent deserves a <span>stage.</span></h2></div><div className={styles.stats}><div><strong>12+</strong><small>Recruitment age</small></div><div><strong>UG</strong><small>Born in Kampala</small></div><div><strong>∞</strong><small>Room to grow</small></div></div></section>
    <section className={styles.section}><div><p className={styles.kicker}>03 / NEXT CHAPTER</p><h2>See where the <span>music takes us.</span></h2></div><div><p>Follow upcoming performances, auditions and community moments as the choir grows.</p><div className={styles.actions}><Link to="/events">View events</Link><Link to="/gallery">View gallery →</Link></div></div></section>
    <section className={styles.join}><p className={styles.kicker}>04 / JOIN US</p><h2>Your voice <span>belongs here.</span></h2><p>Passion. Discipline. Excellence. If you love to sing, there is a place for you.</p><Link to="/join">Start your audition →</Link></section>
    <SiteFooter/>
  </main>;
}