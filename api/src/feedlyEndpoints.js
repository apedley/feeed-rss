import mockResponses from './mockResponses.json';



const endpoint = (urlTemplate, mockResponseBody, method = 'GET') => ({
  urlTemplate,
  method,
  mockResponseBody,
  getUrl(id) {
    const regex = /:(\w+)/g;
    return this.urlTemplate.replace(regex, id);
  }
});

const endpoints = {
  categoryList: endpoint('/categories', mockResponses.responses.categoryList),
  unreadCount: endpoint('/markers/counts', mockResponses.responses.unreadCount),
  subscriptions: endpoint('/subscriptions', mockResponses.responses.subscriptions),
  streamContents: endpoint('/streams/:id/contents', null),
  entryContents: endpoint('/entries/:id', null),
  subscribe: endpoint('/subscriptions', null, 'POST')
}

export default endpoints;
