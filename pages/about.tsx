import { Link } from "react-router-dom";
import { PageShell } from "../components/PageShell";
import styles from "./content.module.css";
export default function About(){return <PageShell eyebrow="OUR STORY" title="A choir with a purpose.">
  <section className={styles.split}><div><p className={styles.label}>WHO WE ARE</p><h2>Hope has a <span>sound.</span></h2></div><div><p>The Ghetto Choir is a community-based vocal group made up of talented individuals from underprivileged and marginalized neighborhoods.</p><p>We use music as a vehicle for hope, healing and empowerment while showcasing raw, authentic talent.</p><p>Our performances blend traditional African rhythms, gospel, soul and contemporary genres.</p></div></section>
  <section className={styles.dark}><p className={styles.label}>OUR VISION</p><h2>To become a global symbol of <span>hope, creativity and transformation.</span></h2><p>We want to amplify voices from marginalized communities and use music as a platform for empowerment, education and social impact.</p></section>
  <section className={styles.values}><div><p className={styles.label}>OUR VALUES</p><h2>Built on <span>community.</span></h2></div><div className={styles.grid}>{["Authenticity","Empowerment","Unity","Excellence","Community"].map(v=><article key={v}><strong>{v}</strong><span>•</span></article>)}</div></section>
  <section className={styles.cta}><h2>Ready to add your <span>voice?</span></h2><Link to="/join">Join the choir →</Link></section>
</PageShell>}