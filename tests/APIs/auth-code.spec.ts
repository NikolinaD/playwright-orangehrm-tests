import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

import {
    generateCodeVerifier,
    generateCodeChallenge,
    generateState,
    createAuthorizationUrl,
    exchangeCodeForToken
} from './authentication';

import { startOAuthServer } from './oauth-server';

dotenv.config();

test('OrangeHRM authorization', async ({ page }) => {

    // Start the local callback server
    const { server, getCode } = await startOAuthServer();

    try {
        // Generate PKCE values
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = generateCodeChallenge(codeVerifier);
        const state = generateState();

        // Create OAuth authorization URL
        const authorizationUrl = createAuthorizationUrl(
            codeChallenge,
            state
        );

        // Open OrangeHRM
        console.log('Authorization URL:', authorizationUrl);
        await page.goto(authorizationUrl);

        // Login
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');

        await page.getByRole('button', { name: 'Login' }).click();

        // OAuth consent screen
        await expect(
            page.getByRole('button', { name: /allow/i })
        ).toBeVisible();

        await page.getByRole('button', { name: /allow/i }).click();

        // Wait for OrangeHRM to redirect to our callback
        await page.waitForURL(
            'http://localhost:3000/callback**'
        );

        // Get authorization code
        const authorizationCode = getCode();

        expect(authorizationCode).toBeTruthy();

        console.log(
            'Authorization code received:',
            !!authorizationCode
        );

        const accessToken = await exchangeCodeForToken(
            authorizationCode!,
            codeVerifier,
            page.request
        );

        process.env.TOKEN = accessToken;
        console.log('Access token received:', !!accessToken);   

    } finally {
        // Stop the callback server
        server.close();
    }
});