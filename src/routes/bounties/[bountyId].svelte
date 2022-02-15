
<script context="module">
  export const load = async ({ params, fetch }) => {
    const response = await fetch(`/api/v0/bounties/${params.bountyId}`)
    const items = await response.json()

    // const matchingPosts = posts
    //   .filter(post => post.meta.categories.includes(currentCategory))

    return {
      props: {
        bounty: items
      }
    }
  }
</script>




<div class="_content">

  {#if bounty}
    <div class="mt-16 block max-w-full">
      <Bounty {bounty} {Submissions} showLoadingSubmissions={isWaiting} showInput={true} showSubs={true} />
    </div>
  {/if}

</div>







<script>
  import JSON5 from 'json5'
  import {marked} from 'marked'
  import { writable } from 'svelte/store'
	import { browser, dev } from '$app/env';


  import Bounty from '$lib/project/board/components/Bounty.svelte'
  import { getSubmissionsByBountyId, checkForSubmissions } from '$lib/project/board/board'

  export let bounty, isWaiting
  export let Submissions = writable()

  if(browser)
    checkForSubmissions(bounty.id, Submissions)
  
</script>