import SecureAxios from './SecureAxios';

class PlanService {
  getPlans() {
    return SecureAxios.get('/server/api/v1/plans');
  }
}

export default new PlanService();
