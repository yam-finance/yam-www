import { useCallback, useEffect, useMemo, useState } from "react";

import { yUsd as yUsdAddress, yamv3 as yamV3Address, DPI as DPIAddress, WETH, INDEX, UMA as UMAAddress } from "constants/tokenAddresses";

import usePrices from "hooks/usePrices";
import useTokenBalance from "hooks/useTokenBalance";
import { getDPIPrice, getIndexCoopLP, getIndexCoopLPRewards, getINDEXCOOPPrice, getSUSHIPrice, getSushiRewards, getWETHPrice } from "yam-sdk/utils";
import useYam from "./useYam";

const treasuryAddress = "0x97990b693835da58a281636296d2bf02787dea17";

const useTreasury = () => {
  const { yamTwap } = usePrices();
  const yam = useYam();
  const yamBalance = useTokenBalance(treasuryAddress, yamV3Address);
  const yUsdBalance = useTokenBalance(treasuryAddress, yUsdAddress);
  const totalDPIValue = useTokenBalance(treasuryAddress, DPIAddress);
  const totalWETHValue = useTokenBalance(treasuryAddress, WETH);
  const totalUMAValue = useTokenBalance(treasuryAddress, UMAAddress);
  const [totalIndexLPValue, setTotalIndexLPValue] = useState<number>(0);
  const [rewardsIndexCoop, setRewardsIndexCoop] = useState<number>(0);
  const [totalBalanceValueIndexCoop, setTotalBalanceValueIndexCoop] = useState<number>(0);
  const [totalLpRewardsValueIndexCoop, setTotalLpRewardsValueIndexCoop] = useState<number>(0);
  const [rewardsSushi, setRewardsSushi] = useState<number>(0);

  // revamp
  const totalBalanceIndexCoop = useTokenBalance(treasuryAddress, INDEX) || 0;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const fetchValues = useCallback(async () => {
    if (!yam) {
      return;
    }

    const indexCoopPrice = (await getINDEXCOOPPrice()) || 0;
    const sushiPrice = (await getSUSHIPrice()) || 0;

    const rewardsIndexCoop = (await getIndexCoopLPRewards(yam)) || 0;
    const totalBalanceValueIndexCoop = totalBalanceIndexCoop * indexCoopPrice;
    const totalLpRewardsValueIndexCoop = rewardsIndexCoop * indexCoopPrice;
    setRewardsIndexCoop(rewardsIndexCoop);
    setTotalBalanceValueIndexCoop(totalBalanceValueIndexCoop);
    setTotalLpRewardsValueIndexCoop(totalLpRewardsValueIndexCoop);

    const wethPrice = (await getWETHPrice()) || 0;
    const dpiPrice = (await getDPIPrice()) || 0;
    const totalIndexLPValue = 2929 * dpiPrice + 640 * wethPrice;
    setTotalIndexLPValue(totalIndexLPValue);

    const rewardsSushi = (await getSushiRewards(yam)) || 0;
    const totalSushi = rewardsSushi * sushiPrice;
    setRewardsSushi(totalSushi);
  }, [yam, totalBalanceIndexCoop, setRewardsIndexCoop, setRewardsSushi]);

  useEffect(() => {
    fetchValues();
    // let refreshInterval = setInterval(() => fetchValues(), 100000);
    // return () => clearInterval(refreshInterval);
  }, [yam, totalBalanceIndexCoop, setRewardsIndexCoop, setRewardsSushi]);

  const totalIndexCoop = totalBalanceValueIndexCoop + totalLpRewardsValueIndexCoop;
  const totalSushi = rewardsSushi;

  const totalYUsdValue = useMemo(() => {
    const yamYUsdValue = yamTwap && yamBalance ? yamTwap * yamBalance : 0;
    return yUsdBalance ? yUsdBalance + yamYUsdValue : yamYUsdValue;
  }, [yamBalance, yamTwap, yUsdBalance]);

  return {
    totalYUsdValue,
    totalDPIValue,
    totalWETHValue,
    totalIndexLPValue,
    totalUMAValue,
    yamBalance,
    yUsdBalance,

    // revamp
    totalBalanceIndexCoop,
    totalBalanceValueIndexCoop,
    totalLpRewardsValueIndexCoop,
    totalIndexCoop,
    totalSushi,
  };
};

export default useTreasury;
