import React  from 'react';
import actions from './actions';
import notifications from '../../components/feedback/notification';
import NotificationContent from '../../containers/Feedback/Notification/notification.style';
import message from "../../components/feedback/message";
import MessageContent from "../../containers/Feedback/Message/message.style";

const initState = {
  plans: null,
  billing: null,
  foundListings: null,
  newProp: null,
  foundListingSuccess: null,
  notSupported: null,
  selectedSetting: "profile",
  loadingBilling: false,
  loadingPlans: false,
  loadingProperties: false,
  loadingPropModal: false,
  loadingContacts: false,
  loadingUser: false,
  loadingDefaultListing: false,
  billingError: null,
  contactError: null,
  modalActive: false,
  modalListingActive: false,
  modalContactActive: false,
  notificationMsg: null,
  userForm: {
    firstName: '',
    lastName: '',
    notificationEmail: ''
  },
  propertyForm: {
    url: ''
  },
  contactForm: {
    name: '',
    email: '',
    phone: '',
    properties: '',
    competitors: '',
    location: '',
    message: ''
  }
};

export default function settingsReducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_PLANS:
      return {
        ...state,
        loadingPlans: true
      };
    case actions.SET_PLANS:
      return {
        ...state,
        plans: action.plans,
        loadingPlans: false
      };
    case actions.SET_DEFAULT_LISTING:
      return {
        ...state,
        loadingDefaultListing: true
      };
    case actions.DEFAULT_LISTING_ADDED:
      message.success(
        <MessageContent>
            '{action.listing.current_listing_info_snapshot.listing_title}' has been added as your default '{action.listing.market.name}' monitored listing.
        </MessageContent>,
        10
      );

      return {
        ...state,
        foundListings: action.foundListings,
        newProp: action.newProp,
        foundListingSuccess: true,
        notSupported: null,
        loadingDefaultListing: false
      };
    case actions.GET_BILLING:
      return {
        ...state,
        billingError: null,
        loadingBilling: true
      };
    case actions.SET_BILLING:
      return {
        ...state,
        billing: action.billing,
        billingError: null,
        loadingBilling: false
      };
    case actions.CHANGE_SETTING:
      if(action.showNotification) {
        const args = {
          message: action.notificationMsg.title,
          description: (
            <NotificationContent>
              {action.notificationMsg.msg}
            </NotificationContent>
          ),
          duration: 5
        };
        notifications.open(args);
      }

      return {
        ...state,
        selectedSetting: action.selectedSetting,
        loadingBilling: false,
        notificationMsg: action.notificationMsg
      };
    case actions.ADD_BILLING:
      return {
        ...state,
        billingError: null,
        loadingBilling: true
      };
    case actions.BILLING_ERROR:
      return {
        ...state,
        billingError: action.error,
        loadingBilling: false
      };
    case actions.SEND_CONTACT_ERROR:
      message.error(
        <MessageContent>
          {Object.keys(action.error).map((key,i) => {
            return (
              <div key={i} className="" style={{display: "flex", width: "100%"}}>
                <span style={{paddingRight: "3px", textTransform: "capitalize"}}><strong>{key.replace(/_/g,' ')}:</strong></span>
                <span>{action.error[key]}</span>
              </div>
            );
          })}
        </MessageContent>,
        10
      );
      return {
        ...state,
        contactError: action.error,
        loadingContacts: false
      };
    case actions.TOGGLE_PROPERTY_EDIT_MODAL:
      return {
        ...state,
        foundListings: null,
        foundListingSuccess: true,
        notSupported: null,
        newProp: action.property,
        modalActive: !state.modalActive,
        loadingPropModal: true
      };
    case actions.TOGGLE_PROPERTY_MODAL:
      return {
        ...state,
        propertyForm: {
          url: ''
        },
        foundListings: null,
        foundListingSuccess: null,
        notSupported: null,
        newProp: null,
        modalActive: !state.modalActive,
        loadingPropModal: false
      };
    case actions.TOGGLE_LISTING_MODAL:
      return {
        ...state,
        modalListingActive: !state.modalListingActive,
        loadingDefaultListing: !state.loadingDefaultListing
      };
    case actions.TOGGLE_CONTACT_MODAL:
      return {
        ...state,
        contactForm: {
          name: '',
          email: '',
          phone: '',
          properties: '',
          competitors: '',
          location: '',
          message: ''
        },
        modalContactActive: !state.modalContactActive,
        loadingContacts: false
      };
    case actions.FIND_LISTING:
      return {
        ...state,
        loadingPropModal: true
      };
    case actions.ADD_PROPERTY:
      return {
        ...state,
        loadingPropModal: true
      };
    case actions.SEND_CONTACT_MAIL:
      return {
        ...state,
        loadingContacts: true
      };
    case actions.SAVE_USER_PROFILE:
      return {
        ...state,
        loadingUser: true
      };
    case actions.SAVE_USER_PROFILE_ERROR:
      message.error(
        <MessageContent>
          {Object.keys(action.error).map((key,i) => {
            return (
              <div key={i} className="" style={{display: "flex", width: "100%"}}>
                <span style={{paddingRight: "3px", textTransform: "capitalize"}}><strong>{key.replace(/_/g,' ')}:</strong></span>
                <span>{action.error[key]}</span>
              </div>
            );
          })}
        </MessageContent>,
        10
      );
      return {
        ...state,
        userError: action.error,
        loadingUser: false
      };
    case actions.SAVE_USER_PROFILE_SUCCESS:
      message.success(
        <MessageContent>
          <p>User profile saved successfully!</p>
        </MessageContent>,
        10
      );
      return {
        ...state,
        userError: null,
        loadingUser: false
      };
    case actions.PROPERTY_ADDED:
      if(action.user && action.user.properties.length === 1) {
        message.success(
          <MessageContent>
            <p>You've just added your first property! You can get started by going to the dashboard. Click the link on the left hand menu.</p>
          </MessageContent>,
          10
        );
      }
      return {
        ...state
      };
    case actions.INVALID_PROPERTY:
      return {
        ...state,
        notSupported: true,
        loadingPropModal: false
      };
    case actions.SET_FOUND_LISTING:
      return {
        ...state,
        foundListings: action.foundListings,
        newProp: action.newProp,
        loadingPropModal: false,
        foundListingSuccess: action.foundListingSuccess,
        notSupported: null
      };
    case actions.PROPERTY_FORM_UPDATE:
      return {
        ...state,
        foundListing: null,
        foundListingSuccess: null,
        notSupported: null,
        propertyForm: action.propertyForm,
      };
    case actions.CONTACT_FORM_UPDATE:
      return {
        ...state,
        contactForm: action.contactForm,
      };
    case actions.USER_FORM_UPDATE:
      return {
        ...state,
        userForm: action.userForm,
      };
    default:
      return state;
  }
}
