import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Card, Spacer, Button, Container } from "react-neu";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import { useWallet } from "use-wallet";
import { useTranslation } from 'react-i18next';
import UnlockWalletModal from "components/UnlockWalletModal";
import FancyValue from "components/FancyValue";
import Split from "components/Split";
import { useCountUp } from "react-countup";
import numeral from "numeral";
import Label from "components/Label";
import styled from "styled-components";
import useDashboard from "hooks/useDashboard";
import { getYamValue } from "yam-sdk/utils";
import moment from "moment";

const TokenValues: React.FC = () => {
  const { account } = useWallet();
  const { yamObject } = useDashboard();
  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const [lastMonthLastValueText, setLastMonthLastValueText] = useState<string>();
  const [last30ValueText, setLast30ValueText] = useState<string>();
  const [lastMonthValue, setLastMonthValue] = useState<number>();
  const [last30Value, setLast30Value] = useState<number>();

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen]);

  const getCurrentValue = yamObject?.currentPrice ? yamObject?.currentPrice : 0;

  const countUpAvgMonth = useCountUp({
    start: 0,
    end: lastMonthValue ? lastMonthValue : 0,
    formattingFn: (val) => val ? `$${numeral(val).format("0.000")}` : "...",
    decimals: 3,
    duration: 1.75
  });

  const countUpCurrent = useCountUp({
    start: 0,
    end: getCurrentValue,
    formattingFn: (val) => val ? `$${numeral(val).format("0.000")}` : "...",
    decimals: 3,
    duration: 1.75
  });

  const countUpAvg30 = useCountUp({
    start: 0,
    end: last30Value ? last30Value : 0,
    formattingFn: (val) => val ? `$${numeral(val).format("0.000")}` : "...",
    decimals: 3,
    duration: 1.75
  });

  const fetchValues = useCallback(async () => {
    const getLastMonthStartValue = moment().subtract(1, 'months').startOf('month');
    const getLastMonthEndValue = moment().subtract(1, 'months').endOf('month');
    const getLastMonthStart = getLastMonthStartValue.format('YYYY-MM-DD');
    const getLastMonthEnd = getLastMonthEndValue.format('YYYY-MM-DD');
    const getLastMonthLastText = getLastMonthEndValue.format('Do') + " of " + getLastMonthStartValue.format('MMMM');
    const getLast30StartValue = moment().subtract(30, 'days');
    const getLast30Start = getLast30StartValue.format('YYYY-MM-DD');
    const getNow = moment().format("YYYY-MM-DD");
    const getLastMonthValue: any = await getYamValue(getLastMonthStart, getLastMonthEnd);
    const getLast30Value: any = await getYamValue(getLast30Start, getNow);
    const getLast30Text = getLast30StartValue.format('DD MMM') + " - " + moment().format('DD MMM');
    setLastMonthLastValueText(getLastMonthLastText);
    setLast30ValueText(getLast30Text);
    setLastMonthValue(getLastMonthValue?.price);
    setLast30Value(getLast30Value?.price);
  }, [lastMonthValue, last30Value, setLastMonthValue, setLast30Value]);

  useEffect(() => {
    countUpAvgMonth.update(lastMonthValue);
    countUpCurrent.update(getCurrentValue);
    countUpAvg30.update(last30Value);
  }, [yamObject, lastMonthValue, last30Value]);

  useEffect(() => {
    fetchValues();
  }, []);

  return (
    <Page>
      <PageHeader icon="🍠💹" title="Token Values" subtitle="YAM token values over time." />
      <Container size="lg">
        {account
          ? (
            <Split>
              <Card>
                <Spacer />
                <Box height={'150px'}>
                  <CardEmoji>⌛</CardEmoji>
                  <CardContent>
                    <CardLabel>Avg. value last month</CardLabel>
                    <CardDetail>Value from 1st to {lastMonthLastValueText ? lastMonthLastValueText : "..."}.</CardDetail>
                    <CardValue>{countUpAvgMonth.countUp}</CardValue>
                  </CardContent>
                </Box>
              </Card>
              <Card>
                <Spacer />
                <Box height={'150px'}>
                  <CardEmoji>⬆️</CardEmoji>
                  <CardContent>
                    <CardLabel>Current value</CardLabel>
                    <CardDetail>Value now.</CardDetail>
                    <CardValue>{countUpCurrent.countUp}</CardValue>
                  </CardContent>
                </Box>
              </Card>
              <Card>
                <Spacer />
                <Box height={'150px'}>
                  <CardEmoji>🕰️</CardEmoji>
                  <CardContent>
                    <CardLabel>Avg. value last 30days</CardLabel>
                    <CardDetail>Value last 30 days ({last30ValueText ? last30ValueText : "..."}).</CardDetail>
                    <CardValue>{countUpAvg30.countUp}</CardValue>
                  </CardContent>
                </Box>
              </Card>
            </Split>
          )
          : (
            <>
              <Box row justifyContent="center">
                <Button onClick={handleUnlockWalletClick} text="Unlock wallet to display token values" variant="secondary" />
              </Box>
              <UnlockWalletModal isOpen={unlockModalIsOpen} onDismiss={handleDismissUnlockModal} />
            </>
          )
        }
      </Container>
    </Page>
  );
};

const CardEmoji = styled.span`
  text-align: center;
  font-size: 42px;
  line-height: 32px;
  height: 32px;
  display: block;
  margin: 0;
`;

const CardLabel = styled.h3`
  color: ${(props) => props.theme.colors.grey[500]};
  text-align: center;
  margin-bottom: 5px;
`;

const CardDetail = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  text-align: center;
  font-size: 14px;
  line-height: 14px;
`;

const CardValue = styled.span`
  color: ${(props) => props.theme.colors.grey[500]};
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  line-height: 32px;
  margin-top: 10px;
`;

const CardContent = styled.span`
  display: flex;
  flex-direction: column;
  margin: 15px;
`;

export default TokenValues;
