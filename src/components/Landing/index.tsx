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
    const landingRef    = useRef<HTMLDivElement>(null);
    const headingRef    = useRef<HTMLHeadingElement>(null);
    const paraRef       = useRef<HTMLParagraphElement>(null);
    const imageWrapRef  = useRef<HTMLDivElement>(null);
    const imageInnerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready || !headingRef.current || !paraRef.current) return;

        // ── Split both text nodes ──────────────────────────────────────
        const splitH = new SplitText(headingRef.current, {
            type      : "lines, words",
            linesClass: styles.splitLine,
        });

        const splitP = new SplitText(paraRef.current, {
            type      : "lines",
            linesClass: styles.splitLine,
        });

        // ── Initial hidden states (GSAP owns these, not CSS) ───────────
        gsap.set(splitH.words,        { yPercent: 110, opacity: 0 });
        gsap.set(splitP.lines,        { yPercent: 100, opacity: 0 });
        gsap.set(imageWrapRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(imageInnerRef.current, { scale: 1.12 });

        // ── Single entrance timeline ───────────────────────────────────
        const tl = gsap.timeline({ delay: 0.15 });

        tl
            // heading words slide up
            .to(splitH.words, {
                yPercent : 0,
                opacity  : 1,
                duration : 1.0,
                stagger  : 0.03,
                ease     : "power4.out",
            })

            // image curtain lifts simultaneously
            .to(imageWrapRef.current, {
                clipPath : "inset(0% 0% 0% 0%)",
                duration : 1.1,
                ease     : "expo.inOut",
            }, 0.25)

            // image scale settles (Ken Burns)
            .to(imageInnerRef.current, {
                scale    : 1,
                duration : 1.6,
                ease     : "power3.out",
            }, 0.25)

            // para lines stagger in after heading lands
            .to(splitP.lines, {
                yPercent : 0,
                opacity  : 1,
                duration : 0.75,
                stagger  : 0.09,
                ease     : "power3.out",
            }, 0.55);

        // ── Scroll-out ─────────────────────────────────────────────────
        const stOut = gsap.timeline({
            scrollTrigger: {
                trigger      : landingRef.current,
                start        : "top top",
                end          : "+=120%",
                pin          : true,
                scrub        : 1,
                anticipatePin: 1,
            },
        });

        stOut
            .to(splitH.words, {
                yPercent : -20,
                opacity  : 0,
                duration : 0.35,
                stagger  : 0.01,
            }, 0)
            .to(splitP.lines, {
                yPercent : -15,
                opacity  : 0,
                duration : 0.3,
                stagger  : 0.05,
            }, 0.04)
            .to(imageWrapRef.current, {
                clipPath : "inset(0% 0% 100% 0%)",
                duration : 0.5,
                ease     : "power2.in",
            }, 0.1);

        return () => {
            splitH.revert();
            splitP.revert();
        };

    }, {
        scope       : landingRef,
        dependencies: [ready],
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
                    Designed to last in<br />
                    rooms that mean<br />
                    something.
                </h1>
                <p className={styles.para} ref={paraRef}>
                    For when the day finally slows down.<br />
                    When the room gets quiet and everything that<br />
                    mattered stops mattering.<br />
                    Raya was made for exactly this.
                </p>
            </div>

            <div className={styles.right}>
                <div className={styles.imageWrap} ref={imageWrapRef}>
                    <div className={styles.imageInner} ref={imageInnerRef}>
                        <Image
                            src="/images/landing.jpg"
                            alt="Raya lounge chair"
                            fill
                            sizes="52vw"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}