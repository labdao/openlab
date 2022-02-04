import { getSubmissions, getSubmissionsByBountyId } from '@lib/project/board/submissions';


// GET /submissions
// http://localhost:4502/api/v0/submissions?bountyId=recXJsb1mBSVlqbMA
//
// gets All submissions
// or - get a list of submissions by bountyId
export const get = async (request) => {

  let data
  const bountyId = request.url.searchParams.get('bountyId')

  if(bountyId)
    data = await getSubmissionsByBountyId(bountyId)
  else
    data = await getSubmissions()

  return {
    body: data,
  };
};

