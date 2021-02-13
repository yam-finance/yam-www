import React, { useState, useCallback } from 'react';
import { Card, CardTitle, CardContent, Button, Input, Spacer } from "react-neu";
import Box from 'components/BoxWithDisplay';
import Split from "components/Split";
import { validateAddress } from 'utils';

import useGovernance from "hooks/useGovernance";
import useFarming from "hooks/useFarming";

export const DelegateForm: React.FC = () => {
  const [delegatee, setDelegatee] = useState('');

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

export default DelegateForm;
