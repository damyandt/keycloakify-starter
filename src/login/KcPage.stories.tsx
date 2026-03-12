import type { Meta, StoryObj } from "@storybook/react";
import KcPage from "./KcPage";

import { themeNames, kcEnvDefaults } from "../kc.gen";
import { createGetKcContextMock } from "keycloakify/login/kcContext";

// Дефинираме съобщенията тук, за да ги подадем на Storybook
const extraMessages = {
    en: {
        phone: "Phone Number",
        registerTitle: "Create an Account",
        alreadyHaveAccount: "Already have an account?",
        doLogIn: "Login here",
        "I agree to the": "I agree to the",
        "Terms of Service": "Terms of Service",
        and: "and",
        "Privacy Policy": "Privacy Policy",
    },
    bg: {
        phone: "Телефонен номер",
        registerTitle: "Създай профил",
        alreadyHaveAccount: "Вече имате профил?",
        doLogIn: "Влезте тук",
        "I agree to the": "Съгласен съм с",
        "Terms of Service": "Общите условия",
        and: "и",
        "Privacy Policy": "Политиката за поверителност",
    }
};

export const { getKcContextMock } = createGetKcContextMock({
    kcContextExtension: {
        themeName: themeNames[0],
        properties: { ...kcEnvDefaults }
    },
    kcContextExtensionPerPage: {},
    overrides: {},
    overridesPerPage: {}
});

const meta = {
    title: "login/KcPage",
    component: KcPage,
    parameters: { layout: "fullscreen" },
} satisfies Meta<typeof KcPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
    args: {
        kcContext: {
            ...getKcContextMock({
                pageId: "login.ftl",
                overrides: {
                    // message: {
                    //     type: "error",
                    //     summary: "Invalid username or password."
                    // },
                    // login: {
                    //     attributes: [
                    //         // { name: "email", value: "Ivan" },

                    //     ]
                    // } as any
                    social: {
                        displayInfo: true,
                        providers: [
                            {
                                loginUrl: "#",
                                alias: "google",
                                displayName: "Google",
                                providerId: "google"
                            }
                        ]
                    }
                }
            }),
            extraMessages
        } as any
    },
};
export const Register: Story = {
    args: {
        kcContext: {
            ...getKcContextMock({
                pageId: "register.ftl",
                overrides: {
                    // message: {
                    //     type: "error",
                    //     summary: "Invalid username or password."
                    // },
                    // profile: {
                    //     attributes: [
                    //         { name: "firstName", value: "Ivan" },
                    //         { name: "phone", value: "+359888123456" }
                    //     ]
                    // } as any
                }
            }),
            extraMessages
        } as any
    },
};
export const ResetPassword: Story = {
    args: {
        kcContext: {
            ...getKcContextMock({
                pageId: "login-reset-password.ftl",
                overrides: {
                    // message: {
                    //     type: "error",
                    //     summary: "Invalid username or password."
                    // },
                }
            }),
            extraMessages
        } as any
    },
};
export const UpdatePassword: Story = {
    args: {
        kcContext: {
            ...getKcContextMock({
                pageId: "login-update-password.ftl",
                overrides: {
                    // message: {
                    //     type: "error",
                    //     summary: "Invalid username or password."
                    // },
                }
            }),
            extraMessages
        } as any
    },
};