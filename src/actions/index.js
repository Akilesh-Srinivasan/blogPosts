import _ from 'lodash';
import jsonPlaceholder from '../API/jsonPlaceholder';

// export const fetchPostsAndUsers = () => {
//     return async function(dispatch, getState) {
//         await dispatch(fetchPosts());
//        const userIds =  _.uniq(_.map(getState().posts, 'userId'));
//        userIds.forEach(id => dispatch(fetchUser(id)));
//     };
// };

// method to restrict unwanted network calls. Note => above method and below method are same

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
        await dispatch(fetchPosts());
       _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach((id) => dispatch(fetchUser(id)))
        .value();
    };

export const fetchPosts = () => {
// redux-thunk => action crators returns a function with args dispatch and getstate.
//dispatch function has power to change the data in our redux app.
//getState can access any data in the app.
    return async function(dispatch) {
        const response= await jsonPlaceholder.get('/posts');
        dispatch({ type: 'FETCH_POSTS', payload: response.data})
        };
};

export const fetchUser = (id) => {
        return async function(dispatch) {
            const response= await jsonPlaceholder.get(`/users/${id}`);
            dispatch({ type: 'FETCH_USER', payload: response.data})
            };
};

// another method of restricting unwanted network calls

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({ type: 'FETCH_USER', payload: response.data})
// });
