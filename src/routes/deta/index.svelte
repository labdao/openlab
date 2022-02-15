<script context="module">
	import { enhance } from '$lib/form';

	// see https://kit.svelte.dev/docs#loading
	export const load = async ({ fetch }) => {
		const res = await fetch('/deta/api');

		if (res.ok) {
			const items = await res.json();

			return {
				props: { items }
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message)
		};
	};

</script>




<div class="_content">
	<h1>Deta Example</h1>

  <ul>
    {#each items as item}
    <li>Name: {item.name} - {item.filename}</li>
    {/each}
  </ul>

	<form
		class="new"
		action="/deta/api"
		method="post"
    enctype="multipart/form-data"
		use:enhance={{
			result: async (res, form) => {
        console.log('result ... ')
			}
		}}
	>
  <!-- enctype="multipart/form-data" -->

  <h3>form</h3>
  <label class="_form-label" for="fname">First name:</label><br>
  <input class="form-control _form-input mb-2" type="text" id="fname" name="fname" value="John">
  <input class="form-control _form-file mb-2" type="file" name="file">
  <input class="form-control _form-submit" type="submit" value="Submit">
	</form>
  


</div>


<script>

  import { browser } from '$app/env';
	export let items;

  console.log('items ::', items)

  export const load = async () => {
    // const res = await fetch('/deta/api')
    try {
      const res = await fetch(`/deta/api`, {
        // method: 'POST',
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          text: "hello!"
        })
      });

      // if (res.ok) {
      //   const result = await res.json();
      //   console.log('result?!?!?!:', result)
      // }
      // console.log('res:', res)

    } catch (e) {
      console.log('error:', e)
    }

  };

  // if(browser)
  //   load()

</script>