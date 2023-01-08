import React, { useCallback, useMemo, useState, useEffect } from "react";

import { Line } from "rc-progress";
import BigNumber from "bignumber.js";
import numeral from "numeral";
import { Button, Modal, ModalActions, ModalContent, ModalProps, ModalTitle, Separator, Spacer, Card, CardContent, Box } from "react-neu";

import styled from "styled-components";

import useYam from "hooks/useYam";
import useGovernance from "hooks/useGovernance";
import { useWallet } from "use-wallet";

import { Proposal } from "../../../contexts/Governance/types";
import Split from "components/Split";
import { getProposalState, getProposalVotes } from "yam-sdk/utils";
import useSDK from "hooks/useSDK";
import YamLoader from "components/YamLoader";

interface VoteModalProps extends ModalProps {
  prop: Proposal;
  propData?: any;
  onVote: (proposal: number, side: boolean) => void;
}

const VoteModal: React.FC<VoteModalProps> = ({ prop, propData, isOpen, onDismiss, onVote }) => {
  const { isRegistered, isRegistering, isVoting, currentPower, onRegister } = useGovernance();
  const [proposalForVotes, setProposalForVotes] = useState(-1);
  const [proposalAgainstVotes, setProposalAgainstVotes] = useState(-1);
  const [proposalState, setProposalState] = useState("");
  const [votePowerState, setVotePowerState] = useState<number>(1);
  const [votedState, setVotedState] = useState<boolean>();
  const [sideState, setSideState] = useState<boolean>();
  const { account } = useWallet();
  const yam = useYam();
  const { yamContract, govContract } = useSDK();

  const getProposalData = useCallback(async (governor: any) => {
    if (yam) {
      const proposalVotes = await getProposalVotes(yam, prop.id);
      const proposalState = await getProposalState(yam, prop.id);
      setProposalForVotes(proposalVotes.forVotes);
      setProposalAgainstVotes(proposalVotes.againstVotes);
      setProposalState(proposalState);

      const votingPowers = await governor.getProposalVotingPower(prop.id);
      setVotePowerState(votingPowers.power);
      setVotedState(votingPowers.voted);
      setSideState(votingPowers.side);
    }
  }, [proposalState, votePowerState, votedState, sideState, proposalForVotes, proposalAgainstVotes]);

  useEffect(() => {
    if (isOpen) {
      getProposalData(govContract);
    }
  }, [isOpen]);

  const handleVoteClickTrue = useCallback(async () => {
    onVote(prop.id, true);
  }, [onVote]);

  const handleVoteClickFalse = useCallback(async () => {
    onVote(prop.id, false);
  }, [onVote]);

  let percFor = (proposalForVotes / (proposalForVotes + proposalAgainstVotes)) * 100;
  let percAgainst = (proposalAgainstVotes / (proposalForVotes + proposalAgainstVotes)) * 100;

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <ModalTitle text={"Proposal Overview (" + prop.id + ")"} />
      {proposalState !== "" ? (
        <>
          <ModalContent>
            <Box column>
              <Box row>
                <Spacer size="sm" /><StyledTitle>State: {proposalState ? proposalState : "..."}.</StyledTitle>
              </Box>
              <Spacer size="sm" />
              {(votedState && (
                <Box row>
                  <Spacer size="sm" /><StyledTitle>Voted: {sideState ? 'For' : 'Against'}, {numeral(votePowerState).format("0a")} YAM.
                  </StyledTitle>
                </Box>
              )) || (
                  <Box row>
                    <Spacer size="sm" /><StyledTitle>Voted: No vote.</StyledTitle>
                  </Box>
                )}
              <Spacer size="md" />
            </Box>
            <Card>
              <CardContent>
                <StyledLineHolder>
                  For votes: {proposalForVotes >= 0 ? numeral(proposalForVotes).format("0.a") : "..."}
                  <Line percent={percFor} strokeWidth={1} trailWidth={1} trailColor="#c1c1c14f" strokeColor="#14d12b" />
                </StyledLineHolder>
                <Spacer size="sm" />
                <StyledLineHolder>
                  Against votes: {proposalAgainstVotes >= 0 ? numeral(proposalAgainstVotes).format("0.a") : "..."}
                  <Line percent={percAgainst} strokeWidth={1} trailWidth={1} trailColor="#c1c1c14f" strokeColor="#d1142e" />
                </StyledLineHolder>
              </CardContent>
            </Card>

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
                    {prop.signatures.map((signature, i) => {
                      return <code key={"code" + i}>{JSON.stringify(signature)}, </code>;
                    })}
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
          <Box justifyContent="space-between" alignItems="center" row paddingHorizontal={4}>
            <Button onClick={onDismiss} text="Cancel" variant="tertiary" />
            <Box row justifyContent="flex-end" alignItems="center">
              <Button href={"https://etherscan.io/tx/" + prop.hash} text="Etherscan" variant="tertiary" />
              {(proposalState === "Active" && !votedState && isRegistered && votePowerState && votePowerState > 0 && (
                <>
                  <Spacer size="md" />
                  <Button onClick={handleVoteClickTrue} text="For" />
                  <Spacer size="md" />
                  <Button onClick={handleVoteClickFalse} text="Against" />
                </>
              )) ||
                (proposalState === "Active" && !votedState && isRegistered && (
                  <span>Unable To Vote. You were either not delegating or did not have YAM in your wallet at the time of this proposal.</span>
                )) ||
                (proposalState === "Pending" && !isRegistered && !votedState && <Button disabled={isRegistering} onClick={onRegister} text="Register" />)}
            </Box>
          </Box>
          <Spacer />
        </>
      ) : (
        <YamLoader space={320}></YamLoader>
      )}
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
  width: 100%;
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
