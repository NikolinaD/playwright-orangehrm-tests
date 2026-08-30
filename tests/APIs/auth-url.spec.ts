import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

import {
    generateCodeVerifier,
    generateCodeChallenge,
    generateState,
    createAuthorizationUrl
} from './authentication';

dotenv.config();

test('create OrangeHRM OAuth authorization URL', async () => {

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = generateState();

    const authorizationUrl = createAuthorizationUrl(
        codeChallenge,
        state
    );

    console.log('Authorization URL created successfully');

    const url = new URL(authorizationUrl);

    expect(url.pathname).toBe('/web/index.php/oauth2/authorize');

    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('client_id')).toBeTruthy();
    expect(url.searchParams.get('redirect_uri'))
        .toBe('http://localhost:3000/callback');

    expect(url.searchParams.get('code_challenge'))
        .toBe(codeChallenge);

    expect(url.searchParams.get('code_challenge_method'))
        .toBe('S256');

    expect(url.searchParams.get('state'))
        .toBe(state);
});