import React from "react";
import { Container, Spacer, useTheme } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import Bar from "components/Bar";
import DesignFlow from "assets/yamdaohouse.png";
import styled from "styled-components";

const Umbrella_Protocol_Lite_Paper = require("assets/documents/Umbrella_Protocol_Lite_Paper.pdf");
const Umbrella_Protocol_Lite_Paper_CN = require("assets/documents/Umbrella_Protocol_Lite_Paper_CN.pdf");

const YCP: React.FC = () => {
  const { darkMode } = useTheme();
  const progress = 75;

  return (
    <Page>
      <PageHeader icon={"⛪"} title={"DAO House"} titleSize={80} titleWeight={"900"}  subtitle={"Treasury Management Solution."} />
     
      <Container>
        <Spacer />
        <h2>DAO House - Treasury Management Solution</h2>
        <span>
        DAO House is a turnkey, customizable, on-chain, and actively managed treasury solution designed specifically for DAOs. Yam employs a Treasury Management as a Service model (TMaaS), for helping DAOs ensure future growth and the long-term sustainability of their protocol. 
        All powered by the Set Protocol best-of-breed and battle-tested smart contract trading infrastructure.
        </span>
        <Spacer />
        <span>
        A DAO House solution benefits customers by allowing them to outsource the complexity of treasury management and focus 100% of their valuable human resources on the mission critical goal of building great DeFi products. 
        The Yam ecosystem benefits from setup and annual service fees, both of which accrue to the Yam treasury and help grow the Yam ecosystem.

        </span>
        <Spacer />
        <span>yamHOUSE</span>
        <Spacer />
        <span>
        Yam’s first DAO House implementation is named yamHOUSE, the Treasury Management Solution governed by the Yam DAO community with an investment strategy selected via an on-chain vote by the Yam community.

        </span>

        <h2>Links</h2>
        <Split>
          <div>
            <b>
              Name:{" "}
              <a href="https://snapshot.page/#/yam/proposal/QmYSsKSFSe7fbgEt2rwrKz9Pq4KxtRziPA4ajpuhRyiPgZ" target="_blank">
                DaoHouse
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
              DAO House Announcement:{" "}
              <a href="https://yamfinance.medium.com/yam-finance-presents-dao-house-86625f9bae5a" target="_blank">
                Post
              </a>
            </b>
            <br />
            <b>
            Yam builds SushiHOUSE announcement:{" "}
              <a href="https://yamfinance.medium.com/yam-welcomes-sushihouse-to-the-neighborhood-6eae44d42210" target="_blank">
                Post
              </a>
            </b>
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
