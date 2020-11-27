import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import StyledNotice from 'views/Common/StyledNotice'


const Apothecary: React.FC = () => {

  return (
    <Page>
      <Container>
        <Spacer size="lg" />
        <Spacer />
        <Spacer size="md" />
        <StyledNotice
          messages={["Apothecary", "It's in the works"]}
        />
        <Spacer size="md" />
        <StyledNotice
          messages={["For more information visit our Discord"]}
        />
      </Container>
    </Page>
  )
}

export default Apothecary
