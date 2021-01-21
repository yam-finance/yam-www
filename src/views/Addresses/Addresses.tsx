import React from "react";
import { Box, Button, Container, Spacer, useTheme } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import {
  DPI,
  ContractGovernor,
  ContractIncentivizer,
  ContractMigrator,
  ContractRebaser,
  ContractReserves,
  ContractTimelock,
  yam,
  yamv2,
  yamv3,
  yUsd,
  ContractContribtorTimelock,
  ContractContributorGovernor,
  ContractIndexStaking,
  ContractMonthlyAllowance,
  ContractVestingPool,
} from "constants/tokenAddresses";
import AddressButton from "components/AddressButton";

const Addresses: React.FC = () => {
  return (
    <Page>
      <PageHeader icon={"🎖️"} title={"Addresses"} subtitle={"Official Addresses"} />
      <Container size="sm">
        <h2>Yam Addresses &amp; Assets</h2>
        <AddressButton
          name="YAM"
          address={yamv3.toLowerCase()}
          uniswap={true}
          unitext="Buy at Sushiswap"
          unilink="https://exchange.sushiswapclassic.org/#/?inputCurrency="
        />
        <AddressButton name="DPI" address={DPI.toLowerCase()} uniswap={true} />

        <h3>Yam Contracts Addresses</h3>
        <AddressButton name="Reserves" address={ContractReserves.toLowerCase()} uniswap={false} />
        <AddressButton name="Governor" address={ContractGovernor.toLowerCase()} uniswap={false} />
        <AddressButton name="Timelock" address={ContractTimelock.toLowerCase()} uniswap={false} />
        <AddressButton name="Rebaser" address={ContractRebaser.toLowerCase()} uniswap={false} />
        <AddressButton name="Incentivizer" address={ContractIncentivizer.toLowerCase()} uniswap={false} />
        <AddressButton name="Migrator" address={ContractMigrator.toLowerCase()} uniswap={false} />
        <AddressButton name="Contributor Governor" address={ContractContributorGovernor.toLowerCase()} uniswap={false} />
        <AddressButton name="Contribtor Timelock" address={ContractContribtorTimelock.toLowerCase()} uniswap={false} />
        <AddressButton name="Index Staking" address={ContractIndexStaking.toLowerCase()} uniswap={false} />
        <AddressButton name="Vesting Pool" address={ContractVestingPool.toLowerCase()} uniswap={false} />
        <AddressButton name="Monthly Allowance" address={ContractMonthlyAllowance.toLowerCase()} uniswap={false} />

        <h3>Other Addresses</h3>
        <AddressButton name="yUSD" address={yUsd.toLowerCase()} uniswap={false} />

        <h3>Obsolete Addresses</h3>
        <AddressButton name="YAMv1" address={yam.toLowerCase()} uniswap={false} />
        <AddressButton name="YAMv2" address={yamv2.toLowerCase()} uniswap={false} />
      </Container>
    </Page>
  );
};

export default Addresses;
