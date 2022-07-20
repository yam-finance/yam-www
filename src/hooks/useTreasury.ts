import { useCallback, useEffect, useMemo, useState } from "react";

import { yUsd as yUsdAddress, yamv3 as yamV3Address, DPI as DPIAddress, WETH, INDEX, UMA as UMAAddress, ContractTimelock } from "constants/tokenAddresses";

import usePrices from "hooks/usePrices";
import useTokenBalance from "hooks/useTokenBalance";
import { 
  getTreasury
} from "yam-sdk/utils";
import useYam from "./useYam";

const useTreasury = () => {
  const { yamTwap } = usePrices();
  const yam = useYam();
  const [treasuryValue, setTreasuryValue] = useState<any>(0);

  const fetchValues = useCallback(async () => {
    const getTreasuryValue = await getTreasury();
    setTreasuryValue(getTreasuryValue);
  }, [treasuryValue, setTreasuryValue]);

  // revamp
  //const totalBalanceIndexCoop = useTokenBalance(treasuryAddress, INDEX) || 0;
  // const totalBalanceIndexCoop = useTokenBalance(ContractTimelock, INDEX) || 0;
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  // const fetchValues = useCallback(async () => {
  //   if (!yam) {
  //     return;
  //   }

  //   const sushiPrice = await getSUSHIPrice() || 0;
  //   const wethPrice = await getWETHPrice() || 0;
  //   const dpiPrice = await getDPIPrice() || 0;
  //   const indexCoopPrice = await getINDEXCOOPPrice() || 0;
  //   const rewardsIndexCoop = await getIndexCoopLPRewards(yam) || 0;

  //   const totalBalanceValueIndexCoop = totalBalanceIndexCoop * indexCoopPrice;
  //   const totalLpRewardsValueIndexCoop = rewardsIndexCoop * indexCoopPrice;
  //   setRewardsIndexCoop(rewardsIndexCoop);
  //   setTotalBalanceValueIndexCoop(totalBalanceValueIndexCoop);
  //   setTotalLpRewardsValueIndexCoop(totalLpRewardsValueIndexCoop);

  //   const totalIndexLPValue = 2929 * dpiPrice + 640 * wethPrice;
  //   setTotalIndexLPValue(totalIndexLPValue);

  //   const rewardsSushi = (await getSushiRewards(yam)) || 0;
  //   const totalSushi = rewardsSushi * sushiPrice;
  //   setRewardsSushi(totalSushi);
  // }, [yam, totalBalanceIndexCoop, setRewardsIndexCoop, setRewardsSushi]);

  useEffect(() => {
    fetchValues();
  }, [yam]);

  // const totalIndexCoop = totalBalanceValueIndexCoop + totalLpRewardsValueIndexCoop;
  // const totalSushi = rewardsSushi;

  // const totalYUsdValue = useMemo(() => {
  //   const yamYUsdValue = yamTwap && yamBalance ? yamTwap * yamBalance : 0;
  //   return (yUsdBalance ? yUsdBalance + yamYUsdValue : yamYUsdValue) + 718900;
  // }, [yamBalance, yamTwap, yUsdBalance]);

  // const getAssetsHistory = async () => {
  //   const sushiPrice = await getSUSHIPrice() || 0;
  //   const wethPrice = await getWETHPrice() || 0;
  //   const dpiPrice = await getDPIPrice() || 0;
  //   const indexCoopPrice = await getINDEXCOOPPrice() || 0;
  //   const rewardsIndexCoop = await getIndexCoopLPRewards(yam) || 0;
  //   const yusdPrice = await getYUSDPrice() || 0;
  //   const umaPrice = await getUMAPrice() || 0;
  //   const rewardsSushi = (await getSushiRewards(yam)) || 0;
  //   const yamHousePrice = await getYamHousePrice() || 0;

  //   // WETH must have all blocks number since we get blocks from WETH
  //   const history = {
  //     WETH: {
  //       11133885: {
  //         value: 0,
  //         tx: ''
  //       },
  //       11160087: {
  //         value: 0,
  //         tx: ''
  //       },
  //       11243912: {
  //         value: 201 * 468,
  //         tx: ''
  //       },
  //       11244494: {
  //         value: 555 * 464,
  //         tx: ''
  //       },
  //       11289910: {
  //         value: 201 * 480,
  //         tx: ''
  //       },
  //       11680240: {
  //         value: (283 + 4.47) * 1258,
  //         tx: ''
  //       },
  //       latest: totalWETHValue * wethPrice,
  //       color: "#C60C4D"
  //     },
  //     yUSD: {
  //       11133885: {
  //         value: 1.15 * (1896995 + 215518 + 184500),
  //         tx: ''
  //       },
  //       11160087: {
  //         value: 1.15 * (1896995 + 215518),
  //         tx: ''
  //       },
  //       11243912: {
  //         value: 1.18 * 1896995,
  //         tx: ''
  //       },
  //       11244494: {
  //         value: 1.18 * 1896995,
  //         tx: ''
  //       },
  //       11289910: {
  //         value: 1.19 * 1896995,
  //         tx: ''
  //       },
  //       11680240: {
  //         value: 1.19 * 1896995,
  //         tx: ''
  //       },
  //       12018999: {
  //         value: 1.28 * 718900,
  //         tx: ''
  //       },
  //       latest: yusdPrice * (totalYUsdValue),
  //       color: "#8150E6"
  //     },
  //     DPI: {
  //       11133885: {
  //         value: 3351 * 75,
  //         tx: ''
  //       },
  //       11160087: {
  //         value: 3351 * 72,
  //         tx: ''
  //       },
  //       11243912: {
  //         value: 434 * 90,
  //         tx: ''
  //       },
  //       11244494: {
  //         value: 3351 * 80,
  //         tx: ''
  //       },
  //       11289910: {
  //         value: 434 * 104,
  //         tx: ''
  //       },
  //       11680240: {
  //         value: 434 * 104,
  //         tx: ''
  //       },
  //       latest: (totalDPIValue || 0) * dpiPrice,
  //       color: "#4777e0"
  //     },
  //     INDEX: {
  //       11289910: {
  //         value: 36 * 11.6,
  //         tx: ''
  //       },
  //       11680240: {
  //         value: 36 * 11.6,
  //         tx: ''
  //       },
  //       latest: rewardsIndexCoop * indexCoopPrice + totalBalanceIndexCoop * indexCoopPrice,
  //       color: "#D16C00"
  //     },
  //     INDEXLP: {
  //       11289910: {
  //         value: 2929 * 104 + 640 * 480,
  //         tx: ''
  //       },
  //       11680240: {
  //         value: 2929 * 104 + 640 * 480,
  //         tx: ''
  //       },
  //       latest: 2929 * dpiPrice + 640 * wethPrice,
  //       color: "#838bfc"
  //     },
  //     Sushi: {
  //       11243912: {
  //         value: rewardsSushi * sushiPrice,
  //         tx: ''
  //       },
  //       11244494: {
  //         value: rewardsSushi * sushiPrice,
  //         tx: ''
  //       },
  //       11289910: {
  //         value: rewardsSushi * sushiPrice,
  //         tx: ''
  //       },
  //       11680240: {
  //         value: rewardsSushi * sushiPrice,
  //         tx: ''
  //       },
  //       latest: rewardsSushi * sushiPrice,
  //       color: "#FFB900"
  //     },
  //     UMA: {
  //       latest: (totalUMAValue || 0) * umaPrice,
  //       color: "#2a9d8f"
  //     },
  //     YamHouse: {
  //       latest: totalYamHouseValue * yamHousePrice,
  //       color: "#6b705c"
  //     }
  //   };
  //   return history;
  // };

  return {
    // totalYUsdValue,
    // totalDPIValue,
    // totalWETHValue,
    // totalIndexLPValue,
    // totalUMAValue,
    // totalYamHouseValue,
    // yamBalance,
    // yUsdBalance,

    // revamp
    // totalBalanceValueIndexCoop,
    // totalLpRewardsValueIndexCoop,
    // totalIndexCoop,
    // totalSushi,

    // assets data
    treasuryValue
  };
};

export default useTreasury;
