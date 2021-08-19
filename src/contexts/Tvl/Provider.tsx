import React, { useCallback, useEffect, useState } from "react";

import { useWallet } from "use-wallet";

import useYam from "hooks/useYam";
import request from "request";

import Context from "./Context";
import { bnToDec } from "utils";

const requestHttp = (url:string) => {
  return new Promise((resolve, reject) => {
    request({
        url: url,
        json: true,
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      }
    );
  });
};

const Provider: React.FC = ({ children }) => {
  const [tvl, setTVL] = useState<number>();
  const [apr, setAPR] = useState<number>();
  const yam = useYam();
  const { account } = useWallet();

  const fetchTVL = useCallback(async () => {
    if (!yam) return;
    const data:any = await requestHttp("https://api.yam.finance/tvl");
    const tvl = data?.values?.farm;
    setTVL(tvl);
  }, [setTVL, yam]);

  const fetchAPR = useCallback(async () => {
    if (!yam) return;
    const data:any = await requestHttp("https://api.yam.finance/apr");
    const apr = data?.yam.farm;
    setAPR(apr);
  }, [setAPR, yam]);

  useEffect(() => {
    fetchTVL();
    let refreshInterval = setInterval(fetchTVL, 5000);
    return () => clearInterval(refreshInterval);
  }, [fetchTVL]);

  useEffect(() => {
    fetchAPR();
    let refreshInterval = setInterval(fetchAPR, 5000);
    return () => clearInterval(refreshInterval);
  }, [fetchAPR]);

  return (
    <Context.Provider
      value={{
        tvl,
        apr,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
