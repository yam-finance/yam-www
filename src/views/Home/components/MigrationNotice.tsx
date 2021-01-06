import React from "react";
import { useIntl } from "react-intl";

import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import styled from "styled-components";

const MigrationNotice: React.FC = () => {
  const intl = useIntl();
  return (
    <Notice>
      <NoticeIcon>🦋</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>{intl.formatMessage({ id: "home.unmigrated" })}</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button size="sm" text={intl.formatMessage({ id: "common.migrate" })} to="migrate" />
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

export default MigrationNotice;
