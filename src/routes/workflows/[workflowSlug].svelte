
<script context="module">
	import { enhance } from '$lib/form';

	export const load = async ({ params, fetch }) => {
    // let paths = url.pathname.split('/')
    // const slug = paths[paths.length-1]
		// const res = await fetch(`/api/v0/workflows/${slug}`);
    const response = await fetch(`/api/v0/workflows/${params.workflowSlug}`)

		if (response.ok) {
			const json = await response.json();

			return {
				props: { 
          workflow: json,
          workflowSlug: params.workflowSlug,
        }
			};
		}

		const { message } = await response.json();
		return {
			error: new Error(message)
		};
	};

</script>


{#if workflow && workflow.Slug}
  <Render {workflow} />
{:else}
  <div class="_content">
    <h2>No workflow exists at "{workflowSlug}"</h2>
  </div>
{/if}



<script>
  import Render from '$lib/project/board/Render.svelte'

  import {browser} from '$app/env'

  export let workflow, workflowSlug

  
</script>