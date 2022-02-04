
// use on server only

// https://web.deta.sh/home/yawnxyz/default/drives

import { Deta } from 'deta'


import { config } from "dotenv";
config(); // https://github.com/sveltejs/sapper/issues/122


// add your Project Key
export const _deta = Deta(process.env['DETA_KEY']);
// export const _deta = Deta(processs && process.env.DETA_KEY || "project key");















// examples

// 
// Drive — like dropbox for file storage
// https://docs.deta.sh/docs/drive/node_tutorial/
// 

// name your Drive
export const drive = _deta.Drive("testImages");
// await drive.put("svelte-welcome.png", { path: "/svelte-welcome.png" });



// 
// Base — like a simple JSON database
// 
export const db = _deta.Base('testDB');  // access your DB

// add your Project Key
/*
const deta = Deta("project key")
// name your DB
const db = deta.Base("humans")

// // use it!
db.put({
  name: "Geordi",
  title: "Chief Engineer",
  has_visor: true
})

// // call inside an async function ;)
const { items } = await db.fetch({
  has_visor: true
})

items.forEach(async (item) => {
  await db.delete(item.key)
})
*/