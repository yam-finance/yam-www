import { useContext } from "react";

import { TvlContext } from "contexts/Tvl";

const useTvl = () => {
  return { ...useContext(TvlContext) };
};

export default useTvl;
