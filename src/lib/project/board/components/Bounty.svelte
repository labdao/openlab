<script>
  import {marked} from 'marked'
  import JSON5 from 'json5'

	export let bounty, submissions
  let item = bounty

  $: if(submissions) {
    console.log('submissions:', submissions)
  }
</script>


{#if bounty}
  <div class="_card p-2 mb-2">
    <div class="flex items-center">
      <span class="_badge mr-4 {item.Status=='Open'?'bg-green-500 text-white':'bg-blue-400'}">{item.Status}</span><span>{item.Requester || ''} - {item['Workflows:Name']}</span>
    </div>

    {#if submissions}
      {#each submissions as sub}
      <div class="grid gap-4 grid-cols-2">
        <div class="mt-8">
          <div class="mb-4">
            <p>Provider: </p><div class="text-sm p-1 bg-gray-100 font-mono rounded-md">{sub.Provider}</div>
          </div>
          <div class="mb-4">
            <p>Notes: </p><div class="text-sm p-1 bg-slate-100 font-mono rounded-md">{@html marked.parseInline(sub.Notes||'')}</div>
          </div>
        </div>
        <div class="mt-8">
          <p class="text-gray-700">Output</p>
          <textarea
            value={sub.Output}
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
            rows="12"
          ></textarea>
        </div>
      </div>
      {/each}
    {/if}
  </div>
{/if}