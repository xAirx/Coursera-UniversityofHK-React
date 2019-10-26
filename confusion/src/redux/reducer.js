import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const initialState = {
  dishes: DISHES,
  comments: COMMENTS,
  promotions: PROMOTIONS,
  leaders: LEADERS,
};

/* So as you'll recall to generate the next state we need the current state and an action.
So, these are the two parameters my reducer function ixs going to receive,
and this as I said is a pure function,
and so I cannot modify the state directly here in the reducer,
I can only do an immutable change and
then return an updated version of the state from this reducer.
So, that is what the reducer functions job is.  */

/* We need to set up the reducer function because our store needs to
know what to do when an action is dispatched to it.
So that's the way we set up our reducer function.
 */

/*
So, what I'm going to do is I will make use of
the ES6 way of defining
functions where you can specify the default value for a parameter,
  and then I'll say,
state equals to initialState.
 */

/* Specifying default value for a parameter

 */

/* export const Reducer = (state = initialState, action) => {
    return state
}; */

export const Reducer = (state = initialState, action) => state;
