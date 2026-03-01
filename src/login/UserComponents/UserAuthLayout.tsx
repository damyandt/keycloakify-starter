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
                    top: 22,
                    left: 22,
                    height: 40,
                    width: "auto",
                    objectFit: "contain",
                    zIndex: 100
                }}
            />


            <Box sx={{ position: "absolute", inset: 0, zIndex: -1 }}>
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