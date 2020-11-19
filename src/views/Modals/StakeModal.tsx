import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import TokenInput from 'components/TokenInput'

interface StakeModalProps extends ModalProps {
  onStake: (amount: string) => void,
  label: string,
  fullBalance?: BigNumber
}

const StakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  onDismiss,
  onStake,
  label,
  fullBalance
}) => {

  const [val, setVal] = useState('')

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(String(fullBalance || 0))
  }, [fullBalance, setVal])

  const handleStakeClick = useCallback(() => {
    onStake(val)
  }, [onStake, val])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Stake" />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={String(fullBalance || 0)}
          symbol={label}
        />
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button
          disabled={!val || !Number(val)}
          onClick={handleStakeClick}
          text="Stake"
          variant={!val || !Number(val) ? 'secondary' : 'default'}
        />
      </ModalActions>
    </Modal>
  )
}

export default StakeModal