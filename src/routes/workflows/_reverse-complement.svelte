
<script context="module">
	import { enhance } from '$lib/form';

	export const load = async ({ fetch, url, params, session }) => {
    let paths = url.pathname.split('/')
    const slug = paths[paths.length-1]
		const res = await fetch(`/api/v0/workflows/${slug}`);

		if (res.ok) {
			const json = await res.json();
			return {
				props: { workflow: json }
			};
		}

		const { message } = await res.json();
		return {
			error: new Error(message)
		};
	};

</script>



<div class="_content">
  <h2 class="text-2xl font-bold">{workflow.Name}</h2>

  <div>
    {@html marked(workflow.Description ||'')}
  </div>

  {#if !bounty}
    <form
      class="new"
      method="post"
      on:submit={async (e)=>{
        handleSubmit(e)
        e.preventDefault()
        }}
    >

      <div class="mt-8 max-w-md">

        <div class="mb-4" >
          <label class="block">
            <span class="label">Requester</span>
            <input
              type="text"
              id="requester"
              name="requester"
              class="_input-text"
              bind:value={requester}
            >
          </label>
        </div>

        <div class="mb-4">
          <label class="block">
            <span class="label">Genetic Sequence</span>
            <textarea
              id="sequence"
              name="sequence"
              bind:value={sequence}
              class="_input-text"
              rows="6"
            ></textarea>
          </label>
        </div>

        <input type="submit" value="Get Reverse Complement" disabled="{isSubmitted}"
          class="p-4 mt-4 transition cursor-pointer rounded-md bg-blue-500 hover:ease-in ease-out hover:bg-blue-600 text-white disabled:bg-slate-100 disabled:cursor-not-allowed"
          >

        {#if isSubmitted}
          <span class="pl-4"><span class="_spinner"></span>Submitting bounty</span>
        {/if}

      </div>
    </form>
  {/if}

  {#if bounty}
    <div class="mt-16 block max-w-full">
      <Bounty {bounty} {Submissions} showLoadingSubmissions={isWaiting} showInput={true} showSubs={true} />
    </div>
  {/if}
</div>




<script>
  import JSON5 from 'json5'
  import {marked} from 'marked'

  import Bounty from '$lib/project/board/components/Bounty.svelte'
  import { checkForSubmissions } from '$lib/project/board/board'
  import { writable } from 'svelte/store'

  export let workflow, bounty, isSubmitted, isWaiting
  export let sequence=JSON5.parse(workflow.InputExample).sequence||'CATATTAC', requester='yawnxyz'
  export let Submissions = writable()

  async function createBounty() {
    console.log('Creating Bounty')

    // post new submission to board
    const bountyRes = await fetch(
      `/api/v0/bounties/create`, 
      {
        headers: {'Content-Type': 'application/json',},
        method: 'POST',
        body: JSON.stringify({
          Requester: requester,
          Input: {sequence: sequence},
          Workflows: ["Reverse Complement"],
        })
      })

    if(bountyRes.ok) {
      bounty = await bountyRes.json()
    }

    return true
  }


  async function pingEndpoint() {
    console.log('Pinging Endpoint:', workflow.Endpoint, bounty)
    // ping the endpoint to start doing async work, if it exists, w/ a GET request
    if(workflow.Endpoint) {
      const pingRes = await fetch(`${workflow.Endpoint}?bountyId=${bounty.id}`)
    }

    return true
  }


  async function handleSubmit(e) {
    try {

      isSubmitted = true
      isWaiting = true

      await createBounty()
      try {
        await pingEndpoint()
      } catch(e) {}

      // checkSubmission()
      checkForSubmissions(bounty.id, Submissions)

    } catch(err) {
      console.error('Request error:', err)
    }
}
</script>