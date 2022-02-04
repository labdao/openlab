
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

	<form
		class="new"
		method="post"
    on:submit={async (e)=>{
      handleSubmit(e)
      e.preventDefault()
      }}
	>

    <div class="mt-8 max-w-md">
      <div class="grid grid-cols-1 gap-6">
        <label class="block">
          <span class="text-gray-700">Genetic Sequence</span>
          <textarea
            id="sequence"
            name="sequence"
            bind:value={sequence}
            class="_input-text"
            rows="3"
          ></textarea>
        </label>
      </div>
      <input type="submit" value="Get Reverse Complement"
        class="p-4 mt-4 transition cursor-pointer rounded-md bg-blue-500 hover:ease-in ease-out hover:bg-blue-600 text-white"
        >
    </div>
  </form>

  {#if result}

  <div class="mt-16 block max-w-md">
    <p class="text-gray-700">Reverse Complement</p>
    <textarea
      bind:value={resultStr}
      class="
        w-full
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
  {/if}
</div>





<script>
  import JSON5 from 'json5'
  import {marked} from 'marked'

  export let workflow
  export let result = '', resultStr
  $: if(result) {
    resultStr = JSON.stringify(result,null,3)
  }

  export let sequence = JSON5.parse(workflow.InputExample).sequence||'CATATTAC'


  async function handleSubmit(e) {
    console.log('Submitting request', sequence)
    try {
      const res = await fetch(
        workflow.Endpoint, 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            sequence
          })
        })

      if(res.ok) {
        result = await res.json()
      }

    } catch(err) {
      console.error('Request error:', err)
    }
  }
</script>