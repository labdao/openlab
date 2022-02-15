import { drive, db } from '../_deta';
import {fileTypeFromBuffer} from 'file-type'

// 
// Server-side Examples
// 

// GET /deta
export const get = async (request) => {
  
  console.log('params:', request.params.name,)

  const name = request.params.name; //request.url.searchParams.get('name');
  const file = await drive.get(name);
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer)
  const type = await fileTypeFromBuffer(buffer)


  return {
    body: buffer, 
    headers: {
      'Content-Type': type.mime, // uncommenting headers makes Chrome show it
      // 'Content-Disposition': `attachment; filename="${file.name}"`, // downloads
      'Content-Disposition': `inline`, // shows in browser
    }
  };
};

