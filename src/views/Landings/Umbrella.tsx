import React from "react";
import { Container, Spacer, useTheme } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import Bar from "components/Bar";
import DesignFlow from "assets/yampp.png";
import styled from "styled-components";
import CountUp, { useCountUp } from 'react-countup';

const Umbrella_Protocol_Lite_Paper = require("assets/documents/Umbrella_Protocol_Lite_Paper.pdf");
const Umbrella_Protocol_Lite_Paper_CN = require("assets/documents/Umbrella_Protocol_Lite_Paper_CN.pdf");

const YCP: React.FC = () => {
  const { darkMode } = useTheme();
  const progress = 75;

  return (
    <Page>
      <PageHeader icon={"🤫"} title={"Coming Soon!"} titleSize={80} titleWeight={"900"} subtitle={"Yam Protocol Protection"} />
      <Container size="sm">
        <Bar type={"buffer"} value={progress}></Bar>
      </Container>
      <Container>
        <Spacer />
        <h2>Introduction</h2>
        <span>
          Throughout DeFi’s history, smart contract exploits have been a constant threat to the ecosystem, and it’s become clear that new risk
          management solutions must be created to supplement security audits. These solutions should be DeFi native, leveraging Ethereum’s unique
          capabilities, operating as open and permissionless, and balancing decentralized governance and immutability.
        </span>
        <Spacer />
        <span>
          Yam's upcoming protection protocol is designed with these factors in mind, featuring perpetual ERC20 streaming coverage, immutable coverage
          pools, and a permissionless pool creation process that allows for customization and iteration over time.
        </span>
        <Spacer />
        <h2>Links</h2>
        <Split>
          <div>
            <b>
              Name:{" "}
              <a href="https://snapshot.page/#/yam/proposal/QmYSsKSFSe7fbgEt2rwrKz9Pq4KxtRziPA4ajpuhRyiPgZ" target="_blank">
                Umbrella
              </a>
            </b>
            <br />
            <b>
              Lightpaper PDF:{" "}
              <a href={Umbrella_Protocol_Lite_Paper} target="_blank">
                EN
              </a>
              ,{" "}
              <a href={Umbrella_Protocol_Lite_Paper_CN} target="_blank">
                CN
              </a>
            </b>
            <br />
            <b>
              Design Logic:{" "}
              <a href={DesignFlow} target="_blank">
                PNG
              </a>
            </b>
            <br />
            <b>
              Announcement:{" "}
              <a href="https://medium.com/yam-finance/introducing-the-umbrella-protocol-by-yam-e89109548c6d" target="_blank">
                Post
              </a>
            </b>
            <br />
          </div>
          <div>
            <b>Website: TBD</b>
            <br />
            <b>Whitepaper: TBD</b>
            <br />
            <b>
              Network:{" "}
              <a href="https://twitter.com/UmbrellaByYam" target="_blank">
                Twitter
              </a>{" "}
              |{" "}
              <a href="https://medium.com/@umbrellabyyam" target="_blank">
                Medium
              </a>
            </b>
            <br />
          </div>
        </Split>
        {/* <Spacer />
        <h2>Details</h2>
        <span>
          Lorem ipsum dolor sit <a href="#">amet</a> consectetur adipisicing elit. Magni quasi impedit, et, itaque eligendi ex harum iusto nulla laudantium vitae distinctio aspernatur ipsum! At quibusdam perferendis ratione odit molestias perspiciatis!
        </span> */}
        {/* <Spacer />
        <h2>Protocol Design</h2>
        <a href={DesignFlow} target="_blank">
          <InformationDesign src={DesignFlow} alt=""/>
        </a> */}
      </Container>
    </Page>
  );
};

const InformationDesign = styled.img`
  width: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 5px #ec0e5c;
  animation: ycpblink 10s ease-in-out infinite;
  opacity: 0.8;
`;

export default YCP;
