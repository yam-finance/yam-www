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
} from "yam-sdk/utils";
import Split from "components/Split";
import useTreasury from "hooks/useTreasury";
import Rebase from "views/Home/components/Rebase";
import { useWallet } from "use-wallet";

const TopCards: React.FC = () => {
  const yam = useYam();
  const [currentPrice, setCurrentPrice] = useState<string>();
  const [scalingFactor, setScalingFactor] = useState<string>();
  const [maxSupply, setMaxSupply] = useState<string>();
  const [marketCap, setMarketCap] = useState<string>();
  const [projectedRebase, setProjectedRebase] = useState<string>();
  const [projectedMint, setProjectedMint] = useState<string>();
  const [projectedRebasePercent, setProjectedRebasePercent] = useState<string>();
  const { status } = useWallet();

  const fetchOnce = useCallback(async () => {
    const maxSupply = await getMaxSupply();
    const marketCap = await getMarketCap();
    setMaxSupply(numeral(maxSupply).format("0.00a"));
    setMarketCap(numeral(marketCap).format("0.00a"));
  }, [setMaxSupply, setMarketCap]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [status]);

  const fetchStats = useCallback(async () => {
    if (!yam) return;
    const price = await getCurrentPrice(yam);
    const factor = await getScalingFactor(yam);
    const projectedRebase = await getProjectedRebase(yam);
    const rebaseType = getRebaseType(projectedRebase);
    // const projectedMint = await getProjectedMint(yam);
    // const projectedRebasePercent = await getProjectedRebasePercent(yam);
    setCurrentPrice(numeral(bnToDec(price)).format("0.00a"));
    setScalingFactor(numeral(bnToDec(factor)).format("0.00a"));
    setProjectedRebase((rebaseType ? "+" : "") + numeral(projectedRebase).format("0.00a"));
    // setProjectedMint(numeral(projectedMint).format("0.00a"));
    // setProjectedRebasePercent(numeral(projectedRebasePercent).format("0.00a"));
  }, [
    setCurrentPrice,
    setScalingFactor,
    setProjectedRebase,
    setProjectedMint,
    setProjectedRebasePercent,
    yam,
  ]);

  useEffect(() => {
    fetchStats();
    let refreshInterval = setInterval(fetchStats, 10000);
    return () => clearInterval(refreshInterval);
  }, [fetchStats, yam]);

  const { totalYUsdValue } = useTreasury();
  const treasuryValue =
    typeof totalYUsdValue !== "undefined" && totalYUsdValue !== 0
      ? "$" + numeral(totalYUsdValue * 1.15).format("0.00a")
      : "--";

  const col = [
    [
      {
        icon: "💲",
        label: "Current price TWAP",
        value: currentPrice ? `${currentPrice} yUSD` : "--",
      },
      {
        icon: "🚀",
        label: "Scaling factor",
        value: scalingFactor ? `x${scalingFactor}` : "--",
      },
    ],
    [
      {
        icon: "🧱",
        label: "YAM total supply",
        value: maxSupply ? maxSupply : "--",
      },
      {
        icon: "🍠",
        label: "YAM to be rebased",
        value: projectedRebase ? projectedRebase : "--", // -2.0%
      },
    ],
    [
      {
        icon: "🌎",
        label: "Marketcap",
        value: marketCap ? `$${marketCap}` : "--",
      },
      {
        icon: "💰",
        label: "Treasury value",
        value: treasuryValue ? treasuryValue : "--",
      },
    ],
  ];

  return (
    <Split>
      <Rebase type="bar" />
      <Box column>
        <Card>
          <CardContent>
            <FancyValue wrap icon={col[0][0].icon} label={col[0][0].label} value={col[0][0].value} />
          </CardContent>
        </Card>
        <Spacer />
        <Card>
          <CardContent>
            <FancyValue wrap icon={col[0][1].icon} label={col[0][1].label} value={col[0][1].value} />
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue wrap icon={col[1][0].icon} label={col[1][0].label} value={col[1][0].value} />
          </CardContent>
        </Card>
        <Spacer />
        <Card>
          <CardContent>
            <FancyValue wrap icon={col[1][1].icon} label={col[1][1].label} value={col[1][1].value} />
          </CardContent>
        </Card>
      </Box>
      <Box column>
        <Card>
          <CardContent>
            <FancyValue wrap icon={col[2][0].icon} label={col[2][0].label} value={col[2][0].value} />
          </CardContent>
        </Card>
        <Spacer />
        <Card>
          <CardContent>
            <FancyValue wrap icon={col[2][1].icon} label={col[2][1].label} value={col[2][1].value} />
          </CardContent>
        </Card>
      </Box>
    </Split>
  );
};

export default TopCards;
