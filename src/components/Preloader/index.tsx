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
    const preloaderRef     = useRef<HTMLDivElement>(null);
    const leftNumRef  = useRef<HTMLSpanElement>(null);
    const rightNumRef = useRef<HTMLSpanElement>(null);
    const colLeftRef  = useRef<HTMLDivElement>(null);
    const colRightRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const fmt = (n: number) => String(Math.floor(n)).padStart(2, "0");

            gsap.set([colLeftRef.current, colRightRef.current], { opacity: 0, y: 12 });

            const tl = gsap.timeline({
                onComplete: () => {
                    const tl = gsap.timeline({ onComplete });

                    // 1. numbers vanish first
                    tl.to([leftNumRef.current, rightNumRef.current], {
                        yPercent : -18,
                        opacity  : 0,
                        duration : 0.45,
                        stagger  : 0.06,
                        ease     : "power3.in",
                    })
                        // 2. panel wipes up
                        .to(preloaderRef.current, {
                            clipPath : "inset(0% 0% 100% 0%)",
                            duration : 0.9,
                            ease     : "expo.inOut",
                        }, "-=0.1");
                },
            });

            tl
                .to([colLeftRef.current, colRightRef.current], {
                    opacity  : 1,
                    y        : 0,
                    duration : 0.55,
                    stagger  : 0.12,
                    ease     : "power3.out",
                })

                .to({ val: 0 }, {
                    val      : 100,
                    duration : 2.2,
                    ease     : "power2.inOut",
                    onUpdate() {
                        if (leftNumRef.current)
                            leftNumRef.current.textContent = fmt((this as any).targets()[0].val);
                    },
                }, 0.4)

                .to({ val: 0 }, {
                    val      : 100,
                    duration : 1.85,
                    ease     : "power3.inOut",
                    onUpdate() {
                        if (rightNumRef.current)
                            rightNumRef.current.textContent = fmt((this as any).targets()[0].val);
                    },
                }, 0.55)

                .to({}, { duration: 0.55 });
        },
        { scope: preloaderRef }
    );

    return (
        <div className={styles.preloader} ref={preloaderRef}>
            <div className={styles.col} ref={colLeftRef}>
                <span className={styles.num} ref={leftNumRef}>00</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.col} ref={colRightRef}>
                <span className={styles.num} ref={rightNumRef}>00</span>
            </div>
        </div>
    );
}