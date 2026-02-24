import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { KcPage } from "./kc.gen";
import { getKcContextMock } from "./login/KcPage.stories";
// ВАЖНО: Само импортираме вече създадената функция от историите

if (import.meta.env.DEV) {
    // Тук само ИЗПОЛЗВАМЕ функцията, без да я дефинираме с const
    window.kcContext = getKcContextMock({
        pageId: "register.ftl",
        overrides: {
            profile: {
                attributes: [
                    { name: "firstName", value: "Ivan" },
                    { name: "lastName", value: "Ivanov" },
                    { name: "email", value: "ivan@example.com" },
                    { name: "phone", value: "+359888123456" }
                ]
            }
        } as any
    });
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {!window.kcContext ? (
            <h1>No Keycloak Context</h1>
        ) : (
            <KcPage kcContext={window.kcContext} />
        )}
    </StrictMode>
);