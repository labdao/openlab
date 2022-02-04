

import { writable, get } from 'svelte/store';

// prev: headMatter
// this uses svelte-seo schema
export let head = {
  baseUrl: import.meta.env.VITE_BASE_URL,
  title: "Sveltekit Starter",
  description: "This is a starter",
  url: "https://www.example.com/articles/article-title",
  // canonical: import.meta.env ? import.meta.env.VITE_SITE_URL : 'https://www.example.com', // breaks on vercel
  canonical: 'https://www.example.com',
  // tags: ["Tag A"]
  pageName: '',
  color: '#5432CA',
  twitter: "@yawnxyz",
  author: 'Jan Zheng',
  ico: '/favicon.ico',
  image: {
    url: "/pd_share.jpg",
    width: 850,
    height: 650,
    alt: "Alt text for the card!",
  },
  meta: [
    { hid: 'google-site-verification', name: 'google-site-verification', content: "FV3L35TjM9haadbuZvHLDz2n-I1KUbN_gYqM3cIH0Wk" },
  ],
}
head = { ...head,
  links: [
    { rel: 'icon', type: 'image/png', href: head.ico }, // <link rel="icon" sizes="192x192" href="/path/to/icon.png">
    { rel: 'apple-touch-icon', href: head.ico }, // default resolution is 192x192 <link rel="apple-touch-icon" href="/path/to/apple-touch-icon.png">
    { rel: 'mask-icon', href: head.ico, color: head.color }, // <link rel="mask-icon" href="/path/to/icon.svg" color="blue"> <!-- Safari Pinned Tab Icon -->
    // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    // { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@700&display=swap' },
  ]
}


export const Head = writable(head)

export const seo = {
  openGraph: {
    title: head.title,
    description: head.description,
    type: "website",
    url: head.url,
    // article: {
    //   publishedTime: "2020-08-03T17:31:37Z",
    //   modifiedTime: "2020-08-20T09:31:37Z",
    //   expirationTime: "2025-12-21T17:31:37Z",
    //   section: "Section II",
    //   authors: [
    //     "https://www.example.com/authors/@firstnameA-lastnameA",
    //     "https://www.example.com/authors/@firstnameB-lastnameB",
    //   ],
    //   tags: _head.tags,
    // },
    images: [
      head.image
      // {
      //   url: "https://www.example.com/images/cover.jpg",
      //   width: 850,
      //   height: 650,
      //   alt: "Og Image Alt",
      // },
    ],
  },
  twitter: {
    site: head.twitter,
    title: head.title,
    description: head.description,
    image: head.image.url,
    imageAlt: head.image.alt,
  }
};
