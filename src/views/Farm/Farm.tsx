import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";

import { Box, Button, Card, CardContent, Container, Separator, Spacer, useTheme } from "react-neu";

import CountUp, { useCountUp } from 'react-countup';
import { Icon, Pagination } from 'semantic-ui-react';
import numeral from "numeral";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import useFarming from "hooks/useFarming";
import HarvestCard from "./components/Harvest";
import StakeCard from "./components/Stake";
import PausedLPsNotice from "./components/PausedLPsNotice";
import ResumedLPsNotice from "./components/ResumedLPsNotice";
import HarvestLPsNoticeYAMYUSD from "./components/HarvestLPsNoticeYAMYUSD";
import { useWallet } from "use-wallet";
import FancyValue from "components/FancyValue";

const FARMERS = [
  '👨‍🌾',
  '👨🏼‍🌾',
  '🧑🏽‍🌾',
  '👨🏻‍🌾',
  '👨🏿‍🌾',
  '👩‍🌾',
  '🧑‍🌾',
  '👩🏽‍🌾',
  '👩🏻‍🌾',
  '🧑🏾‍🌾‍',
  '👩🏿‍🌾'
]

const Farm: React.FC = () => {

  const [farmer, setFarmer] = useState('👨‍🌾')

  const updateFarmer = useCallback(() => {
    const newFarmer = FARMERS[Math.floor(Math.random()*FARMERS.length)]
    setFarmer(newFarmer)
  }, [setFarmer])

  useEffect(() => {
    const refresh = setInterval(updateFarmer, 1000)
    return () => clearInterval(refresh)
  }, [updateFarmer])

  const { colors } = useTheme();
  const { status } = useWallet();

  const { tvl, apr, isRedeeming, onRedeemYAMETH } = useFarming();
  const { countUp , start, update } = useCountUp({
    start: 0,
    end: tvl ? tvl: 0,
    formattingFn: (val) => val ? `TVL $${numeral(val).format("000,000,000")}` : "Loading TVL...",
    decimals: 0,
    duration: 1.75
  });
  const aprCountUp= useCountUp({
    start: 0,
    end: apr ? apr: 0,
    formattingFn: (val) => val ? `APR ${numeral(val).format("0.00a")}%` : "Loading APR...",
    decimals: 2,
    duration: 1.75
  });
  useEffect(() => {
    console.log("tvl = ",tvl);
    update(tvl);
  }, [tvl]);
  useEffect(() => {
    console.log("apr = ",apr);
    aprCountUp.update(apr);
  }, [apr]);
 
  
  const RedeemButton = useMemo(() => {
    if (status !== "connected") {
      return <Button disabled text="Harvest &amp; Unstake YAM/ETH" variant="secondary" />;
    }
    if (!isRedeeming) {
      return <Button onClick={onRedeemYAMETH} text="Harvest &amp; Unstake YAM/ETH" variant="secondary" />;
    }
    {/* This code needs to be updated to revert to original state if the transaction is cancelled in metamask */}
    return <Button disabled text="Redeeming..." variant="secondary" />;
  }, [isRedeeming, onRedeemYAMETH]);

  return (
    <Page>
      <PageHeader icon={`${farmer}`} subtitle="Stake YAM/ETH Sushiswap LP tokens and grow YAMs" title="Farm" />
      <Container>
        <HarvestLPsNoticeYAMYUSD />
        <ResumedLPsNotice />
        {/* <PausedLPsNotice /> */}
        <Card>
          <CardContent>
            {/* <FancyValue
              wrap
              value={tvl ? `TVL $${numeral(tvl).format("000,000,000")}` : "Loading TVL..."}
              valueSize="54px"
              valueColor={colors.primary.main}
              valueBold="800"
              label={apr ? `APR ${numeral(apr).format("0.00a")}%` : "Loading APR..."}
            /> */}
            {/* <CountUp
              start={0}
              end={tvl ? tvl : 0}
              formattingFn={(val) => val ? `TVL $${numeral(val).format("000,000,000")}` : "Loading TVL..."}
              decimals={0}
              duration={1.75}
              className="farm-tvl"
            /> */}
            <div className="farm-tvl">{countUp}</div>
            <div className = "farm-apr">{aprCountUp.countUp}</div>
          </CardContent>
        </Card>
        <Spacer />
        <Split>
          <StakeCard />
          <HarvestCard />
        </Split>
        <Spacer />
        <Box row justifyContent="center">
          {RedeemButton}
        </Box>
        <Spacer size="lg" />
        <Separator />
        <Spacer size="lg" />
        <Split>
          <Button full text="Addresses" to="/addresses" variant="secondary" />
          <Button
            full
            text="Get YAM/ETH LP tokens"
            href="https://app.sushi.com/add/ETH/0x0AaCfbeC6a24756c20D41914F2caba817C0d8521"
            variant="tertiary"
          />
        </Split>
      </Container>
    </Page>
  );
};

export default Farm;
