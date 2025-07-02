import { IonContent, IonHeader, IonPage, IonRouterLink, useIonRouter } from "@ionic/react";
import RegisterForm, { type RegisterFormValues } from "ui/blocks/forms/RegisterForm";
import { authClient } from "../auth-client";
import { authStore } from "../store/auth";

export default function RegisterPage() {
    const router = useIonRouter();

    const handleSubmit = async (values: RegisterFormValues) => {
        const { data, error } = await authClient.signUp.email({
            email: values.email,
            password: values.password,
            name: values.email.split('@')[0],
        });

        console.log(data, error);

        if (data?.token) {
            authStore.token = data.token;
            authStore.user = data.user;
            router.push('/home', 'root', 'replace');
        }
    };

    return (
        <IonPage>
            <IonHeader></IonHeader>
            <IonContent>
                <main className="p-4 min-h-screen flex flex-col gap-4 justify-center items-center">
                    <RegisterForm onSubmit={handleSubmit} />
                    <p>Already taken an account? <IonRouterLink routerLink="/auth/login" routerDirection="root">Login Now</IonRouterLink> </p>
                </main>
            </IonContent>
        </IonPage>
    );
}