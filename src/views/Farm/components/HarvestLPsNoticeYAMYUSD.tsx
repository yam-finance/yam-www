import BigNumber from "bignumber.js";
import useFarming from "hooks/useFarming";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, Notice, NoticeContent, Spacer } from "react-neu";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import { bnToDec } from "utils";
import StyledNoticeIcon from "components/StyledNoticeIcon";

const HarvestLPsNoticeYAMYUSD: React.FC = () => {
  const [stakedBalanceYUSDLP, setStakedBalanceYUSDLP] = useState<number>(0);
  const [earnedBalanceYUSDLP, setEarnedBalanceYUSDLP] = useState<number>(0);
  const { stakedBalanceYAMYUSD, earnedBalanceYAMYUSD, onRedeemYAMYUSD, onHarvestYAMYUSD } = useFarming();
  const { status } = useWallet();

  const checkOldStakedEarned = useCallback(() => {
    if (status !== "connected") {
      return;
    }

    if (stakedBalanceYAMYUSD) {
      setStakedBalanceYUSDLP(bnToDec(stakedBalanceYAMYUSD));
    }
    if (earnedBalanceYAMYUSD) {
      setEarnedBalanceYUSDLP(bnToDec(earnedBalanceYAMYUSD));
    }
  }, [stakedBalanceYAMYUSD, earnedBalanceYAMYUSD, setStakedBalanceYUSDLP, setEarnedBalanceYUSDLP]);

  useEffect(() => {
    checkOldStakedEarned();
    let refreshInterval = setInterval(() => checkOldStakedEarned(), 100000);
    return () => clearInterval(refreshInterval);
  }, [checkOldStakedEarned]);

  const HarvestNotice = useMemo(() => {
    if (status === "connected" && (stakedBalanceYUSDLP > 0 || earnedBalanceYUSDLP > 0)) {
      return (
        <>
          <Notice>
            <StyledNoticeIcon role='img'>❗</StyledNoticeIcon>
            <NoticeContent>
              <StyledNoticeContentInner>
                <span>
                  You was farming on the old pool with{" "}
                  {(stakedBalanceYUSDLP ? stakedBalanceYUSDLP + " LP tokens" : "") +
                    (stakedBalanceYUSDLP && earnedBalanceYUSDLP ? " and you have " : "") +
                    (earnedBalanceYUSDLP ? earnedBalanceYUSDLP.toFixed(2) + " Yam!" : "")}{" "}
                </span>
                <Box flex={1} />
                <Spacer size="sm" />
                <span>
                  <Button
                    size="sm"
                    text={earnedBalanceYUSDLP ? "Harvest YAM from Old LP" : "Harvest & Unstake YAM/yUSD"}
                    onClick={!stakedBalanceYUSDLP && earnedBalanceYUSDLP ? onHarvestYAMYUSD : onRedeemYAMYUSD}
                    variant="secondary"
                  />
                </span>
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
