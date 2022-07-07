import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import ValueText from "components/ValueText";
import MofyIcon from "assets/mofy.png";

import styled from "styled-components";
const MofyCard: React.FC = () => {

  return (
    <Card>
      <StyledCard>
      <Spacer />
      {/*<StyledDiv><StyledImg src = {MofyIcon}></StyledImg></StyledDiv>*/}
      <CardIcon>🖼</CardIcon>
      <CardContent>
        <Box alignItems="center" column minHeight={120}>
          <ValueText value="Mofy" />
          <Label text="The Museum of Fine Yams is the premier destination for digital art and innovative ideas." labelPosition="center"/>
        </Box>
      </CardContent>
      <CardActions>
        <Button full href="https://www.cryptovoxels.com/play?coords=S@678W,600S" text="View" variant="secondary" />
      </CardActions>
      </StyledCard>
    </Card>
  );
};
const StyledDiv = styled.div`
 text-align:center;
`;
const StyledImg = styled.img`
 width:60px;
`;
const StyledCard = styled.div`
 height:320px;
`;
export default MofyCard;
