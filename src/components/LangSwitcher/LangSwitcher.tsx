import React, { memo, useRef, useState  } from 'react'
import './index.css'
import { useTranslation } from 'react-i18next';
import { Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { StyledMenu } from '../StyledMenu'
import enFlag from "assets/flags/en-flag.png";
import ruFlag from "assets/flags/ru-flag.png";
import zhFlag from "assets/flags/ch-flag.png";
import frFlag from "assets/flags/fr-flag.png";
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { Emoji, Switch, SwitchButton, useTheme } from "react-neu";

const locales = [
    'en', 
    'ru',
    'zh-CN',   
    'fr',
];
// Use https://onlineunicodetools.com/convert-unicode-to-image to convert
// Unicode flags (https://emojipedia.org/flags/) to png as Windows does not support Unicode flags
// Use 24px as unicode characters font size
const LANGUAGES: {
  [x: string]: { flag: string; language: string; dialect?: string }
} = {
  en: {
    flag: enFlag,
    language: 'English',
  },
  ru: {
    flag: ruFlag,
    language: 'Russian',
  },
  'zh-CN': {
    flag: zhFlag,
    language: 'Chinese',
    dialect: '简',
  },
  fr: {
    flag: frFlag,
    language: 'French',
  },
}

function LanguageSwitch() {
  const { i18n } = useTranslation();
  const locale = i18n.language;
  const { darkMode, onToggleDarkMode } = useTheme();
  const node = useRef<HTMLDivElement>(null);
  const [showModal, setModalShow] = useState(false); 
  const toggle = () => {setModalShow(false)};
 useOnClickOutside(node, showModal ?  toggle: undefined)
  return (
    <StyledMenu ref={node} >
        <div  onClick={() => setModalShow(true)}
        className="flag-current cursor-pointer flex items-center justify-center border-2 rounded border-dark-850 hover:border-dark-700 h-[40px] w-[40px]" 
      >
          <Switch>
          <SwitchButton active={!darkMode} onClick={() => setModalShow(true)} round >
           
              <img className="flag-current-image" src={LANGUAGES[locale].flag} alt={LANGUAGES[locale].language} width={22} height={22} />
           
          </SwitchButton>
          </Switch>
        </div>
      
      {showModal && (
        <StyledDiv className="flag-panel min-w-[10rem] max-h-[232px] md:max-h-[unset] absolute flex flex-col z-50 bg-dark-850 shadow-sm rounded md:top-[3rem] right-0 md:overflow-hidden overflow-scroll top-[-15.5rem]">
          {locales.map((key) => {
            const { flag, language, dialect } = LANGUAGES[key]
            return (
              
                <span
                  className="flag-list-span cursor-pointer flex items-center px-3 py-1.5 hover:bg-dark-800 hover:text-high-emphesis font-bold"
                  onClick={() => {i18n.changeLanguage(key);setModalShow(false)}}
                >
                  <img
                    className="flag-list-image inline w-3 h-3 mr-1 align-middle"
                    src={flag}
                    width={20}
                    height={20}
                    alt={language}
                  />
                  {language}
                  {dialect && (
                    <sup>
                      <small>{dialect}</small>
                    </sup>
                  )}
                </span>
              
            )
          })}
        </StyledDiv>
    )}
    </StyledMenu>
  )
}
const StyledButton = styled.div`
`;
const StyledDiv = styled.div`

`;
export default memo(LanguageSwitch)
