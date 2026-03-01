import { createGetKcContextMock } from "keycloakify/login/kcContext";
// 1. Взимаме типовете директно от обекта, за да не гадаем името на експорта
import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
  themeName: ThemeName;
  properties: Record<KcEnvName, string>;
};

export type KcContextExtensionPerPage = {};

// 2. Тук е "магията" - дефинираме типа директно през ExtendKcContext
// Това избягва търсенето на липсващия 'KcContext' експорт
export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;

// 3. Правилното деструктуриране на Mock функцията
export const { getKcContextMock: getKcContext } = createGetKcContextMock<
  KcContext,
  KcContextExtensionPerPage
>({
  kcContextExtension: {} as KcContext,
  kcContextExtensionPerPage: {} as KcContextExtensionPerPage,
  overridesPerPage: {
    "login.ftl": {
      locale: {
        currentLanguageTag: "en",
        supported: [
          { label: "English", languageTag: "en" },
          { label: "Български", languageTag: "bg" },
        ],
      },
    },
    "register.ftl": {
      locale: {
        currentLanguageTag: "en",
        supported: [
          { label: "English", languageTag: "en" },
          { label: "Български", languageTag: "bg" },
        ],
      },
    },
    "login-reset-password.ftl": {
      locale: {
        currentLanguageTag: "en",
        supported: [
          { label: "English", languageTag: "en" },
          { label: "Български", languageTag: "bg" },
        ],
      },
    },
  },
});
