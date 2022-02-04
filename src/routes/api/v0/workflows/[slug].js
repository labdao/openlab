
import { getWorkflowBySlug } from '@lib/project/board/workflows';

// GET /workflows/reverse-complement
// gets a specific workflow by its slug (identifier)
export const get = async ({ params }) => {

  let data = await getWorkflowBySlug(params.slug)
  return {
    body: data,
  };
};
