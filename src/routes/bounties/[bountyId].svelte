
<script context="module">
  export const load = async ({ params, fetch }) => {
    const currentCategory = params.category
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

  import Bounty from '$lib/project/board/components/Bounty.svelte'
  import { getSubmissionsByBountyId, checkForSubmissions } from '$lib/project/board/board'

  export let workflow, bounty, isWaiting
  export let Submissions = writable()




  async function pingEndpoint() {
    console.log('Pinging Endpoint:', workflow.Endpoint, bounty)
    // ping the endpoint to start doing async work, if it exists, w/ a GET request
    if(workflow.Endpoint) {
      const pingRes = await fetch(`${workflow.Endpoint}?bountyId=${bounty.id}`)
    }

    return true
  }

  checkForSubmissions(bounty.id, Submissions)
  
</script>