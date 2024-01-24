import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId="8ceb855728f21b402a6f0f73b3e5cc16"
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}
