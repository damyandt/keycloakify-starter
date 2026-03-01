// LoginPage.tsx
import { Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import { KcContext } from "../../KcContext";
import TextType from "../../components/textTyping";
import UserAuthLayout from "../UserAuthLayout";


// Добави i18n към пропсовете
export default function LoginPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    if (kcContext.pageId !== "login.ftl") {
        return null;
    }

    return (
        <UserAuthLayout kcContext={kcContext} >
            <Typography variant="h4" fontWeight={600} mb={4}>
                <TextType
                    text={[
                        ("Log in"), // Използваме msgStr вместо t
                        ("Log in"),
                        ("Log in"),
                    ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                />
            </Typography>

            {/* Подаваме i18n и на самата форма, ако тя има текстове за превод */}
            <LoginForm kcContext={kcContext} />

        </UserAuthLayout>
    );
}