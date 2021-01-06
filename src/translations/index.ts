import messageEn from "./english.json";
import messageZh from "./chinese.json";
import messageEl from "./greek.json";

export const languages = [
  {
    language: "english",
    locale: "en",
  },
  {
    language: "chinese",
    locale: "zh",
  },
  {
    language: "greek",
    locale: "el",
  },
];

export interface Messages {
  [key: string]: any;
}

export const messages: Messages = {
  en: messageEn,
  zh: messageZh,
  el: messageEl,
};
