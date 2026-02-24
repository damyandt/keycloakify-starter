import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import { KcContext } from "../KcContext";
import { I18n } from "keycloakify/login/i18n";
import Orb from "../components/background";


interface LayoutProps {
    children: React.ReactNode;
    kcContext: KcContext;
    i18n: I18n;
}

export default function UserAuthLayout({ children, kcContext, i18n }: LayoutProps) {
    const currentLanguage = (i18n as any).currentLanguageTag as string;
    const targetLanguage = currentLanguage === "bg" ? "en" : "bg";
    const languageUrl = kcContext.locale?.supported.find(
        l => l.languageTag === targetLanguage
    )?.url;

    return (
        <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
            <Tooltip
                title={currentLanguage === "bg" ? "Switch to English" : "Превключи на Български"}
                placement="left"
            >
                <IconButton
                    onClick={() => { if (languageUrl) window.location.href = languageUrl; }}
                    sx={{ position: "absolute", top: 0, right: 0, m: 3, zIndex: 10000, color: "white" }}
                >
                    <LanguageOutlined />
                </IconButton>
            </Tooltip>

            <Box sx={{ position: "absolute", inset: 0, zIndex: -1 }}>
                <Orb primaryColor={[0.2, 0.5, 1]} hue={0.1} hoverIntensity={0.5} />
            </Box>

            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                {children}

                <Typography variant="body2" color="rgba(255,255,255,0.6)" position="absolute" bottom={16}>
                    © {new Date().getFullYear()} DamilSoft — Empowering Fitness Businesses
                </Typography>
            </Box>
        </Box>
    );
}