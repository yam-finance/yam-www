import React from "react";

import { Box, Button, Notice, NoticeContent, Spacer } from "react-neu";
import styled from "styled-components";
import StyledNoticeIcon from "components/StyledNoticeIcon";

const VestingNotice: React.FC = () => {
  return (
    <Notice>
      <StyledNoticeIcon>🎁</StyledNoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>You have unclaimed vested YAM tokens.</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button size="sm" text="Claim" to="/migrate" />
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
  );
};

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export default VestingNotice;
