import React, { Fragment } from 'react';
import styled from "styled-components";

import { Button } from 'react-neu';
import useGovernance from "hooks/useGovernance";
import { useWallet } from "use-wallet";

const RegistrationButton = () => {
  const { isRegistered, isRegistering, onRegister, onUnregister } = useGovernance();
  const { account } = useWallet();

  return (
    <StyledButton>
    {!isRegistered
      ? <Button full disabled={!account || isRegistering} onClick={onRegister} text={isRegistering ? "Registering..." : "Register"} variant="secondary" />
      : <Button full disabled={isRegistering} onClick={onUnregister} text="Unregister" variant="secondary" />
    }
    </StyledButton>
  )
}

const StyledButton = styled.div``;

export default RegistrationButton;
