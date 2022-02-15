import { getBounties, getBountiesByWorkflow } from '@lib/project/board/bounties';


// GET /bounties
// gets all bounties
export const get = async (request) => {

  let data
  const workflow = request.url.searchParams.get('workflow')

  if (workflow)
    data = await getBountiesByWorkflow(workflow)
  else
    data = await getBounties()

  return {
    body: data,
  };
};
