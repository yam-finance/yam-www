import { useContext } from "react";

import { GreenhouseContext } from "contexts/Greenhouse";

const useGreenhouse = () => {
  return { ...useContext(GreenhouseContext) };
};

export default useGreenhouse;
