// // posts.json.js
// export const get = async () => {
//   const allPostFiles = import.meta.glob('../blog/*.md')
//   const iterablePostFiles = Object.entries(allPostFiles)

//   const allPosts = await Promise.all(
//     iterablePostFiles.map(async ([path, resolver]) => {
//       const data = await resolver()
//       const metadata = data.metadata
//       const postPath = path.slice(2, -3)

//       // console.log('data:::', data.default.render(), metadata)

//       return {
//         body: data.default.render(),
//         meta: metadata,
//         path: postPath,
//       }
//     })
//   )

//   const sortedPosts = allPosts.sort((a, b) => {
//     return new Date(b.meta.date) - new Date(a.meta.date)
//   })

//   return {
//     body: sortedPosts
//   }
// }