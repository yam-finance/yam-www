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
import { RNG_ETH_FEE } from 'constants/poolValues'
import StyledNotice from 'views/Common/StyledNotice'

interface NamedGeneratingModalProps extends ModalProps {
  onGenerate: (amount: string, name: string) => void,
  label: string,
  fullBalance?: BigNumber
}

const NamedGeneratingModal: React.FC<NamedGeneratingModalProps> = ({
  isOpen,
  onDismiss,
  onGenerate,
  label,
  fullBalance
}) => {

  const [val, setVal] = useState('')
  const [name, setName] = useState('')

  const handleNameChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }, [setVal])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(String(fullBalance || 0))
  }, [fullBalance, setVal])

  const handleGenerateClick = useCallback(() => {
    onGenerate(val, name)
  }, [onGenerate, val, name])

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Generate NFT" />
      <ModalContent>
      {/*<StyledDivContainer>
        <Input
          endAdornment={(
            <StyledTokenAdornmentWrapper>
              <StyledTokenSymbol>{}</StyledTokenSymbol>
              <StyledSpacer />
            </StyledTokenAdornmentWrapper>
          )}
          onChange={handleNameChange}
          placeholder="Name your NFT"
          value={name}
          /></StyledDivContainer>*/}
        <StyledNotice
          messages={[`${RNG_ETH_FEE} ETH is needed to generation the NFT genome`, 'If your ETH balance is below this, NFT generation will fail']}
        />

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

export default NamedGeneratingModal