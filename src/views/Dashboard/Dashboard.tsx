import React, {useState} from 'react'
import { Container, Spacer } from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import TopCards from './components/TopCards'
import styled from 'styled-components'

import Charts, {OptionInterface} from './components/Charts'
import FallbackCharts from './components/FallbackCharts'
import {pingApi} from 'yam-sdk/utils'

const Dashboard: React.FC = () => {
    const [chart, setChart] = useState<number>(0)
    if(chart===0)
    {
        pingApi().then((response)=>{
            if(response && response.data)
                setChart(1);
            else
                setChart(2);
        })
    }

  return (
    <Page>
      <PageHeader icon="📊" subtitle="Overview of the YAM ecosystem" title="YAM Dashboard" />
      <Container size="lg">
        <TopCards />
        <Spacer />
          { chart>0 &&
            (chart===1)? <Charts/>:<FallbackCharts/>
          }
      </Container>
    </Page>
  );
};

const StyledCharts = styled.div`
  padding: 0px;
`;

export default Dashboard;
