import React from "react";
import { Typography } from "@mui/material";
import TextType from "../login/components/textTyping";
import RegisterForm from "./RegisterForm";
import type { KcContext } from "../kc.gen";

import UserAuthLayout from "../login/UserComponents/UserAuthLayout";

interface RegisterPageProps {
    kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
    const { kcContext, } = props; // Деструктурираме i18n
    const { url } = kcContext;
    return (

        <UserAuthLayout kcContext={kcContext} >
            <Typography variant="h2" fontWeight={600} mb={1} zIndex={1000}>
                <TextType
                    text={[("Register"), ("Register"), ("Register")]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                />
            </Typography>

            <RegisterForm kcContext={kcContext} />

            <Typography
                variant="body2"
                sx={{
                    zIndex: 10,
                    mt: 2,
                    textAlign: "center",
                    color: 'text.secondary',
                    fontSize: '0.75rem'
                }}
            >
                {("You already have account? ")}{" "}
                <Typography
                    variant="body2"
                    component="a"
                    href={url.loginUrl}
                    sx={{
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        '&:hover': {
                            textDecoration: 'underline',
                            color: 'primary.main'
                        }
                    }}
                >
                    {("Log in")}
                </Typography>
            </Typography>
        </UserAuthLayout>

    );
};

export default RegisterPage;