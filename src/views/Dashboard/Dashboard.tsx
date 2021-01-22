import React from "react";
import { Container, Spacer } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import styled from "styled-components";
import Charts from "./components/Charts";
import TopCards from "./components/TopCards";
import AssetsList from "./components/AssetsList";

const Dashboard: React.FC = () => {
  return (
    <Page>
      <PageHeader icon="📊" subtitle="Overview of the YAM ecosystem" title="YAM Dashboard" />
      <Container size="lg">
        <TopCards />
        <Charts />
        <Spacer />
        <AssetsList />
      </Container>
    </Page>
  );
};

const StyledCharts = styled.div`
  padding: 0px;
`;

export default Dashboard;
