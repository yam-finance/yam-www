import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Container, Spacer, useTheme } from "react-neu";
import numeral from "numeral";
import useYam from "hooks/useYam";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import { contributors } from "utils/misc";
import { getContributorVestingData, claimContributorVestedTokens, getYam30D } from "yam-sdk/utils";
import { useCallback } from "react";

const Contributor: React.FC = () => {
  const yam = useYam();
  const { account, status } = useWallet();
  const [contributor, setContributor] = useState<any>();
  const [availableClaim, setAvailableClaim] = useState<number>();
  const [availableClaimOver, setAvailableClaimOver] = useState<number>();
  const [totalClaimed, setTotalClaimed] = useState<number>();
  const [theBehalf, setTheBehalf] = useState<string>("");
  const [last30D, setLast30D] = useState<string>("0");

  const fetchOnce = useCallback(async () => {
    if (!yam) return;
    setTimeout(async () => {
      if (theBehalf) {
        const result = theBehalf && contributors.hasOwnProperty(theBehalf?.toLowerCase()) ? contributors[theBehalf?.toLowerCase()] : false;
        setContributor(result);
      } else {
        const result = account && contributors.hasOwnProperty(account?.toLowerCase()) ? contributors[account?.toLowerCase()] : false;
        setContributor(result);
      }
      const vestingData: any = await getContributorVestingData(yam, contributor);
      setAvailableClaim(vestingData?.availableClaim || 0);
      setAvailableClaimOver(vestingData?.availableClaimOver || 0);
      setTotalClaimed(vestingData?.totalClaimed || 0);
    }, 400);

    let totalDays: number = 0;
    const yam30D = await getYam30D();
    for (let i = 0; i < yam30D.length; i++) {
      totalDays += Number(yam30D[i][1]);
    }
    setLast30D(numeral(totalDays/30).format("0,0.00a"));
    
  }, [account, yam, contributor, theBehalf]);

  useEffect(() => {
    if (status === "connected") {
      fetchOnce();
    }
  }, [account, yam]);

  useEffect(() => {
    fetchOnce();
    let refreshInterval = setInterval(fetchOnce, 5000);
    return () => clearInterval(refreshInterval);
  }, [fetchOnce, yam]);

  useEffect(() => {
    fetchOnce();
    console.log("contributor", contributor);
  }, [theBehalf, setTheBehalf]);

  const handleClaimVested = useCallback(async () => {
    if (!yam || !contributor || !contributor.id) return;
    await claimContributorVestedTokens(yam, account, contributor);
  }, [account, contributor, yam]);

  const ClaimButton = useMemo(() => {
    if (!availableClaim || availableClaim === 0) {
      return <Button text="No Claim" variant="tertiary" disabled />;
    } else {
      return <Button text="Claim" variant="default" onClick={handleClaimVested} />;
    }
  }, [availableClaim]);

  return (
    <Page>
      <PageHeader icon={"🏆"} title={"Contributor"} subtitle={"Thank you for your contributions."} />
      <Container size="sm">
        <Split>
          <Box column>
            <h2 className="center">{numeral(availableClaim).format("0,0.00a")} of {numeral(availableClaimOver).format("0,0.00a")} YAM Available to Claim</h2>
            <h3 className="center">{numeral(totalClaimed).format("0,0.00a")} YAM Claimed Overtime</h3>
            <AvgStyle className="center gray"><b>${last30D}/YAM</b> 30d Avg.</AvgStyle>
            <br />
          </Box>
        </Split>
        <Box column>
          {ClaimButton}
          <br />
          <UserAddress>{account?.toString()}</UserAddress>
          <br />
          <BehalfInput onChange={e => setTheBehalf(e.target.value)} type="text" name="" id="" />
        </Box>
      </Container>
    </Page>
  );
};

export default Contributor;

const UserBalances = styled.h1`
  text-align: center;
`;

const AvgStyle = styled.div`
  color: #ffffff;
  opacity: 0.66;
  text-align: center;
`;

const UserAddress = styled.div`
  color: #00000080;
  text-align: center;
`;

const BehalfInput = styled.input`
  color: hsl(339deg 89% 49% / 100%) !important;
  background: #00000000;
  border: 0;
  border-radius: 28px;
  box-sizing: border-box;
  color: hsl(339deg 100% 100% / 100%);
  display: flex;
  font-size: 16px;
  font-weight: 700;
  height: 48px;
  justify-content: center;
  margin: 0;
  min-width: 48px;
  outline: none;
  padding-left: 24px;
  padding-right: 24px;
  white-space: nowrap;
  text-align: center;
`;
