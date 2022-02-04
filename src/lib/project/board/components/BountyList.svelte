<script>
	import { onMount } from 'svelte';
  import { getBounties } from '../board'
  import Bounty from './Bounty.svelte'

	export let bounties = [];

	onMount(async () => {
    bounties = await getBounties()
	});

  $:console.log('bounties:', bounties)
</script>


{#if bounties}
  <div>
    {#each bounties as item}
      <Bounty bounty={item} />
    {/each}
  </div>
{/if}