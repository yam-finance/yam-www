import React, { useCallback, useEffect, useState } from "react";

import numeral from "numeral";
import { Box, Card, CardContent, Spacer } from "react-neu";

import FancyValue from "components/FancyValue";
import useYam from "hooks/useYam";
import { bnToDec } from "utils";

import { getCurrentPrice, getDPIPrice, getYam, getWETHPrice, getYUSDPrice, getYamPrice } from "yam-sdk/utils";
import Split from "components/Split";
import useTreasury from "hooks/useTreasury";
import { useWallet } from "use-wallet";

const TopCards: React.FC = () => {
  const yam = useYam();
  const { totalYUsdValue, totalDPIValue, totalWETHValue, totalIndexLPValue, totalIndexCoop, totalSushi } = useTreasury();
  const [currentPrice, setCurrentPrice] = useState<string>();
  const [scalingFactor, setScalingFactor] = useState<string>();
  const [maxSupply, setMaxSupply] = useState<string>();
  const [marketCap, setMarketCap] = useState<string>();
  const [yusdPrice, setYUSDPrice] = useState<number>();
  const [dpiPrice, setDPIPrice] = useState<number>();
  const [wethPrice, setWETHPrice] = useState<number>();
  const [change24, setChange24] = useState<string>();
  const { status } = useWallet();

  const fetchOnce = useCallback(async () => {
    const yamValues = await getYam();

    const yusdPrice = await getYUSDPrice();
    const dpiPrice = await getDPIPrice();
    const wethPrice = await getWETHPrice();
    setMaxSupply(numeral(yamValues.market_data.max_supply).format("0.00a"));
    setMarketCap(numeral(yamValues.market_data.market_cap.usd).format("0.00a"));
    setChange24(numeral(yamValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setYUSDPrice(yusdPrice);
    setDPIPrice(dpiPrice);
    setWETHPrice(wethPrice);
  }, [setMaxSupply, setMarketCap, setYUSDPrice, setDPIPrice, setChange24]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [status]);

  const fetchStats = useCallback(async () => {
    if (status === "connected") {
      if (!yam) return;
      // const price = await getCurrentPrice(yam);
      // setCurrentPrice(numeral(bnToDec(price)).format("0.00a"));
      const price = await getYamPrice();
      setCurrentPrice(numeral(price).format("0.00a"));
    }
  }, [yam, setCurrentPrice, setScalingFactor]);

  useEffect(() => {
    fetchStats();
    let refreshInterval = setInterval(fetchStats, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchStats, yam]);

  const assetYUSD = (totalYUsdValue || 0) * (yusdPrice || 0);
  const assetDPI = (totalDPIValue || 0) * (dpiPrice || 0);
  const assetWETH = (totalWETHValue || 0) * (wethPrice || 0);
  const assetIndex = totalIndexCoop ? totalIndexCoop : 0;
  const assetIndexLP = totalIndexLPValue ? totalIndexLPValue : 0;
  const treasuryAssets = assetYUSD + assetDPI + assetWETH + assetIndexLP + assetIndex + totalSushi;
  const treasuryValue = typeof totalYUsdValue !== "undefined" && totalYUsdValue !== 0 ? "~$" + numeral(treasuryAssets).format("0.00a") : "--";

  const col = [
    [
      {
        icon: "💲",
        label: "Current price",
        value: currentPrice ? `${currentPrice} USDC` : "--",
        hint: change24 ? change24 : "-",
        tooltip: "24h Change",
      },
    ],
    [
      {
        icon: "🧱",
        label: "YAM total supply",
        value: maxSupply ? maxSupply : "--",
        hint: "",
        tooltip: "",
      },
    ],
    [
      {
        icon: "🌎",
        label: "Marketcap",
        value: marketCap ? `$${marketCap}` : "--",
        hint: "",
        tooltip: "",
      },
    ],
    [
      {
        icon: "💰",
        label: "Treasury value",
        value: treasuryValue ? treasuryValue : "--",
        hint: "",
        tooltip: "",
      },
    ],
  ];

  return (
    <Split>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[0][0].icon}
              label={col[0][0].label}
              value={col[0][0].value}
              hint={col[0][0].hint}
              tooltip={col[0][0].tooltip}
              isNum={true}
            />
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[1][0].icon}
              label={col[1][0].label}
              value={col[1][0].value}
              hint={col[1][0].hint}
              tooltip={col[1][0].tooltip}
            />
          </CardContent>
        </Card>
        <Spacer />
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[2][0].icon}
              label={col[2][0].label}
              value={col[2][0].value}
              hint={col[2][0].hint}
              tooltip={col[2][0].tooltip}
            />
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[3][0].icon}
              label={col[3][0].label}
              value={col[3][0].value}
              hint={col[3][0].hint}
              tooltip={col[3][0].tooltip}
            />
          </CardContent>
        </Card>
      </Box>
    </Split>
  );
};

export default TopCards;
