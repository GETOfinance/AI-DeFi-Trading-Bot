import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import Layout from "../components/Layout/Layout";
import BotPanel from "../components/Layout/BotPanel";
import sendTelegramMessage from "../actions/welcome";

export default function Use() {
  const router = useRouter();
  const { id, first_name, last_name, username, photo_url, auth_date, hash } =
    router.query;

  const isLoggedIn = Boolean(id);

  console.log(id);

  const [series, setSeries] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("ethereum");

  useEffect(() => {
    if (isLoggedIn && id) {
      const welcomeMessage = "Hello This is Botcoin!";
      sendTelegramMessage(id, welcomeMessage)
        .then((response) => console.log("Message sent:", response))
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCurrency}/ohlc?vs_currency=usd&days=14`
      );
      const formattedData = response.data.map((ohlc) => ({
        x: new Date(ohlc[0]),
        y: [ohlc[1], ohlc[2], ohlc[3], ohlc[4]],
      }));
      setSeries([{ data: formattedData }]);
    };

    fetchData();
  }, [selectedCurrency]);

  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },

    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Layout>
      <div className="flex flex-row">
        <BotPanel />
        <div className="w-full flex-shrink-0 ">
          <div className=" flex flex-row h-[70px] w-full  border border-[#DCD2C7]">
            <div className="w-[160px] px-[40px] py-[21px] items-center border-r">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className=" outline-none font-[700] text-grey text-[20px]"
              >
                <option value="ethereum">ETH</option>
                <option value="usd-coin">USDC</option>
                <option value="tether">USDT</option>
                <option value="chainlink">LINK</option>
              </select>
            </div>
            <div className="absolute top-[125px] right-[30px]">
              {!isLoggedIn ? (
                <TelegramLoginButton
                  botName="EntropyTesting_Bot"
                  dataOnauth={(user) => console.log(user)}
                  dataAuthUrl="https://cab7-2406-7400-63-1b8a-d5d9-5a04-9b08-5cd2.ngrok-free.app/use"
                  cornerRadius={5}
                />
              ) : (
                <div className="flex flex-row gap-[5px] px-[10px] items-center rounded-[5px] bg-[#54A9EA] w-[160px] h-[40px]">
                  <img
                    className="h-[30px] w-[30px] rounded-full"
                    src={decodeURIComponent(photo_url)}
                    alt=""
                  />
                  <span className="text-white font-[16px]">
                    {first_name} {last_name}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <div className="chart">
              <ApexChart
                options={options}
                series={series}
                type="candlestick"
                height={700}
                width={1000}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
