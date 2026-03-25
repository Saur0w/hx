"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);
}

interface LandingProps {
    ready?: boolean;
}

export default function Landing({ ready = true }: LandingProps) {
    const landingRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (!ready || !headingRef.current) return;

        const split = new SplitText(headingRef.current, {
            type: "lines, words",
            linesClass: styles.splitLine
        });

        gsap.set(split.words, {
            yPercent: 110,
            opacity: 0
        });

        gsap.to(split.words, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: "power4.out",
            delay: 0.2
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: landingRef.current,
                start: "top top",
                end: "+=120%",
                pin: true,
                scrub: 1,
                anticipatePin: 1,
            }
        });

        tl.to(split.words, {
            yPercent: -25,
            opacity: 0,
            duration: 0.35,
            stagger: 0.01
        }, 0);

        return () => split.revert();

    }, {
        scope: landingRef,
        dependencies: [ready]
    });

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.gridOverlay}>
                <div className={styles.hLineTop} />
                <div className={styles.hLineBottom} />
                <div className={styles.vLineLeft} />
                <div className={styles.vLineMidLeft} />
                <div className={styles.vLineMidLeft2} />
                <div className={styles.vLineMidRight} />
                <div className={styles.vLineMidRight2} />
                <div className={styles.vLineRight} />
            </div>

            <div className={styles.left}>
                <h1 className={styles.heading} ref={headingRef}>
                    Built for stillness.<br />
                    Designed to last in <br />
                    rooms that mean <br />
                    something.
                </h1>
                <p className={styles.para}>
                    For when the day finally slows down.<br />
                    When the room gets quiet and everything that<br />
                    mattered stops mattering.
                    Raya was made for<br />
                    exactly this.
                </p>
            </div>

            <div className={styles.right}>
                <div className={styles.imageWrap}>
                    <Image
                        src="/images/landing.jpg"
                        alt="Raya lounge chair"
                        fill
                        sizes="52vw"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}