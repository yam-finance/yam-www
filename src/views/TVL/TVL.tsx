import React, { useEffect, useCallback, useState } from "react";
import { Container, Spacer, Card, CardContent, } from "react-neu";

import { useCountUp } from 'react-countup';

import numeral from "numeral";
import Page from "components/Page";
import PageHeader from "components/PageHeader";

import styled from "styled-components";
import { useWallet } from "use-wallet";

const TVL: React.FC = () => {
  const { account } = useWallet();

  const [tvl, setTvl] = useState(0);
  const [apr, setApr] = useState(0)
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

  const fetchValue = useCallback(async () => {
    setTvl(parseInt(localStorage.getItem("tvl") || "0"));
    setApr(parseInt(localStorage.getItem("apr") || "0"));
  }, []);

  useEffect(() => {
    fetchValue();
    let refreshInterval = setInterval(fetchValue, 5000);
    return () => clearInterval(refreshInterval);
  }, [fetchValue]);

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
