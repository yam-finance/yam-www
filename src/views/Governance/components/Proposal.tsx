import React, { useCallback, useMemo, useState, Fragment } from "react";

import BigNumber from "bignumber.js";
import { Button, Notice, NoticeContent, NoticeIcon, Spacer, Surface } from "react-neu";

import SeparatorGrid from "components/SeparatorWithCSS";
import Box from "components/BoxWithDisplay";

import useGovernance from "hooks/useGovernance";

import styled from "styled-components";
import { Proposal, ProposalVotingPower } from "../../../contexts/Governance/types";
import VoteModal from "./VoteModal";
import useYam from "hooks/useYam";

interface ProposalProps {
  prop: Proposal;
  onVote: (proposal: number, side: boolean) => void;
  onRegister: () => void;
}

export const ProposalEntry: React.FC<ProposalProps> = ({ prop, onVote, onRegister }) => {
  const { isRegistered, isRegistering, isVoting, votingPowers, currentPower } = useGovernance();
  const [proposalData, setProposalData] = useState({});

  const yam = useYam();

  const [voteModalIsOpen, setVoteModalIsOpen] = useState(false);

  // const getProposalData = useCallback(async () => {
  //   if (yam) {
  //     const proposalVotes = await getProposalVotes(yam, prop.id);
  //     setProposalData(proposalVotes);
  //   }
  // }, []);

  const handleDismissVoteModal = useCallback(() => {
    setVoteModalIsOpen(false);
  }, [setVoteModalIsOpen]);

  const handleOnRegister = useCallback(() => {
    onRegister();
  }, [onRegister]);

  const handleVoteClick = useCallback(() => {
    setVoteModalIsOpen(true);
    // getProposalData();
  }, [setVoteModalIsOpen]);

  const handleOnVote = useCallback(
    (proposal: number, side: boolean) => {
      onVote(proposal, side);
    },
    [onVote]
  );

  return (
    <Fragment>
      <Box display="grid" alignItems="center" padding={4} row>
        <StyledProposalContentInner>
          <StyledDescription>{prop.description ? prop.description.replace("Kill", "Pause").substring(0, 150) + (prop.description.length >= 150 ? "..." : "") : ""}</StyledDescription>
          <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer1"} />
          {/* <StyledState>{prop.state}</StyledState> */}
          {/* <SeparatorGrid orientation={"vertical"} stretch={true} gridArea={"spacer2"} /> */}
          <StyledButton>
            {(prop.state !== "Active" && <Button size="sm" onClick={handleVoteClick} text="View" variant="tertiary" />) ||
              (prop.state === "Active" && <Button size="sm" text="Vote" onClick={handleVoteClick} />)}
          </StyledButton>
        </StyledProposalContentInner>
      </Box>
      <VoteModal key={prop.id.toString()} prop={prop} isOpen={voteModalIsOpen} onDismiss={handleDismissVoteModal} onVote={handleOnVote} />
    </Fragment>
  );
};

export const StyledButton = styled.div`
  display: grid;
  grid-area: vote;
  margin-left: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledDescription = styled.span`
  display: grid;
  grid-area: desc;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledState = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  display: grid;
  grid-area: state;
  justify-content: center;
  min-width: 67px;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

export const StyledProposalContentInner = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 80fr 5px 18fr;
  grid-template-areas: "desc spacer1 vote";
  grid-template-rows: 100fr;
  @media (max-width: 768px) {
    flex-flow: column nowrap;
  }
`;