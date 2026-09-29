import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import styles from "./SiteNav.module.css";
const links = [["/","Home"],["/about","About"],["/events","Events"],["/gallery","Gallery"],["/join","Join Us"],["/contact","Contact"]] as const;
export function SiteNav(){
  const [open,setOpen]=useState(false);
  return <header className={styles.header}>
    <Link to="/" className={styles.brand} onClick={()=>setOpen(false)}><img src="/_cdn/static/0747ec73-d19b-4258-a261-27c26d4b8c82-ghetto-choir-logo.png" alt="The Ghetto Choir UG"/></Link>
    <nav className={open ? styles.nav + " " + styles.open : styles.nav}>
      {links.map(([to,label])=><Link key={to} to={to} onClick={()=>setOpen(false)}>{label}</Link>)}
      <Link className={styles.admin} to="/admin" onClick={()=>setOpen(false)}>Admin</Link>
    </nav>
    <button className={styles.menu} onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">{open?<X size={24}/>:<Menu size={24}/>}</button>
  </header>
}