import { AccountsPageContents } from "@/accounts/components/layouts/centered-paper";
import { SignUp } from "@/accounts/components/SignUp";
import { PAGES } from "@/accounts/constants/pages";
import { LoadingIndicator } from "@/base/components/loaders";
import { customAPIHost } from "@/base/origins";
import { LS_KEYS, getData } from "@ente/shared//storage/localStorage";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Page: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [host, setHost] = useState<string | undefined>();

    const router = useRouter();

    useEffect(() => {
        void customAPIHost().then(setHost);
        const user = getData(LS_KEYS.USER);
        if (user?.email) {
            void router.push(PAGES.VERIFY);
        }
        setLoading(false);
    }, []);

    const login = () => {
        void router.push(PAGES.LOGIN);
    };

    return loading ? (
        <LoadingIndicator />
    ) : (
        <AccountsPageContents>
            <SignUp {...{ login, router, host }} useV2Layout />
        </AccountsPageContents>
    );
};

export default Page;
