<script>
	import { onMount } from 'svelte';
  import { writable } from 'svelte/store'

  import { getBounties, getSubmissions } from '../board'
  import Bounty from './Bounty.svelte'

  import { getSubmissionsByBountyId } from '$lib/project/board/board'
	let _bounties, _submissions
  let submissions = []

	onMount(() => {
    _bounties = getBounties()
    _submissions = getSubmissions()

    _submissions.then(res => {
      submissions = res
    })
	});

  
</script>


{#await _bounties then bountyList}
  {#if bountyList && bountyList.length > 0}
    <div>
      {#each bountyList as item}
        <Bounty bounty={item} showSubShort={true}
          Submissions={writable(submissions.filter(s=>s['Bounties:Id']==item.id))} />
      {/each}
    </div>
  {/if}
{/await}