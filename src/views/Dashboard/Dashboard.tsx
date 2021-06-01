import useDashboard from "hooks/useDashboard";

import React from "react";
import { Container } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Charts from "./components/Charts";
import TopCards from "./components/TopCards";
import AssetsList from "./components/AssetsList";
import { useWallet } from "use-wallet";

const Dashboard: React.FC = () => {
  const { account } = useWallet();
  const { assetsData, seriesReserves, yamObject, assetsColors } = useDashboard();

  return (
    <Page>
      <PageHeader icon="📊" subtitle="Overview of the YAM ecosystem" title="YAM Dashboard" />
      <Container size="lg">
        <TopCards yamObject={yamObject} />
        <Charts seriesReserves={seriesReserves} assetsColors={assetsColors} />
        {account
          ? <AssetsList assetsData={assetsData}/>
          : (
            <>
            </>
          )
        }
      </Container>
    </Page>
  );
};

export default Dashboard;
