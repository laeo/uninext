'use client';

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    acceptTerms: z.boolean().refine(val => val, {
        message: "You must accept the terms and conditions",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don\'t match',
    path: ['confirmPassword'],
});

export type RegisterFormValues = z.infer<typeof formSchema>;

type RegisterFormProps = {
    onSubmit: (values: RegisterFormValues) => void;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        }
    });

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Controller control={form.control} name="email" render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input {...field} type="email" aria-invalid={fieldState.invalid} className="px-3 py-2 outline rounded font-mono text-base aria-invalid:outline-red-200" />
                </div>
            )} />
            <Controller control={form.control} name="password" render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input {...field} type="password" aria-invalid={fieldState.invalid} className="px-3 py-2 outline rounded font-mono text-base aria-invalid:outline-red-200" />
                </div>
            )} />
            <Controller control={form.control} name="confirmPassword" render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input {...field} type="password" aria-invalid={fieldState.invalid} className="px-3 py-2 outline rounded font-mono text-base aria-invalid:outline-red-200" />
                </div>
            )} />
            <Controller control={form.control} name="acceptTerms" render={({ field: { value, ...field }, fieldState }) => (
                <div aria-invalid={fieldState.invalid} className="flex items-center gap-2 select-none aria-invalid:text-red-200">
                    <input {...field} type="checkbox" id="acceptTerms" checked={value} />
                    <label htmlFor="acceptTerms">I accept the terms and conditions.</label>
                </div>
            )} />
            <button type="submit" disabled={form.formState.isSubmitting} className="px-4 py-3 font-bold uppercase text-white transition bg-slate-800 hover:bg-slate-700 rounded-md cursor-pointer disabled:bg-slate-500 disabled:cursor-progress">
                Register Now
            </button>
        </form>
    );
}