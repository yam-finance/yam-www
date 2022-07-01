import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import ValueText from "components/ValueText";
import styled from "styled-components";
const DegenerativeCard: React.FC = () => {

  return (
    <Card>
      <StyledCard>
        <Spacer />
        <CardIcon>🧟</CardIcon>
        <CardContent >
          <Box alignItems="center" column minHeight={120} >
            <ValueText value="Yam Synths" />
            <Label text="Yam Synths is your portal to the powerful world of synthetic derivatives" labelPosition="center" />
          </Box>
        </CardContent>
        <CardActions>
          <Button full href="https://synths.yam.finance/" text="Visit" variant="secondary" />
        </CardActions>
        </StyledCard>
    </Card>
  );
};
const StyledCard = styled.div`
 height:320px;
`;
export default DegenerativeCard;
