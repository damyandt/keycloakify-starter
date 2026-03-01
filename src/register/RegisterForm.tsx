import {
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "../login/components/TextField";
import { KcContext } from "../kc.gen";

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

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const { kcContext } = props; // 3. Деструктурираме i18n
    const [isAgreed, _setIsAgreed] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { url, messagesPerField, profile } = kcContext;

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const getAttributeValue = (name: string): string => {
        const attr = (profile as any).attributes?.find?.((a: any) => a.name === name);
        return attr?.value ?? "";
    };

    const [user, setUser] = useState<RegisterPayload>({
        email: getAttributeValue("email"),
        firstName: getAttributeValue("firstName"),
        lastName: getAttributeValue("lastName"),
        phone: getAttributeValue("phone"), // или "user.attributes.phone"
        password: ""
    });

    const handleChange = (field: keyof RegisterPayload, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleRegister = () => {
        setLoading(true);

        const form = document.createElement("form");
        form.method = "POST";
        form.action = url.registrationAction; // Критично за JAR файла

        const fields = {
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "password": user.password,
            "password-confirm": user.password,
            "user.attributes.phone": user.phone // Остани с това засега
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
            <Grid container spacing={2} sx={{ px: 4, maxWidth: 400, mt: 2 }}>
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
            </Grid>

        </>
    );
};
export default RegisterForm;
