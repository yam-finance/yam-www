import React from "react";
import styled from "styled-components";

import StartFooter from "../StartFooter";

const StartPage: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
    <StartFooter />
  </StyledPage>
);

const StyledPage = styled.div``;

const StyledMain = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 215px);
  padding: ${(props) => props.theme.spacing[6]}px 0;
`;

export default StartPage;
