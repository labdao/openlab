

import JSON5 from 'json5'

import { cacheCheck, cacheSet } from "$utils/cache"
import { getTable, checkExistence, addRecord, flattenRecord, flattenTable } from "$utils/airfetch"
import { getBountyById, setBountyCompleteById } from "$lib/project/board/bounties"
import { getWorkflowBySlug } from "$lib/project/board/workflows"


export const getSubmissions = async () => {

  // const _cacheStr = `submissions`
  // if (cacheCheck(_cacheStr)) return cacheCheck(_cacheStr)

  // Keywords table
  let table = await getTable('Submissions', { view: 'Grid view' }, false)

  // let finalObj = {
  //   name: 'submissions',
  //   description: 'prototype; ',
  //   version: 'proto-0.0.1',
  //   data: flattenTable(table)
  // }
  // cacheSet(_cacheStr, finalObj, 60 * 60) // short cache
  // return finalObj
  return flattenTable(table)
}



export const getSubmissionById = async (id) => {
  let record = await checkExistence(id, 'Submissions', 'id')

  if(record)
    return flattenRecord(record)
}


export const getSubmissionsByBountyId = async (bountyId) => {
  // get all open bounies, then filter manually (Airtable filter can't get by view)
  let submissions = await getSubmissions()
  let records = []

  submissions.map(sub => {
    if (sub['Bounties:Id'] && sub['Bounties:Id'].includes(bountyId)) {
      records.push(sub)
    }
  })
  return records
}







// create new if doesn't exist, overwrite otherwise
// export const patchSubmission = async (data, ) => {
export const createSubmission = async (data) => {

  // let submitObject = {
  //   'Requester ID': data['requester_id'],
  //   'Settings': data['settings'],
  //   'Workflows': data['workflows'],
  //   'Files': data['files'],
  // }
  let submitObject = data

  const record = await addRecord(
    'Submissions',
    submitObject, null,
    {
      insertOptions: ['typecast'], // lets you insert w/ name, but really powerful and lets you create new workflows by accident
    },
  )

  // get the bounty
  // todo: process multiple bounties in the future
  let bounty = await getBountyById(record.fields['Bounties:Id'])

  // get the workflow
  let workflow = await getWorkflowBySlug(bounty['Workflows:Slug'])
  let workflowSettings

  if(workflow && workflow.Settings) {
    workflowSettings = JSON5.parse(workflow.Settings)
  }

  // if workflow is auto close, we close the bounty here
  if (workflowSettings.completeOnSubmission) {
    // close bounty
    setBountyCompleteById(bounty.id)
  }

  return record.fields
}


