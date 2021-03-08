import React, { useCallback, useMemo, useState } from "react";

import BigNumber from "bignumber.js";
import { Button, Modal, ModalActions, ModalContent, ModalProps, ModalTitle } from "react-neu";

import TokenInput from "components/TokenInput";

import useFarming from "hooks/useFarming";
import { getFullDisplayBalance } from "utils";

interface UnstakeModalProps extends ModalProps {
  onUnstake: (amount: string) => void;
}

const UnstakeModal: React.FC<UnstakeModalProps> = ({ isOpen, onDismiss, onUnstake }) => {
  const [val, setVal] = useState("");
  const { stakedBalanceYAMETH } = useFarming();

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(stakedBalanceYAMETH || new BigNumber(0));
  }, [stakedBalanceYAMETH]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value);
    },
    [setVal]
  );

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  const handleUnstakeClick = useCallback(() => {
    onUnstake(val);
  }, [onUnstake, val]);

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalTitle text="Unstake" />
      <ModalContent>
        <TokenInput value={val} onSelectMax={handleSelectMax} onChange={handleChange} max={fullBalance} symbol="YAM_ETH_SLP" />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" variant="secondary" />
        <Button
          disabled={!val || !Number(val)}
          onClick={handleUnstakeClick}
          text="Unstake"
          variant={!val || !Number(val) ? "secondary" : "default"}
        />
      </ModalActions>
    </Modal>
  );
};

export default UnstakeModal;
