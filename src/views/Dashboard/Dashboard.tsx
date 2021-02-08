import useDashboard from "hooks/useDashboard";

import React from "react";
import { Container } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Charts from "./components/Charts";
import TopCards from "./components/TopCards";
import AssetsList from "./components/AssetsList";

const Dashboard: React.FC = () => {
  const { assetsData, seriesReserves, currentPrice, change24, maxSupply, marketCap, treasuryValue, assetsColors } = useDashboard();

  return (
    <Page>
      <PageHeader icon="📊" subtitle="Overview of the YAM ecosystem" title="YAM Dashboard" />
      <Container size="lg">
        <TopCards currentPrice={currentPrice} change24={change24} maxSupply={maxSupply} marketCap={marketCap} treasuryValue={treasuryValue} />
        <Charts seriesReserves={seriesReserves} assetsColors={assetsColors} />
        <AssetsList assets={assetsData?.sort((a:any,b:any):number => {
          if (a.number > b.number) return -1;
          if (a.number < b.number) return 1;
          return 0;
        })}/>
      </Container>
    </Page>
  );
};

export default Dashboard;
