<template lang="">
    <div class="flex flex-col gap-5 px-4 py-3">
        <div class="flex justify-between items-center">
            <div class="text-white font-bold text-lg">{{title}}</div>
        </div>

        <div class="w-full flex gap-3 overflow-x-scroll py-2">
            <div v-if="items && state !== 'loading'" :class="`w-[${items?.length}%] flex gap-2`">
                
               <LayoutArtistItem v-for="item in items" :item="item" :link="link" />
                
            </div>
            <div v-if="state === 'loading'" class=" w-full h-[100px] flex items-center justify-center">
                <IconLoader />
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['title', 'link', 'items', 'state']);
const router = useRouter();

</script>