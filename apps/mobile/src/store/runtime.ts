import { Device } from "@capacitor/device";
import { proxy } from "valtio";

type RuntimeState = {
    deviceId?: string;
    deviceModel?: string;
    platform: 'ios' | 'android' | 'web';
    isVirtual: boolean;
    webViewVersion?: string;
    languageCode?: string;
    languageTag?: string;
};

export const runtimeStore = proxy<RuntimeState>({
    platform: 'web',
    isVirtual: false,
});

export async function setupRuntimeStore() {
    const { identifier } = await Device.getId();
    runtimeStore.deviceId = identifier;

    const info = await Device.getInfo();
    runtimeStore.deviceModel = info.model;
    runtimeStore.platform = info.platform;
    runtimeStore.isVirtual = info.isVirtual;
    runtimeStore.webViewVersion = info.webViewVersion;

    const { value } = await Device.getLanguageCode();
    runtimeStore.languageCode = value;

    const { value: tag } = await Device.getLanguageTag();
    runtimeStore.languageTag = tag;
}
