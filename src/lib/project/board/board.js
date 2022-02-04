




/* 

  Shared Browser Helpers

*/


import { writable, get } from 'svelte/store';


export let getBounties = async () => {
  const res = await fetch(`/api/v0/bounties`);
  let json = await res.json();
  return json
}

export let getSubmissionsByBountyId = async (bountyId) => {
  const res = await fetch(`/api/v0/submissions?bountyId=${bountyId}`);
  let json = await res.json();
  return json
}