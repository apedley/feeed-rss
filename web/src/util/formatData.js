
// import { Schema, arrayOf } from 'normalizr';
import _ from 'lodash';

import { normalize, schema } from 'normalizr';


const addUnreadCounts = (unreadCounts, feeds, categories ) => {
  
  const unreadInfo = unreadCounts.reduce(function(prev, curr, idx) {
    prev[curr.id] = curr.count;
    return prev;
  }, {});

  categories.forEach(category => {
    category.unread = unreadInfo[category.id] || 0;
  });

  feeds.forEach(feed => {
    feed.unread = unreadInfo[feed.id] || 0;

    feed.categories.forEach(category => {
      category.unread = unreadInfo[category.id] || 0;
    });
  });

}

  
export function createSubscriptions(feeds, categories, unreadCounts) {
  addUnreadCounts(unreadCounts, feeds, categories)

  feeds.forEach(feed => {
    feed.entries = [];
  })

  const subscriptions = normalizeFeeds(feeds, categories);
  return subscriptions.entities;

}

const normalizeFeeds = (feeds, categories) => {
  const categorySchema = new schema.Entity('categories');
  const categoryListSchema = new schema.Array(categorySchema);


  const feedSchema = new schema.Entity('feeds', {
    categories: categoryListSchema
  });

  const feedListSchema = new schema.Array(feedSchema); 

  const normalizedFeedlist = normalize(feeds, feedListSchema);
  const normalizedCategorylist = normalize(categories, categoryListSchema);
  return normalizedFeedlist;
  // return {
  //   entities: normalizedFeedlist.entities,
  //   categoryIds: normalizedCategorylist.result,
  //   feedIds: normalizedFeedlist.result
  // };
}