import SecureAxios from './SecureAxios';

class PropertyService {
  getProperty(id) {
    return SecureAxios.get('/server/api/v1/properties/' + id);
  }
  getUserProperty(id) {
    return SecureAxios.get('/server/api/v1/properties/' + id + '/user');
  }
  addProperty(addressGIS) {
    return SecureAxios.post('/server/api/v1/properties', addressGIS);
  }
  addPropertyByUrl(url) {
    return SecureAxios.post('/server/api/v1/properties/url', {'url': url});
  }
  matchProperty(addressGIS, url) {
    return SecureAxios.post('/server/api/v1/properties/match?url=' + url, addressGIS);
  }
  updateProperty(property, state) {
    return SecureAxios.patch('/server/api/v1/properties/' + property.id, {'property': {
      'street_address': property.street_address,
      'postal_code': property.postal_code,
      'airbnb_identifier': state.airbnb_identifier,
      'vrbo_identifier': state.vrbo_identifier,
      'city': state.city,
      'state': state.state
    }});
  }
}

export default new PropertyService();
