"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(SplitText, useGSAP);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

    }, {
        scope: landingRef
    });
    return (
        <section className={styles.landing}>
            <div className={styles.imageContainer}>
                <Image src="/images/landing.jpg"
                       alt="Raya lounge chair"
                       fill
                       sizes="100vw"
                       priority
                />
                <div className={styles.overlay} />
            </div>
            <header className={styles.header}>
                <span className={styles.brand}>Essesi Studio</span>
                <nav className={styles.nav}>
                    <span>Gallery</span>
                    <Link href="/" className={styles.navLink}>Love House&nbsp;↗</Link>
                </nav>
            </header>

            <div className={styles.content}>
                <h1 className={styles.heading}>
                    Designed for<br />
                    rooms that don&#39;t<br />
                    need explaining.
                </h1>
            </div>

            <div className={styles.via}>
                <h2 className={styles.title}>
                    RAYA BY<br />ESSESI
                </h2>
                <p className={styles.splitBody}>
                    Designed for spaces that don&#39;t<br />
                    need more furniture. Sometimes<br />
                    the room already knows what it<br />
                    wants.
                </p>
            </div>

            <footer className={styles.footer}>
                <span>Cover</span>
                <span>Scroll Down</span>
            </footer>
        </section>
    );
}