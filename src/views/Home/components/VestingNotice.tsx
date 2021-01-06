import React from "react";

import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import { useIntl } from "react-intl";
import styled from "styled-components";

const VestingNotice: React.FC = () => {
  const intl = useIntl();
  return (
    <Notice>
      <NoticeIcon>🎁</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>{intl.formatMessage({ id: "home.vesting.unclaimed" })}</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button size="sm" text={intl.formatMessage({ id: "common.claim" })} to="/migrate" />
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
