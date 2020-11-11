import useFarming from "hooks/useFarming";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import { bnToDec } from "utils";

const HarvestLPsNoticeYAMYUSD: React.FC = () => {
  const [stakedBalanceYUSDLP, setStakedBalanceYUSDLP] = useState<number>(0);
  const { stakedBalanceYAMYUSD, onRedeemYAMYUSD } = useFarming();
  const { status } = useWallet();

  const checkOldStakedBalance = useCallback(() => {
    if (status !== "connected") {
      return;
    }
    if (stakedBalanceYAMYUSD) {
      setStakedBalanceYUSDLP(bnToDec(stakedBalanceYAMYUSD));
    }
  }, [stakedBalanceYAMYUSD, setStakedBalanceYUSDLP]);

  useEffect(() => {
    checkOldStakedBalance();
    let refreshInterval = setInterval(() => checkOldStakedBalance(), 100000);
    return () => clearInterval(refreshInterval);
  }, [checkOldStakedBalance]);

  const HarvestNotice = useMemo(() => {
    if (status === "connected" && stakedBalanceYUSDLP > 0) {
      return (
        <>
          <Notice>
            <NoticeIcon>❗</NoticeIcon>
            <NoticeContent>
              <StyledNoticeContentInner>
                <span>You was farming on the old pool with {stakedBalanceYUSDLP} LP tokens.</span>
                <Box flex={1} />
                <Spacer size="sm" />
                <Button size="sm" text="Harvest &amp; Unstake YAM/yUSD" onClick={onRedeemYAMYUSD} variant="secondary" />
              </StyledNoticeContentInner>
            </NoticeContent>
          </Notice>
          <Spacer />
        </>
      );
    }
  }, [status, stakedBalanceYAMYUSD, stakedBalanceYUSDLP]);

  return <>{HarvestNotice}</>;
};

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default HarvestLPsNoticeYAMYUSD;
