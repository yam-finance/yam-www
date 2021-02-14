import React, { useState } from 'react';
import { Button } from 'react-neu';
import useGovernance from "hooks/useGovernance";
import { useWallet } from "use-wallet";

interface RegistrationButtonProps {
  size?: 'sm' | 'md' | 'lg';
  width?: string
}

const RegistrationButton: React.FC<RegistrationButtonProps> = ({ size, width }) => {
  const { isRegistered, isRegistering, onRegister, onUnregister } = useGovernance();
  const { account } = useWallet();

  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ width }}
    >
      {!isRegistered
        ? <Button full disabled={!account || isRegistering} onClick={onRegister} size={size} text={isRegistering ? "Registering..." : "Register"} variant="secondary" />
        : <Button full disabled={isRegistering} onClick={onUnregister} size={size} text={ hover ? "Unregister" : "Registered"} variant="secondary" />
      }
    </div>
  )
}

export default RegistrationButton;
