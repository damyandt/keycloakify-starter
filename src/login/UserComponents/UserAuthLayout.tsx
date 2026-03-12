import { Box, Typography, useTheme } from "@mui/material";
import { KcContext } from "../KcContext";
import Orb from "../components/background";

interface LayoutProps {
    children: React.ReactNode;
    kcContext: KcContext;
}

export default function UserAuthLayout({ children }: LayoutProps) {

    const theme = useTheme();
    return (
        <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: theme.palette.customColors?.darkBackgroundColor, }}>
            <Box
                component="img"
                src="damil-logo.png"
                alt="Logo"
                sx={{
                    position: "absolute",
                    zIndex: 100,
                    objectFit: "contain",
                    top: { xs: "10dvh", sm: 22 },
                    left: { xs: "50%", sm: 22 },
                    transform: { xs: "translateX(-50%)", sm: "none" },
                    height: { xs: 120, sm: 40 },
                    width: "auto",
                }}
            />

            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    display: { xs: "none", sm: "block" },
                    transform: {
                        xs: "scale(1.8)",
                        sm: "scale(1.2)",
                        md: "scale(1)",
                    },
                    transformOrigin: "center",
                    width: "100vw",
                    height: "100dvh",
                    backgroundColor: theme.palette.customColors?.darkBackgroundColor,
                }}
            >
                <Orb primaryColor={[0.58, 0.639, 0.722]} hue={0.1} hoverIntensity={0.5} />
            </Box>

            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                {children}

                <Typography variant="body2" position="absolute" bottom={16} zIndex={10} sx={{ opacity: 0.7, color: "#d1d1d1ff" }}>
                    © {new Date().getFullYear()} DamilSoft — Empowering Fitness Businesses
                </Typography>
            </Box>
        </Box>
    );
}