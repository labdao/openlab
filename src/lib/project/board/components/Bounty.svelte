<script>
  import {marked} from 'marked'
  import JSON5 from 'json5'

	export let bounty
  export let Submissions // writable
  export let showLoadingSubmissions = false
  export let showInput = false, showSubs = false, showSubShort = false
  let item = bounty

  // $: if(submissions) {
  //   console.log('submissions:', submissions)
  // }


  function jsonCleanStr(jsonStr) {
    return JSON.stringify(JSON5.parse(jsonStr),null,2)
  }

</script>


{#if bounty}
  <div class="_card p-2 mb-2">
    <div class="bounty">
      <div class="flex items-center ">
        <span class="_badge mr-4 {item.Status=='Open'?'bg-blue-600 text-white':'bg-green-600 text-white'}">{item.Status}</span>
        <span><a sveltekit:prefetch href="/bounties/{item.id}">{item.Requester || ''} - {item['Workflows:Name']}</a></span>
        {#if showSubShort && $Submissions && $Submissions.length > 0}
          <span class="ml-4 _badge bg-slate-200">{$Submissions.length} submission{#if $Submissions.length>0}s{/if}</span>
        {/if}
      </div>
      {#if showInput}
        <div class="mt-4">
          <label for="output" class="_form-label">Input</label>
          <textarea
            id="output"
            value={jsonCleanStr(item.Input)}
            class="_form-textarea font-mono"
            rows="6"
          ></textarea>
        </div>
      {/if}
    </div>

    {#if showLoadingSubmissions && !$Submissions}
      <div class="mt-8 mb-8 ">
        <div class="mx-auto flex items-center">
          <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
            <span class="visually-hidden">Waiting...</span>
          </div> <span class="pl-4">Waiting for submissions ... </span>
        </div>
      </div>
    {/if}
    
    {#if showSubs && $Submissions && $Submissions.length > 0}
      {#each $Submissions as sub, i}
        <div class="submission">
          <div>
            <h6 class="mt-0">Submission #{i+1}</h6>
          </div>
          <div class="grid gap-4 grid-cols-auto-1">
            <div >
              <div class="mb-4">
                <span class="label">Provider:</span><div class="text-sm p-1 bg-gray-100 font-mono rounded-md">{sub.Provider}</div>
              </div>
              <div class="mb-4">
                <span class="label">Notes:</span><div class="text-sm p-1 bg-slate-100 font-mono rounded-md">{@html marked.parseInline(sub.Notes||'')}</div>
              </div>
            </div>
            
            <div >
              <span class="label">Output</span>
              <textarea
                value={jsonCleanStr(sub.Output)}
                class="
                  w-full
                  font-mono
                  rounded-md
                  bg-gray-100
                  border-transparent
                  border-2 border-transparent
                  hover:border-blue-500 hover:border-2
                  focus:outline-none focus:ring-0
                "
                rows="6"
              ></textarea>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
{/if}