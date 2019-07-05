import { all, takeEvery, fork, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import UserService from '../../services/UserService';
import PlanService from '../../services/PlanService';
import PropertyService from '../../services/PropertyService';
import ContactService from '../../services/ContactService';
import actions from './actions';
import authActions from '../auth/actions';
import listingActions from '../listings/actions';

export function* getPlansRequest() {
  yield takeEvery(actions.GET_PLANS, function*(payload) {
    const plans = yield call(PlanService.getPlans);
    // console.log(properties);
    yield put({
      type: actions.SET_PLANS,
      plans: plans
    });

  });
}

export function* getUpdatePlanRequest() {
  yield takeEvery(actions.UPDATE_PLAN, function*(payload) {
    const user = yield call(UserService.setPlan, payload.plan);

    yield put({
      type: authActions.SET_USER,
      user: user
    });

    // if a user selects the free plan, have them enter a property next, otherwise enter billing details
    if(payload.plan === "free" && user.properties.length <= 0) {
      yield put({
        type: actions.CHANGE_SETTING,
        selectedSetting: "property",
        notificationMsg: actions.PROPERTY_MESSAGE,
        showNotification: true
      });
    } else if(user.settings.monthly_amount && user.settings.monthly_amount > 0 && !user.settings.stripe_card) {
      yield put({
        type: actions.CHANGE_SETTING,
        selectedSetting: "billing",
        notificationMsg: actions.BILLING_MESSAGE,
        showNotification: true
      });
    }

  });
}

export function* getBillingRequest() {
  yield takeEvery(actions.GET_BILLING, function*(payload) {
    const billing = yield call(UserService.getBilling);
    yield put({
      type: actions.SET_BILLING,
      billing: billing
    });
  });
}

export function* getAddBillingRequest() {
  yield takeEvery(actions.ADD_BILLING, function*(payload) {
    const user = yield call(UserService.addBilling, payload.stripeToken);

    console.log(user);
    if(user['error']) {
      yield put({
        type: actions.BILLING_ERROR,
        error: user['error']
      });
    } else {
      yield put({
        type: authActions.SET_USER,
        user: user
      });

      // get user to select a property
      if(user.properties.length <= 0) {
        yield put({
          type: actions.CHANGE_SETTING,
          selectedSetting: "property",
          notificationMsg: actions.PROPERTY_MESSAGE,
          showNotification: true
        });
      }
    }
  });
}

export function* findListingRequest() {
  yield takeEvery(actions.FIND_LISTING, function*(payload) {
    const p = yield call(PropertyService.matchProperty, payload.geocodeData, null);
    let foundListingSuccess = false;
    if(p) {
      foundListingSuccess = true;
    }
    if(p.new_prop) {
      yield put({
        type: actions.SET_FOUND_LISTING,
        foundListings: p.property_matches,
        newProp: p.new_prop,
        foundListingSuccess: foundListingSuccess
      });
      yield put({
        type: 'SET_USER',
        user: p.user
      });
      yield put({
        type: 'GET_PROPERTY_COMPETITION',
        filter: {
          limit: 10,
          criteria: {
            "ls.market_id": 1
          }
        },
        id: p.new_prop.id
      })
      yield put({
        type: actions.TOGGLE_PROPERTY_MODAL
      })
    } else {
      yield put({
        type: actions.INVALID_PROPERTY
      })
    }
  });
}

export function* sendContactMailRequest() {
  yield takeEvery(actions.SEND_CONTACT_MAIL, function*(payload) {
    const result = yield call(ContactService.sendContactEmail, payload.contactForm);

    if(result['error']) {
      yield put({
        type: actions.SEND_CONTACT_ERROR,
        error: result['error']
      });
    } else {
      yield put({
        type: actions.TOGGLE_CONTACT_MODAL
      });
    }
  });
}

export function* saveUserProfileRequest() {
  yield takeEvery(actions.SAVE_USER_PROFILE, function*(payload) {
    const result = yield call(UserService.saveUserProfile, payload.userForm);

    if(result['error']) {
      yield put({
        type: actions.SAVE_USER_PROFILE_ERROR,
        error: result['error']
      });
    } else {
      yield put({
        type: authActions.SET_USER,
        user: result
      });
      yield put({
        type: actions.SAVE_USER_PROFILE_SUCCESS
      });
    }
  });
}

export function* addPropertyRequest() {
  yield takeEvery(actions.ADD_PROPERTY, function*(payload) {
    yield call(PropertyService.addProperty, {'gis': null, 'property_id': payload.listing.property_id, 'url': payload.listing.id});

    yield put({
      type: listingActions.GET_USER_LISTINGS
    });

    // refresh the user now that they have more properties
    const user = yield call(UserService.getCurrentUser);
    yield put({
      type: authActions.SET_USER,
      user: user
    });

    yield put({
      type: actions.TOGGLE_PROPERTY_MODAL
    });

    yield put({
      type: actions.PROPERTY_ADDED,
      user: user
    });

  });
}

export function* togglePropertyEditRequest() {
  yield takeEvery(actions.TOGGLE_PROPERTY_EDIT_MODAL, function*(payload) {
    if(payload.property) {
      // console.log("saga add property");
      const p = yield call(PropertyService.getProperty, payload.property.id);

      yield put({
        type: actions.SET_FOUND_LISTING,
        foundListings: p.property_matches,
        newProp: p.new_prop,
        foundListingSuccess: true
      });
    }

  });
}

export function* setDefaultListingRequest() {
  yield takeEvery(actions.SET_DEFAULT_LISTING, function*(payload) {
    const result = yield call(UserService.setDefaultListing, payload.listingId, payload.propertyId);
    const passedInUser = payload.user;

    yield put({
      type: actions.DEFAULT_LISTING_ADDED,
      foundListings: result.property_matches,
      newProp: result.new_prop,
      listing: result.listing
    });

    yield put({
      type: 'GET_USER_LISTINGS'
    })

    const user = yield call(UserService.getCurrentUser);
    yield put({
      type: authActions.SET_USER,
      user: user
    });

    yield put({
      type: actions.TOGGLE_LISTING_MODAL
    })

    if(passedInUser.settings.new_user) {
      yield put(push('/dashboard'));
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getUpdatePlanRequest),
    fork(getAddBillingRequest),
    fork(getPlansRequest),
    fork(getBillingRequest),
    fork(findListingRequest),
    fork(addPropertyRequest),
    fork(sendContactMailRequest),
    fork(saveUserProfileRequest),
    fork(togglePropertyEditRequest),
    fork(setDefaultListingRequest)
  ]);
}
