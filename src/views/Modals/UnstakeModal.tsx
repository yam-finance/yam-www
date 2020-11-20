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

interface UnstakeModalProps extends ModalProps {
  onUnstake: (amount: string) => void,
  label: string,
  fullBalance?: BigNumber,
  disableUnstaking?: boolean,
}

const UnstakeModal: React.FC<UnstakeModalProps> = ({
  isOpen,
  onDismiss,
  onUnstake,
  label,
  fullBalance,
}) => {

  const [val, setVal] = useState('')
  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(String(fullBalance))
  }, [fullBalance, setVal])

  const handleUnstakeClick = useCallback(() => {
    onUnstake(val)
  }, [onUnstake, val])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Unstake" />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={String(fullBalance)}
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
          onClick={handleUnstakeClick}
          text="Unstake"
          variant={!val || !Number(val) ? 'secondary' : 'default'}
        />
      </ModalActions>
    </Modal>
  )
}

export default UnstakeModal