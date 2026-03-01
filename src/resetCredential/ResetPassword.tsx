import React, { useState } from "react";
import { Typography, Grid, CircularProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import IconButton from "@mui/material/IconButton";
import TextField from "../login/components/TextField";
import UserAuthLayout from "../login/UserComponents/UserAuthLayout";
import TextType from "../login/components/textTyping";
import { KcContext } from "../kc.gen";

interface ResetPasswordPageProps {
    kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>;
}

interface ResetPasswordPageProps {
    kcContext: Extract<KcContext, { pageId: "login-reset-password.ftl" }>;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = (props) => {
    const { kcContext } = props;
    const { url, auth, message } = kcContext;
    const [email, setEmail] = useState((auth as any)?.attemptedUsername ?? "");
    const [loading, setLoading] = useState(false);
    const handleReset = () => {
        setLoading(true);
        const form = document.createElement("form");
        form.method = "POST";
        form.action = (url as any).loginAction;

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "username";
        input.value = email;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <UserAuthLayout kcContext={kcContext as any} >
            <Typography variant="h4" fontWeight={600} mb={5}>
                <TextType
                    text={[("Reset Credentials")]}
                    typingSpeed={75}
                    showCursor={false}
                />
            </Typography>

            <Grid container spacing={2} sx={{ maxWidth: 400 }}>
                {message && (
                    <Grid size={{ xs: 12 }}>
                        <Typography
                            color={(message as any).type === "error" ? "error" : "info"}
                            variant="caption"
                            sx={{ mb: 2, display: 'block', textAlign: 'center' }}
                        >
                            {(message as any).summary}
                        </Typography>
                    </Grid>
                )}

                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        label={("Email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onEnterFunc={handleReset}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleReset} size="small" disabled={loading || !email}>
                                    {loading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12 }} sx={{ mt: 2, textAlign: "center" }}>
                    <Typography
                        variant="body2"
                        component="a"
                        href={(url as any).loginUrl}
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
                        {"Back to Log in"}
                    </Typography>
                </Grid>
            </Grid>
        </UserAuthLayout>
    );
};

export default ResetPasswordPage;