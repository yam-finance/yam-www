import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import Page from 'components/Page'
import StyledNotice from 'views/Common/StyledNotice'


const Greenhouse: React.FC = () => {

  return (
    <Page>
      <Container>
      <StyledNotice
          messages={["Greenhouse", "It's in the works"]}
        />
        <Spacer size="md" />
        <StyledNotice
          messages={["For more information visit our Discord"]}
        />
      </Container>
    </Page>
  )
}

export default Greenhouse
