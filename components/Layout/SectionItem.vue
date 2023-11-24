<template lang="">
    <nuxt-link :to="`${BASE}${link}/${item?.id}`" class="item-container flex flex-col gap-2 rounded-md hover:bg-gray-950 bg-gray-900 p-3 pb-1 w-[13rem] h-[17rem] cursor-pointer max-sm:hidden playlist-container--desktop">
                    <!-- Item poster -->
                    <div :class="`w-[${item?.track?.album?.images[0]?.width ?? '100%'} h-[${item?.track?.album?.images[0]?.width ?? '100%'} flex-[0.95] rounded-md overflow-hidden relative`">
                        <img class="w-full h-full object-cover" :src="trackImg" />
                        <!-- Video icon -->
                        <div class="play-btn-container absolute z-10 bottom-2 right-2 cursor-pointer text-gray-400 playlist-play-icon--desktop">
                            <IconPlay cls="w-[50px] h-[50px] active:w-[45px] active:h-[45px]" />
                        </div>
                    </div>

                    <!-- Item description -->
                    <div class="flex flex-col gap-2 max-sm:hidden">
                        <span class="text-gray-200">{{item?.name}}</span>
                        <div class="flex gap-1 items-center">
                            <nuxt-link v-for="artist in item?.artists" :to="`/artist/${artist.uri}`" class="text-gray-400 text-xs">{{artist?.name}}</nuxt-link>
                        </div>
                    </div>
    </nuxt-link>
    <!-- Mobile -->
                <nuxt-link :to="`${BASE}${link}/${item?.track?.album?.id}`" v-for="item in items" class="item-container lg:hidden rounded-md hover:bg-gray-950 bg-gray-900 p-0 w-[13rem] h-[14rem] overflow-hidden playlist-container--mobile">
                    <!-- Item poster -->
                    <div class="w-full h-full rounded-md overflow-hidden relative">
                        <img class="w-full h-full object-cover" :src="trackImg" />
                        <!-- Video icon -->
                        <div class="play-btn-container absolute bottom-2 right-2 cursor-pointer text-gray-400 playlist-play-icon--mobile">
                            <IconPlay cls="w-[50px] h-[50px] active:w-[45px] active:h-[45px]" />
                        </div>
                        <!-- Item description -->
                        <div class="flex flex-col gap-2 absolute bottom-2 left-2 playlist-desc--mobile">
                            <span class="text-gray-200">{{item?.track?.name}}</span>
                        <div class="flex gap-1 items-center">
                            <nuxt-link v-for="artist in item?.track?.artists" :to="`/artist/${artist.uri}`" class="text-gray-400 text-xs">{{artist?.name}}</nuxt-link>
                        </div>
                        </div>
                    </div>
                </nuxt-link>
                <!-- Mobile -->
</template>
<script setup>
const props = defineProps(['link', 'item']);
const trackImg = ref('');

const BASE = ref('');
https://api.spotify.com/v1/tracks/3YYnfKM02WkygOwg6ozfrL

onBeforeMount(() => {
    BASE.value = 'https://muse-puce.vercel.app';
})

onMounted(() => {
    getTrackImg();
})

const getTrackImg = async () => {
    const accessToken = localStorage.getItem('accessToken') || '';
    const res = await fetch(`https://api.spotify.com/v1/tracks/${props?.item?.id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    const data = await res.json();
    // console.log('data', data)
    const url = data?.album?.images?.[0]?.url;
    // console.log('url', url);
    trackImg.value = url;
}

</script>
<style lang="">
    
</style>
