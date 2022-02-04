import { getSubmissionById } from '@lib/project/board/submissions';


// GET /submissions/id123
// gets a specific submission by ID
export const get = async ({ params }) => {
  let data = await getSubmissionById(params.id)
  return {
    body: data,
  };
};
