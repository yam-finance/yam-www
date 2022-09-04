import React, { useState, useCallback } from 'react';
import { Card, CardTitle, CardContent, Button, Input, Spacer } from "react-neu";
import { validateAddress } from 'utils';
import { useWallet } from 'use-wallet';
import { shorten } from "utils";
import Box from 'components/BoxWithDisplay';
import Split from "components/Split";
import Label from "components/Label";
import useGovernance from "hooks/useGovernance";

export const DelegateToken: React.FC = () => {
  const { account } = useWallet();
  const [delegatee, setDelegatee] = useState('');

  const {
    delegatedAddressToken,
    isDelegatedToken,
    onDelegateToken,
    onRemoveTokenDelegation,
  } = useGovernance();

  const onChange = (e: any): void => setDelegatee(e.target.value);
  const handleTokenDelegation = useCallback(
    () => onDelegateToken(delegatee),
    [onDelegateToken, delegatee]
  );

  return (
    <Card>
      <CardTitle text="YAM Delegation" />
      <Spacer />
      <Label text={isDelegatedToken ? 'Delegating to ' + (delegatedAddressToken === account ? 'your wallet (' + shorten(delegatedAddressToken) + ')' : delegatedAddressToken) : 'Not Delegating'} bold={true} labelPosition="center" />
      <CardContent>
        <Box display="grid" alignItems="center" paddingLeft={4} paddingRight={4} paddingBottom={1} row>
          <Input onChange={onChange} size={"sm"} placeholder="Delegate to..."></Input>
          <Spacer />
          <Split>
            <Button
              full
              text="Delegate YAM"
              variant="secondary"
              onClick={handleTokenDelegation}
              disabled={!validateAddress(delegatee) || (delegatedAddressToken?.toLocaleLowerCase() === delegatee.toLocaleLowerCase())}
            />
            <Button
              full
              text="Remove YAM Delegation"
              variant="secondary"
              onClick={onRemoveTokenDelegation}
              disabled={!isDelegatedToken} />
          </Split>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DelegateToken;
