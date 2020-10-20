import React from "react";
import styled from "styled-components";


const HowItWorks = () => {
    return (
        <StyledHowItWorksContainer>
            <StyledTitle>How it works</StyledTitle>
            <StyledHr></StyledHr>
            <StyledHowItWorksTable>
                <tbody>
                <tr>
                    <StyledTableData>1. Pool Uni / Strn on Uniswap</StyledTableData>
                    <StyledTableData>2. Add LP tokens to Strain</StyledTableData>
                </tr>
                <tr>
                    <StyledTableData>3. Design your Strain</StyledTableData>
                    <StyledTableData>4. Earn STRN, re-plant, and upgrade your NFT</StyledTableData>
                </tr>
                <tr>
                    <td colSpan={2} style={{ border: '1px solid #0CF5A5',  clear: 'both', height: '100px', textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}>5. Vote and create the future of the product</td>
                </tr>
                </tbody>
            </StyledHowItWorksTable>
        </StyledHowItWorksContainer>
    )
};

const StyledTitle = styled.h2`
  color: #0CF5A5;
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const StyledHowItWorksContainer = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 1200px;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  margin: 0 auto;
  text-align: left;
`;

const StyledHr = styled.div`
    border-top: 4px solid;
    border-color: #86CfF8;
    width: 1200px;
    height: 5px;
    margin: 0;
    margin-top: 15px;
`;

const StyledHowItWorksTable = styled.table`
    margin-top: 20px;
    width: 1200px;
    border-collapse: collapse;
`;

const StyledTableData = styled.td`
    border: 1px solid #0CF5A5;
    height: 100px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
`;

export default HowItWorks
