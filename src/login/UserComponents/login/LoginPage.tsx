
// import type { I18n } from "./i18n";
import { Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import { I18n } from "../../i18n";
import { KcContext } from "../../KcContext";
import TextType from "../../components/textTyping";
import UserAuthLayout from "../UserAuthLayout";

export default function LoginPage(props: { kcContext: KcContext; i18n: I18n }) {
    const { kcContext, i18n } = props;
    const { msgStr } = i18n;

    if (kcContext.pageId !== "login.ftl") {
        return null;
    }

    return (
        <UserAuthLayout kcContext={kcContext} i18n={i18n}>

            <Typography variant="h4" fontWeight={600} mb={4}>
                <TextType
                    text={[
                        msgStr("loginAccountTitle"),
                        msgStr("loginAccountTitle"),
                        msgStr("loginAccountTitle"),
                    ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                />
            </Typography>

            <LoginForm kcContext={kcContext} i18n={i18n} />
            <Typography
                variant="body2"
                color="text.secondary"
                mt={8}
                width={"100%"}
                textAlign={"center"}
                position={"absolute"}
                bottom={16}
            >
                © {new Date().getFullYear()}{" "}
                {("DamilSoft — Empowering Fitness Businesses")}
            </Typography>
        </UserAuthLayout>
    );
}