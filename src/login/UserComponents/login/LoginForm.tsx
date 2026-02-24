import {
  Box,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useRef, useState } from "react";
import TextField from "../../components/TextField";
import type { I18n } from "../../i18n";
import type { KcContext } from "../../KcContext";

interface LoginFormProps {
  kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
  i18n: I18n;
}

const LoginForm = (props: LoginFormProps) => {
  const { kcContext, i18n } = props;
  const { msgStr } = i18n;
  const { url, login } = kcContext;
  const [disableEmail, setDisableEmail] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const { message } = kcContext;

  const [formData, setFormData] = useState({
    email: login.username || "",
    password: "",
  });

  const handleNextClick = () => {
    if (!formData.email) {
      setErrors({ email: msgStr("missingUsernameMessage") });
      return;
    }
    setShowPasswordField(true);
    setDisableEmail(true);
    setTimeout(() => passwordInputRef.current?.focus(), 100);
  };

  const handleLogin = () => {
    setLoading(true);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = url.loginAction;

    const fields = {
      "username": formData.email,
      "password": formData.password,
      "rememberMe": "on"
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
    <Grid container spacing={2} zIndex={10} px={4} sx={{ maxWidth: 400 }}>
      <Collapse in={message !== undefined} sx={{ width: '100%' }}>
        <Grid size={{ xs: 12 }}>
          <Typography
            color={message?.type === "error" ? "error" : "info"}
            variant="caption"
            sx={{ mb: 2, display: 'block', textAlign: 'center', width: '100%' }}
          >
            {message?.summary}
          </Typography>
        </Grid>
      </Collapse>

      <Grid size={{ xs: 12 }}>
        <TextField
          fullWidth
          type="email"
          disabled={disableEmail}
          label={errors["email"] || msgStr("email")}
          error={!!errors["email"]}
          value={formData.email}
          onEnterFunc={handleNextClick}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          InputProps={{
            endAdornment: !showPasswordField ? (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleNextClick} size="small">
                  <ArrowForwardIcon />
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => {
                    setDisableEmail(false);
                    setShowPasswordField(false);
                  }}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Collapse in={showPasswordField} sx={{ width: '100%' }}>
        <Grid size={{ xs: 12 }} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label={errors["password"] || msgStr("password")}
            type={showPassword ? "text" : "password"}
            error={!!errors["password"]}
            value={formData.password}
            inputRef={passwordInputRef}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            onEnterFunc={handleLogin}
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  <IconButton onClick={handleLogin} size="small" disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
                  </IconButton>
                </Box>
              ),
            }}
          />
        </Grid>
      </Collapse>
      <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Typography
          variant="body2"
          fontWeight={500}
          width={"fit-content"}
          alignSelf={"center"}
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.75rem',

          }}
        >
          {msgStr("noAccount")}{' '}

          <Typography
            variant="body2"
            component="a"
            href={url.registrationUrl}
            sx={{
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.75rem',
              '&:hover': {
                textDecoration: 'underline',
                color: 'primary.main'
              }
            }}
          >
            {msgStr("doRegister")}
          </Typography>

        </Typography>
        <Typography
          variant="body2"
          component="a"
          href={url.loginResetCredentialsUrl}
          sx={{
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.75rem',
            '&:hover': {
              textDecoration: 'underline',
              color: 'primary.main'
            }
          }}
        >
          {msgStr("doForgotPassword")}

        </Typography>

      </Grid>
      <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

      </Grid>
    </Grid>
  );
};

export default LoginForm;
