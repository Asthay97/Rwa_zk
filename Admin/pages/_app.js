import "@/styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import Header from "@/components/Header";

export default function App({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <Header />
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  );
}
