import { createSubmission } from '@lib/project/board/submissions'


// TESTING ONLY
// GET /submissions/create
export const get = async ({ params }) => {
  let data = await createSubmission({
    "Provider": 'reverse-complement-api',
    "Output": '{"output": "TAGACAT"}',
    "Bounties": ['1'],
    "Notes": "Test submission"
  })

  return {
    body: data,
  };
};



export const post = async ({ request }) => {
  const input = await request.json();
  let data = await createSubmission(input)

  return {
    body: data,
  };

};


// preflight
export const options = async ({ request }) => {
  return {
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept, X-Requested-With, Content-type',
    },
    body: "ok",
  };
};
