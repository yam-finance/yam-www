import useDashboard from "hooks/useDashboard";

import React, { useCallback, useMemo, useState } from "react";
import { Box, Button, Container } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Charts from "./components/Charts";
import TopCards from "./components/TopCards";
import AssetsList from "./components/AssetsList";
import { useWallet } from "use-wallet";
import LanguageSwitcher from "../../components/LangSwitcher";
import { useTranslation } from 'react-i18next';
import UnlockWalletModal from "components/UnlockWalletModal";

const Dashboard: React.FC = () => {
  const { account } = useWallet();
  const { assetsData, yamObject, assetsColors } = useDashboard();
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen]);

  return (
    <Page>
      <PageHeader icon="📈" subtitle="Overview of the YAM ecosystem." title="YAM Dashboard" />
      <Container size="lg">
        <TopCards yamObject={yamObject} />
        {/* <Charts seriesReserves={seriesReserves} assetsColors={assetsColors} /> */}
        {account
          ? <AssetsList assetsData={assetsData}/>
          : (
            <>
              <Box row justifyContent="center">
                <Button onClick={handleUnlockWalletClick} text="Unlock wallet to display dashboard" variant="secondary" />
              </Box>
              <UnlockWalletModal isOpen={unlockModalIsOpen} onDismiss={handleDismissUnlockModal} />
            </>
          )
        }
      </Container>
    </Page>
  );
};

export default Dashboard;
