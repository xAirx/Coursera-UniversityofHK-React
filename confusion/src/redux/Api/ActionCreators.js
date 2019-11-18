import axios from 'axios';
import jwtdecode from 'jwt-decode';
import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../../shared/baseUrl';
import setAuthToken from '../../utils/setAuthToken';
// Register User

export const registerLoading = () => ({
  type: ActionTypes.REGISTER_LOADING,
});

export const registerFailed = errmess => ({
  type: ActionTypes.REGISTER_FAILED,
  payload: errmess,
});

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      history.push('/login');
      dispatch(registerLoading());
    }) // re-direct to login on successful register
    .catch(err => dispatch(registerFailed()));
}; // Login - get user token

export const loginLoading = () => ({
  type: ActionTypes.LOGIN_LOADING,
});

export const loginFailed = errmess => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errmess,
});

export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwtdecode(token);
      // Set current user
      dispatch(setCurrentUser(decoded), loginLoading());
    })
    .catch(err => dispatch(loginFailed()));
}; // Set logged in user

export const setCurrentUser = decoded => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: decoded,
}); // User loading

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const addFeedback = feedback => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback,
});

export const postFeedback = (
  firstname,
  lastname,
  telnum,
  email,
  agree,
  contactType,
  message
) => dispatch => {
  const newFeedBack = {
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message,
  };
  newFeedBack.date = new Date().toISOString();

  return fetch(`${baseUrl}feedback`, {
    method: 'POST',
    body: JSON.stringify(newFeedBack),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addFeedback(response)))
    .catch(error => {
      console.log('post feedback', error.message);
      alert(`Your comment could not be posted\nError: ${error.message}`);
    });
};

// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading(true));

  return fetch(`${baseUrl}dishes`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};
// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
export const commentsFailed = errmess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});

export const addComment = comment => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
  const newComment = {
    dishId,
    rating,
    author,
    comment,
  };
  newComment.date = new Date().toISOString();
  console.log('WE ARE POSTING COMMENT FROM ACTIONCREATORS.js');
  return fetch(`${baseUrl}comments`, {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => {
      console.log('post comments', error.message);
      alert(`Your comment could not be posted\nError: ${error.message}`);
    });
};

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchComments = () => dispatch =>
  fetch(`${baseUrl}comments`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));

// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = errmess => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});

export const addPromos = promos => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

export const fetchPromos = () => dispatch => {
  dispatch(promosLoading());

  return fetch(`${baseUrl}promotions`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

// //////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = errmess => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess,
});

export const addLeaders = leaders => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading());

  return fetch(`${baseUrl}leaders`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

// //////////////////// Users/////////////////

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING,
});

export const usersFailed = errmess => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess,
});

export const addUsers = users => ({
  type: ActionTypes.ADD_USERS,
  payload: users,
});

export const fetchUsers = () => dispatch => {
  dispatch(usersLoading(true));

  return fetch(`${baseUrl}users`)
    .then(
      response => {
        if (response.ok) {
          return response;
        }
        const error = new Error(
          `Error ${response.status}: ${response.statusText}`
        );
        error.response = response;
        throw error;
      },
      error => {
        const errmess = new Error(error.message);
        throw errmess;
      }
    )
    .then(response => response.json())
    .then(users => dispatch(addUsers(users)))
    .catch(error => dispatch(usersFailed(error.message)));
};
