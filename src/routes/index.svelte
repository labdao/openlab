
<script context="module">

	export const load = async ({ fetch }) => {
		const res = await fetch('/api/v0/workflows');

		if (res.ok) {
			const json = await res.json();
			return {
				props: { items: json }
			};
		}

		const { message } = await res.json();
		return {
			error: new Error(message)
		};
	};

</script>



<article class="_content">

  <h1>
    openLAB
  </h1>
  <p>
    The TaskRabbit for wet- and dry-labs across the world.
  </p>

  <h3>Workflows</h3>
  <div class="inline-grid gap-4 grid-cols-1 md:grid-cols-2">
    {#each items as item}
      <div class="_card p-4">
        <div class="font-bold text-lg">
          <a href="/workflows/{item.Slug}">{item.Name}</a>
        </div>
        {#if item && item.Status}
          <div class="_badge mb-2 {item.Status=='Active'?'bg-blue-600 text-white':'bg-gray-200'}">{item.Status}</div>
        {/if}
        {#if item && item.Short}
          <div class="">{@html marked.parseInline(item.Short||'')}</div>
        {/if}
      </div>
    {/each}
  </div>

  <h3>Bounties</h3>
  <BountyList />

</article>


<script>
  import { marked } from 'marked'  

  import BountyList from '$lib/project/board/components/BountyList.svelte'
	export let items;
</script>