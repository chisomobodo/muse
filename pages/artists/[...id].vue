<template lang="">
    <!-- Desktop -->
    <div class="max-sm:flex-col w-[100vw] h-[100vh] flex gap-3 bg-black font-sans">
        <div class="w-full h-full">
            <img class="w-full h-full object-contain" :src="artist?.images?.[0]?.url" alt="">
        </div>

        <div class="w-full h-full text-white font-sans">

            <div class="w-[200px] h-[200px] grid grid-cols-2 grid-rows-2 border-[1px] border-gray-400 gap-[2px] bg-gray-400">
                <div class="col-span-1" v-for="img in artist?.images">
                    <img class="w-full h-full object-contain" :src="img?.url" alt="">
                </div>
            </div>

            <div class="text-2xl my-3">
                {{`${formatNumber(artist?.followers?.total) ?? ''} followers`}}
            </div>

            <div class="text-lg text-gray-400">
                {{`Has popularity rating of ${artist?.popularity ?? ''}`}}
            </div>
        </div>

        
    <!-- Desktop -->


    </div>
</template>
<script setup>
const artist = ref('');
const playListImg = ref('');
const state = ref('pending');

const { id } = useRoute()?.params;
const trackId = id[0];

function formatNumber(number) {
    const billion = 1e9;
    const million = 1e6;

    if (number >= billion) {
        return (number / billion)?.toFixed(2) + 'B';
    } else if (number >= million) {
        return (number / million)?.toFixed(2) + 'M';
    } else {
        return number?.toString();
    }
}


const getArtist = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await fetch(`https://api.spotify.com/v1/artists/${trackId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    console.log('track.value', data)
    artist.value = data;
}

onMounted(() => {   
    getArtist();

})
</script>
<style lang="">
    
</style>