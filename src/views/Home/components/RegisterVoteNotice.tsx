import React from "react";
import { Notice, NoticeContent, Box, Spacer, Button } from "react-neu";
import RegistrationButton from 'components/RegistrationButton';
import styled from "styled-components";
import StyledNoticeIcon from "components/StyledNoticeIcon";

import useGovernance from 'hooks/useGovernance';

const RegisterVoteNotice: React.FC = () => {
  const { isRegistered } = useGovernance();

  return (
    <Notice isHidden={isRegistered}>
      <StyledNoticeIcon role='img'>{isRegistered ? "✔️" : "🗣️"}</StyledNoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>{isRegistered ? `You've successfuly registered to vote!` : `It's time to register to vote for onchain and Snapshot proposals.`}</span>
          <Box flex={1} />
          <Spacer size="sm" />
          {!isRegistered && <RegistrationButton size='sm'/>}
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
