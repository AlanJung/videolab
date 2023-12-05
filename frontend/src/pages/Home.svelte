<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { api } from '../api';

export const videos = writable([])
let videoAtual = {
    title: '',
    embed_url: '    '
}
let textSearch = ''

const toEmbed = (url: string): string => {

    const regex = /[?&]v=([^?&]+)/;
    const match = url.match(regex);

    console.log(match)

    return match ? match[1] : ''
}

const allVideos = async () => {
    const videosAPI = await api.get('/videos')
    console.log(videosAPI)
    $videos = videosAPI.data
}

const searchVideo = async () => {
    if(!textSearch) {
        allVideos()
        return
    }

    const videosAPI = await api.get('/search?text=' + textSearch)
    console.log(videosAPI)
    $videos = videosAPI.data
}

onMount(async () => {
    await allVideos()
})

</script>

<div style="max-width:700px; margin: 24px auto;">
   
      
  <form class="flex items-center">
    <h1 class="mr-16 font-bold text-lg">VideoLab</h1>
    <div class="relative w-full">

      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path></svg
        >
      </div>
      <input
        type="text"
        id="voice-search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search Videos"
        bind:value={textSearch}
      />
      <button
        type="button"
        class="flex absolute inset-y-0 right-0 items-center pr-3"
      >
        <svg
          aria-hidden="true"
          class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
            clip-rule="evenodd"
          ></path></svg
        >
      </button>
    </div>
    <button
      type="submit"
      class="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      on:click={ async () => {
      await searchVideo()
    }}
      >
      <svg
        aria-hidden="true"
        class="mr-2 -ml-1 w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path></svg
      >Search
    </button>
  </form>

  
</div>

<div class="h-screen flex bg-gray-900 items-center justify-center">

    <div class="grid grid-cols-12 gap-2 gap-y-4 max-w-6xl">
        {#each $videos as video}
        <div class="col-span-12 sm:col-span-6 md:col-span-3">
            <card class="w-full flex flex-col">
              <div class="relative">
      
                <!-- Image Video -->
                <!-- svelte-ignore a11y-missing-attribute -->
                <a href="#">
                  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                  <!-- svelte-ignore a11y-click-events-have-key-events -->
                  <img src={video.image_url} class="w-96 h-auto" on:click={() => {
                    videoAtual = video
                    document.getElementById('myModal').showModal()
                  }} />
                </a>
      
                <p class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">1:15</p>
              </div>
      
              <div class="flex flex-row mt-2 gap-2">
      
             
                <!-- Description -->
                <div class="flex flex-col">
                  <a href="#">
                    <p class="text-gray-100 text-sm font-semibold">{video.title}</p>
                  </a>
                  
                  <p class="text-gray-400 text-xs mt-1">{new Date(video.created_at)}</p>
                </div>
      
              </div>
            </card>
          </div>
      
        {/each}
    </div>
  </div>

  <style>
    dialog[open] {
    animation: appear .15s cubic-bezier(0, 1.8, 1, 1.8);
  }
  
    dialog::backdrop {
      background: linear-gradient(45deg, rgba(0, 0, 0, 0.5), rgba(54, 54, 54, 0.5));
      backdrop-filter: blur(3px);
    }
    
   
  @keyframes appear {
    from {
      opacity: 0;
      transform: translateX(-3rem);
    }
  
    to {
      opacity: 1;
      transform: translateX(0);
    }
  } 
  </style>
  

  <dialog id="myModal" class="md:w-1/2 p-5  bg-white rounded-md ">
          
     <div class="flex flex-col w-full  ">
          <!-- Header -->
          <div class="flex w-full h-auto justify-center items-center">
            <div class="flex w-10/12 h-auto py-3 justify-center items-center text-2xl font-bold">
                  {videoAtual.title}
            </div>
            <div onclick="window.location.reload()" class="flex w-1/12 h-auto justify-center cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            <!--Header End-->
          </div>
            <!-- Modal Content-->
             <div class="flex w-full h-auto py-10 px-2 justify-center items-center bg-gray-200 rounded text-center text-gray-500">
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/` + toEmbed(videoAtual.embed_url)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <!-- End of Modal Content-->
            
            
            
          </div>
  </dialog>