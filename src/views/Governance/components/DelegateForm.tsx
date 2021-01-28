import React, { Fragment, useState, useCallback, useEffect } from 'react';
import { Spacer, Button, Input } from "react-neu";
import Split from "components/Split";
import { validateAddress } from 'utils';
import styled from "styled-components";

interface DelegateFormProps {
  isStaked: boolean,
  isDelegated: boolean,
  onDelegateUnstaked: (delegatee: string) => void,
  onDelegateStaked: (delegatee: string) => void,
  onRemoveDelegation: () => void,
}

export const DelegateForm: React.FC<DelegateFormProps> = ({
  isStaked,
  isDelegated,
  onDelegateStaked,
  onDelegateUnstaked,
  onRemoveDelegation
}) => {
  const [delegatee, setDelegatee] = useState('');

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
    <Fragment>
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
          variant="tertiary"
          onClick={onRemoveDelegation}
          disabled={!isDelegated}/>
      </Split>
    </Fragment>
  );
};

export default DelegateForm;
