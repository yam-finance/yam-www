import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import ValueText from "components/ValueText";

const YamDaoCard: React.FC = () => {

  return (
    <Card>
      <Spacer />
      <CardIcon>🏡</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <ValueText value="Yam Treasuries" />
          <Label text="Yam Treasuries is an actively managed portfolio that is governed by the Yam DAO" labelPosition="center"/>
        </Box>
      </CardContent>
      <CardActions>
        <Button full href="https://tokensets.com/portfolio/yamhouse" text="View" variant="secondary" />
      </CardActions>
    </Card>
  );
};

export default YamDaoCard;
