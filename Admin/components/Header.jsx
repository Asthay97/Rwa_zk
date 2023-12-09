// import necessary modules and components
import { ConnectButton } from "web3uikit"; // Importing COnnectButton A component to connect to a Web3 provider
import styles from "@/styles/Home.module.css";
import Link from "next/link"; // component to add navigation links to other pages

export default function Header() {
  return (
    <div flex="row" className={styles.home_header}>
      <h1>Promissory</h1>
      <div className={styles.navlinks}>
        {/*  Render navigation links using the Link component  */}
        {/* <Link href="/">HOme</Link>
        <Link href="/owner">Owner</Link>
        <Link href="/investor">Investor</Link> */}
      </div>
      <div>
        {/* Pass the prop moralisAuth as false to the ConnectButton component as we are not usinng it */}
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
