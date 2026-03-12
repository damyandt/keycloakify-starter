import { Suspense, lazy } from "react";
import type { KcContext } from "./KcContext";
import DefaultPage from "keycloakify/login/DefaultPage";
import DefaultTemplate from "keycloakify/login/Template";
import UserProfileFormFields from "keycloakify/login/UserProfileFormFields";
import RegisterPage from "../register/RegisterPage";
import ResetPasswordPage from "../resetCredential/ResetPassword";
import { useI18n } from "./i18n";
import UpdatePasswordPage from "../updatePassword/UpdatePassword";
import ThemeProvider from "./components/ThemeContext";

const LoginPage = lazy(() => import("./UserComponents/login/LoginPage"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });
    switch (kcContext.pageId) {
        case "login.ftl":
            return (
                <Suspense fallback={null}>
                    <ThemeProvider>
                        <LoginPage
                            kcContext={kcContext}
                        />
                    </ThemeProvider>
                </Suspense>
            );
        case "register.ftl":
            return (
                <Suspense fallback={null}>
                    <ThemeProvider>
                        <RegisterPage
                            kcContext={kcContext}
                        />
                    </ThemeProvider>
                </Suspense>
            );
        case "login-reset-password.ftl":
            return (
                <Suspense fallback={null}>
                    <ThemeProvider>
                        <ResetPasswordPage
                            kcContext={kcContext}
                        />
                    </ThemeProvider>
                </Suspense>
            );
        case "login-update-password.ftl":
            return (
                <Suspense fallback={null}>
                    <ThemeProvider>
                        <UpdatePasswordPage
                            kcContext={kcContext}
                        />
                    </ThemeProvider>
                </Suspense>
            );

        default:
            return (
                <DefaultPage
                    kcContext={kcContext}
                    i18n={i18n}
                    classes={undefined}
                    Template={DefaultTemplate}
                    doUseDefaultCss={true}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={Boolean("Включи потвърждение на парола")}
                />
            );
    }
}