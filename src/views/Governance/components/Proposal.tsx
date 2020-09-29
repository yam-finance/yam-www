import React, { useCallback, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  Box,
  Button,
  Notice,
  NoticeContent,
  NoticeIcon,
  Spacer,
} from 'react-neu'

import TokenInput from 'components/TokenInput'
import useBalances from 'hooks/useBalances'
import { getFullDisplayBalance } from 'utils'

import styled from 'styled-components'
import { Proposal } from "../../../contexts/Governance/types"

interface ProposalProps {
  prop: Proposal
}

const ProposalEntry: React.FC<ProposalProps> = ({
  prop
}) => {
  function a() {

  }
  console.log("HERE 2", prop)
  return (
    <Notice>
      <NoticeIcon>🗣️</NoticeIcon>
      <NoticeContent>
        <StyledNoticeContentInner>
          <span>{prop.description}</span>
          <Box flex={1} />
          <Spacer size="sm" />
          <Button
            disabled={false}
            onClick={a}
            size="sm"
            text={'Register'}
          />
        </StyledNoticeContentInner>
      </NoticeContent>
    </Notice>
  )
}

const StyledNoticeContentInner = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`

export default ProposalEntry
