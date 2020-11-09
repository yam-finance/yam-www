import React from "react";
import { Container, Spacer, useTheme } from "react-neu";

import Page from "components/Page";
import PageHeader from "components/PageHeader";
import Split from "components/Split";
import Rebase from "views/Home/components/Rebase";
import Stats from "views/Home/components/Stats";
import Bar from "components/Bar";

const YCP: React.FC = () => {
  const { darkMode } = useTheme();
  return (
    <Page>
      <PageHeader
        icon={"🤫"}
        title={"Coming Soon!"}
        titleSize={80}
        titleWeight={"900"}
      />
      <Container size="sm">
        <Bar type={"buffer"} value={80}></Bar>
      </Container>
      <Container>
        <Spacer />
        <h2>Introduction</h2>
        <span>
          The YAM Bug/Hack Protection Protocol (name/logo/token TBD), is a protocol designed to let those with confidence in the security of a protocol earn yield and those concerned about a bug or a hack to gain access to upside exposure in such an event. If such an event were to occur, a claim would be submitted and the arbiter would rule on its validity, paying out the entire protection pool to those with active coverage.
        </span>
        <Spacer />
        <h2>Links</h2>
        <b>Website:</b> TBD<br/>
        <b>Tokens:</b> TBD<br/>
        <Spacer />
        <h2>Details</h2>
        <span>
          Lorem ipsum dolor sit <a href="#">amet</a> consectetur adipisicing elit. Magni quasi impedit, et, itaque eligendi ex harum iusto nulla laudantium vitae distinctio aspernatur ipsum! At quibusdam perferendis ratione odit molestias perspiciatis!
        </span>
      </Container>
    </Page>
  );
};

export default YCP;
