<template>
    <div>
        <h1>Spotify Callback Page</h1>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'auth'
})

import { useAccessToken } from '#imports';

const { setAccessToken } = useAccessToken()

onMounted(() => {
    if (process.client) {
        const code = new URLSearchParams(location.search).get('code');
        getAccessToken(code);
    }
})

async function getAccessToken(authorizationCode) {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const { spotifyClientSecret, spotifyClientID, redirectUri } = useRuntimeConfig().public
    const data = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri,
        client_id: spotifyClientID,
        client_secret: spotifyClientSecret
    };

    try {
        const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        });

        if (!response.ok) {
            throw new Error('Failed to exchange authorization code for access token');
        }

        const tokenData = await response.json();
        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token;

        window?.localStorage?.setItem('accessToken', accessToken);

        updateValue(accessToken);

        const router = useRouter();
        await router.push('/');
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateValue(access_token) {
    setAccessToken(access_token)
}


</script>
