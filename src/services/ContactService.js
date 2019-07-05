import SecureAxios from './SecureAxios';

class ContactService {
  sendContactEmail(contactForm) {
    return SecureAxios.post('/server/api/v1/contacts/send_mail', {'contact_lead': {
      'name': contactForm.name,
      'email': contactForm.email,
      'phone': contactForm.phone,
      'properties': contactForm.properties,
      'competitors': contactForm.competitors,
      'message': contactForm.message
    }}).catch(error => {
      return {error: error.response.data}
    });
  }
}

export default new ContactService();
