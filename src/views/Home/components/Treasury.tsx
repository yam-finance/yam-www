import React, { useCallback, useEffect, useState } from "react";

import numeral from "numeral";
import { Box, Button, Card, CardActions, CardContent, CardTitle, Spacer } from "react-neu";

import FancyValue from "components/FancyValue";
import Split from "components/Split";

import useTreasury from "hooks/useTreasury";
import { getDPIPrice, getWETHPrice, getYUSDPrice, getUMAPrice, getYamHousePrice } from "yam-sdk/utils";
import { useWallet } from "use-wallet";

const Treasury: React.FC = () => {
  const { status } = useWallet();
  const [yusdPrice, setYUSDPrice] = useState<number>();
  const [dpiPrice, setDPIPrice] = useState<number>();
  const [wethPrice, setWETHPrice] = useState<number>();
  const [umaPrice, setUMAPrice] = useState<number>();
  const [yamHousePrice, setYamHousePrice] = useState<number>();
  const { totalYUsdValue, totalDPIValue, totalWETHValue, totalIndexLPValue, totalIndexCoop, totalSushi, totalYamHouseValue, totalUMAValue, yamBalance, yUsdBalance } = useTreasury();

  const fetchOnce = useCallback(async () => {
    const yusdPrice = await getYUSDPrice();
    const dpiPrice = await getDPIPrice();
    const wethPrice = await getWETHPrice();
    const umaPrice = await getUMAPrice() || 0;
    const yamHousePrice = await getYamHousePrice() || 0;
    setYUSDPrice(yusdPrice);
    setDPIPrice(dpiPrice);
    setWETHPrice(wethPrice);
    setUMAPrice(umaPrice);
    setYamHousePrice(yamHousePrice);
  }, [setYUSDPrice, setDPIPrice, setWETHPrice]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [status]);

  const assetYUSD = (totalYUsdValue ? totalYUsdValue : 0) * (yusdPrice ? yusdPrice : 0);
  const assetDPI = (totalDPIValue ? totalDPIValue : 0) * (dpiPrice ? dpiPrice : 0);
  const assetWETH = (totalWETHValue ? totalWETHValue : 0) * (wethPrice ? wethPrice : 0);
  const assetIndex = totalIndexCoop ? totalIndexCoop : 0;
  const assetIndexLP = totalIndexLPValue ? totalIndexLPValue : 0;
  const assetUMA =  (totalUMAValue || 0) * (umaPrice || 0);
  const assetYamHouse = (totalYamHouseValue || 0) * (yamHousePrice || 0);
  const treasuryAssets = assetYUSD + assetDPI + assetWETH + assetIndexLP + assetIndex + totalSushi + assetUMA + assetYamHouse;
  const treasuryValue = typeof totalYUsdValue !== "undefined" && totalYUsdValue !== 0 ? "~$" + numeral(treasuryAssets).format("0.00a") : "--";
  const yamValue = typeof yamBalance !== "undefined" ? numeral(yamBalance).format("0.00a") : "--";
  const yUsdValue = typeof yUsdBalance !== "undefined" ? numeral(yUsdBalance).format("0.00a") : "--";

  return (
    <Card>
      <CardTitle text="Treasury Overview" />
      <Spacer size="sm" />
      <CardContent>
        <Split>
          <FancyValue icon="💰" label="Treasury value" value={treasuryValue} />
          <FancyValue icon="💸" label="yUSD in reserves" value={yUsdValue} />
          {/* <FancyValue icon="🍠" label="YAM in reserves" value={yamValue} /> */}
        </Split>
        <Spacer />
      </CardContent>
      <CardActions>
        <Box row justifyContent="center">
          <Button
            href="https://exchange.sushiswapclassic.org/#/?inputCurrency=0x0aacfbec6a24756c20d41914f2caba817c0d8521"
            text="Buy Yam"
            variant="secondary"
          />
          <Spacer />
          <Button
            href="https://etherscan.io/tokenholdings?a=0x97990B693835da58A281636296D2Bf02787DEa17"
            text="View on Etherscan"
            variant="tertiary"
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default Treasury;
