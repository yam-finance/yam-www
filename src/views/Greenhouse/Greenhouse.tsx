import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import GenerateNFT from './GenerateNFT'


const Greenhouse: React.FC = () => {


  return (
    <Page>
      <Container>
        <GenerateNFT />
        <Spacer size="lg" />
        <Spacer />
        <Spacer size="md" />
      </Container>
    </Page>
  )
}

export default Greenhouse
