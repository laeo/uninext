import "./HomePage.css";
import { IonContent, IonPage } from "@ionic/react";
import { useSnapshot } from "valtio";
import { authStore } from "../store/auth";

export default function HomePage() {
    const snap = useSnapshot(authStore);

    return (
        <IonPage>
            <IonContent>
                <main>welcome, {snap.user?.name}</main>
            </IonContent>
        </IonPage>
    );
}