import Link from "next/link";
import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

const Layout = ({ children }) => {
  return (
    <div className="max-w-screen overflow-hidden">
      <div className="flex flex-col justify-center p-[26px] h-[80px] border-b border-black ">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-[20px] items-center">
            <img src="/bot.svg" alt="" />
            <span className="font-[700] text-[24px] text-primary">
              {" "}
              BOTCOIN
            </span>
          </div>
          <div className="flex flex-row gap-[30px] items-center">
            <Link href="/" className="text-[20px] text-primary font-[500]">
              Explore
            </Link>
            <Link href="/use" className="text-[20px] text-primary font-[500]">
              My Bots
            </Link>
            <ConnectWallet className="connect-wallet" />
          </div>
        </div>
      </div>
      <div className="px-[30px] py-[32px] overflow-hidden"> {children}</div>
    </div>
  );
};

export default Layout;
