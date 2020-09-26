import React from 'react'
import { createTheme, ThemeProvider } from 'react-neu'

import TopBar from 'components/TopBar'

import Home from 'views/Home'

export default function Index() {
  const { dark, light } =  createTheme({
    baseColor: { h: 338, s: 100, l: 41 },
    baseColorDark: { h: 339, s: 89, l: 49 },
    borderRadius: 28,
  })

  return (
    <ThemeProvider darkTheme={dark} lightTheme={light}>
      <TopBar />
      <Home />
    </ThemeProvider>
  )
}
