import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import ValueText from "components/ValueText";

const UmbrellaCard: React.FC = () => {

  return (
    <Card>
      <Spacer />
      <CardIcon>🌂</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <ValueText value="Umbrella" />
          <Label text="Umbrella has the potential to become a critical lego block for the DeFi ecosystem." labelPosition="center"/>
        </Box>
      </CardContent>
      <CardActions>
        <Button full to="/umbrella" text="View" variant="secondary" />
      </CardActions>
    </Card>
  );
};

export default UmbrellaCard;
