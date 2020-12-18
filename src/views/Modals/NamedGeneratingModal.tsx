import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  Button,
  Input,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import TokenInput from 'components/TokenInput'
import styled from 'styled-components'
import { MIN_LP_AMOUNTS_DISPLAY } from 'constants/poolValues'

interface NamedGeneratingModalProps extends ModalProps {
  onGenerate: (amount: string, name: string) => void,
  label: string,
  fullBalance?: BigNumber,
  minAmount: number,
  poolId: string,
}

const NamedGeneratingModal: React.FC<NamedGeneratingModalProps> = ({
  isOpen,
  onDismiss,
  onGenerate,
  label,
  fullBalance,
  minAmount,
  poolId
}) => {

  const [val, setVal] = useState('')
  const [name, setName] = useState('')
  const [hasBalanceError, setHasBalanceError] = useState(false)

  const handleNameChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }, [setVal])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
    setHasBalanceError(new BigNumber(e.currentTarget.value || 0).lt(new BigNumber(minAmount)))
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(String(fullBalance || 0))
    setHasBalanceError(new BigNumber(fullBalance || 0).lt(new BigNumber(minAmount)))
  }, [fullBalance, setVal])

  const handleGenerateClick = useCallback(() => {
    onGenerate(val, name)
  }, [onGenerate, val, name])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Generate NFT" />
      <ModalContent>
        <StyledDivContainer>
          <Input
            endAdornment={(
              <StyledTokenAdornmentWrapper>
                <StyledTokenSymbol>{ }</StyledTokenSymbol>
                <StyledSpacer />
              </StyledTokenAdornmentWrapper>
            )}
            onChange={handleNameChange}
            placeholder="Name your NFT (Required)"
            value={name}
          />
        </StyledDivContainer>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={String(fullBalance || 0)}
          symbol={label}
        />
        {hasBalanceError &&
          <ErrorLabel>
            {`Min required balance is ${MIN_LP_AMOUNTS_DISPLAY[Number(poolId)]}`}
          </ErrorLabel>
        }
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button
          disabled={!val || !Number(val) || hasBalanceError || name === ''}
          onClick={handleGenerateClick}
          text="Generate"
          variant={!val || !Number(val) ? 'secondary' : 'default'}
        />
      </ModalActions>
    </Modal>
  )
}

const StyledDivContainer = styled.div`
    input {
        width: 150px;
    }
`;

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledTokenSymbol = styled.span`
  color: ${props => props.theme.colors.grey[600]};
  font-weight: 700;
`

const StyledSpacer = styled.div`
  width: ${props => props.theme.spacing[3]}px;
`

const ErrorLabel = styled.div`
  color: #ff0000;
`

export default NamedGeneratingModal