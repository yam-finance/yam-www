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
    onAddStake: (amount: string, stxpAmount: string) => void,
  label: string,
  fullBalance?: BigNumber,
}

const AdditionalStakeModal: React.FC<NamedGeneratingModalProps> = ({
  isOpen,
  onDismiss,
  onAddStake,
  label,
  fullBalance,
}) => {

  const [val, setVal] = useState('')
  const [hasBalanceError, setHasBalanceError] = useState(false)

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
    setHasBalanceError(new BigNumber(e.currentTarget.value || 0).eq(0))
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(String(fullBalance || 0))
    setHasBalanceError(new BigNumber(fullBalance || 0).eq(0))
  }, [fullBalance, setVal])

  const handleAddStakeClick = useCallback(() => {
    onAddStake(val, "0")
  }, [onAddStake, val])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Add Stake to NFT" />
      <ModalContent>
        {/*<StyledDivContainer>
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
            </StyledDivContainer>*/}
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={String(fullBalance || 0)}
          symbol={label}
        />
        {hasBalanceError &&
          <ErrorLabel>
            {`No LP tokens found for ${label}`}
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
          disabled={!val || !Number(val) || hasBalanceError}
          onClick={handleAddStakeClick}
          text="Add Stake"
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

export default AdditionalStakeModal