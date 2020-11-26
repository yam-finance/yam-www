import { useMemo } from "react";

import { yUsd as yUsdAddress, yamv3 as yamV3Address, DPI as DPIAddress, WETH } from "constants/tokenAddresses";

import usePrices from "hooks/usePrices";
import useTokenBalance from "hooks/useTokenBalance";
import { getIndexCoopLP } from "yam-sdk/utils";

const treasuryAddress = "0x97990b693835da58a281636296d2bf02787dea17";

const useTreasury = () => {
  const { yamTwap } = usePrices();
  const yamBalance = useTokenBalance(treasuryAddress, yamV3Address);
  const yUsdBalance = useTokenBalance(treasuryAddress, yUsdAddress);
  const totalDPIValue = useTokenBalance(treasuryAddress, DPIAddress);
  const totalWETHValue = useTokenBalance(treasuryAddress, WETH);
  const totalIndexLPValue = 2929 * 102 + 640 * 464;

  const totalYUsdValue = useMemo(() => {
    const yamYUsdValue = yamTwap && yamBalance ? yamTwap * yamBalance : 0;
    return yUsdBalance ? yUsdBalance + yamYUsdValue : yamYUsdValue;
  }, [yamBalance, yamTwap, yUsdBalance]);

  return {
    totalYUsdValue,
    totalDPIValue,
    totalWETHValue,
    totalIndexLPValue,
    yamBalance,
    yUsdBalance,
  };
};

export default useTreasury;
