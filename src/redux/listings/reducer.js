import actions from './actions';

const initState = {
  listing: null,
  listings: null
};

export default function listingReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_LISTING:
      // console.log(action);
      return {
        ...state,
        loadingListing: true
      };
    case actions.SET_LISTING:
      // console.log(action);
      return {
        ...state,
        listing: action.listing,
        loadingListing: false
      };
    case actions.GET_USER_LISTINGS:
      // console.log(action);
      return {
        ...state,
        loadingListing: true
      };
    case actions.SET_USER_LISTINGS:
      // console.log(action);
      return {
        ...state,
        listings: action.listings,
        loadingListing: false
      };
    default:
      return state;
  }
}
