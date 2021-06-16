import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import Value from "components/Value";

const YamDaoCard: React.FC = () => {

  return (
    <Card>
      <Spacer />
      <CardIcon>🏡</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <Value value="Yam Dao House" />
          <Label text="DAO House" />
        </Box>
      </CardContent>
      <CardActions>
        <Button full href="https://tokensets.com/portfolio/yamhouse" text="View" variant="secondary" />
      </CardActions>
    </Card>
  );
};

export default YamDaoCard;
