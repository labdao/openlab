import { drive, db } from './_deta';

import { getTable, checkExistence, addRecord, flattenRecord, flattenTable } from "$utils/airfetch"

// 
// Server-side Examples
// 

// GET /deta
export const get = async () => {
  let res = await db.fetch();
  let allItems = res.items;

  // continue fetching until last is not seen
  while (res.last) {
    res = await db.fetch({}, { last: res.last });
    allItems = allItems.concat(res.items);
  }
  
  return {
    body: allItems,
  };
};


// POST /deta
// export const post = async ({request}) => {

//   const form = await request.formData(); // or .json(), or .text(), etc
//   const file = form.get('file')

//   let fileref 
//   if (file) {
//     const buffer = await file.arrayBuffer();
//     const uintarr = new Uint8Array(buffer)
//     // console.log('buff:', uintarr)
//     fileref = await drive.put(file.name, {
//       data: uintarr,
//     })
//   }

//   console.log('file ref?', fileref)
//   await db.put({
//     name: form.get('fname'),
//     filename: fileref,
//   })

//   console.log('uplaoded!!')
//   return {
//     body: {
//       result: "ok!"
//     },
//   };
// };


// post file to deta > upload to airtable > delete from deta
export const post = async ({request, url}) => {

  const headers = await request.headers
  console.log('request ::', request, url)

  const form = await request.formData(); // or .json(), or .text(), etc
  const file = form.get('file')

  let fileref 
  if (file) {
    const buffer = await file.arrayBuffer();
    const uintarr = new Uint8Array(buffer)
    
    // upload file
    fileref = await drive.put(file.name, {
      data: uintarr,
    })
  }

  // add entry to kv
  await db.put({
    name: form.get('fname'),
    filename: fileref,
  })
  
  console.log('file ref?', fileref, `${url.origin}/deta/file/${fileref}`)

  const record = await addRecord(
    'Test',
    { 
      // 'Attachments': [`/deta/file/${fileref}`],
      'Attachments': [{ url: `${url.origin}/deta/file/${fileref}`}],
      'Name': form.get('fname'),
    }, null,
    {
      insertOptions: ['typecast'], // lets you insert w/ name, but really powerful and lets you create new workflows by accident
    },
  )

  // delete the file from deta once it's uploaded
  // since uploading is async this needs to wait! Otherwise the upload won't go through
  // if(record) {
  //   await drive.delete(fileref)
  // }


  console.log('uplaoded!!')
  return {
    body: {
      result: "ok!"
    },
  };
};




