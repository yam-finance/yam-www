import React from "react";
import styled from "styled-components";
import roadmap from '../../assets/roadmap.png'
import { Link } from 'react-router-dom'

const HowItWorks = () => {
    return (
        <StyledHowItWorksContainer>
            <StyledTitle>How it works</StyledTitle>
            <StyledHr />
            <StyledHowItWorksTable>
                <StyledOneBlock>
                    1. Pool STRN/ETH on Uniswap.
                        <StyledButtonOne href="https://app.uniswap.org/#/add/ETH/0x90b426067bE0b0FF5De257BC4dd6a4815Ea03b5f" target="_blank">Provide LP STRN/ETH</StyledButtonOne>
                </StyledOneBlock>
                <StyledTwoBlock>
                    2. Stake LP tokens on Strain NFT.
                        <StyledButtonTwo to="/stake" replace={false}>Stake</StyledButtonTwo>
                </StyledTwoBlock>
                <StyledThreeBlock>3. Create your Strain</StyledThreeBlock>
                <StyledFourBlock>4. Earn & recycle STRN rewards, upgrading the yield based performance (Buzz, or potency) of your Strain over time.</StyledFourBlock>
                <StyledTableDataInfo >
                    - Shape the future of Strain NFT, when you vote in the StrainSuperDAO! <br />
                        - Breed together multiple Strains in the Greenhouse. <br />
                        - Trade Stains in the Dispensary with other community members.
                    </StyledTableDataInfo>
            </StyledHowItWorksTable>
            <StyledRoadmap src={roadmap} />
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
  margin-left: 20px;
  max-width: 1200px;
`;

const StyledHowItWorksContainer = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 80%;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  margin: 0 auto;
  text-align: left;
  max-width: 1200px;
`;

const StyledHr = styled.div`
    border-top: 4px solid;
    border-color: #86CfF8;
    width: 100%;
    height: 5px;
    margin: 0;
    margin-top: 15px;
    max-width: 1200px;
`;

const StyledHowItWorksTable = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-rows: auto;

    grid-gap: 1px;

    @media (max-width: 613px) {
        grid-template-columns: 100%;
    }
`;

const StyledTableData = styled.div`
    padding: 1rem;
    border: 1px solid #0CF5A5;
    font-weight: bold;
    font-size: 18px;
`;

const StyledOneBlock = styled(StyledTableData)`
    grid-column: 1;
    grid-row: 1;
`

const StyledTwoBlock = styled(StyledTableData)`
    grid-column: 2;
    grid-row: 1;

    @media (max-width: 613px) {
        grid-column: 1;
        grid-row: 2;
    }
    `

const StyledThreeBlock = styled(StyledTableData)`
    grid-column: 1;
    grid-row: 2;

    @media (max-width: 613px) {
        grid-column: 1;
        grid-row: 3;
    }

`

const StyledFourBlock = styled(StyledTableData)`
    grid-column: 2;
    grid-row: 2;

    @media (max-width: 613px) {
        grid-column: 1;
        grid-row: 4;
    }

    `

const StyledTableDataInfo = styled(StyledTableData)`
    text-align: left;
    grid-column: 1 / 3;
    grid-row: 3;

    @media (max-width: 613px) {
        grid-column: 1;
        grid-row: 5;
    }

    `

const StyledButtonOne = styled.a`
    display: block;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    text-align: center;
    height: 30px;
    background-color: #8D87FB;
    cursor:pointer;
    font-weight: bold;
    margin: auto;
    margin-top: 15px;
    text-decoration: none;
    width: 200px;
    padding-top: 10px;
`;

const StyledButtonTwo = styled(Link)`
    display: block;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    text-align: center;
    height: 30px;
    background-color: #00AC69;
    cursor:pointer;
    font-weight: bold;
    margin: auto;
    margin-top: 15px;
    text-decoration: none;
    width: 120px;
    padding-top: 10px;
`;

const StyledRoadmap = styled.img`
    display: block;
    width: 100%;
    margin: auto;
    margin-top: 15px;
    padding-top: 10px;
    max-width: 1200px;
`;

export default HowItWorks
