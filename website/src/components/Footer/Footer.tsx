import React from 'react'
import styled from 'styled-components'
import { useTheme } from 'react-neu'

const Footer: React.FC = () => {
  const { darkMode } = useTheme()
  return (
    <StyledFooter darkMode={darkMode} />
  )
}

interface StyledFooterProps {
  darkMode?: boolean
}
const StyledFooter = styled.div<StyledFooterProps>`
  background-color: ${props => props.darkMode ? props.theme.colors.grey[800] : props.theme.colors.grey[300]};
  min-height: 300px;
`

export default Footer