import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import ValueText from "components/ValueText";

const DegenerativeCard: React.FC = () => {

  return (
    <Card>
      <Spacer />
      <CardIcon>🧟</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <ValueText value="Yam Synths" />
          <Label text="Yam Synths is your portal to the powerful world of synthetic derivatives" labelPosition="center" />
        </Box>
      </CardContent>
      <CardActions>
        <Button full href="http://synths.yam.xyz" text="View" variant="secondary" />
      </CardActions>
    </Card>
  );
};

export default DegenerativeCard;
