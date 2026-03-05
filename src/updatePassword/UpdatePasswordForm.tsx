import React, { useState } from "react";
import { Grid, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "../login/components/TextField";

interface UpdatePasswordFormProps {
    loginAction: string;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ loginAction }) => {
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);

    // Стейт за видимост на паролите
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const isInvalid = !password || password !== passwordConfirm || loading;

    const handleUpdate = () => {
        if (isInvalid) return;
        setLoading(true);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = loginAction;

        const fields = {
            "password-new": password,
            "password-confirm": passwordConfirm,
        };

        Object.entries(fields).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <TextField
                    fullWidth
                    // Превключваме типа между 'password' и 'text'
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    size="small"
                                    sx={{ mr: 1 }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid size={{ xs: 12 }}>
                <TextField
                    fullWidth
                    type={showPasswordConfirm ? "text" : "password"}
                    label="Confirm Password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    onEnterFunc={handleUpdate}
                    error={password !== "" && passwordConfirm !== "" && password !== passwordConfirm}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                    edge="end"
                                    size="small"
                                    sx={{ mr: 0.2 }}
                                >
                                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                <IconButton
                                    onClick={handleUpdate}
                                    size="small"
                                    disabled={isInvalid}
                                    color="primary"
                                >
                                    {loading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </>
    );
};

export default UpdatePasswordForm;