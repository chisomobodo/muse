<template lang="">
    <div class="w-full flex flex-col items-start gap-5 bg-gray-800 h-full p-4 max-sm:p-2 overflow-y-scroll">
        <!-- Playlist Title -->
        
        <div class="flex items-center justify-center w-full my-6">
            <span class="text-3xl font-sans">{{playList?.[0]?.track?.name}}</span>
        </div>

        <div class="w-[80%] max-sm:w-full mx-auto flex max-sm:flex-col gap-2 max-sm:gap-5">
            <!-- List -->
        <div class="w-[50%] max-sm:w-full h-[fit-content] flex flex-col gap-3 items-center border-r-2 border-gray-600">
            <!-- List Header -->
            <div class="w-full border-b-2 border-b-gray-400 py-2 flex justify-between items-center px-4 max-sm:px-1">
                <div class="text-gray-400 flex gap-2 max-sm:text-sm">
                    <span>#</span>
                    <span>Title</span>
                </div>

                <span class="text-gray-400 max-sm:text-sm">Plays</span>

                <div class="text-gray-400">
                    <IconDuration cls="w-[25px] h-[25px]" />
                </div>
            </div>
            <!-- List Header -->

            <!-- List Body -->
           
            <div v-if="playList?.[0]?.track?.playcount/1000000 !== 'NaN'" @click="selectSong()" class="w-full py-2 flex justify-between items-center px-4 max-sm:px-1 cursor-pointer hover:bg-gray-950 rounded-md">
               <div class="flex gap-2 text-gray-400">
                    <span class="max-sm:text-sm">1</span>

                    <div class="w-full flex max-sm:flex-col gap-3 max-sm:gap-1 justify-start items-center max-sm:items-start rounded-md  max-sm:p-1 cursor-pointer">
                    <div class="w-[50px] h-[50px] max-sm:w-[35px] max-sm:h-[35px] rounded-md overflow-hidden">
                        <img class="w-full h-full object-contain" :src="track?.album?.images?.[0]?.url" />
                    </div>
                    <div class="flex flex-col gap-3 max-sm:gap-1.5">
                        <span class="text-white max-sm:text-sm">{{playList?.[0]?.track?.name}}</span>
                        <div class="flex items-center gap-1">
                            <span v-for="artist in playList?.[0]?.track?.artists?.items" class="text-gray-400 text-sm">{{artist?.profile.name}}</span>
                        </div>
                    </div>
                </div>
               </div>

                <span class="text-gray-400 max-sm:text-sm">{{`${track?.popularity}`}}</span>

                <span class="text-gray-400 max-sm:text-sm">{{track?.duration_ms}}</span>
            </div>
            <!-- List Body -->
        </div>
        <!-- List -->

        <div class="w-[50%] max-sm:w-full rounded-lg bg-gray-950 border-[1px] border-gray-600 p-2">
            <LayoutPlayer v-if="track" :currentSong="track" />
        </div>
        </div>

        <!-- Section Footer -->
        <span class="text-gray-400 text-base lg:text-lg lg:font-semibold font-normal mt-1 mb-10 lg:mb-14 pb-2 text-center border-r-2 border-gray-600 w-full">&copy; 2023 Muse</span>
        <!-- Section Footer -->
    </div>
</template>
<script setup>
const track = ref('');
const playListImg = ref('');
const state = ref('pending');

const { id } = useRoute().params;
const trackId = id[0];


const fromatMilliSec = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedDuration = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} s`;
    return formattedDuration;
}

const getTrack = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    console.log('track.value', data)
    track.value = data;
}

const getPlayListImg = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    console.log('track.value', data)
    track.value = data;
}

onMounted(() => {
    getTrack();
    
})





</script>
<style lang="">

    
</style>