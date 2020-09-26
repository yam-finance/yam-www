import React from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import Charts from './components/Charts'

const Dashboard: React.FC = () => {
  return (
    <Page>
      <PageHeader
        icon="📈"
        subtitle="Overview of the YAM ecosystem"
        title="YAM Dashboard"
      />
      <Charts />
    </Page>
  )
}

export default Dashboard
