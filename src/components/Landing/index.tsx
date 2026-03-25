"use client";

import styles from "./style.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, useGSAP, ScrollTrigger);

interface LandingProps {
    ready?: boolean;
}

export default function Landing({ ready = false }: LandingProps) {
    const landingRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready) return;

        const split = new SplitText(".heading", {
            type: "lines, words",
            linesClass: styles.splitLine
        });

        gsap.set(split.words, {
            yPercent: 110,
            opacity: 0
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

        tl
            .to("heading", {
                yPercent: -25,
                opacity: 0,
                duration: 0.35
            }, 0)

    }, {
        scope: landingRef,
        dependencies: [ready]
    });
    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.left}>
                <h1 className={styles.heading}>
                    Built for stillness.<br />
                    Designed to last in rooms that mean something.
                </h1>
                <p className={styles.para}>For when the day finally slows down.<br />
                    When the room gets quiet and everything that mattered stops mattering.<br />
                    Raya was made for exactly this.</p>
            </div>
            <div className={styles.right}>

            </div>
        </section>
    );
}