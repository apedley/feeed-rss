import { makeRequest, handleApiError, getFeeds, getUnreadCounts  } from "../util/api";
import feedlyConfig from "../util/feedly";
import {
  LIST_FEEDS_FINISHED,
  LIST_FEEDS_LOADING,
  TOGGLE_FEEDS,
  SUBSCRIBING_TO_FEED,
  SUBSCRIBING_TO_FEED_FINISHED,
  SUBSCRIBING_TO_FEED_FAILED,
  LOAD_FEEDS_SUCCESS
} from "./types";



export function sendFeedError(error) {
  return (dispatch) => {
    debugger;
  }
}

export function getMarkers() {
  // return (dispatch, getState) => {
    return getUnreadCounts()
      // .then(markers => {
      //   debugger;
      // })
  // }
}


const loadFeedsSuccess = (feeds, unreadInfo) => ({
  type: LOAD_FEEDS_SUCCESS,
  feeds,
  unreadInfo
})

export function betterGetFeeds(unreadCounts) {
  return (dispatch, getState) => {
    return getFeeds()
      .then(feeds => {
        
        const unreadInfo = unreadCounts.reduce(function(prev, curr, idx) {
          prev[curr.id] = curr.count;
          return prev;
        }, {});

        feeds.forEach(feed =>{
          feed.unread = unreadInfo[feed.id] || 0;
        })


        dispatch(loadFeedsSuccess(feeds, unreadInfo))
      })

  }
}

export function getFeedsWithMarkers() {
  return (dispatch) => {
    return getMarkers().then(
      unreadCounts => dispatch(betterGetFeeds(unreadCounts)),
      error => dispatch(sendFeedError(error))
    )
  }
}

// export function getFeeds() {
//   let feeds = {};
//   return (dispatch, getState) => {
//     dispatch({
//       type: LIST_FEEDS_LOADING
//     });
//     makeRequest(feedlyConfig.resources.SUBSCRIPTIONS)
//       .then(response => {
//         feeds = response.data;

//         makeRequest(feedlyConfig.resources.UNREAD_COUNT)
//           .then(response => {
//             const unreadCounts = response.data.unreadcounts;
            
//             dispatch({
//               type: LIST_FEEDS_FINISHED,
//               payload: { feeds, unreadCounts }
//             });
//           })
//           .catch(err => {
//             handleApiError(err, dispatch);
//           });
//       })
//       .catch(err => {
//         handleApiError(err, dispatch);
//       });
//   };
// }

export function subscribe(feed) {
  
  return (dispatch, getState) => {

    dispatch({
      type: SUBSCRIBING_TO_FEED
    })
    makeRequest(feedlyConfig.resources.SUBSCRIBE, {
      id: feed.id
    }).then(response => {
      if (response.status === 200) {
        dispatch({
          type: SUBSCRIBING_TO_FEED_FINISHED,
          payload: response.data
        })
      } else {
        dispatch({
          type: SUBSCRIBING_TO_FEED_FAILED
        })
      }
    });
  };
}

export function toggleFeeds(categories, id) {
  categories.forEach(category => {
    if (category.id === id) {
      category.display = !category.display;
    }
  });

  return {
    type: TOGGLE_FEEDS,
    payload: categories
  };
}
