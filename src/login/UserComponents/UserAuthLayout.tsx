import { Box, Typography } from "@mui/material";
import { KcContext } from "../KcContext";
import Orb from "../components/background";

interface LayoutProps {
    children: React.ReactNode;
    kcContext: KcContext;
}

export default function UserAuthLayout({ children }: LayoutProps) {


    return (
        <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
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

            <Box sx={{ position: "absolute", inset: 0, zIndex: -1, display: { xs: "none", sm: "block" }, }}>
                <Orb primaryColor={[0.2, 0.5, 1]} hue={0.1} hoverIntensity={0.5} />
            </Box>

            <Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                {children}

                <Typography variant="body2" position="absolute" bottom={16} zIndex={10} sx={{ opacity: 0.7 }}>
                    © {new Date().getFullYear()} DamilSoft — Empowering Fitness Businesses
                </Typography>
            </Box>
        </Box>
    );
}