import { Suspense, lazy } from "react";
import type { KcContext } from "./KcContext";
import DefaultPage from "keycloakify/login/DefaultPage";
import DefaultTemplate from "keycloakify/login/Template";
import UserProfileFormFields from "keycloakify/login/UserProfileFormFields";
import RegisterPage from "../register/RegisterPage";
import ResetPasswordPage from "../resetCredential/ResetPassword";

const LoginPage = lazy(() => import("./UserComponents/login/LoginPage"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    switch (kcContext.pageId) {
        case "login.ftl":
            return (
                <Suspense fallback={null}>
                    <LoginPage
                        kcContext={kcContext}
                    />
                </Suspense>
            );
        case "register.ftl":
            return (
                <Suspense fallback={null}>
                    <RegisterPage
                        kcContext={kcContext}
                    />
                </Suspense>
            );
        case "login-reset-password.ftl":
            return (
                <Suspense fallback={null}>
                    <ResetPasswordPage
                        kcContext={kcContext}
                    />
                </Suspense>
            );

        default:
            return (
                <DefaultPage
                    kcContext={kcContext}
                    i18n={(kcContext as any).i18n}
                    classes={undefined}
                    Template={DefaultTemplate}
                    doUseDefaultCss={true}
                    UserProfileFormFields={UserProfileFormFields}
                    doMakeUserConfirmPassword={Boolean("Включи потвърждение на парола")}
                />
            );
    }
}