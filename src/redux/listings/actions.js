const listingsAction = {
  GET_LISTING: 'GET_LISTING',
  SET_LISTING: 'SET_LISTING',
  GET_USER_LISTINGS: 'GET_USER_LISTINGS',
  SET_USER_LISTINGS: 'SET_USER_LISTINGS',
  getListing: (id) => {
    console.log("Loading listing: " + id);
    return {
      type: listingsAction.GET_LISTING,
      id: id
    };
  },
  getUserListings: () => {
    console.log("Loading user listings");
    return {
      type: listingsAction.GET_USER_LISTINGS
    };
  },

};
export default listingsAction;
