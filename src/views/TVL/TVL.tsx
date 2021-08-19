import React, { useEffect, useCallback, useState } from "react";
import { Container, Spacer, Card, CardContent, } from "react-neu";

import { useCountUp } from 'react-countup';

import numeral from "numeral";
import Page from "components/Page";
import PageHeader from "components/PageHeader";

import styled from "styled-components";
import { useWallet } from "use-wallet";

import useTvl from "hooks/useTvl";

const TVL: React.FC = () => {
  const { account } = useWallet();
  const {tvl, apr} = useTvl();
 
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
    update(tvl);
  }, [tvl]);
  useEffect(() => {
    aprCountUp.update(apr);
  }, [apr]);



  return (
    <Page>
      <PageHeader icon={"💰"} title="TVL" subtitle="Total Value Locked!" />
      <Spacer size="md" />
      
      <Container>
        <Card>
          <CardContent>
            <div className="farm-tvl">{countUp}</div>
            <div className = "farm-apr">{aprCountUp.countUp}</div>
          </CardContent>
        </Card>
        <Spacer size="sm" />
      </Container>
    </Page>
  );
};

export const StyledButtonMain = styled.div`
  font-weight: 600;
  display: grid;
  grid-area: vote;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default TVL;
