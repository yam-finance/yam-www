import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Spacer } from "react-neu";

import styled from "styled-components";
import useApproval from "hooks/useApproval";
import { getAddresses } from "constants/tokenAddresses";
import useStrainNfts from "hooks/useStrainNfts";
import { useWallet } from "use-wallet";
import {
  MIN_LP_AMOUNTS,
  MIN_LP_AMOUNTS_DISPLAY,
  MIN_STRN_GEN_VALUE,
  PoolIds,
  POOL_NAMES,
} from "constants/poolValues";
import NamedGeneratingModal from "views/Modals/NamedGeneratingModal";
import BigNumber from "bignumber.js";
import numeral from "numeral";
import Label from "components/Label";
import StyledPrimaryButton from "views/Common/StyledButton";
import useBalances from "hooks/useBalances";

const ApprovalButton = ({
  tokenAddress,
  spenderAddress,
  name,
  callback,
}: {
  tokenAddress: string;
  spenderAddress: string;
  name: string;
  callback: Function;
}) => {
  const { status } = useWallet();

  const {
    isApproved,
    isApproving,
    onApprove,
  } = useApproval(
    tokenAddress,
    spenderAddress,
    () => {}
  );

  const handleApprove = useCallback(() => {
    onApprove();
  }, [onApprove]);

  callback(isApproved); // tell parent if approved

  const ApprovalButton = useMemo(() => {
    if (status !== "connected") {
      return (
        <>
          <StyledPrimaryButton
            disabled
            full
            text={"Not Connected"}
            variant="secondary"
          />
        </>
      );
    }

    if (isApproved) {
      return null;
    }

    if (!isApproved) {
      return (
          <StyledPrimaryButton
            onClick={handleApprove}
            disabled={isApproved}
            full
            size={"sm"}
            text={
              isApproving
                ? "Approving ..."
                : !isApproved
                ? `Approve ${name}`
                : "Approved"
            }
            variant={
              isApproving || status !== "connected"
                ? "secondary"
                : "default"
            }
          />
      );
    }
  }, [
    isApproved,
    isApproving,
    handleApprove,
    status,
    name
  ]);

  return (
    <>
      {status !== "connected" && <Spacer size="sm" />}
      {ApprovalButton}
    </>
  );
};

export default ApprovalButton;
