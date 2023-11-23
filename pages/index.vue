<template lang="">
    <div class="w-full h-full overflow-y-scroll mt-10">
        <div class="w-full h-[35vh] border-[1px] border-gray-600">
            <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1666289186161-279be4bb6677?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        </div>

        <div class="w-full h-[50vh]">
            <LayoutArtist :items="popularArtists" title="Popular Artists" link="/artists" :state="state"  />
        </div>
        <div class="w-full h-[fit-content]">
            <LayoutSection :items="popularAlbums?.items" title="Popular Albums" link="/playlists" :state="state"  />
        </div>
        <div class="w-full h-[fit-content]">
            <LayoutSection :items="albumPlayLists?.items" title="Album Playlists" link="/playlists" :state="state"  />
        </div>
    </div>
</template>
<script setup>

import { useAccessToken } from '~/composables/index';
import { useFetch } from '~/composables/index';
const router = useRouter();

const state = ref('pending');
const singlePlayLists = ref(null);
const albumPlayLists = ref(null);
const popularAlbums = ref(null);
const popularArtists = ref(null);

onBeforeMount(() => {
    if (!localStorage.getItem('accessToken')) {
        const router = useRouter();
        router.push('/login');
    }
})


const getAlbums = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    state.value = 'loading';
    const res = await fetch('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    state.value = 'not-loading';
    albumPlayLists.value = {
        items: data?.albums?.[0]?.tracks?.items,
        image: data?.albums?.[0]?.images?.[0]?.url
    };
    popularAlbums.value = {
        items: data?.albums?.[2]?.tracks?.items.sort((a, b) => a.track_number > a.track_number),
        image: data?.albums?.[2]?.images?.[0]?.url
    };
}

const getArtists = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    state.value = 'loading';
    const res = await fetch('https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    state.value = 'not-loading';
    popularArtists.value = data.artists;
    console.log('artists', popularArtists.value);
}


onMounted(() => {
    getAlbums();
    getArtists();
    
})


</script>
<style lang="">
    
</style>