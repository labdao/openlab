import { createBounty } from '@lib/project/board/bounties';


// TESTING ONLY
// GET /submissions/create
export const get = async ({ params }) => {
  let data = await createBounty({
    "Requester": 'yawnxyz',
    "Input": '{"sequence": "TAGACAT"}', 
    "Workflows": ["Reverse Complement"],
    "Status": "Open",
  })

  return {
    body: data,
  };
};




export const post = async ({ request }) => {
  const input = await request.json(); 
  input['Status'] = 'Open'
  let data = await createBounty(input)

  return {
    body: data,
  };

};

