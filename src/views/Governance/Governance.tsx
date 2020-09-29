import React from 'react'
import { Container, Spacer, Card } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import useGovernance from 'hooks/useGovernance'

import ProposalEntry from './components/Proposal'

const Governance: React.FC = () => {
  const { proposals } = useGovernance();
  console.log("HERE", proposals);
  return (
    <Page>
      <PageHeader
        icon="🦋"
        subtitle="This is the last time you'll need to migrate!"
        title="Migrate to V3"
      />
      <Container>
        <Card>

          { proposals ? proposals.map(prop => <ProposalEntry prop={prop} /> ) : '--'}
        </Card>
      </Container>
    </Page>
  )
}

export default Governance
