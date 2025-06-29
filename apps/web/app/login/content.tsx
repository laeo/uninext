'use client';

import { authClient } from "@/lib/auth-client";
import LoginForm, { LoginFormValues } from "ui/blocks/forms/LoginForm";

export default function LoginContent() {
    async function handleSubmit(values: LoginFormValues) {
        const { data, error } = await authClient.signIn.email({
            email: values.email,
            password: values.password,
        });

        console.log(data, error);
    }

    return (
        <LoginForm onSubmit={handleSubmit} />
    );
}