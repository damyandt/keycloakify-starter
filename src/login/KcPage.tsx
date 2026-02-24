import { Suspense, lazy } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";

// Импорти за DefaultPage
import DefaultPage from "keycloakify/login/DefaultPage";
import DefaultTemplate from "keycloakify/login/Template";
import UserProfileFormFields from "keycloakify/login/UserProfileFormFields";
import RegisterPage from "../register/RegisterPage";

const LoginPage = lazy(() => import("./UserComponents/login/LoginPage"));

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;
    const { i18n } = useI18n({ kcContext });

    switch (kcContext.pageId) {
        case "login.ftl":
            return (
                <Suspense fallback={null}>
                    <LoginPage
                        kcContext={kcContext}
                        i18n={i18n}
                    />
                </Suspense>
            );
        case "register.ftl":
            return (
                <Suspense fallback={null}>
                    <RegisterPage
                        kcContext={kcContext}
                        i18n={i18n}
                    />
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