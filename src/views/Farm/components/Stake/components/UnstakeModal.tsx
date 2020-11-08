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

import useFarming from 'hooks/useFarming'
import { getFullDisplayBalance } from 'utils'
import useBalances from 'hooks/useBalances'

interface UnstakeModalProps extends ModalProps {
  onUnstake: (amount: string) => void,
  lpLabel: string,
  poolId: string,
}

const UnstakeModal: React.FC<UnstakeModalProps> = ({
  isOpen,
  onDismiss,
  onUnstake,
  lpLabel,
  poolId,
}) => {

  const [val, setVal] = useState('')
  const {
    strnEthLpPoolBalance,
    strnXiotLpPoolBalance
  } = useBalances()
  
  const fullBalance = useMemo(() => {
    // need better way to get specific pool balance
    const balance = poolId === "0" ? strnEthLpPoolBalance : strnXiotLpPoolBalance
    return balance || new BigNumber(0)
  }, [strnEthLpPoolBalance, strnXiotLpPoolBalance])

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
          symbol={`${lpLabel} UNI-V2 LP`}
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