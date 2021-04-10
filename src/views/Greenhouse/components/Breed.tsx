import React, { useEffect, useMemo, useState } from "react";

import styled from "styled-components";

import useBalances from "hooks/useBalances";
import useGreenhouse from "hooks/useGreenhouse";

import numeral from "numeral";

import { PoolIds, MIN_LP_AMOUNTS_DISPLAY } from "constants/poolValues";
import Label from "components/Label";
import ApproveButton from "./ApproveButton";
import { getAddresses } from "constants/tokenAddresses";
import StyledPrimaryButton from "views/Common/StyledButton";
import BigNumber from "bignumber.js";
import { useWallet } from "use-wallet";
import { bnToDec } from "utils";

const Breed = () => {
  const { status } = useWallet();
  const {
    strnEthLpBalance,
    stxpTokenBalance,
    strnTokenBalance,
  } = useBalances();

  const {
    setChildName,
    isBreeding,
    onBreeding,
    setBurnAmount,
    setStxpAmount,
    burnAmount,
    stxpAmount,
    lpTokenAmount,
    setLpTokenAmount,
    parentOneNftId,
    parentTwoNftId,
    childName,
    parentsCanBreed,
    // getBreedingFee,
  } = useGreenhouse();
  const [isStrnApproved, setIsStrnApproved] = useState(false);
  const [isStrnEthApproved, setIsStrnEthApproved] = useState(false);
  const [isStxpApproved, setIsStxpApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formattedLPBalance = useMemo(() => {
    if (strnEthLpBalance) {
      return numeral(strnEthLpBalance).format("0.00a");
    } else {
      return "--";
    }
  }, [strnEthLpBalance]);

  useEffect(() => {
    if (status === "connected") {
      const bal = numeral(strnEthLpBalance).format('0.00a')
      if (new BigNumber(bal || "0").lt(new BigNumber(MIN_LP_AMOUNTS_DISPLAY[Number(PoolIds.STRN_ETH)]))){
        return setErrorMessage("Insufficient LP tokens")
      }
      setErrorMessage("")
    }
  }, [status, strnEthLpBalance, setErrorMessage])

  return (
    <>
      <BreedContainer>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <BreedInputsContainer>
          <DivContainer>
            <ApproveButton
              tokenAddress={getAddresses().stxpTokenAddress}
              spenderAddress={getAddresses().strainNFTCrafterAddress}
              name={"STXP"}
              callback={setIsStxpApproved}
            />
            <InputTitle>Burn STXP (Optional)</InputTitle>
            <InputForm
              onChange={(e) => {
                setBurnAmount(e.target.value);
              }}
            />
            <InputDescription>Rarity Boost</InputDescription>
          </DivContainer>
          <DivContainer>
            <ApproveButton
              tokenAddress={getAddresses().strnTokenAddress}
              spenderAddress={getAddresses().strainNFTCrafterAddress}
              name={"STRN"}
              callback={setIsStrnApproved}
            />
            <InputTitle>
              <DivWrap>
                STRN/ETH LP: <StyledValue>{formattedLPBalance}</StyledValue>
              </DivWrap>
            </InputTitle>
            <InputForm
              value={lpTokenAmount}
              onChange={(e) => {
                setLpTokenAmount(e.target.value);
              }}
            />
            <ApproveButton
              tokenAddress={getAddresses().strnLPTokenAddress}
              spenderAddress={getAddresses().strainNFTCrafterAddress}
              name={"STRN/ETH"}
              callback={setIsStrnEthApproved}
            />
            <InputDescription>
              <Label
                text={`Min: ${String(
                  MIN_LP_AMOUNTS_DISPLAY[Number(PoolIds.STRN_ETH)]
                )} STRN/ETH LP`}
              />
            </InputDescription>
            <InputDescription>LP Buzz</InputDescription>
          </DivContainer>
          <DivContainer>
            <InputTitle>STXP Booster (Optional)</InputTitle>
            <InputForm
              onChange={(e) => {
                setStxpAmount(e.target.value);
              }}
            />
            <InputDescription>Increase childs yield</InputDescription>
          </DivContainer>
          <DivContainer>
            <InputTitle>Child Name</InputTitle>
            <InputForm
              onChange={(e) => {
                setChildName(e.target.value);
              }}
            />
            <InputDescriptionRequired>Required</InputDescriptionRequired>
          </DivContainer>
        </BreedInputsContainer>
        <BreedButtonContainer>
          <InnerBreedWrapper>
            <StyledPrimaryButton
              full
              disabled={
                !parentsCanBreed ||
                isBreeding ||
                !isStrnApproved ||
                !isStrnEthApproved ||
                !parentOneNftId ||
                !parentTwoNftId ||
                !childName || 
                Boolean(errorMessage)
              }
              size={"lg"}
              text={isBreeding ? "Breeding" : "Breed"}
              onClick={onBreeding}
            />
          </InnerBreedWrapper>
          <FeeLabel>420 STRN Breed Fee</FeeLabel>
        </BreedButtonContainer>
      </BreedContainer>
    </>
  );
};

const DivWrap = styled.div``;

const ErrorMessage = styled.h4`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ce1212;
  font-weight: 500;
`;

const BreedContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BreedInputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 40px;
  justify-content: center;
`;

const InputForm = styled.input`
  width: 220px;
  border-radius: 0.25rem;
  background-color: rgba(6, 15, 30, 1);
  color: rgba(119, 252, 109, 1);
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 200;
  border-right-width: 1px;
  border-bottom-width: 1px;
  border-color: rgba(18, 49, 96, 1);
  padding: 0.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const InputTitle = styled.div`
  line-height: 1rem;
  padding-top: 12px;
  padding-bottom: 0.25rem;
  padding-left: 8px;
  font-size: 16px;
  font-weight: 700;
`;

const InputDescription = styled.div`
  line-height: 1rem;
  padding-top: 0.25rem;
  font-size: 16px;
  color: #03f190;
  font-weight: 500;
  text-align: center;
`;

const InputDescriptionRequired = styled.div`
  line-height: 1rem;
  padding-top: 0.25rem;
  font-size: 16px;
  color: #ce1212;
  font-weight: 500;
  text-align: center;
`;

const StyledValue = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const DivContainer = styled.div`
  padding: 12px 24px;
`;

const InnerBreedWrapper = styled.div`
  width: 250px;
`;

const BreedButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const FeeLabel = styled.div`
  color: rgba(229, 229, 229, 1);
  font-size: 1rem;
  line-height: 1.25rem;
  padding-top: 0.6rem;
`;

export default Breed;
