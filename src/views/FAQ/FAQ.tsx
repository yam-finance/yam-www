import React, { useMemo } from "react";

import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { Card, CardContent, Container, Spacer } from "react-neu";
import { useLocation } from "react-router-dom";

import ExternalLink from "components/ExternalLink";
import Page from "components/Page";
import PageHeader from "components/PageHeader";

import Question from "./components/Question";

const FAQ: React.FC = () => {
  const { pathname } = useLocation();
  const pathArr = pathname.split("/");

  const activeSlug = useMemo(() => {
    if (pathArr.length > 2) {
      return pathArr[2];
    }
  }, [pathArr]);

  return (
    <Page>
      <PageHeader icon="📖" subtitle="Learn about YAM" title="FAQ" />
      <Container>
        <Card>
          <CardContent>
            <Question active={activeSlug === "yam-protocol"} question="What is the YAM protocol?" slug="yam-protocol">
              <span>
                YAM is a decentralized cryptocurrency that uses a rebasing mechanism to raise funds for a treasury managed by the community. The
                community can then use those funds via YAM governance to build out the protocol.
              </span>
            </Question>

            <Question active={activeSlug === "yam-token"} question="What is YAM?" slug="yam-token">
              <span>
                Yam is a community run Decentralized Autonomous Organization (DAO) innovating at the intersection of decentralized governance and
                programmable finance. YAM is the governance token for the YAM protocol. Using token voting, YAM holders have direct influence over the
                YAM treasury and direction of the protocol. Governance discussions take place on Discord and the{" "}
                <ExternalLink href="https://forum.yam.finance/">Yam Governance Forum</ExternalLink>.
              </span>
            </Question>

            <Question active={activeSlug === "treasury"} question="How does YAM have a treasury?" slug="treasury">
              <span>
                Before the Yam community voted to disable the rebasing / elastic supply function, every positive rebase, the treasury mints 5% of the
                rebase amount and sells YAM to the YAM/ETH Sushiswap pool. The ETH acquired through this action is sent to the treasury which is
                managed by YAM holders. The current treasury value can be seen on yam.finance.
              </span>
            </Question>

            <Question
              active={activeSlug === "what-happened-to-rebase"}
              question="What happened with rebasing function of Yam?"
              slug="what-happened-to-rebase"
            >
              <span>
                December 29th, 2020 the Yam community has voted to disable the rebasing / elastic supply function of Yam and the scaling factor of Yam
                has been fixed at 2.50. Yam initially as an experiment has evolved into a launch pad for DeFi projects supported by a community
                governed treasury. Yam is currently developing multiple projects including Umbrella (Smart Contract Insurance), Degenerative.Finance
                (Synthetics) and Yam DAO Set (Set Protocol DAO Investment fund). All of which will generate revenue for Yam. For most current
                projects, please visit us in discord.
              </span>
            </Question>

            <Question active={activeSlug === "govlp"} question="Can LPs participate in governance?" slug="govlp">
              <span>
                Only LPs that are staked in the Incentivizer contract can participate in governance. Voting power is determined by distributing the
                voting power of YAM held in the YAM/ETH Sushiswap pool, but distributed to only YAM Incentivizer stakers. This was done to mitigate
                flashloan threats in voting, so the Incentivizer contract keeps a record of the necessary values at needed block heights to facilitate
                those mitigations.
              </span>
            </Question>

            <Question active={activeSlug === "farming"} question="Can I farm YAM?" slug="farming">
              <span>
                Currently check the <RouterLink to="/farm">Farm</RouterLink> page to know if you are able to farm.
              </span>
            </Question>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

const RouterLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.primary.light};
  &:hover {
    color: ${(props) => props.theme.colors.primary.light};
  }
`;

export default FAQ;
