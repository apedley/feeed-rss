// {
//   "categoryList": "/categories",
//   "streamContents": "/v3/streams/:streamId/contents"
// }

export default {
  categoryList: () => { return '/categories'; },
  streamContents: (id) => {
    return `/streams/${id}/contents`;
  },
  subscriptions: () => { return '/subscriptions'},
  unreadCount: () => { return '/markers/counts'},
  entryContents: (id) => {
    return `/entries/${id}`
  }
}