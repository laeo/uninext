'use client';

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    acceptTerms: z.boolean().refine(val => val, {
        message: "You must accept the terms and conditions",
    }),
});

export type LoginFormValues = z.infer<typeof formSchema>;

type LoginFormProps = {
    onSubmit: (data: LoginFormValues) => void;
};

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            acceptTerms: false,
        },
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 border p-4 rounded bg-white shadow">
            <h1>LOGIN</h1>
            <Controller control={form.control} name="email" render={({ field, fieldState }) => (
                <input {...field} type="email" aria-invalid={fieldState.invalid} className="px-3 py-2 outline rounded font-mono text-base aria-invalid:outline-red-200" placeholder="Email" />
            )} />
            <Controller control={form.control} name="password" render={({ field, fieldState }) => (
                <input {...field} type="password" aria-invalid={fieldState.invalid} className="px-3 py-2 outline rounded font-mono text-base aria-invalid:outline-red-200" placeholder="Password" />
            )} />
            <Controller control={form.control} name="acceptTerms" render={({ field: { value, ...field }, fieldState }) => (
                <label aria-invalid={fieldState.invalid} className="flex items-center gap-2 select-none aria-invalid:text-red-200">
                    <input {...field} type="checkbox" checked={value} />
                    <span>I accept the terms and conditions</span>
                </label>
            )} />
            <button type="submit" disabled={form.formState.isSubmitting} className="px-4 py-3 font-bold uppercase text-white transition bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer disabled:bg-slate-500 disabled:cursor-progress">
                Login
            </button>
        </form>
    );
}