import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

import { useTranslation } from "react-i18next";
import GuestLayout from "@/Layouts/GuestLayout";

import { Button } from "@/components/ui/button";

export default function VerifyEmail({ status }: { status?: string }) {
    const { t } = useTranslation();

    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600">
                {t("auth.verify-email.after-registration-description")}
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {t("auth.verify-email.new-link-verification-description")}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button disabled={processing}>
                        {t("auth.verify-email.submit-button")}
                    </Button>

                    <Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        {t("general.exit")}
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
