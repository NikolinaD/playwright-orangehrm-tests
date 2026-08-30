import crypto from 'crypto';

export function generateCodeVerifier(): string {
    return crypto.randomBytes(32).toString('base64url');
}

export function generateCodeChallenge(codeVerifier: string): string {
    return crypto
        .createHash('sha256')
        .update(codeVerifier)
        .digest('base64url');
}

export function generateState(): string {
    return crypto.randomBytes(16).toString('hex');
}

export function createAuthorizationUrl(
    codeChallenge: string,
    state: string
): string {

    const baseUrl = process.env.ORANGEHRM_BASE_URL!;
    const clientId = process.env.ORANGEHRM_CLIENT_ID!;
    const redirectUri = process.env.ORANGEHRM_REDIRECT_URI!;

    const url = new URL(`${baseUrl}/oauth2/authorize`);

    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('redirect_uri', redirectUri);
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('state', state);

    return url.toString();
}

export async function exchangeCodeForToken(
    authorizationCode: string, 
    codeVerifier: string,
    request: any
): Promise<string> {
    const response = await request.post(`${process.env.ORANGEHRM_BASE_URL}/oauth2/token`, {
        form: {
            grant_type: 'authorization_code',
            client_id: process.env.ORANGEHRM_CLIENT_ID!,
            code: authorizationCode,
            redirect_uri: process.env.ORANGEHRM_REDIRECT_URI!,
            code_verifier: codeVerifier
        }
    });

    const body = await response.json();
    return body.access_token;
}