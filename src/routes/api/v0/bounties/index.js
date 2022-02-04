import { getBounties } from '@lib/project/board/bounties';


// GET /bounties
// gets all bounties
export const get = async () => {

  let data = await getBounties()
  return {
    body: data,
  };
};
