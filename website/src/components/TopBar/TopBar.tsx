import React from 'react'

import { Button, Box, Container, Spacer } from 'react-neu'

import DarkModeSwitch from 'components/DarkModeSwitch'
import Logo from 'components/Logo'

const TopBar: React.FC = () => {
  return (
    <Container size="lg">
      <Box
        alignItems="center"
        height={96}
        row
      >
        <Logo />
        <Box flex={1} />
        <Box alignItems="center" row>
          <DarkModeSwitch />
          <Spacer />
          <Button
            href="https://app.yam.finance"
            size="sm"
            text="Open App"
          />
        </Box>
      </Box>
    </Container>
  )
}

export default TopBar