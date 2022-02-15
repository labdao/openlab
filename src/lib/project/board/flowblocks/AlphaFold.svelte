

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
          <label for="sequence" class="_form-label">Protein Sequence</label>
          <textarea
            id="sequence"
            name="sequence"
            bind:value={sequence}
            class="_form-textarea"
            rows="18"
          ></textarea>
        </div>

        <div class="mb-4" >
          <label for="maxDate" class="_form-label">Max Template Date</label>
          <input
            type="text"
            id="maxDate"
            name="maxDate"
            class="_form-input"
            bind:value={maxDate}
          >
        </div>

        <div class="mb-4" >
          <label for="weights" class="_form-label">Weights Download URL</label>
          <input
            type="text"
            id="weights"
            name="weights"
            class="_form-input"
            bind:value={weightsUrl}
          >
        </div>

        <div class="mb-4" >
          <label for="requester" class="_form-label">Prediction Mode</label>
          <!-- <input
            type="text"
            id="requester"
            name="requester"
            class="_form-input"
            bind:value={requester}
          > -->
          <div class="form-check">
            <input checked type="radio" name="monomer" id="monomer" value={"monomer"} bind:group={mode} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="monomer">
              monomer
            </label>
          </div>
          <div class="form-check">
            <input checked type="radio" name="monomer_single" id="monomer_single" value={"monomer_single"} bind:group={mode} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="monomer_single">
              monomer_single
            </label>
          </div>
          <div class="form-check">
            <input checked type="radio" name="monomer_casp14" id="monomer_casp14" value={"monomer_casp14"} bind:group={mode} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="monomer_casp14">
              monomer_casp14
            </label>
          </div>
          <div class="form-check">
            <input checked type="radio" name="monomer_ptm" id="monomer_ptm" value={"monomer_ptm"} bind:group={mode} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="monomer_ptm">
              monomer_ptm
            </label>
          </div>
          <div class="form-check">
            <input checked type="radio" name="monomer_ptm_single" id="monomer_ptm_single" value={"monomer_ptm_single"} bind:group={mode} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="monomer_ptm_single">
              monomer_ptm_single
            </label>
          </div>
          <div class="form-check">
            <input checked type="radio" name="multimer" id="multimer" value={"multimer"} bind:group={mode} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="multimer">
              multimer
            </label>
          </div>
          <div class="form-check">
            <input checked type="radio" name="multimer_single" id="multimer_single" value={"multimer_single"} bind:group={mode} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="multimer_single">
              multimer_single
            </label>
          </div>
        </div>
        
        {#if mode && mode.includes('multimer')}
          <div class="mb-4" >
            <div class="form-check form-switch">
              <input bind:value={isProk} style="background-size: auto" class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="isProk">
              <label class="form-check-label inline-block text-gray-800" for="isProk">Prokaryote prediction</label>
            </div>
          </div>
        {/if}

        <div class="mb-4" >
          <label for="requester" class="_form-label">Database Size</label>
          <div class="form-check">
            <input checked type="radio" name="full" id="full" value={"full"} bind:group={dbSize} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="full">
              full
            </label>
          </div>
          <div class="form-check">
            <input checked type="radio" name="reduced" id="reduced" value={"reduced"} bind:group={dbSize} class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" >
            <label class="form-check-label inline-block text-gray-800" for="reduced">
              reduced
            </label>
          </div>
        </div>

        <input type="submit" value="Get Alpha Fold" disabled="{isSubmitted}"
          class="p-4 mt-4 transition cursor-pointer rounded-md bg-blue-500 hover:ease-in ease-out hover:bg-blue-600 text-white disabled:bg-slate-300 disabled:cursor-not-allowed"
          >

        {#if isSubmitted}
          <span class="pl-4"><span class="_spinner"></span>Submitting bounty</span>
        {/if}

      </div>
    </form>
  {/if}

</div>




<script>
  import JSON5 from 'json5'
  import {marked} from 'marked'


  import Bounty from '$lib/project/board/components/Bounty.svelte'
  import { checkForSubmissions } from '$lib/project/board/board'
  import { writable } from 'svelte/store'
  import { goto } from '$app/navigation';

  export let workflow, bounty, isSubmitted, isWaiting
  export let sequence=JSON5.parse(workflow.InputExample).input.sequence, requester='yawnxyz', mode='monomer', dbSize='full', maxDate='2022-01-01', isProk=false
  export let weightsUrl = 'https://storage.googleapis.com/alphafold/alphafold_params_2021-10-27.tar'
  export let Submissions = writable()

  $: console.log('[Workflow]', workflow)


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
          Input: {
            sequence,
            input: {
              weights_download_url: weightsUrl,
              mode,
              db: dbSize,
              max_template_date: maxDate,
              is_prokaryote: isProk
            }
          },
          Workflows: workflow['Name'],
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