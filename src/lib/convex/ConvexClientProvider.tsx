"use client";

import { ReactNode, useEffect } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, useMutation } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "convex/_generated/api";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function UserSync({ children }: { children: ReactNode }) {
    const { isSignedIn, userId } = useAuth();
    const storeUser = useMutation(api.users.store);

    useEffect(() => {
        if (isSignedIn && userId) {
            // Sync user to Convex on login/load
            storeUser({});
        }
    }, [isSignedIn, userId, storeUser]);

    return <>{children}</>;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <UserSync>
                {children}
            </UserSync>
        </ConvexProviderWithClerk>
    );
}
