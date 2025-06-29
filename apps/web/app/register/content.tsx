'use client';

import { authClient } from "@/lib/auth-client";
import RegisterForm, { RegisterFormValues } from "ui/blocks/forms/RegisterForm";

export default function RegisterContent() {
    async function handleSubmit(values: RegisterFormValues) {
        const { data, error } = await authClient.signUp.email({
            name: values.email.split('@')[0],
            email: values.email,
            password: values.password,
        });

        console.log(data, error);
    }

    return (
        <RegisterForm onSubmit={handleSubmit} />
    );
}