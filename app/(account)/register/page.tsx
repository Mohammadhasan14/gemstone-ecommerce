import type { Metadata } from "next";
import { RegisterForm } from "@/components/account/register-form";

export const metadata: Metadata = { title: "Create Account — HK Gems" };

export default function RegisterPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center pt-[max(7rem,calc(var(--header-h-max,118px)+20px))] pb-16">
      <div className="w-full max-w-[400px] px-5">
        <div className="rounded-2xl border border-ink/7 bg-white px-6 py-8 shadow-[0_8px_30px_-18px_rgba(16,24,22,.18)] sm:px-8 sm:py-10">
          <div className="mb-6 text-center">
            <div className="text-[11px] font-bold tracking-[.18em] text-gold uppercase">Join HK Gems</div>
            <h1 className="mt-2 font-serif text-2xl font-normal text-ink sm:text-[28px]">Create Account</h1>
          </div>
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}
