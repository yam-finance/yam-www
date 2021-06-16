import React from "react";

import { Box, Button, Card, CardActions, CardContent, CardIcon, Spacer } from "react-neu";

import Label from "components/Label";
import Value from "components/Value";

const DegenerativeCard: React.FC = () => {

  return (
    <Card>
      <Spacer />
      <CardIcon>🧛‍♂️</CardIcon>
      <CardContent>
        <Box alignItems="center" column>
          <Value value="Degenerative" />
          <Label text="Cutting Edge DeFi Derivatives" />
        </Box>
      </CardContent>
      <CardActions>
        <Button full href="https://degenerative.finance/" text="View" variant="secondary" />
      </CardActions>
    </Card>
  );
};

export default DegenerativeCard;
