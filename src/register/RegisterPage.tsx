import React from "react";
import { Link, Typography } from "@mui/material";
import TextType from "../login/components/textTyping";
import RegisterForm from "./RegisterForm";
import type { KcContext } from "../kc.gen";
import { I18n } from "../login/i18n";
import UserAuthLayout from "../login/UserComponents/UserAuthLayout";


interface RegisterPageProps {
    kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
    i18n: I18n
}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
    const { kcContext, i18n } = props;
    const { url } = kcContext;
    const { msgStr } = i18n; // Използваме i18n от Keycloakify

    return (

        <UserAuthLayout kcContext={kcContext} i18n={i18n}>
            <Typography variant="h4" fontWeight={600} mb={1}>
                <TextType
                    text={[msgStr("registerTitle"), msgStr("registerTitle"), msgStr("registerTitle")]}
                    typingSpeed={75}
                    pauseDuration={3000}
                    showCursor={true}
                    cursorCharacter="|"
                />
            </Typography>

            {/* Предаваме контекста надолу към формата */}
            <RegisterForm kcContext={kcContext} i18n={i18n} />

            <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                {msgStr("alreadyLoggedIn")}{" "}
                <Link
                    href={url.loginUrl} // Използваме системния линк за вход
                    sx={{
                        cursor: "pointer",
                        textDecoration: "none",
                        fontWeight: 600,
                        "&:hover": { textDecoration: "underline" }
                    }}
                >
                    {msgStr("doLogIn")}
                </Link>
            </Typography>
        </UserAuthLayout>

    );
};

export default RegisterPage;