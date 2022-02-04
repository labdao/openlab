
<script>
  export let requester='0x123abc', input='CATGTAGACTAG', output, output_str

  async function handleSubmit(e) {
    console.log('Submitting request', input, requester)
    try {
      const response = await fetch(
        // 'https://reverse-complement-yawnxyz.vercel.app/api/reverse-complement', 
        // 'http://localhost:3000/api/reverse-complement', 
        '/api/reverse-complement', 
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            requester,
            input
          })
        })
      console.log('response:', response)
      if(response.status == 200) {
        output = await response.json()
        console.log('output', output)
        output_str = JSON.stringify(output,null,3)
        console.log('output', output, output_str)
      }

    } catch(err) {
      console.error('Request error:', err)
    }
  }
</script>

<section class="">
  <div class="text-gray-900 px-6">
    <form class="py-12"
    method="post"
    on:submit={async (e)=>{
      handleSubmit(e)
      e.preventDefault()
      }}>
      <h2 class="text-2xl font-bold">Reverse Complement Demo</h2>
      <div class="mt-8 max-w-md">
        <div class="grid grid-cols-1 gap-6">
          <label class="block">
            <span class="text-gray-700">Requester</span>
            <input
              type="text"
              bind:value={requester}
              class="
                mt-1
                block
                w-full
                rounded-md
                bg-gray-100
                border-transparent
                focus:bg-white focus:border-blue hover:border-blue-400
              "
              placeholder=""
            />
          </label>
          <label class="block">
            <span class="text-gray-700">Additional details</span>
            <textarea
              bind:value={input}
              class="
                mt-1
                block
                w-full
                rounded-md
                bg-gray-100
                border-transparent
                focus:bg-white focus:border-blue hover:border-blue-400
              "
              rows="3"
            ></textarea>
          </label>
        </div>
        <button class="p-4 mt-4 rounded-md bg-blue-600 hover:ease-in ease-out hover:bg-blue-500 text-white">Get Reverse Complement</button>
      </div>
    </form>

    {#if output}
      <div class="mb-4">
        File pinned at: <a class="underline text-blue" href="https://{output.pinres.cid}.ipfs.dweb.link/">{output.pinres.cid}</a>
      </div>
      <textarea
        bind:value={output_str}
        class="
          mt-1
          block
          w-full
          rounded-md
          bg-gray-100
          border-transparent
          focus:bg-white focus:border-blue hover:border-blue-400
        "
        rows="12"
      ></textarea>
    {/if}
  </div>
</section>

<style>

</style>
