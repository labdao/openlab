
{#if Object.keys(components).includes(workflow.Blocktype)}
  <svelte:component
    this={components[workflow.Blocktype]} 
    {workflow}
  />
{:else}
  <div class="_content">
    <h2>Workflow component implementation not found</h2>
  </div>
{/if}

<!-- can nest blocks / renders, for the future (e.g. chained actions); borrowed from svelte-notion -->
<!-- {#if Object.keys(components).includes(block.type)}
  <svelte:component
    this={components[block.type]}
    {api}
    {blocks}
    {block}
    {fullPage}>
    {#if block.content}
      {#each block.content as subblock}
        {#if search(subblock, blocks)}
            <svelte:self
              {fullPage}
              {blocks}
              {api}
              block={search(subblock, blocks)} />
        {/if}
      {/each}
    {/if}
  </svelte:component>
{/if} -->

<!-- </div> -->
<script>
    import ReverseComplement from './flowblocks/ReverseComplement.svelte'
    import AlphaFold from './flowblocks/AlphaFold.svelte'

    export let workflow = {}

    const components = {
        'reverse-complement': ReverseComplement,
        'reverse-complement-localhost': ReverseComplement,
        'alphafold': AlphaFold,
        'alphafodl': AlphaFold,
    }

</script>
