import React from 'react'

import styled from 'styled-components'

const StyledNoticeCmp = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  color: ${props => props.theme.colors.primary.light};
`

const StyledNotice = ({ messages }: { messages: string[]} ) => {

    return (
        <StyledNoticeCmp>
            {messages && messages.map(m => (
                <span>{m}</span>
            ))}
        </StyledNoticeCmp>
    )
}

export default StyledNotice
