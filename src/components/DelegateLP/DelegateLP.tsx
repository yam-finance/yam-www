import React, { useState, useCallback } from 'react';
import { Card, CardTitle, CardContent, Button, Input, Spacer } from "react-neu";
import { validateAddress } from 'utils';
import { useWallet } from 'use-wallet';
import { shorten } from "utils";
import Box from 'components/BoxWithDisplay';
import Split from "components/Split";
import Label from "components/Label";
import useGovernance from "hooks/useGovernance";
import useFarming from "hooks/useFarming";

export const DelegateLP: React.FC = () => {
  const { account } = useWallet();
  const [delegatee, setDelegatee] = useState('');

  const {
    delegatedAddressLP,
    isDelegatedLP,
    onDelegateLP,
    onRemoveLPDelegation,
  } = useGovernance();

  const onChange = (e: any): void => setDelegatee(e.target.value);
  const handleTokenDelegation = useCallback(
    () => onDelegateLP(delegatee),
    [onDelegateLP, delegatee]
  );

  const { stakedBalanceYAMETH } = useFarming();
  const isStaked = !!stakedBalanceYAMETH && stakedBalanceYAMETH.toNumber() > 0;

  return (
    <Card>
      <CardTitle text="YAM LP Delegation" />
      <Spacer />
      <Label text={isDelegatedLP ? 'Delegating to ' + (delegatedAddressLP === account ? 'your wallet (' + shorten(delegatedAddressLP) + ')' : delegatedAddressLP) : 'Not Delegating'} bold={true} labelPosition="center" />
      <CardContent>
        <Box display="grid" alignItems="center" paddingLeft={4} paddingRight={4} paddingBottom={1} row>
          <Input onChange={onChange} size={"sm"} placeholder="Delegate to..."></Input>
          <Spacer />
          <Split>
            <Button
              full
              text="Delegate YAM LP"
              variant="secondary"
              onClick={handleTokenDelegation}
              disabled={!validateAddress(delegatee) || (delegatedAddressLP?.toLocaleLowerCase() === delegatee.toLocaleLowerCase())}
            />
            <Button
              full
              text="Remove YAM LP Delegation"
              variant="secondary"
              onClick={onRemoveLPDelegation}
              disabled={!isDelegatedLP} />
          </Split>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DelegateLP;
