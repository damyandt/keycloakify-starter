import React from "react";
import { Typography, Grid } from "@mui/material";
import UserAuthLayout from "../login/UserComponents/UserAuthLayout";
import TextType from "../login/components/textTyping";
import { KcContext } from "../kc.gen";
import UpdatePasswordForm from "./UpdatePasswordForm";

interface UpdatePasswordPageProps {

    kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>;
}

const UpdatePasswordPage: React.FC<UpdatePasswordPageProps> = (props) => {
    const { kcContext } = props;
    const { url, message } = kcContext;
    const titleText = (message as any)?.summary?.includes("first time")
        ? ["Welcome!", "Set Your Password", "Secure Your Account"]
        : ["Update Password", "Set New Password", "Secure Account"];
    return (
        <UserAuthLayout kcContext={kcContext as any}>
            <Typography variant="h2" fontWeight={600} mb={5} zIndex={100}>
                <TextType
                    text={titleText}
                    typingSpeed={75}
                    pauseDuration={2000}
                    showCursor={true}
                    cursorCharacter=" | "
                />
            </Typography>

            <Grid container spacing={2} sx={{ maxWidth: 400 }} px={4}>
                {message && (
                    <Grid size={{ xs: 12 }} zIndex={100}>
                        <Typography
                            color={(message as any).type === "error" ? "error" : "info"}
                            variant="caption"
                            sx={{ mb: 2, display: 'block', textAlign: 'center', zIndex: 10 }}
                        >
                            {(message as any).summary}
                        </Typography>
                    </Grid>
                )}

                <UpdatePasswordForm
                    loginAction={(url as any).loginAction}
                />

                <Grid size={{ xs: 12 }} sx={{ mt: 2, textAlign: "center" }} zIndex={100}>
                    <Typography
                        variant="body2"
                        component="a"
                        href={(url as any).loginUrl}
                        sx={{
                            zIndex: 100,
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
                        {"Back to Log in"}
                    </Typography>
                </Grid>
            </Grid>
        </UserAuthLayout>
    );
};

export default UpdatePasswordPage;