

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
          <label for="requester" class="_form-label">Requester</label>
          <input
            type="text"
            id="requester"
            name="requester"
            class="_form-input"
            bind:value={requester}
          >
        </div>

        <div class="mb-4">
          <label for="sequence" class="_form-label">Genetic Sequence</label>
          <textarea
            id="sequence"
            name="sequence"
            bind:value={sequence}
            class="_form-textarea"
            rows="6"
          ></textarea>
        </div>

        <input type="submit" value="Get Reverse Complement" disabled="{isSubmitted}"
          class="p-4 mt-4 transition cursor-pointer rounded-md bg-blue-500 hover:ease-in ease-out hover:bg-blue-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
          >

        {#if isSubmitted}
          <span class="pl-4"><span class="_spinner"></span>Submitting bounty</span>
        {/if}

      </div>
    </form>
  {/if}

  <!-- {#if bounty}
    <div class="mt-16 block max-w-full">
      <Bounty {bounty} {Submissions} showLoadingSubmissions={isWaiting} showInput={true} showSubs={true} />
    </div>
  {/if} -->
</div>




<script>
  import JSON5 from 'json5'
  import {marked} from 'marked'


  import Bounty from '$lib/project/board/components/Bounty.svelte'
  import { checkForSubmissions } from '$lib/project/board/board'
  import { writable } from 'svelte/store'
  import { goto } from '$app/navigation';

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
      console.log('Bounty created:', bounty)
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

        // instead of displaying the bounty here, route to a permanent bounty page
        goto(`/bounties/${bounty.id}`)
      } catch(e) {}

      // checkSubmission()
      // checkForSubmissions(bounty.id, Submissions)

    } catch(err) {
      console.error('Request error:', err)
    }
  }
</script>