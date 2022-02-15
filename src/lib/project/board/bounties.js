
// import { cacheCheck, cacheSet } from "$utils/cache"
import hash from 'object-hash'
import { getTable, checkExistence, addRecord, flattenRecord, flattenTable, saveRecord } from "$utils/airfetch"


export const getBounties = async (view='Grid view') => {

  // const _cacheStr = `bounties-${view}`
  // if (cacheCheck(_cacheStr)) return cacheCheck(_cacheStr)

  // Keywords table
  let table = await getTable('Bounties', { view }, false)

  // let finalObj = {
  //   name: 'bounties',
  //   description: 'prototype; ',
  //   version: 'proto-0.0.1',
  //   data: flattenTable(table)
  // }
  // cacheSet(_cacheStr, finalObj, 60 * 10) // short cache
  // return finalObj
  return flattenTable(table)
}
  export const getOpenBounties = async () => {
    let data = await getBounties('Open Bounties')
    return data
  }

export const getBountyById = async (id) => {
  let record = await checkExistence(id, 'Bounties', 'id')
  return flattenRecord(record)
}

export const getLatestBountyBySlug = async (slug) => {
  // get all open bounies, then filter manually (Airtable filter can't get by view)
  let bounties = await getBounties('Open Bounties')
  let record
  // let record = await checkExistence(slug, 'Bounties', 'Workflows:Slug', 'Open Bounties')
  bounties.map(bounty=>{
    // if(bounty.Status == 'Open' && !record) {
    if(bounty.Status == 'Open' && !record && !bounty.Submissions) {
      record = bounty
      // break
    }
  })
  return record
}

export const getBountiesByWorkflow = async (slug) => {
  // get all open bounies, then filter manually (Airtable filter can't get by view)
  let bounties = await getBounties()
  let records = []

  bounties.map(sub => {
    if (sub['Workflows:Slug'] && sub['Workflows:Slug'].includes(slug)) {
      records.push(sub)
    }
  })
  return records
}





export const setBountyCompleteById = async (id) => {
  let record = await addRecord('Bounties', {Status: "Completed"}, id)
  return flattenRecord(record)
}



// create new if doesn't exist, overwrite otherwise
// export const patchSubmission = async (data, ) => {
export const createBounty = async (data) => {

  // let submitObject = {
  //   'Requester ID': data['requester_id'],
  //   'Settings': data['settings'],
  //   'Workflows': data['workflows'],
  //   'Files': data['files'],
  // }

  data["InputHash"] = hash(data.Input)
  let submitObject = data

  const record = await addRecord(
    'Bounties',
    submitObject, null,
    {
      insertOptions: ['typecast'], // lets you insert w/ name, but really powerful and lets you create new workflows by accident
    },
  )

  return record.fields
}


