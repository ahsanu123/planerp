// This file is auto-generated by @hey-api/openapi-ts

export type AppUser = {
    id?: number;
    userName?: (string) | null;
    normalizedUserName?: (string) | null;
    claims?: Array<Claim> | null;
};

export type Claim = {
    readonly issuer?: (string) | null;
    readonly originalIssuer?: (string) | null;
    readonly properties?: {
        [key: string]: (string);
    } | null;
    subject?: ClaimsIdentity;
    readonly type?: (string) | null;
    readonly value?: (string) | null;
    readonly valueType?: (string) | null;
};

export type ClaimsIdentity = {
    readonly authenticationType?: (string) | null;
    readonly isAuthenticated?: boolean;
    actor?: ClaimsIdentity;
    bootstrapContext?: unknown;
    readonly claims?: Array<Claim> | null;
    label?: (string) | null;
    readonly name?: (string) | null;
    readonly nameClaimType?: (string) | null;
    readonly roleClaimType?: (string) | null;
};

export type GetUserManagerSignInData = {
    query?: {
        user?: string;
    };
};

export type GetUserManagerSignInResponse = (unknown);

export type GetUserManagerSignInError = unknown;

export type GetUserManagerSignOutResponse = (unknown);

export type GetUserManagerSignOutError = unknown;

export type PostUserManagerCreateUserData = {
    body?: AppUser;
};

export type PostUserManagerCreateUserResponse = (unknown);

export type PostUserManagerCreateUserError = unknown;

export type GetUserManagerGetUserData = {
    query?: {
        userName?: string;
    };
};

export type GetUserManagerGetUserResponse = (unknown);

export type GetUserManagerGetUserError = unknown;

export type GetUserManagerSeedResponse = (unknown);

export type GetUserManagerSeedError = unknown;