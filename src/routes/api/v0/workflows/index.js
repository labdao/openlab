import { getWorkflows } from '@lib/project/board/workflows';


// GET /workflows
// gets all workflows (job templates)
export const get = async () => {

  let data = await getWorkflows()
  return {
    body: data,
  };
};
