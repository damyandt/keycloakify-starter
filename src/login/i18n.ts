/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";

/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = (i18nBuilder.withThemeName<ThemeName>() as any) // Използваме 'as any', за да заобиколим грешката в типа
  .build({
    extraMessages: {
      // Keycloakify търси точно този ключ при компилация
      en: {
        registerTitle: "Create an Account",
        loginAccountTitle: "Login to your account",
        alreadyHaveAccount: "Already have an account?",
        doLogIn: "Login here",
        "I agree to the": "I agree to the",
        "Terms of Service": "Terms of Service",
        and: "and",
        "Privacy Policy": "Privacy Policy",
        phone: "Phone Number",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        password: "Password",
      },
      bg: {
        registerTitle: "Създай профил",
        loginAccountTitle: "Влез в профила си",
        alreadyHaveAccount: "Вече имате профил?",
        doLogIn: "Влезте тук",
        "I agree to the": "Съгласен съм с",
        "Terms of Service": "Общите условия",
        and: "и",
        "Privacy Policy": "Политиката за поверителност",
        phone: "Телефонен номер",
        firstName: "Име",
        lastName: "Фамилия",
        email: "Имейл адрес",
        password: "Парола",
      },
    },
  });

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
