import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import Value from "components/Value";

const UmbrellaCard: React.FC = () => {

  return (
    <Card>
      <Spacer />
      <CardIcon>🌂</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <Value value="Umbrella" />
          <Label text="Yam Protocol Protection" />
        </Box>
      </CardContent>
      <CardActions>
        <Button full to="/umbrella" text="View" variant="secondary" />
      </CardActions>
    </Card>
  );
};

export default UmbrellaCard;
