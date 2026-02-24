import {
    // Checkbox,
    CircularProgress,
    // FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    // Typography,
} from "@mui/material";
// import { Link as MuiLink } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";

import TextField from "../login/components/TextField";
import { KcContext } from "../kc.gen";
import { I18n } from "../login/i18n";

export interface RegisterPayload {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
}
interface RegisterFormProps {
    kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
    i18n: I18n
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
    const [isAgreed, _setIsAgreed] = useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const { kcContext, i18n } = props;
    const { msgStr } = i18n; // Използваме i18n от Keycloakify
    const { url, messagesPerField, profile } = kcContext;
    // Функция за безопасно извличане на стойност от атрибутите на профила
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
            <Grid container spacing={2} sx={{ px: 4 }}>
                <Grid size={{ xs: 6 }}>
                    <TextField
                        disabled={loading}
                        fullWidth
                        label={messagesPerField.get("firstName") || msgStr("firstName")}
                        error={messagesPerField.exists("firstName")}
                        value={user.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                </Grid>

                <Grid size={{ xs: 6 }}>
                    <TextField
                        disabled={loading}
                        fullWidth
                        label={messagesPerField.get("lastName") || msgStr("lastName")}
                        error={messagesPerField.exists("lastName")}
                        value={user.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <TextField
                        disabled={loading}
                        fullWidth
                        label={messagesPerField.get("email") || msgStr("email")}
                        error={messagesPerField.exists("email")}
                        value={user.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </Grid>
                {/* 
                <Grid size={{ xs: 12 }}>
                    <TextField
                        disabled={loading}
                        fullWidth
                        label={messagesPerField.get("phone") || msgStr("phone")}
                        error={messagesPerField.exists("phone")}
                        value={user.phone}
                        placeholder="+359..."
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                </Grid> */}

                <Grid size={{ xs: 12 }}>
                    <TextField
                        disabled={loading}
                        type="password"
                        fullWidth
                        label={messagesPerField.get("password") || msgStr("password")}
                        error={messagesPerField.exists("password")}
                        value={user.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        onEnterFunc={handleRegister}
                        InputProps={{
                            endAdornment: loading ? (
                                <CircularProgress />
                            ) : (
                                <InputAdornment position="end">
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
                                            !user.phone ||
                                            loading
                                        }
                                    >
                                        <ArrowForwardIcon
                                            color={isAgreed ? "primary" : "disabled"}
                                        />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                {/* <Grid size={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAgreed}
                                onChange={e => setIsAgreed(e.target.checked)}
                                color="primary"
                                size="small"
                            />
                        }
                        label={
                            <Typography variant="caption" color="text.secondary">
                                {msgStr("agree")}{" "}
                                <MuiLink href="/legal?tab=1" target="_blank">
                                    {msgStr("Terms of Service")}
                                </MuiLink>{" "}
                                {msgStr("and")}{" "}
                                <MuiLink href="/legal?tab=0" target="_blank">
                                    {msgStr("Privacy Policy")}
                                </MuiLink>
                            </Typography>
                        }
                    />
                </Grid> */}
            </Grid>

        </>
    );
};
export default RegisterForm;
