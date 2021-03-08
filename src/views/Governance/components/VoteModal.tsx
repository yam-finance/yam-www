import React, { useCallback, useMemo, useState, useEffect } from "react";

import { Line } from "rc-progress";
import BigNumber from "bignumber.js";
import numeral from "numeral";
import { Button, Modal, ModalActions, ModalContent, ModalProps, ModalTitle, Separator, Spacer, Card, CardContent } from "react-neu";

import styled from "styled-components";

import useYam from "hooks/useYam";
import useGovernance from "hooks/useGovernance";
import { useWallet } from "use-wallet";

import { Proposal } from "../../../contexts/Governance/types";
import Split from "components/Split";

interface VoteModalProps extends ModalProps {
  prop: Proposal;
  onVote: (proposal: number, side: boolean) => void;
}

const VoteModal: React.FC<VoteModalProps> = ({ prop, isOpen, onDismiss, onVote }) => {
  const { isRegistered, isRegistering, isVoting, votingPowers, currentPower, onRegister } = useGovernance();

  const handleVoteClickTrue = useCallback(async () => {
    onVote(prop.id, true);
  }, [onVote]);

  const handleVoteClickFalse = useCallback(async () => {
    onVote(prop.id, false);
  }, [onVote]);

  const { account } = useWallet();
  const yam = useYam();

  let percFor = (prop.forVotes / (prop.forVotes + prop.againstVotes)) * 100;
  let percAgainst = (prop.againstVotes / (prop.forVotes + prop.againstVotes)) * 100;

  let votePower;
  let voted;
  let side;
  if (votingPowers) {
    for (let i = 0; i < votingPowers.length; i++) {
      if (prop.hash == votingPowers[i].hash) {
        let votingPower = votingPowers[i];
        votePower = votingPower.power;
        voted = votingPower.voted;
        side = votingPower.side;
      }
    }
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalTitle text="Proposal Overview" />
      <ModalContent>
        <CardContent>
          {(voted && (
            <StyledTitle>
              Your vote:
              <Spacer size="sm" />
              <StyledSubtitle>
                {side ? '"For"' : '"Against"'} with {numeral(votePower).format("0a")} votes.
              </StyledSubtitle>
            </StyledTitle>
          )) || (
            <StyledTitle>
              Your vote:
              <Spacer size="sm" />
              <StyledSubtitle>No vote</StyledSubtitle>
            </StyledTitle>
          )}
        </CardContent>
        <Spacer size="sm" />
        <Split>
          <CardContent>
            <Button size="sm" href={"https://etherscan.io/tx/" + prop.hash} text="View On Etherscan" variant="tertiary" />
            {prop.more && <Spacer size="sm" />}
            {prop.more && <Button size="sm" href={prop.more} text="Read More & See Off-Chain Vote" variant="tertiary" />}
          </CardContent>
          <Card>
            <CardContent>
              Votes
              <Separator />
              <Spacer size="sm" />
              <StyledLineHolder>
                For: {numeral(prop.forVotes).format("0.a")}
                <Line percent={percFor} strokeWidth={1} strokeColor="#ec0e5c" />
              </StyledLineHolder>
              <Spacer size="sm" />
              <StyledLineHolder>
                Against: {numeral(prop.againstVotes).format("0.a")}
                <Line percent={percAgainst} strokeWidth={1} strokeColor="#ec0e5c" />
              </StyledLineHolder>
            </CardContent>
          </Card>
        </Split>
        <Spacer size="md" />
        <Card>
          <StyledParams>
            <CardContent>
              <StyledDescription>
                <span>Description:</span>
              </StyledDescription>
              <Spacer size="sm" />
              <StyledInfo>
                <span> {prop.description ? prop.description.replace("Kill", "Pause") : ""}</span>
              </StyledInfo>
              <Spacer size="sm" />
              <Separator />
              <Spacer size="sm" />
              <StyledDescription>
                <span>Affecting:</span>
              </StyledDescription>
              <Spacer size="sm" />
              <StyledInfo>
                <span> {prop.targets.join(", ")}</span>
              </StyledInfo>
              <Spacer size="sm" />
              <Separator />
              <Spacer size="sm" />
              <StyledDescription>
                <span>Function Calls:</span>
              </StyledDescription>
              <Spacer size="sm" />
              <StyledInfo>
                <code> {prop.signatures.join(", ")}</code>
              </StyledInfo>
              <Spacer size="sm" />
              <Separator />
              <Spacer size="sm" />
              <StyledDescription>
                <span>Inputs:</span>
              </StyledDescription>
              <Spacer size="sm" />
              <StyledInfo>
                {prop.inputs.map((input, i) => {
                  return <code key={"code" + i}>{JSON.stringify(input)}</code>;
                })}
              </StyledInfo>
            </CardContent>
          </StyledParams>
        </Card>
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text="Cancel" variant="tertiary" />
        {(prop.state === "Active" && !voted && isRegistered && votePower && votePower > 0 && (
          <>
            <Button disabled={isVoting} onClick={handleVoteClickTrue} text="For" />
            <Spacer size="md" />
            <Button disabled={isVoting} onClick={handleVoteClickFalse} text="Against" />
          </>
        )) ||
          (prop.state === "Active" && !voted && isRegistered && (
            <span>Unable To Vote. You were either not delegating or did not have YAM in your wallet at the time of this proposal.</span>
          )) ||
          (prop.state === "Pending" && !isRegistered && !voted && <Button disabled={isRegistering} onClick={onRegister} text="Register" />)}
      </ModalActions>
    </Modal>
  );
};

const StyledTitle = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;

const StyledSubtitle = styled.span`
  display: block;
  color: ${(props) => props.theme.textColor};
  font-size: 14px;
  font-weight: 400;
  margin: 0;
  opacity: 0.66;
  padding: 0;
`;

const StyledLineHolder = styled.div`
  width: 80%;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`;

const StyledDescription = styled.div`
  font-weight: 600;
  font-size: 20px;
`;

const StyledInfo = styled.div`
  font-size: 14px;
  overflow-x: scroll;
`;

export const StyledParams = styled.div`
  overflow: auto;
  height: 250px;
`;

export default VoteModal;
