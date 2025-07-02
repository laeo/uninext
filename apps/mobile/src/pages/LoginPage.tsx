import { IonContent, IonHeader, IonPage, IonRouterLink, useIonRouter } from "@ionic/react";
import LoginForm, { type LoginFormValues } from "ui/blocks/forms/LoginForm";
import { authClient } from "../auth-client";
import { authStore } from "../store/auth";

export default function LoginPage() {
    const router = useIonRouter();

    const handleSubmit = async (values: LoginFormValues) => {
        const { data, error } = await authClient.signIn.email({
            email: values.email,
            password: values.password,
        });

        console.log(data, error);

        if (data) {
            authStore.token = data.token;
            authStore.user = data.user;
            router.push('/home', 'root', 'replace');
        }
    };

    return (
        <IonPage aria-hidden={false}>
            <IonHeader>
            </IonHeader>
            <IonContent>
                <main className="p-4 min-h-screen flex flex-col gap-4 justify-center items-center">
                    <LoginForm onSubmit={handleSubmit} />
                    <p>Need an account? <IonRouterLink routerLink="/auth/register" routerDirection="root">Register Now!</IonRouterLink> </p>
                </main>
            </IonContent>
        </IonPage>
    );
}