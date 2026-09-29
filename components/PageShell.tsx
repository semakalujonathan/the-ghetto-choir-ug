import { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import styles from "./PageShell.module.css";
export function PageShell({children,title,eyebrow}:{children:ReactNode;title:string;eyebrow:string}){
  return <main className={styles.page}><SiteNav/><section className={styles.hero}><p>{eyebrow}</p><h1>{title}</h1></section>{children}<SiteFooter/></main>
}