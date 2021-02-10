import React, { Fragment, useState, useCallback } from 'react';
import { Card, CardTitle, CardContent, Button, Input, Spacer } from "react-neu";
import Box from 'components/BoxWithDisplay';
import Split from "components/Split";
import UnlockWalletModal from "components/UnlockWalletModal";
import { validateAddress } from 'utils';
import { useWallet } from "use-wallet";

import useGovernance from "hooks/useGovernance";
import useFarming from "hooks/useFarming";

export const DelegateForm: React.FC = () => {
  const [delegatee, setDelegatee] = useState('');
  const { account } = useWallet();

  const [unlockModalIsOpen, setUnlockModalIsOpen] = useState(false);
  const {
    isDelegated,
    onDelegateStaked,
    onDelegateUnstaked,
    onRemoveDelegation,
  } = useGovernance();
  const { stakedBalanceYAMETH } = useFarming();
  const isStaked = !!stakedBalanceYAMETH && stakedBalanceYAMETH.toNumber() > 0;

  const handleOnDelegateStaked = useCallback(
    () => onDelegateStaked(delegatee),
    [onDelegateStaked, delegatee]
  );

  const handleOnDelegateUnstaked = useCallback(
    () => onDelegateUnstaked(delegatee),
    [onDelegateUnstaked, delegatee]
  );

  const onChange = (e: any): void => setDelegatee(e.target.value);

  const handleDismissUnlockModal = useCallback(() => {
    setUnlockModalIsOpen(false);
  }, [setUnlockModalIsOpen]);

  const handleUnlockWalletClick = useCallback(() => {
    setUnlockModalIsOpen(true);
  }, [setUnlockModalIsOpen])

  if(account) {
    return (
      <Card>
        <CardTitle text="Delegate Vote" />
        <CardContent>
          <Box display="grid" alignItems="center" paddingLeft={4} paddingRight={4} paddingBottom={1} row>
            <Input onChange={onChange} placeholder="Delegate to..."></Input>
            <Spacer />
            <Split>
              <Button
                full
                text="Delegate"
                variant="secondary" 
                onClick={isStaked ? handleOnDelegateStaked : handleOnDelegateUnstaked}
                disabled={!validateAddress(delegatee)}
                />
              <Button
                full
                text="Remove Delegation"
                variant="secondary"
                onClick={onRemoveDelegation}
                disabled={!isDelegated}/>
            </Split>
          </Box>
        </CardContent>
      </Card>
    );
  }
  else {
    return(
      // TODO This should become a self-contained component shared across codebase
      <Fragment>
        <Box row justifyContent="center">
          <Button onClick={handleUnlockWalletClick} text="Unlock wallet to display proposals" variant="secondary" />
        </Box>
        <UnlockWalletModal isOpen={unlockModalIsOpen} onDismiss={handleDismissUnlockModal} />
      </Fragment>
    )
  }
}

export default DelegateForm;
