import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles["link-container"]}>
          <h1>이미지 생성</h1>
          <Link href="/dot">
            <h3 className={styles["link-dot"]}>도트 찍기</h3>
          </Link>
        </div>
      </main>
    </div>
  );
}
