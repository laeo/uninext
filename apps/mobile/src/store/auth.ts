import { Preferences } from "@capacitor/preferences";
import type { User } from "better-auth";
import { proxy, subscribe } from "valtio";

type AuthState = {
    token?: string;
    user?: User;
    isLoggedIn: boolean;
};

export const authStore = proxy<AuthState>({
    get isLoggedIn() {
        return !!this.token;
    }
});

const STORE_KEY = 'authState';

export async function setupAuthStore() {
    const { value } = await Preferences.get({ key: STORE_KEY });
    if (value) {
        const local: AuthState = JSON.parse(value);
        authStore.token = local.token;
        authStore.user = local.user;
    }

    subscribe(authStore, async () => {
        await Preferences.set({
            key: STORE_KEY,
            value: JSON.stringify({ token: authStore.token, user: authStore.user }),
        });
    });
}
