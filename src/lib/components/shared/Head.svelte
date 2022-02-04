
<script>
    import SvelteSeo from 'svelte-seo'
    import { head, seo } from '$lib/project/example/settings.js'

    export const title = ''
    export const description = ''

    export const ogUrl = ''
    // export let article = null
    export const twitter = {}

</script>

<SvelteSeo
  title={title ? `${head.title} | ${title}` : head.title }
  description={description || head.description}
  keywords={head.keywords}
  canonical={head.canonical + ''}
  openGraph={{
      ...seo.openGraph ,
      url: ogUrl || head.url + '',
      // type: article ? siteSeoOpenGraphArticle.type : siteSeoOpenGraphBase.type,
      // ...(article ? { article: {...siteSeoOpenGraphArticle.article, ...article} } : null) }}
  }}
  twitter= {twitter ? {...seo.twitter, ...twitter} : null}
/>

<svelte:head>
	{#if head }
		{#if head.meta}
			{#each head.meta as meta}
				<meta 
					charset={meta.charset}
					data-hid={meta.hid} 
					name={meta.name} 
					content={meta.content} 
					property={meta.property} 
				>
			{/each}
    {/if}
		{#if head.links}
			{#each head.links as link}
				<link data-hid={link.hid} rel={link.rel} href={link.href} crossorigin={link.crossorigin ? 'crossorigin' : ''}>
			{/each}
		{/if}
	{/if}
</svelte:head>
