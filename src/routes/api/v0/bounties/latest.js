import { getLatestBountyBySlug } from '@lib/project/board/bounties';


// GET /bounty/latest?workflow=reverse-complement
// gets a specific bounty by ID
export const get = async (request) => {
  const slug = request.url.searchParams.get('workflow')
  let data = await getLatestBountyBySlug(slug)
  console.log('request:', slug, data)
  return {
    body: data,
  };
};
