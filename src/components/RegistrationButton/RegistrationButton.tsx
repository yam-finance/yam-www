import React, { Fragment } from 'react';
import styled from "styled-components";

import { Button } from 'react-neu';
import useGovernance from "hooks/useGovernance";
import { useWallet } from "use-wallet";

interface RegistrationButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

const RegistrationButton: React.FC<RegistrationButtonProps> = ({ size }) => {
  const { isRegistered, isRegistering, onRegister, onUnregister } = useGovernance();
  const { account } = useWallet();


  return (
    <StyledButton>
    {!isRegistered
      ? <Button full disabled={!account || isRegistering} onClick={onRegister} size={size} text={isRegistering ? "Registering..." : "Register"} variant="secondary" />
      : <Button full disabled={isRegistering} onClick={onUnregister} size={size} text="Unregister" variant="secondary" />
    }
    </StyledButton>
  )
}

const StyledButton = styled.div``;

export default RegistrationButton;
