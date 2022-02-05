
import { cacheCheck, cacheSet } from "$utils/cache"
import { getTable, checkExistence, flattenRecord, flattenTable } from "$utils/airfetch"


export const getWorkflows = async () => {

  // const _cacheStr = `workflows`
  // if (cacheCheck(_cacheStr)) return cacheCheck(_cacheStr)

  let table = await getTable('Workflows', { view: 'Published' }, false)

  // let finalObj = {
  //   name: 'workflows',
  //   description: 'prototype; add more workflows on Airtable for now; contact yawnxyz @ lab_dao discord',
  //   version: 'proto-0.0.1',
  //   data: flattenTable(table)
  // }
  // cacheSet(_cacheStr, finalObj, 60 * 60) // short cache
  // return finalObj
  return flattenTable(table)
}


export const getWorkflowBySlug = async (slug) => {
  let record = await checkExistence(slug, 'Workflows', 'Slug')
  return flattenRecord(record)
}
