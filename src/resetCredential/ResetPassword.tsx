import React from "react";
import { Typography, Grid } from "@mui/material";
import UserAuthLayout from "../login/UserComponents/UserAuthLayout";
import TextType from "../login/components/textTyping";
import { KcContext } from "../kc.gen";
import ResetPasswordForm from "./ResetPasswordForm";
interface ResetPasswordPageProps {
    kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (props) => {
    const { kcContext } = props;
    const { url, auth, message } = kcContext;

    return (
        <UserAuthLayout kcContext={kcContext as any}>
            <Typography variant="h2" fontWeight={600} mb={5} zIndex={100}>
                <TextType
                    text={["Reset Credentials", "Reset Credentials", "Reset Credentials"]}
                    typingSpeed={75}
                    pauseDuration={2000}
                    showCursor={true}
                    cursorCharacter=" | "
                />
            </Typography>

            <Grid container spacing={2} sx={{ maxWidth: 400 }} zIndex={100} px={4}>
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

                <ResetPasswordForm
                    attemptedUsername={(auth as any)?.attemptedUsername ?? ""}
                    loginAction={(url as any).loginAction}
                />

                <Grid size={{ xs: 12 }} sx={{ mt: 2, textAlign: "center", zIndex: 10 }}>
                    <Typography
                        variant="body2"
                        component="a"
                        href={(url as any).loginUrl}
                        sx={{
                            zIndex: 1000,
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

export default ResetPasswordPage;