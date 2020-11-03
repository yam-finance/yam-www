import React from "react";
import { Box, Button, Container, Spacer, useTheme } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import { DPI, governorContract, incentivizerContract, migratorContract, rebaserContract, reservesContract, timelockContract, yam, yamv2, yamv3, yUsd } from "constants/tokenAddresses";
import AddressButton from "components/AddressButton";

const Addresses: React.FC = () => {
  return (
    <Page>
      <PageHeader icon={"🎖️"} title={"Addresses"} subtitle={"Official Addresses"} />
      <Container size="sm">
        <h2>Yam Addresses &amp; Assets</h2>
        <AddressButton name="YAM" address={yamv3} uniswap={true} />
        <AddressButton name="yUSD" address={yUsd} uniswap={false} />
        <AddressButton name="DPI" address={DPI} uniswap={false} />

        <h3>Yam Contracts Addresses</h3>
        <AddressButton name="Reserves" address={reservesContract} uniswap={false} />
        <AddressButton name="Governor" address={governorContract} uniswap={false} />
        <AddressButton name="Timelock" address={timelockContract} uniswap={false} />
        <AddressButton name="Rebaser" address={rebaserContract} uniswap={false} />
        <AddressButton name="Incentivizer" address={incentivizerContract} uniswap={false} />
        <AddressButton name="Migrator" address={migratorContract} uniswap={false} />

        <h3>Obsolete Addresses</h3>
        <AddressButton name="YAMv1" address={yam} uniswap={false} />
        <AddressButton name="YAMv2" address={yamv2} uniswap={false} />

      </Container>
    </Page>
  );
};

export default Addresses;
