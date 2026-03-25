"use client";

import styles from "./style.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";

gsap.registerPlugin(SplitText, useGSAP);

interface PreloaderProps {
    onComplete?: () => void; // page.tsx calls this when preloader exits
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const rootRef    = useRef<HTMLDivElement>(null);
    const brandRef   = useRef<HTMLHeadingElement>(null);
    const cardRef    = useRef<HTMLDivElement>(null);
    const navRef     = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const split = new SplitText(brandRef.current!, { type: "chars" });

            // ── Initial states ────────────────────────────────────────────
            gsap.set(split.chars,       { yPercent: 120, opacity: 0 });
            gsap.set(cardRef.current,   { clipPath: "inset(100% 0% 0% 0%)" });
            gsap.set(navRef.current,    { opacity: 0 });

            // ── Timeline ──────────────────────────────────────────────────
            gsap.timeline({
                onComplete: () => onComplete?.(),
            })
                // Nav fades in
                .to(navRef.current, {
                    opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.2,
                })
                // Brand chars stagger up
                .to(split.chars, {
                    yPercent: 0, opacity: 1,
                    duration: 0.85, stagger: 0.038, ease: "power3.out",
                }, "-=0.1")
                // Image card wipes up
                .to(cardRef.current, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.8, ease: "power3.inOut",
                }, "-=0.3")
                // Hold
                .to({}, { duration: 0.9 })
                // Entire preloader clips upward OUT
                .to(rootRef.current, {
                    clipPath: "inset(0% 0% 100% 0%)",
                    duration: 1.05, ease: "power4.inOut",
                });
        },
        { scope: rootRef }
    );

    return (
        <div className={styles.preloader} ref={rootRef}>

            <nav className={styles.nav} ref={navRef}>
                <span>ESSESI STUDIO</span>
                <span>RAYA COLLECTION</span>
                <span>INFORMATION</span>
                <span>GALLERY</span>
            </nav>

            <div className={styles.main}>
                <h1 className={styles.brand} ref={brandRef}>©SAMEOLD</h1>

                <div className={styles.card} ref={cardRef}>
                    <Image
                        src="/images/chair.jpg"
                        alt=""
                        fill
                        style={{ objectFit: "cover", objectPosition: "center 30%" }}
                        priority
                    />
                </div>
            </div>

        </div>
    );
}