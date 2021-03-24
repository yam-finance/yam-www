import React from "react";
import { Notice, NoticeContent, Box, Spacer } from "react-neu";
import styled from "styled-components";
import StyledNoticeIcon from "components/StyledNoticeIcon";

import useGovernance from 'hooks/useGovernance';

const RegisterNotice: React.FC = () => {
  const { isRegistered } = useGovernance();

  return (
    <Notice isHidden={isRegistered}>
      <StyledNoticeIcon>{isRegistered ? "✔️" : "🗣️"}</StyledNoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span style={{ width: '100%', textAlign: 'center', fontSize: 20 }}>{isRegistered ? `You've successfuly registered!` : `It's time to register to vote for onchain and Snapshot proposals.`}</span>
          <Spacer size="sm" />
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

export default RegisterNotice;
