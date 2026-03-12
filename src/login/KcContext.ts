import { createGetKcContextMock } from "keycloakify/login/kcContext";
// 1. Взимаме типовете директно от обекта, за да не гадаем името на експорта
import type { ExtendKcContext } from "keycloakify/login";
import type { KcEnvName, ThemeName } from "../kc.gen";

export type KcContextExtension = {
  themeName: ThemeName;
  properties: Record<KcEnvName, string>;
};

export type KcContextExtensionPerPage = {};
export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>;

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
