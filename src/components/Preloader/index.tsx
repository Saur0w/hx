"use client";

import styles from "./style.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const leftNumRef = useRef<HTMLSpanElement>(null);
    const colLeftRef = useRef<HTMLDivElement>(null);
    const colRightRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const fmt = (n: number) => String(Math.floor(n)).padStart(2, "0");
            const targetNumber = 84;

            gsap.set([colLeftRef.current, colRightRef.current], { opacity: 0, y: 40 });

            const tl = gsap.timeline({
                onComplete: () => {
                    const outroTl = gsap.timeline({ onComplete });

                    outroTl.to([colLeftRef.current, colRightRef.current], {
                        yPercent: -30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power3.inOut",
                    })
                        .to(preloaderRef.current, {
                            clipPath: "inset(0% 0% 100% 0%)",
                            duration: 1.2,
                            ease: "expo.inOut",
                        }, "-=0.4");
                },
            });

            tl
                .to([colLeftRef.current, colRightRef.current], {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: "expo.out",
                })

                .to({ val: 0 }, {
                    val: targetNumber,
                    duration: 2.5,
                    ease: "power4.inOut",
                    onUpdate: function () {
                        if (leftNumRef.current) {
                            leftNumRef.current.textContent = fmt((this as any).targets()[0].val);
                        }
                    },
                }, "<");
            tl.to({}, { duration: 0.4 });
        },
        { scope: preloaderRef }
    );

    return (
        <div className={styles.preloader} ref={preloaderRef}>
            <div className={styles.colLeft} ref={colLeftRef}>
                <span className={styles.num} ref={leftNumRef}>00</span>
            </div>
            <div className={styles.colRight} ref={colRightRef}>
                <span className={styles.num}>84</span>
            </div>
        </div>
    );
}