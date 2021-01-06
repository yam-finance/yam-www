import { useContext } from "react";

import { LanguageContext } from "contexts/Language";

const useLanguage = () => {
  return { ...useContext(LanguageContext) };
};

export default useLanguage;
