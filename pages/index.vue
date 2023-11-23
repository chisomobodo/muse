<template lang="">
    <div class="w-full h-full overflow-y-scroll mt-10">
        <div class="w-full h-[35vh] border-[1px] border-gray-600">
            <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1666289186161-279be4bb6677?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        </div>

        <!-- <div class="fixed right-1 bottom-[3vh] w-[45%] h-[40vh] rounded-lg bg-gray-950 border-[1px] border-gray-600 p-2">
            <LayoutPlayer />
        </div> -->


        <div class="w-full h-[fit-content]">
            <LayoutSection :items="singlePlayLists?.items" title="Single Playlists" link="/playlists" :state="state"  />
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
// const items = ref([
//     {
//         track: {
//             name: 'Alexandra',
//             artists: [{
//                 name: 'Jcole',
//                 uri: 'link'
//             }],
//             album: {
//                 images: [
//                     {
//                         width: '',
//                         height: '',
//                         url: 'https://images.unsplash.com/photo-1666289186161-279be4bb6677?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//                     }
//                 ]
//             }
//         }
//     },
//     {
//         track: {
//             name: 'Alexandra',
//             artists: [{
//                 name: 'Jcole',
//                 uri: 'link'
//             }],
//             album: {
//                 images: [
//                     {
//                         width: '',
//                         height: '',
//                         url: 'https://images.unsplash.com/photo-1666289186161-279be4bb6677?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//                     }
//                 ]
//             }
//         }
//     },
//     {
//         track: {
//             name: 'Alexandra',
//             artists: [{
//                 name: 'Jcole',
//                 uri: 'link'
//             }],
//             album: {
//                 images: [
//                     {
//                         width: '',
//                         height: '',
//                         url: 'https://images.unsplash.com/photo-1666289186161-279be4bb6677?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
//                     }
//                 ]
//             }
//         }
//     },
// ])
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

// const getPlayLists = async () => {
//     const url = 'https://spotify81.p.rapidapi.com/playlist_tracks?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100';
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '7cfe79fb4cmsha97c9c0ea2a5ac4p1fd173jsn0f3c71c9c278',
//             'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
//         }
//     };

//     try {
//         state.value = 'loading';
//         const response = await fetch(url, options);
//         const result = await response.json();
//         singlePlayLists.value = result.items.filter(playList => {
//             return playList?.track?.album?.album_type === 'single';
//         })
//         albumPlayLists.value = result.items.filter(playList => {
//             return playList?.track?.album?.album_type === 'album';
//         })
//         popularAlbums.value = result.items
//             .filter(item => item?.track?.popularity >= 45)
//             .sort((a, b) => b?.track?.popularity - a?.track?.popularity);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         state.value = 'not-loading';
//     }
// }

const getAlbums = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await fetch('https://api.spotify.com/v1/albums?ids=382ObEPsp2rxGrnsizN5TX%2C1A2GTWGtFfWp7KSQTwWOyo%2C2noRn2Aes5aoNVsU6iWThc', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    albumPlayLists.value = {
        items: data?.albums?.[0]?.tracks?.items,
        image: data?.albums?.[0]?.images?.[0]?.url
    };
    // singlePlayLists.value = {
    //     items: data?.albums?.[1]?.tracks?.items,
    //     image: data?.albums?.[1]?.images?.[0]?.url
    // };
    popularAlbums.value = {
        items: data?.albums?.[2]?.tracks?.items,
        image: data?.albums?.[2]?.images?.[0]?.url
    };
   
    console.log('albumolaylists', popularAlbums.value);
}

onMounted(() => {
    getAlbums();
})


</script>
<style lang="">
    
</style>