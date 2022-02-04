import { drive, db } from '../_deta';

import { Blob } from 'node:buffer';


// 
// Server-side Examples
// 

// GET /deta
export const get = async (request) => {
  
  console.log('params:', request.params.name,)

  const name = request.params.name; //request.url.searchParams.get('name');
  const file = await drive.get(name);
  const buffer = await file.arrayBuffer();
  // const blob = new Blob([new Uint8Array(buffer)]);
  const uint = new Uint8Array(file.data)


  return {
    body: Buffer.from(buffer),
    // body: uint,
    headers: {
      // 'Content-Disposition': `attachment; filename="${file.name}"`,
      'Content-Type': file.type
    }
    // body: Buffer.from(buffer),
    // body: blob
  };
};




