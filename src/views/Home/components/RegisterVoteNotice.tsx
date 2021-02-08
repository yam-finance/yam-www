import React from "react";
import { Notice, NoticeContent, NoticeIcon } from "react-neu";
import styled from "styled-components";

import useGovernance from 'hooks/useGovernance';

const RegisterVoteNotice: React.FC = () => {
  const { isRegistered } = useGovernance();

  return (
    <Notice isHidden={isRegistered}>
      <NoticeIcon>🗣️</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>It's time to register to vote for onchain and Snapshot proposals.</span>
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

export default RegisterVoteNotice;
