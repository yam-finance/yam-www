import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'

const StyledNotice = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 100%
  color: ${props => props.theme.colors.primary.main};
`

const Stake: React.FC = () => {


  return (
    <Page>
      <Container>
        <Spacer size="lg" />
        <Spacer />
        <Spacer size="md" />
        <StyledNotice>
          <span>Greenhouse</span>
          <span>It's in the works</span>
        </StyledNotice>
        <Spacer size="md" />
        <StyledNotice>
          <span>For more information visit our Discord</span>
          </StyledNotice>
      </Container>
    </Page>
  )
}

export default Stake
