import { redirect } from "next/navigation";

const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL?.trim()?.replace(/\/+$/, "");

export default function AdminRedirectPage() {
  if (adminUrl) {
    redirect(`${adminUrl}/admin`);
  }

  redirect("/login");
}
