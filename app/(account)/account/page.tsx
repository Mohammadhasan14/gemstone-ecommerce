import type { Metadata } from "next";
import { getUser } from "@/lib/dal";
import { ProfileForm } from "@/components/account/profile-form";

export const metadata: Metadata = { title: "My Account — HK Gems" };

export default async function AccountDashboardPage() {
  const user = await getUser();
  if (!user) return null;

  return (
    <div>
      <h1 className="font-serif text-2xl font-normal text-ink sm:text-3xl">Account Details</h1>
      <p className="mt-2 text-sm text-muted">Update your name and phone number.</p>
      <div className="mt-6">
        <ProfileForm name={user.name} phone={user.phone} email={user.email} />
      </div>
    </div>
  );
}
