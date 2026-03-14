import {
    Box,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "../login/components/TextField";
import { KcContext } from "../kc.gen";
import Collapse from "../login/components/Collapse";

export interface RegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}
interface RegisterFormProps {
    kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
}

const STORAGE_KEY = "register_form_data";

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const { kcContext } = props;
    const [isAgreed, setIsAgreed] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { url, messagesPerField, profile, message } = kcContext;

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const getAttributeValue = (name: string): string => {
        const attr = (profile as any).attributes?.find?.((a: any) => a.name === name);
        return attr?.value ?? "";
    };

    const getSavedFormData = (): Partial<RegisterPayload> => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                sessionStorage.removeItem(STORAGE_KEY);
                return JSON.parse(saved);
            }
        } catch { /* ignore */ }
        return {};
    };

    const [user, setUser] = useState<RegisterPayload>(() => {
        const saved = getSavedFormData();
        return {
            email: saved.email || getAttributeValue("email"),
            firstName: saved.firstName || getAttributeValue("firstName"),
            lastName: saved.lastName || getAttributeValue("lastName"),
            phone: saved.phone || getAttributeValue("phone"),
            password: ""
        };
    });

    const handleChange = (field: keyof RegisterPayload, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleRegister = () => {
        setLoading(true);

        // Запазваме данните в sessionStorage преди submit (без паролата)
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
            }));
        } catch { /* ignore */ }

        const form = document.createElement("form");
        form.method = "POST";
        form.action = url.registrationAction;

        const fields = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "password": user.password,
            "password-confirm": user.password,
            "user.attributes.phone": user.phone
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
            <Grid container spacing={2} sx={{ px: 4, maxWidth: 400, mt: 1, zIndex: 10 }}>
                <Collapse in={message !== undefined} sx={{ width: '100%' }}>
                    <Grid size={{ xs: 12 }}>
                        <Typography
                            color={message?.type === "error" ? "error" : "info"}
                            variant="caption"
                            sx={{ mb: 1, display: 'block', textAlign: 'center', width: '100%' }}
                        >
                            {message?.summary}
                        </Typography>
                    </Grid>
                </Collapse>
                <Grid size={{ xs: 6 }}>
                    <TextField
                        disabled={loading}
                        fullWidth
                        label={messagesPerField.get("firstName") || ("First Name")}
                        error={messagesPerField.exists("firstName")}
                        value={user.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                </Grid>

                <Grid size={{ xs: 6 }}>
                    <TextField
                        disabled={loading}
                        fullWidth
                        label={messagesPerField.get("lastName") || ("Last Name")}
                        error={messagesPerField.exists("lastName")}
                        value={user.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        disabled={loading}
                        fullWidth
                        label={messagesPerField.get("email") || ("Email")}
                        error={messagesPerField.exists("email")}
                        value={user.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        disabled={loading}
                        // Динамичен тип според състоянието
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        label={messagesPerField.get("password") || "Password"}
                        error={messagesPerField.exists("password")}
                        value={user.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        onEnterFunc={handleRegister}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {/* Бутон за показване/скриване */}
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                        size="small"

                                        disabled={loading}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>

                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <IconButton
                                            edge="end"
                                            onClick={handleRegister}
                                            size="small"
                                            disabled={
                                                !isAgreed ||
                                                !user.email ||
                                                !user.password ||
                                                !user.firstName ||
                                                !user.lastName ||
                                                loading
                                            }
                                        >
                                            <ArrowForwardIcon
                                                color={isAgreed ? "primary" : "disabled"}
                                            />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Box sx={{ mt: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={loading}
                                    color="primary"
                                    checked={isAgreed}
                                    onChange={(e) => setIsAgreed(e.target.checked)}
                                />
                            }
                            label={
                                <Typography fontSize={"0.7rem"} color={'#d1d1d1'} zIndex={10}>
                                    {("I agree to the")}{" "}
                                    {("Terms of Service")}{" "}
                                    {("and")}{" "}
                                    {("Privacy Policy")}
                                </Typography>
                            }
                        />
                    </Box>
                </Grid>
            </Grid>

        </>
    );
};
export default RegisterForm;
