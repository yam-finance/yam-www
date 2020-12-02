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

interface NamedGeneratingModalProps extends ModalProps {
  onGenerate: (amount: string, name: string) => void,
  label: string,
  fullBalance?: BigNumber,
  minAmount: number,
}

const NamedGeneratingModal: React.FC<NamedGeneratingModalProps> = ({
  isOpen,
  onDismiss,
  onGenerate,
  label,
  fullBalance,
  minAmount
}) => {

  const [val, setVal] = useState('')
  const [name, setName] = useState('')
  const [hasError, setHasError] = useState(false)

  const handleNameChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }, [setVal])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
    setHasError(new BigNumber(e.currentTarget.value || 0).lt(new BigNumber(minAmount)))
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(String(fullBalance || 0))
    setHasError(new BigNumber(fullBalance || 0).lt(new BigNumber(minAmount)))
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
            placeholder="Name your NFT"
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
        {hasError &&
          <ErrorLabel>
            {`Min required balance is ${minAmount}`}
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
          disabled={!val || !Number(val) || hasError}
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