import React, { useState } from "react";
import { Grid, CircularProgress, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TextField from "../login/components/TextField";

interface ResetPasswordFormProps {
    attemptedUsername: string;
    loginAction: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ attemptedUsername, loginAction }) => {
    const [email, setEmail] = useState(attemptedUsername);
    const [loading, setLoading] = useState(false);

    const handleReset = () => {
        if (!email) return;
        setLoading(true);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = loginAction;

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "username";
        input.value = email;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <Grid size={{ xs: 12 }}>
            <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onEnterFunc={handleReset}
                InputProps={{
                    endAdornment: (
                        <IconButton
                            onClick={handleReset}
                            size="small"
                            disabled={loading || !email}
                        >
                            {loading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
                        </IconButton>
                    ),
                }}
            />
        </Grid>
    );
};

export default ResetPasswordForm;