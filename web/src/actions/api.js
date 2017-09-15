import {
  TOGGLE_FEEDS
} from './types'
import axios from 'axios';

// export function makeFeedlyRequest(resource, loadingType = FEEDLY_REQUEST_LOADING, finishedType = FEEDLY_REQUEST_FINISHED, errorType = FEEDLY_REQUEST_FAILED) {
//   return (dispatch, getState) => {
//     dispatch({
//       type: loadingType
//     });
//     const token = localStorage.getItem('access_token');
//     const url = `http://localhost:8080/request?feedlyResource=${resource}&token=${token}`;

//     axios.get(url)
//       .then(resp => resp.data)
//       .then(results => {
//         const data = {
//           type: finishedType,
//           payload: results,
//           resource: resource
//         }
//         dispatch(data)
//       })
//       .catch(err => {
//         console.error(err);
//         dispatch({
//           type: errorType,
//           payload: err,
//           error: true
//         })
//       })
//   }
// }

export function makeRequest(resource, fetchId) {
  const token = localStorage.getItem('access_token');
  let url = `http://localhost:8080/request?feedlyResource=${resource}&token=${token}`;
  if (fetchId) {
    url = `${url}&fetchId=${fetchId}`;
  }
  return axios.get(url);
}
// export function toggleCategoryVisibility(categoryId) {
//   return {
//     type: TOGGLE_FEEDS,
//     id: categoryId
//   }
// }