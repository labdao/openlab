<!-- <script context="module">
  export const load = ({ url }) => {
    const currentRoute = url.pathname

    return {
      props: {
        currentRoute
      }
    }
  }
</script> -->


<script>
  import { fade } from 'svelte/transition'
  import Head from '$lib/components/shared/Head.svelte'
	import Header from '$lib/layouts/Header.svelte'
	import Footer from '$lib/layouts/Footer.svelte'
	import '../app.scss'

  import { page } from '$app/stores';
  export let currentRoute = $page.pathname || ''
</script>

<Head />
<Header />

{#key currentRoute}
  <!-- <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}> -->
  <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150, delay: 150 }}>
    <slot />
  </main>
{/key}

<Footer />
