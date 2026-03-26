"use client";

import styles from "./page.module.css";
import Landing from "@/components/Landing";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";

export default function Home() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        document.body.style.overflow = ready ? "" : "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [ready]);

    return (
        <div className={styles.page}>
            {!ready && <Preloader onComplete={() => setReady(true)} />}
            {ready  && <Landing ready={ready} />}
        </div>
    );
}
