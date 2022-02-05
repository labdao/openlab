/*

    airfetch.js

    - wrappers and helpers for cytosis

    last updated: 2/2/2022

*/

import Cytosis from 'cytosis';
import { cacheSet, cacheCheck } from "./cache"

import { config } from "dotenv";
config(); // https://github.com/sveltejs/sapper/issues/122



// NOTE: These need to be set @ the project-level .env
// these are the same across all projects - todo: use a settings object as a reference or something
const view = process.env.STATUS == 'Preview' ? "Preview" : "Published"
const apiEditorKey = process.env.AIRTABLE_PRIVATE_API
const baseId = process.env.AIRTABLE_PRIVATE_BASE








/* 

  getContent is meant to load + cache the basic site content
  - uses Airtable as CMS

  Cache Strategies
  process.env.CACHE:
  = Loader: use loader.js-loaded json files instead of airtable
  = Memory or blank: in-memory caching (on first visit; needs clearing sometimes)
  = NoCache: no in-memory caching at all

  Loader is an at-build mechanism to Airtable and Notion data into .json files
  TODO: Implement Loader using Evergreen / PGH:O code
  For Loader to work on Vercel, must override cmd to `npm run loadbuild`  

  "bases" defines what table to get what content from
  let bases = [{
    tables: ["Content"],
    options: {
      "view": view,
    }
  }, {
    tables: ["Schedule"],
    options: {
      "view": view,
    }
  }, {
    tables: ["Profiles"],
    options: {
      "view": view,
    }
  }, {
    tables: ["Events"],
    options: {
      "view": view,
    }
  }
  ]
*/


export const getContent = async (
  bases = [{
    tables: ['Content'],
    options: { 'view': view }
  }],
  jsonLocation = '../../../static/data/content.json'
) => {

  let content
  try {
    content = require(jsonLocation)
  } catch (err) { // do nothing if file doesn't exist // _err(err)
    console.error('content:', err)
  }

  console.log('[Content] Cache Mode:', process.env.CACHE)

  if (process.env.CACHE && process.env.CACHE == 'Loader' && content) {
    console.log('[Content] -- Loader Mode')
    // TODO: create Notion + Airtable compatible return schema; as a wrapper
    return content // json file should be in form of cytosis.results  
  } else {
    console.log('[Content] Using Airtable as CMS')
  }

  // TODO: get from Notion?

  return await getTables(bases)
}














// check if a field (e.g. email) exists in the Email field in a specified
// for not adding duplicates
export const checkExistence = async (keyword, tableName, fieldName = "Email") => {
  const _cache = `checkExistence-${keyword}-${tableName}-${fieldName}`
  if (cacheCheck(_cache)) return cacheCheck(_cache)

  const cytosis = await new Cytosis({
    apiKey: apiEditorKey,
    baseId: baseId,
    bases: [
      {
        tables: [tableName],
        options: {
          "maxRecords": 1,
          keyword: `${keyword}`,
          matchKeywordWithField: fieldName,
          matchStyle: 'exact',
        }
      },
    ],
    routeDetails: '[api/getters/checkExistence]',
  })
  if (cytosis.results[tableName].length > 0) {
    const record = cytosis.results[tableName][0]
    cacheSet(_cache, record) // short cache to pings
    return record
  }
  return null
}




// let kw = await getTable('Keywords', { view: 'Sorted' })
export const getTable = async (tableName, options, useCache=true) => {
  const _cache = `getTable-${tableName}-${JSON.stringify(options)}`
  if (useCache && cacheCheck(_cache)) return cacheCheck(_cache)

  const cytosis = await new Cytosis({
    apiKey: apiEditorKey,
    baseId: baseId,
    bases: [
      {
        tables: [tableName],
        options
      },
    ],
    routeDetails: '[api/getters/getTable]',
  })

  cacheSet(_cache, cytosis.results[tableName]) // short cache to pings
  return cytosis.results[tableName]
}




// TODO: getTables which takes bases[] definitions
/* 
  note: "bases" should really be "tables"

  let bases = [{
      tables: ["Content"],
      options: {
        "view": view,
      }
    }, {
      tables: ["Schedule"],
      options: {
        "view": view,
      }
    }, {
      tables: ["Profiles"],
      options: {
        "view": view,
      }
    }, {
      tables: ["Events"],
      options: {
        "view": view,
      }
    }
  ]

  let tables = getTables(bases)

  return value is an Object with table names as Keys
*/
const getTables = async (bases = [{
  tables: ['Content'],
  options: { 'view': view }
}]) => {

  const _cache = `getTables-${view}-${JSON.stringify(bases)}`
  if (cacheCheck(_cache)) return cacheCheck(_cache)

  let _result = await new Cytosis({
    apiKey: apiEditorKey,
    baseId: baseId,
    bases: bases,
    routeDetails: '[airfetch/getTables]',
  })

  cacheSet(_cache, _result.results)

  return _result.results
}





// tableName: name of table
/* examples of Payload (partial/translation of the data obj)

  ** if recordId given, will overwrite existing record instead! 

  payload: {
    'Message': data['comment'],
    'Attendee': data['recordId'] ? [data['recordId']] : null,
  }

  payload: {
    'Name': data['name'],
    'Type': data['questiontype'],
    'Topic': data['topic'],
    'Email': data['email'],
    'Question': data['comment'], 
    'Attendee': data['recordId'] ? [data['recordId']] : null,
  }

*/
export const addRecord = async (tableName, payload, recordId = null, tableOptions) => {
  const cytosis = await Cytosis.save({
    apiKey: apiEditorKey,
    baseId: baseId,
    tableName: tableName,
    recordId,
    tableOptions,
    payload
  })

  return cytosis
}

// if record exists (based on the keyword and field name), add to existing one, otherwise create a new
export const saveRecord = async ({ keyword, fieldName }, tableName, payload, tableOptions = { insertOptions: ['typecast'] }) => {

  let cytosis, recordId
  let existing = await checkExistence(keyword, tableName, fieldName)
  if (existing) {
    recordId = existing.id
  }

  cytosis = addRecord(tableName, payload, recordId, tableOptions)

  return cytosis
}




// takes a cytosis.results['table'] and flattens the '.fields' into the objects. Keeps .id (can get)
export const flattenTable = (table) => {
  let newtable = []
  // clean up the cytosis table by only keeping id, fields, and basics of _table
  table.map(record => {
    newtable.push(flattenRecord(record))
  })
  return newtable
}

export const flattenRecord = (record) => {
  if(record)
    return {
      ...record.fields,
      id: record.id,
    }
  return record
}