import React, { useMemo } from 'react'
import { Box, Spacer } from 'react-neu'
import styled from 'styled-components'

import Label from 'components/Label'
import Value from 'components/Value'

interface FancyValueProps {
  icon: React.ReactNode,
  label: string,
  value: string,
  wrap?: boolean,
}

const FancyValue: React.FC<FancyValueProps> = ({ icon, label, value, wrap }) => {
  const FancyLabelDisplay = useMemo(() => {
    if (wrap) {
      return (
        <>
          <LabelWrapDisplay>
            <Label text={label} />
          </LabelWrapDisplay>
        </>
      );
    } else {
      return (
        <>
          <Label text={label} />
        </>
      );
    }
  }, []);

  return (
    <Box alignItems="center" row>
      <Box row justifyContent="center" minWidth={48}>
        <StyledIcon>{icon}</StyledIcon>
      </Box>
      <Spacer size="sm" />
      <Box flex={1}>
        <Value value={value} />
        {FancyLabelDisplay}
      </Box>
    </Box>
  );
};

const StyledIcon = styled.span.attrs({ role: "img" })`
  font-size: 32px;
`;

const LabelWrapDisplay = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;

export default FancyValue;
