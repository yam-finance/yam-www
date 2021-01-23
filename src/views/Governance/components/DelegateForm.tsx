import React, { Fragment, useState } from 'react';
import { Container, Spacer, Card, CardTitle, CardContent, Separator, Surface, Button, Input } from "react-neu";
import Split from "components/Split";

interface DelegateFormProps {
  isStaked: boolean,
  onDelegateUnstaked: (delegatee: string) => void,
  onDelegateStaked: (delegatee: string) => void,
  onUndelegate: () => void
}

const DelegateForm: React.FC<DelegateFormProps> = ({ isStaked, onDelegateStaked, onDelegateUnstaked, onUndelegate }) => {
  const [delegatee, setDelegatee] = useState('');

  const delegateStaked = () => {
    console.log('delegate staked called!!')
    onDelegateStaked(delegatee);
  }

  const delegateUnstaked = () => {
    console.log('delegate unstaked called!!')
    onDelegateUnstaked(delegatee);
  }

  const undelegate = () => {
    console.log('undelegate called!!')
  }

  const onChange = (e: any) => setDelegatee(e.target.value);

  return (
    <Fragment>
      <Input onChange={onChange} placeholder="Delegate to..."></Input>
      <Spacer />
      <Split>
        <Button full text="Delegate" variant="tertiary" onClick={isStaked ? delegateStaked : delegateUnstaked} />
        <Button full text="Remove Delegation" variant="tertiary" onClick={undelegate} />
      </Split>
    </Fragment>
  )
}

export default DelegateForm;