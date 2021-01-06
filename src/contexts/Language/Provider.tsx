import React from "react";
import { IntlProvider } from "react-intl";

import Context from "./Context";
import useLocalStorage from "hooks/useLocalStorage";
import { messages } from "translations";

const Provider: React.FC = ({ children }) => {
  const [language, setLanguage] = useLocalStorage("language", "en");

  return (
    <Context.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      <IntlProvider locale={language} key={language} messages={messages[language]}>
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default Provider;
