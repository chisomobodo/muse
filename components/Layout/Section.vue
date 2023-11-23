<template lang="">
    <div class="flex flex-col gap-5 px-4 py-3">
        <div class="flex justify-between items-center">
            <div class="text-white font-bold text-lg">{{title}}</div>
            <!-- <nuxt-link class="text-gray-400 font-normal text-md border-b-2 border-transparent hover:border-white" :to="link">VIEW ALL</nuxt-link> -->
        </div>

        <div class="w-full flex gap-3 overflow-x-scroll py-2">
            <div v-if="items && state !== 'loading'" :class="`w-[${items?.length}%] flex gap-2`">
                <!-- Desktop -->
               <LayoutSectionItem v-for="item in items" :item="item" :link="link" />
                <!-- Desktop -->

                
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



const goto = (to, query) => {
    console.log('to', to, 'query', query);
    navigateTo({
        path: to,
        query: {
           query
        }
    })
}

const navigateTo = (where) => {
    router.push(where);
}
</script>
<style lang="css" scoped>
    .playlist-play-icon--desktop {
        opacity: 0;
        transition: 0.25s linear all;
   }

   .playlist-container--desktop:hover .playlist-play-icon--desktop {
        opacity: 1;
   }
</style>
<!-- https://media.istockphoto.com/id/1428972357/photo/404-error-isolated-on-white-background-page-not-found.jpg?s=612x612&w=0&k=20&c=t5mB3cldfjEyU6T3J9UoHlJj2vxcCvVpbPlnqDsXUqU= -->