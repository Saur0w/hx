"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Des from "@/components/Des";
import Lenis from "lenis";
import Grid from "@/components/Grid";

export default function Home() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        document.body.style.overflow = ready ? "" : "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [ready]);

    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Grid>
            <div className={styles.page}>
                {!ready && <Preloader onComplete={() => setReady(true)} />}
                {ready && (
                    <>
                        <Landing ready={ready} />
                        <Des ready={ready} />
                    </>
                )}
            </div>
        </Grid>
    );
}