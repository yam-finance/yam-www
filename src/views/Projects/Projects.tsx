import React, { useCallback, useState, useEffect } from "react";
import { Container, Spacer } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import YamTreasuriesCard from "components/YamTreasuriesCard";
import YamReOrgCard from "components/YamReOrgCard";

const WORKERS = [
  '👷',
  '👷‍♂️',
  '👷🏽',
  '👷🏻',
  '👷🏾',
  '👷🏽‍♀️',
  '👷🏻‍♀️',
  '👷🏼‍♀️',
  '👷🏼‍♀️',
  '👷🏾‍♀️‍',
  '👷🏿‍♂️'
]

const Projects: React.FC = () => {

    const [worker, setWorker] = useState('👷')

  const updateWorker = useCallback(() => {
    const newWorker = WORKERS[Math.floor(Math.random() * WORKERS.length)]
    setWorker(newWorker)
  }, [setWorker])

  useEffect(() => {
    const refresh = setInterval(updateWorker, 1000)
    return () => clearInterval(refresh)
  }, [updateWorker])

  return (
    <Page>
      <PageHeader icon={`${worker}`} subtitle="Take a look at what we are working on." title="Projects" />
      <Container size="md">
        <Spacer />
        <Split>
          <YamReOrgCard />
          <YamTreasuriesCard />
          {/* <DegenerativeCard /> */}
          {/* <UmbrellaCard /> */}
          {/* <MofyCard /> */}
        </Split>
      </Container>
    </Page>
  );
};


export default Projects;
