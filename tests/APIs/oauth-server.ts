import express from 'express';

const app = express();

export function startOAuthServer(): Promise<{
    server: ReturnType<typeof app.listen>;
    getCode: () => string | null;
}> {
    return new Promise((resolve) => {

        let authorizationCode: string | null = null;

        const server = app.listen(3000, () => {

            console.log(
                'OAuth callback server running on port 3000'
            );

            resolve({
                server,

                getCode: () => authorizationCode
            });
        });

        app.get('/callback', (req, res) => {

            authorizationCode =
                req.query.code as string | undefined ?? null;

            res.send(
                'Authorization successful. You can close this page.'
            );
        });
    });
}