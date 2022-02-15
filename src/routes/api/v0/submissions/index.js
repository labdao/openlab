import { getSubmissions, getSubmissionsByBountyId, getSubmissionsByWorkflow } from '@lib/project/board/submissions';


// GET /submissions
// http://localhost:4502/api/v0/submissions?bountyId=recXJsb1mBSVlqbMA
// http://localhost:4502/api/v0/submissions?workflow=reverse-complement
//
// gets All submissions
// or - get a list of submissions by bountyId
export const get = async (request) => {

  let data
  const bountyId = request.url.searchParams.get('bountyId')
  const workflow = request.url.searchParams.get('workflow')

  if(bountyId)
    data = await getSubmissionsByBountyId(bountyId)
  else if (workflow)
    data = await getSubmissionsByWorkflow(workflow)
  else
    data = await getSubmissions()

  return {
    body: data,
  };
};

