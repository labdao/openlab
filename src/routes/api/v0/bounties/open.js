import { getOpenBounties } from '@lib/project/board/bounties';


// GET /bounties
// gets all bounties
export const get = async () => {

  let data = await getOpenBounties()
  return {
    body: data,
  };
};
