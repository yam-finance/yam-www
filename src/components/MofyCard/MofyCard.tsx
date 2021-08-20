import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import ValueText from "components/ValueText";
import MofyIcon from "assets/mofy.png";

import styled from "styled-components";
const MofyCard: React.FC = () => {

  return (
    <Card>
      <Spacer />
      <StyledDiv><StyledImg src = {MofyIcon}></StyledImg></StyledDiv>
      <CardContent>
        <Box alignItems="center" column>
          <ValueText value="Mofy" />
          <Label text="The Museum of Fine Yams is the premier destination for digital art and innovative ideas." labelPosition="center"/>
        </Box>
      </CardContent>
      <CardActions>
      <Button full href="https://nft.yam.xyz/" text="View" variant="secondary" />
      </CardActions>
    </Card>
  );
};
const StyledDiv = styled.div`
 text-align:center;
`;
const StyledImg = styled.img`
 width:60px;
`;
export default MofyCard;
