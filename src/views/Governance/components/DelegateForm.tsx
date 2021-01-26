import React, { Fragment, useState, useCallback } from 'react';
import { Spacer, Button, Input } from "react-neu";
import Split from "components/Split";
import { validateAddress } from 'utils';

interface DelegateFormProps {
  isStaked: boolean,
  onDelegateUnstaked: (delegatee: string) => void,
  onDelegateStaked: (delegatee: string) => void,
  onRemoveDelegation: () => void
}

const DelegateForm: React.FC<DelegateFormProps> = ({
  isStaked,
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
        <Button full
          text="Delegate"
          variant="tertiary" 
          onClick={isStaked ? handleOnDelegateStaked : handleOnDelegateUnstaked}
          disabled={!validateAddress(delegatee)}
        />
        <Button full text="Remove Delegation" variant="tertiary" onClick={onRemoveDelegation} />
      </Split>
    </Fragment>
  );
};

export default DelegateForm;