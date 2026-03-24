"use client";

import styles from "./style.module.scss";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(SplitText, useGSAP);

export default function Landing() {
    const landingRef = useRef<HTMLDivElement>(null);

    return (
        <section className={styles.landing} ref={landingRef}>
            <div className={styles.leftContainer}>
                <h1 className={styles.heading}>
                    Built for Stillness. <br />
                    Designed to last in rooms that mean something.
                </h1>

                <p className={styles.para}>
                    For when the day finally slows down.
                    <br />
                    When the room gets quiet and everything that
                    <br />
                    mattered stops mattering. Raya was made for
                    <br />
                    exactly this.
                </p>
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.imageWrap}>
                    <Image src="/images/int.jpg"
                           alt="Raya lounge chair in a darkened interior"
                           fill
                           sizes="52vw"
                           priority
                    />
                </div>
            </div>
        </section>
    )
}