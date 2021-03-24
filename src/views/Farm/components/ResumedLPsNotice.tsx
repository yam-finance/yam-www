import React from "react";
import { Box, Button, Notice, NoticeContent, Spacer } from "react-neu";
import styled from "styled-components";
import StyledNoticeIcon from "components/StyledNoticeIcon";

const ResumedLPsNotice: React.FC = () => (
  <>
    <Notice>
      <StyledNoticeIcon role="img">💧</StyledNoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>LP rewards are resumed, you can now farm again!</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button
            size="sm"
            text="Add Liquidity"
            href="https://exchange.sushiswapclassic.org/#/add/0x0aacfbec6a24756c20d41914f2caba817c0d8521/ETH"
            variant="secondary"
          />
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
    <Spacer />
  </>
);

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default ResumedLPsNotice;
