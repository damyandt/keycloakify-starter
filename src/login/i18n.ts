// src/login/i18n.ts
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

const { useI18n, ofTypeI18n } = (i18nBuilder.withThemeName<ThemeName>() as any).build({
  extraMessages: {
    en: {
      backToLogin: "Back to Login",
      emailForgotTitle: "Forgot Your Password?",
    },
    bg: {
      backToLogin: "Назад към вход",
      emailForgotTitle: "Забравена парола?",
    },
  },
});

export type I18n = typeof ofTypeI18n; // Това ще съвпадне с вашия GenericI18n тип
export { useI18n };
