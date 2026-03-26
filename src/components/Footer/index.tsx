"use client";

import styles from "./style.module.scss";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className={styles.footer}>

            <div className={styles.left}>
                <Link href="/">COVER</Link>
            </div>

            <div className={styles.right}>
                <Link href="/">SCROLL DOWN</Link>
            </div>

        </footer>
    );
}