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

interface MatteProps {
    ready?: boolean;
}

export default function Matter({ ready = true }: MatteProps) {
    const sectionRef      = useRef<HTMLElement>(null);
    const headingRef      = useRef<HTMLHeadingElement>(null);
    const paraRef         = useRef<HTMLParagraphElement>(null);
    const img1Wrap        = useRef<HTMLDivElement>(null);
    const img1Inner       = useRef<HTMLDivElement>(null);
    const img2Wrap        = useRef<HTMLDivElement>(null);
    const img2Inner       = useRef<HTMLDivElement>(null);
    const img3Wrap        = useRef<HTMLDivElement>(null);
    const img3Inner       = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ready || !headingRef.current || !paraRef.current) return;

        const splitH = new SplitText(headingRef.current, {
            type      : "lines, words",
            linesClass: styles.splitLine,
        });
        const splitP = new SplitText(paraRef.current, {
            type      : "lines",
            linesClass: styles.splitLine,
        });

        gsap.set(splitH.words,    { yPercent: 110, opacity: 0 });
        gsap.set(splitP.lines,    { yPercent: 100, opacity: 0 });
        gsap.set(img1Wrap.current, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(img1Inner.current,{ scale: 1.1 });
        gsap.set(img2Wrap.current, { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 });
        gsap.set(img2Inner.current,{ scale: 1.12 });
        gsap.set(img3Wrap.current, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(img3Inner.current,{ scale: 1.1 });

        gsap.timeline({
            scrollTrigger: {
                trigger: img1Wrap.current,
                start  : "top 85%",
                once   : true,
            },
        })
            .to(img1Wrap.current, {
                clipPath : "inset(0% 0% 0% 0%)",
                duration : 1.2,
                ease     : "expo.inOut",
            })
            .to(img1Inner.current, {
                scale    : 1,
                duration : 1.8,
                ease     : "power3.out",
            }, 0)

            .to(img2Wrap.current, {
                clipPath : "inset(0% 0% 0% 0%)",
                opacity  : 1,
                duration : 0.9,
                ease     : "expo.inOut",
            }, 0.45)
            .to(img2Inner.current, {
                scale    : 1,
                duration : 1.4,
                ease     : "power3.out",
            }, 0.45);

        gsap.timeline({
            scrollTrigger: {
                trigger: headingRef.current,
                start  : "top 85%",
                once   : true,
            },
        }).to(splitH.words, {
            yPercent : 0,
            opacity  : 1,
            duration : 1.05,
            stagger  : 0.025,
            ease     : "power4.out",
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: paraRef.current,
                start  : "top 88%",
                once   : true,
            },
        }).to(splitP.lines, {
            yPercent : 0,
            opacity  : 1,
            duration : 0.85,
            stagger  : 0.09,
            ease     : "power3.out",
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: img3Wrap.current,
                start  : "top 90%",
                once   : true,
            },
        })
            .to(img3Wrap.current, {
                clipPath : "inset(0% 0% 0% 0%)",
                duration : 1.0,
                ease     : "expo.inOut",
            })
            .to(img3Inner.current, {
                scale    : 1,
                duration : 1.5,
                ease     : "power3.out",
            }, 0);

        gsap.to(img2Wrap.current, {
            y: -40,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start  : "top bottom",
                end    : "bottom top",
                scrub  : 1.5,
            },
        });

        return () => {
            splitH.revert();
            splitP.revert();
        };

    }, { scope: sectionRef, dependencies: [ready] });

    return (
        <section className={styles.matte} ref={sectionRef}>

            <div className={styles.left}>
                <div className={styles.img1Wrap} ref={img1Wrap}>
                    <div className={styles.img1Inner} ref={img1Inner}>
                        <Image src="/images/silv.jpg" alt="matte finish" fill sizes="28vw" />
                    </div>
                </div>

                <div className={styles.img2Wrap} ref={img2Wrap}>
                    <div className={styles.img2Inner} ref={img2Inner}>
                        <Image src="/images/shadow.jpg" alt="shadow detail" fill sizes="14vw" />
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.textBlock}>
                    <h2 className={styles.heading} ref={headingRef}>
                        Matte black finish.<br />
                        The curve catches light<br />
                        only where it needs to.
                    </h2>

                    <p className={styles.para} ref={paraRef}>
                        From the front, it presents a striking geometric
                        design, with sharp, straight edges that contrast
                        beautifully with the natural curves of the wood.
                        Depending on your vantage point, this chair
                        transforms entirely, offering a unique perspective
                        that changes with each angle you observe.
                    </p>
                </div>

                <div className={styles.img3Wrap} ref={img3Wrap}>
                    <div className={styles.img3Inner} ref={img3Inner}>
                        <Image src="/images/dark.jpg" alt="dark detail" fill sizes="22vw" />
                    </div>
                </div>
            </div>

        </section>
    );
}