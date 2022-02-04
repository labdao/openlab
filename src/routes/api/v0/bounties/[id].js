import { getBountyById } from '@lib/project/board/bounties';


// GET /bounty/id123
// gets a specific bounty by ID
export const get = async ({ params }) => {
  let data = await getBountyById(params.id)
  return {
    body: data,
  };
};
