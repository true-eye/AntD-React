const settingsAction = {
  GET_PLANS: 'GET_PLANS',
  SET_PLANS: 'SET_PLANS',
  GET_BILLING: 'GET_BILLING',
  SET_BILLING: 'SET_BILLING',
  BILLING_ERROR: 'BILLING_ERROR',
  CHANGE_SETTING: 'CHANGE_SETTING',
  UPDATE_PLAN: 'UPDATE_PLAN',
  ADD_BILLING: 'ADD_BILLING',
  SAVE_USER_PROFILE: 'SAVE_USER_PROFILE',
  SAVE_USER_PROFILE_SUCCESS: 'SAVE_USER_PROFILE_SUCCESS',
  SAVE_USER_PROFILE_ERROR: 'SAVE_USER_PROFILE_ERROR',
  TOGGLE_PROPERTY_MODAL: 'TOGGLE_PROPERTY_MODAL',
  TOGGLE_PROPERTY_EDIT_MODAL: 'TOGGLE_PROPERTY_EDIT_MODAL',
  TOGGLE_LISTING_MODAL: 'TOGGLE_LISTING_MODAL',
  TOGGLE_CONTACT_MODAL: 'TOGGLE_CONTACT_MODAL',
  FIND_LISTING: 'FIND_LISTING',
  SET_FOUND_LISTING: 'SET_FOUND_LISTING',
  SEND_CONTACT_MAIL: 'SEND_CONTACT_MAIL',
  SEND_CONTACT_ERROR: 'SEND_CONTACT_ERROR',
  PROPERTY_FORM_UPDATE: 'PROPERTY_FORM_UPDATE',
  CONTACT_FORM_UPDATE: 'CONTACT_FORM_UPDATE',
  USER_FORM_UPDATE: 'USER_FORM_UPDATE',
  ADD_PROPERTY: 'ADD_PROPERTY',
  PROPERTY_ADDED: 'PROPERTY_ADDED',
  SET_DEFAULT_LISTING: 'SET_DEFAULT_LISTING',
  DEFAULT_LISTING_ADDED: 'DEFAULT_LISTING_ADDED',
  INVALID_PROPERTY: 'INVALID_PROPERTY',
  PLAN_MESSAGE: {title: "Select Plan", msg: "Please select a plan before continuing to use this application."},
  BILLING_MESSAGE: {title: "Setup Payment", msg: "You have chosen a paid plan. Please enter your payment information to continue."},
  PROPERTY_MESSAGE: {title: "Setup Property", msg: "You need to add a property by entering it's address. This will then be your property you can track market information on."},

  getPlans: () => {
    console.log("Loading plans");
    return {
      type: settingsAction.GET_PLANS
    };
  },
  changeSetting: (id, showNote) => {
    return (dispatch, getState) => {
      let notificationMsg = settingsAction.PLAN_MESSAGE;

      if(id === "billing") {
        notificationMsg = settingsAction.BILLING_MESSAGE;
      } else if (id === "property") {
        notificationMsg = settingsAction.PROPERTY_MESSAGE;
      }

      dispatch({
        type: settingsAction.CHANGE_SETTING,
        selectedSetting: id,
        notificationMsg: notificationMsg,
        showNotification: showNote
      });
    };
  },
  updatePlan: (plan) => {
    return {
      type: settingsAction.UPDATE_PLAN,
      plan: plan
    };
  },
  getBilling: () => {
    console.log("Loading billing");
    return {
      type: settingsAction.GET_BILLING
    };
  },
  addBilling: (stripeToken) => {
    return {
      type: settingsAction.ADD_BILLING,
      stripeToken: stripeToken
    };
  },
  toggleModal: () => {
    console.log("action toggle");
    return {
      type: settingsAction.TOGGLE_PROPERTY_MODAL
    };
  },
  toggleListingModal: () => {
    return {
      type: settingsAction.TOGGLE_LISTING_MODAL
    };
  },
  toggleEditModal: (property) => {
    console.log("action edit toggle");
    return {
      type: settingsAction.TOGGLE_PROPERTY_EDIT_MODAL,
      property: property
    };
  },
  toggleContactModal: () => {
    return {
      type: settingsAction.TOGGLE_CONTACT_MODAL
    };
  },
  propertyFormUpdate: (data) => {
    return {
      type: settingsAction.PROPERTY_FORM_UPDATE,
      propertyForm: data
    };
  },
  userFormUpdate: (data) => {
    return {
      type: settingsAction.USER_FORM_UPDATE,
      userForm: data
    };
  },
  contactFormUpdate: (data) => {
    return {
      type: settingsAction.CONTACT_FORM_UPDATE,
      contactForm: data
    };
  },
  findListing: (geocodeData) => {
    console.log("finding listing");
    return {
      type: settingsAction.FIND_LISTING,
      geocodeData: geocodeData
    };
  },
  setDefaultListing: (listingId, propertyId, user) => {
    return {
      type: settingsAction.SET_DEFAULT_LISTING,
      listingId: listingId,
      propertyId: propertyId,
      user: user
    };
  },
  sendContactMail: (contactForm) => {
    console.log("sending contact");
    return {
      type: settingsAction.SEND_CONTACT_MAIL,
      contactForm: contactForm
    };
  },
  saveUserProfile: (userForm) => {
    console.log("saving profile");
    return {
      type: settingsAction.SAVE_USER_PROFILE,
      userForm: userForm
    };
  },
  addProperty: (foundListing) => {
    console.log("adding listing");
    return {
      type: settingsAction.ADD_PROPERTY,
      listing: foundListing
    };
  },

};
export default settingsAction;
