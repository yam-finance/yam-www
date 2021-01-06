import React from "react";
import { languages } from "translations";
import useLanguage from "hooks/useLanguage";
import styled from "styled-components";

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const options = languages.map((option) => ({
    key: option.locale,
    value: option.locale,
    text: option.language,
  }));

  return (
    <StyledSelect
      value={language}
      onChange={(e) => {
        if (setLanguage) setLanguage(e.target.value);
      }}
    >
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.text}
        </option>
      ))}
    </StyledSelect>
  );
};

const StyledSelect = styled.select`
  min-width: 120px;
  margin-left: 100px;
  padding: 10px;
  border: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px hsl(338deg 95% 4% / 15%), inset -1px 1px 0px hsl(338deg 100% 100% / 100%);
  font-size: 16px;
  cursor: pointer;
  outline: none !important;

  @media (max-width: 980px) {
    display: none;
  }

  appearance: none;
  ::-ms-expand {
    display: none;
  }

  option {
    height: 40px;
    padding: 10px;
  }
`;

export default LanguageSwitch;
