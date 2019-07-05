import SecureAxios from './SecureAxios';
import axios from 'axios';

class UserService {
  signupUser(user) {

  }
  setupDemoUser(data) {

  }
  getCurrentUser() {
    return SecureAxios.get('/server/api/v1/users/current_user');
  }
  getUserListings() {
    return SecureAxios.get('/server/api/v1/users/current_user_listings');
  }
  switchProperty(id) {
    return SecureAxios.post('/server/api/v1/users/' + id + '/update_current_user_property', {});
  }
  switchListing(listing_id) {
    return SecureAxios.post('/server/api/v1/users/' + listing_id + '/update_current_user_listing', {});
  }
  setPlan(plan) {
  }
  setDefaultListing(listingId, propertyId) {
    return SecureAxios.post('/server/api/v1/users/set_default_listing', {listingId: listingId, propertyId: propertyId});
  }
  addBilling(stripeToken) {

  }
  getBilling() {
  }
  markNotificationsRead() {
    return SecureAxios.post('/server/api/v1/users/mark_notifications_read', {});
  }
  markNotificationRead(id) {
    return SecureAxios.post('/server/api/v1/users/' + id + '/mark_notification_read', {});
  }
  saveUser(user) {
  }
  saveUserProfile(userForm) {

  }
}

export default new UserService();
