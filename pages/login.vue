<template>
    <div class="bg-gray-800 min-h-screen flex items-center justify-center">
        <div class="text-white text-center">
            <h1 class="text-4xl font-bold mb-4">Muse Music Manager</h1>
            <button @click="signInWithSpotify"
                class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300">
                Sign in with Spotify
            </button>
        </div>
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

