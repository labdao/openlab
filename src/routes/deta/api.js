import { drive, db } from './_deta';



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
export const post = async ({request}) => {

  const form = await request.formData(); // or .json(), or .text(), etc
  const file = form.get('file')

  let fileref 
  if (file) {
    const buffer = await file.arrayBuffer();
    const uintarr = new Uint8Array(buffer)
    // console.log('buff:', uintarr)
    fileref = await drive.put(file.name, {
      data: uintarr,
    })
  }

  console.log('file ref?', fileref)
  await db.put({
    name: form.get('fname'),
    filename: fileref,
  })

  console.log('uplaoded!!')
  return {
    body: {
      result: "ok!"
    },
  };
};






