import React from "react";
import { Box, Button, Container, Spacer, useTheme } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import { DPI, ContractGovernor, ContractIncentivizer, ContractMigrator, ContractRebaser, ContractReserves, ContractTimelock, yam, yamv2, yamv3, yUsd, ContractContribtorTimelock, ContractContributorGovernor, ContractIndexStaking, ContractMonthlyAllowance, ContractVestingPool } from "constants/tokenAddresses";
import AddressButton from "components/AddressButton";

const Addresses: React.FC = () => {
  return (
    <Page>
      <PageHeader icon={"🎖️"} title={"Addresses"} subtitle={"Official Addresses"} />
      <Container size="sm">
        <h2>Yam Addresses &amp; Assets</h2>
        <AddressButton name="YAM" address={yamv3} uniswap={true} unitext="Buy at Sushiswap" unilink="https://exchange.sushiswapclassic.org/#/?inputCurrency=" />
        <AddressButton name="yUSD" address={yUsd} uniswap={true} />
        <AddressButton name="DPI" address={DPI} uniswap={true} />

        <h3>Yam Contracts Addresses</h3>
        <AddressButton name="Reserves" address={ContractReserves} uniswap={false} />
        <AddressButton name="Governor" address={ContractGovernor} uniswap={false} />
        <AddressButton name="Timelock" address={ContractTimelock} uniswap={false} />
        <AddressButton name="Rebaser" address={ContractRebaser} uniswap={false} />
        <AddressButton name="Incentivizer" address={ContractIncentivizer} uniswap={false} />
        <AddressButton name="Migrator" address={ContractMigrator} uniswap={false} />
        <AddressButton name="Contributor Governor" address={ContractContributorGovernor} uniswap={false} />
        <AddressButton name="Contribtor Timelock" address={ContractContribtorTimelock} uniswap={false} />
        <AddressButton name="Index Staking" address={ContractIndexStaking} uniswap={false} />
        <AddressButton name="Vesting Pool" address={ContractVestingPool} uniswap={false} />
        <AddressButton name="Monthly Allowance" address={ContractMonthlyAllowance} uniswap={false} />

        <h3>Obsolete Addresses</h3>
        <AddressButton name="YAMv1" address={yam} uniswap={false} />
        <AddressButton name="YAMv2" address={yamv2} uniswap={false} />

      </Container>
    </Page>
  );
};

export default Addresses;
