import React, { useCallback, useEffect, useState } from "react";

import { Box, Button, Notice, NoticeContent, NoticeIcon, Spacer } from "react-neu";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { useWallet } from "use-wallet";

import useYam from "hooks/useYam";
import { delegate, didDelegate } from "yam-sdk/utils";

const RegisterVoteNotice: React.FC = () => {
  const intl = useIntl();
  const [isRegistered, setIsRegistered] = useState<boolean>();
  const [isRegistering, setIsRegistering] = useState(false);
  const { account } = useWallet();
  const yam = useYam();

  const fetchIsRegistered = useCallback(async () => {
    if (!account || !yam) return;
    const registered = await didDelegate(yam, account);
    setIsRegistered(registered);
  }, [account, setIsRegistered, yam]);

  const handleRegisterClick = useCallback(async () => {
    if (!account || !yam) return;
    await delegate(yam, account, (txHash: string) => setIsRegistering(!!txHash));
    setIsRegistering(false);
  }, [account, setIsRegistering, yam]);

  useEffect(() => {
    fetchIsRegistered();
  }, [account, fetchIsRegistered, yam]);

  return (
    <Notice isHidden={typeof isRegistered === "undefined"}>
      <NoticeIcon>{isRegistered ? "✔️" : "🗣️"}</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>{isRegistered ? intl.formatMessage({ id: "home.vote.registered" }) : intl.formatMessage({ id: "home.vote.unregistered" })}</span>
          <Box flex={1} />
          <Spacer size="sm" />
          {!isRegistered && (
            <Button
              disabled={isRegistering}
              onClick={handleRegisterClick}
              size="sm"
              text={isRegistering ? intl.formatMessage({ id: "common.registering" }) : intl.formatMessage({ id: "common.register" })}
            />
          )}
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
