




/* 

  Shared Browser Helpers

*/


import { writable, get } from 'svelte/store';


export const getBounties = async () => {
  const res = await fetch(`/api/v0/bounties`);
  let json = await res.json();
  return json
}

export const getSubmissions = async () => {
  const res = await fetch(`/api/v0/submissions`);
  let json = await res.json();
  return json
}

export const getSubmissionsByBountyId = async (bountyId) => {
  const res = await fetch(`/api/v0/submissions?bountyId=${bountyId}`);
  let json = await res.json();
  return json
}


// pass submissions in as a svelte writable
export const checkForSubmissions = (bountyId, submissions, stopChecking=true, time=1000) => {
  const interval = setInterval(async function () {
    try {
      const response = await getSubmissionsByBountyId(bountyId)
      if (response && response.length > 0) {
        submissions.set(response)
        if (stopChecking)
          clearInterval(interval)
      } else {
        clearInterval(interval)
      }
    } catch(e) {
      console.log('check error:', e)
      clearInterval(interval)
    }
  }, time)
}