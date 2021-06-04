import React from "react";
import { Box, Button, Notice, NoticeContent, Spacer } from "react-neu";
import styled from "styled-components";
import StyledNoticeIcon from "components/StyledNoticeIcon";

const VestingNotice: React.FC = () => (
  <Notice>
    <StyledNoticeIcon role="img">⚠️</StyledNoticeIcon>
    <NoticeContent>
      <StyledNoticeContentInner>
        <span>Migrated tokens are subject to a vesting schedule before they are claimable.</span>
        <Spacer size="sm" />
        <Button size="sm" text="Learn more" href="https://docs.yam.finance/faq#how-does-yamv2-to-yam-migration-work" variant="tertiary" />
      </StyledNoticeContentInner>
    </NoticeContent>
  </Notice>
);

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default VestingNotice;
