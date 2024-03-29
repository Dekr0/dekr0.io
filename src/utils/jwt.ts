import * as jose from "jose";
import * as cookie from "cookie";
// import type { User } from "src/types/User";
import getLogger from "./logger";

const MAXAGE = 60 * 10;
const JWTEXPIRATION = "20 secs";

function singlePRVK(): () => Promise<jose.KeyLike | Uint8Array> {
    let privateKey: jose.KeyLike | Uint8Array | undefined;

    return async function (): Promise<jose.KeyLike | Uint8Array> {
        if (privateKey) {
            return privateKey;
        }

        getLogger().info("Importing JWK");
        const alg = import.meta.env.JWK_ALG;
        const jwk = {
            kty: import.meta.env.JWK_KTY,
            k: import.meta.env.JWK_K,
        };

        privateKey = await jose.importJWK(jwk, alg);

        return privateKey;
    };
}

const getPrivateKey = singlePRVK();

export async function sign(user: any) {
    const payload = {
        sub: user.username,
        sub_id: user.id,
    };

    const alg = import.meta.env.JWK_ALG;
    const privateKey = await getPrivateKey();

    const signer = new jose.SignJWT(payload)
        .setExpirationTime(JWTEXPIRATION)
        .setProtectedHeader({ alg: alg });

    const jwt = await signer.sign(privateKey);

    const jwtCookie = cookie.serialize("jwt_token", jwt, {
        sameSite: "strict",
        secure: true,
        httpOnly: true,
        path: "/guestbook",
        maxAge: MAXAGE,
    });

    return jwtCookie;
}

export async function verify(jwt: string): Promise<string | undefined> {
    try {
        const privateKey = await getPrivateKey();

        const { payload } = await jose.jwtVerify(jwt, privateKey);

        return payload.sub;
    } catch (err) {
        getLogger().error(err);

        return undefined;
    }
}
