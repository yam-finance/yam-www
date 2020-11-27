import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import StyledNotice from 'views/Common/StyledNotice'

const Stake: React.FC = () => {


  return (
    <Page>
      <Container>
        <Spacer size="lg" />
        <Spacer />
        <Spacer size="md" />
        <StyledNotice
          messages={["Dispensary", "It's in the works"]}
        />
        <Spacer size="md" />
        <StyledNotice
          messages={["For more information visit our Discord"]}
        />
      </Container>
    </Page>
  )
}

export default Stake
