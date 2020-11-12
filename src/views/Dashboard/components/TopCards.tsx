import React, { useCallback, useEffect, useState } from "react";

import numeral from "numeral";
import { Box, Card, CardContent, Spacer } from "react-neu";

import FancyValue from "components/FancyValue";
import useYam from "hooks/useYam";
import { bnToDec } from "utils";

import {
  getCurrentPrice,
  getScalingFactor,
  getMaxSupply,
  getMarketCap,
  getProjectedRebase,
  getProjectedMint,
  getProjectedRebasePercent,
  getProjectedMintPercent,
  getRebaseType,
  getDPIPrice,
  getYam,
  getWETHPrice,
} from "yam-sdk/utils";
import Split from "components/Split";
import useTreasury from "hooks/useTreasury";
import Rebase from "views/Home/components/Rebase";
import { useWallet } from "use-wallet";

const TopCards: React.FC = () => {
  const yam = useYam();
  const { totalYUsdValue, totalDPIValue, totalWETHValue } = useTreasury();
  const [currentPrice, setCurrentPrice] = useState<string>();
  const [scalingFactor, setScalingFactor] = useState<string>();
  const [maxSupply, setMaxSupply] = useState<string>();
  const [marketCap, setMarketCap] = useState<string>();
  const [dpiPrice, setDPIPrice] = useState<number>();
  const [wethPrice, setWETHPrice] = useState<number>();
  const [projectedRebase, setProjectedRebase] = useState<string>();
  const [projectedMint, setProjectedMint] = useState<string>();
  const [projectedRebasePercent, setProjectedRebasePercent] = useState<string>();
  const [change24, setChange24] = useState<string>();
  const { status } = useWallet();

  const fetchOnce = useCallback(async () => {
    const yamValues = await getYam();
    const dpiPrice = await getDPIPrice();
    const wethPrice = await getWETHPrice();
    setMaxSupply(numeral(yamValues.market_data.max_supply).format("0.00a"));
    setMarketCap(numeral(yamValues.market_data.market_cap.usd).format("0.00a"));
    setChange24(numeral(yamValues.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%");
    setDPIPrice(dpiPrice);
    setWETHPrice(wethPrice);
  }, [setMaxSupply, setMarketCap, setDPIPrice, setChange24]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [status]);

  const fetchStats = useCallback(async () => {
    if (status === "connected") {
      if (!yam) return;
      const price = await getCurrentPrice(yam);
      const factor = await getScalingFactor(yam);
      const projectedRebase = await getProjectedRebase(yam);
      const rebaseType = getRebaseType(projectedRebase);
      const projectedRebasePercent = await getProjectedRebasePercent(yam);
      // const projectedMint = await getProjectedMint(yam);
      setCurrentPrice(numeral(bnToDec(price)).format("0.00a"));
      setScalingFactor(numeral(bnToDec(factor)).format("0.00a"));
      setProjectedRebase((rebaseType ? "+" : "") + numeral(projectedRebase).format("0.00a"));
      setProjectedRebasePercent(numeral(projectedRebasePercent).format("0.00a") + "%");
      // setProjectedMint(numeral(projectedMint).format("0.00a"));
    }
  }, [yam, setCurrentPrice, setScalingFactor, setProjectedRebase, setProjectedMint, setProjectedRebasePercent]);

  useEffect(() => {
    fetchStats();
    let refreshInterval = setInterval(fetchStats, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchStats, yam]);

  const assetYUSD = totalYUsdValue * 1.15;
  const assetDPI = (totalDPIValue ? totalDPIValue : 0) * (dpiPrice ? dpiPrice : 0);
  const assetWETH = (totalWETHValue ? totalWETHValue : 0) * (wethPrice ? wethPrice : 0);

  const treasuryAssets = assetYUSD + assetDPI + assetWETH;
  const treasuryValue =
    typeof totalYUsdValue !== "undefined" && totalYUsdValue !== 0
      ? "~$" + numeral(treasuryAssets).format("0.00a")
      : "--";

  const col = [
    [
      {
        icon: "💲",
        label: "Current price TWAP",
        value: currentPrice ? `${currentPrice} yUSD` : "--",
        hint: change24 ? change24 : "-",
        tooltip: "24h Change",
      },
      {
        icon: "🚀",
        label: "Scaling factor",
        value: scalingFactor ? `x${scalingFactor}` : "--",
        hint: "",
        tooltip: "",
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
      {
        icon: "🍠",
        label: "YAM rebase impact",
        value: projectedRebase ? projectedRebase : "--",
        hint: projectedRebasePercent ? projectedRebasePercent : "-",
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
      <Rebase type="bar" />
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
            />
          </CardContent>
        </Card>
        <Spacer />
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[0][1].icon}
              label={col[0][1].label}
              value={col[0][1].value}
              hint={col[0][1].hint}
              tooltip={col[0][1].tooltip}
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
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[1][1].icon}
              label={col[1][1].label}
              value={col[1][1].value}
              hint={col[1][1].hint}
              tooltip={col[1][1].tooltip}
            />
          </CardContent>
        </Card>
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
        <Spacer />
        <Card>
          <CardContent>
            <FancyValue
              wrap
              icon={col[2][1].icon}
              label={col[2][1].label}
              value={col[2][1].value}
              hint={col[2][1].hint}
              tooltip={col[2][1].tooltip}
            />
          </CardContent>
        </Card>
      </Box>
    </Split>
  );
};

export default TopCards;
