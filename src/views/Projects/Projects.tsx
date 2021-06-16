import React from "react";
import { Container, Spacer } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import UmbrellaCard from "components/UmbrellaCard";
import DegenerativeCard from "components/DegenerativeCard"
import YamDaoCard from "components/YamDaoCard"

const Projects: React.FC = () => {
  return (
    <Page>
      <PageHeader icon="🏆" subtitle="" title="Projects" />
      <Container size="lg">
        <Spacer />
        <Split>
          <UmbrellaCard />
          <DegenerativeCard />
          <YamDaoCard />
        </Split>
      </Container>
    </Page>
  );
};

export default Projects;
