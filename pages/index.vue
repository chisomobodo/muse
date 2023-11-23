<template>
    <div class="text-white">
        <h1>Spotify Authorization</h1>
        <button @click="signInWithSpotify">Authorize with Spotify</button>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'auth'
})

const signInWithSpotify = async () => {
    try {
        const response = await fetch('/api/spotify-auth');
        const authorizationUrl = await response.text();
        location.href = authorizationUrl;
    } catch (error) {
        console.error('Error signing in with Spotify:', error);
    }
};

onMounted(() => {
    console.log("window?.localStorage?.getItem('accessToken')", window?.localStorage?.getItem('accessToken'))
})
</script>

