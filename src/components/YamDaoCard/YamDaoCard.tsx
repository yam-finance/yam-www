import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import ValueText from "components/ValueText";
import styled from "styled-components";
const YamDaoCard: React.FC = () => {

  return (
    <Card>
      <StyledCard>
        <Spacer />
        <CardIcon>🏡</CardIcon>
        <CardContent>
          <Box alignItems="center" column minHeight={120}>
            <ValueText value="Yam Treasuries" />
            <Label text="Yam Treasuries is an actively managed portfolio that is governed by the Yam DAO" labelPosition="center"/>
          </Box>
        </CardContent>
        <CardActions>
          <Button full to="/daohouse" text="Info" variant="secondary" />
        </CardActions>
      </StyledCard>
    </Card>
  );
};
const StyledCard = styled.div`
 height:320px;
`;
export default YamDaoCard;
