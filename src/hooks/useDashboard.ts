import useTreasury from "hooks/useTreasury";
import useYam from "hooks/useYam";
import { useWallet } from "use-wallet";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "react-neu";

import { SeriesInterface, TimeSeries } from "types/Charts";

import {
  getYam,
} from "yam-sdk/utils";
import numeral from "numeral";

const useDahsboard = () => {
  const yam = useYam();
  const { status } = useWallet();
  const { darkMode } = useTheme();
  const { treasuryValue } = useTreasury();
  const [assetsData, setAssetsData] = useState<Object[]>();
  const [assetsColors, setAssetsColors] = useState<any>();
  const [yamObject, setYamObject] = useState<any>();

  const fetchReserves = useCallback(async (from) => {
    if (!yam) {
      return;
    }

    const yamValues = await getYam();

    const assetsIcons:any = {
      "dpi": "https://assets.coingecko.com/coins/images/12465/small/defi_pulse_index_set.png",
      "ethdpilp": "https://assets.coingecko.com/coins/images/12729/small/index.png",
      "gtc": "https://assets.coingecko.com/coins/images/15810/small/gitcoin.png",
      "index": "https://assets.coingecko.com/coins/images/12729/small/index.png",
      "steth": "https://assets.coingecko.com/coins/images/13442/small/steth_logo.png",
      "sushi": "https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png",
      "uma": "https://assets.coingecko.com/coins/images/10951/small/UMA.png",
      "usdc": "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      "wbtc": "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
      "weth": "https://assets.coingecko.com/coins/images/2518/small/weth.png",
      "xsushi": "https://assets.coingecko.com/coins/images/13725/small/xsushi.png",
      "yam": "https://assets.coingecko.com/coins/images/12530/small/YAM-icon.png",
      "yvusdc": "https://assets.coingecko.com/coins/images/12210/small/yUSD.png",
      "yamslp": "https://assets.coingecko.com/coins/images/12530/small/YAM-icon.png",
    }

    const treasuryAssets:any = treasuryValue.assets || {};
    const assets: Object[] = [];

    for (const [key, value] of Object.entries(treasuryAssets)) {
      const asset: any = value;
      if(asset.value >= 500) {
        let updatedAsset:any = value;
        updatedAsset.icon = assetsIcons[key];
        assets.push(updatedAsset);
      }
    }

    setAssetsData(assets);
    setAssetsColors(assetsColors);
    setYamObject({
      currentPrice: numeral(yamValues?.market_data.current_price.usd).format("0.00a"),
      maxSupply: numeral(yamValues?.market_data.max_supply).format("0.00a"),
      marketCap: numeral(yamValues?.market_data.market_cap.usd).format("0.00a"),
      treasuryValue: numeral(treasuryValue.total).format("0.00a"),
      change24: numeral(yamValues?.market_data.price_change_percentage_24h_in_currency.usd).format("0.00a") + "%"
    });
  }, [darkMode, status, yam, treasuryValue]);

  useEffect(() => {
    fetchReserves(2);
    let refreshInterval = setInterval(() => {
      fetchReserves(3);
    }, 60000);
    return () => clearInterval(refreshInterval);
  }, [treasuryValue]);

  return {
    assetsData,
    yamObject,
    assetsColors
  };

};

export default useDahsboard;
