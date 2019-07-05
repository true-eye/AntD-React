import SecureAxios from './SecureAxios';

class ListingService {
  getListing(id) {
    return SecureAxios.get('/server/api/v1/listings/' + id);
  }

  getBookingStats(id, interval) {
    return SecureAxios.get('/server/api/v1/listings/' + id + '/booking_stats?interval=' + interval);
  }

  getCurrentListingBooking() {
    return SecureAxios.get('/server/api/v1/listings/current_booking')
      .catch(error => {
        console.log("error", error);
      });
  }
  getMarketStats() {
    return SecureAxios.get('/server/api/v1/listings/market_stats')
      .catch(error => {
        console.log("error", error);
      });
  }
  getCurrentPropertyCompetition(filterStates) {
    return SecureAxios.get('/server/api/v1/listings/current_competition?filter=' + JSON.stringify(filterStates))
    .catch(error => {
      console.log("error", error);
    });

  }
  getPropertyCompetition(property_id, filterStates) {
    return SecureAxios.get('/server/api/v1/listings/' + property_id + '/competition?filter=' + JSON.stringify(filterStates))
    .catch(error => {
      console.log("error", error);
    });

  }
  getCurrentPropertyPricing() {
    return SecureAxios.get('/server/api/v1/listings/current_pricing')
      .catch(error => {
        console.log("error", error);
      });
  }
  getCurrentProjectedRent() {
    return SecureAxios.get('/server/api/v1/listings/current_projected_rent')
      .catch(error => {
        console.log("error", error);
      });
  }
  getBookingStatsWithCompetitionByDay(start_date, interval, filterStates) {
    return SecureAxios.get('/server/api/v1/listings/booking_stats_with_comp_by_day?interval=' + interval + '&start_date=' + start_date + '&filter=' + JSON.stringify(filterStates))
    .catch(error => {
      console.log("error", error);
    });

  }
  getBookingStatsWithCompetitionByMonth(start_date, interval, filterStates) {
    return SecureAxios.get('/server/api/v1/listings/booking_stats_with_comp_by_month?interval=' + interval + '&start_date=' + start_date + '&filter=' + JSON.stringify(filterStates))
    .catch(error => {
      console.log("error", error);
    });

  }
  getPricingStatsWithCompetitionByDay(start_date, interval, filterStates) {
    return SecureAxios.get('/server/api/v1/listings/pricing_stats_with_comp_by_day?interval=' + interval + '&start_date=' + start_date + '&filter=' + JSON.stringify(filterStates))
    .catch(error => {
      console.log("error", error);
    });

  }
  getPricingStatsWithCompetitionByMonth(start_date, interval, filterStates) {
    return SecureAxios.get('/server/api/v1/listings/pricing_stats_with_comp_by_month?interval=' + interval + '&start_date=' + start_date + '&filter=' + JSON.stringify(filterStates))
    .catch(error => {
      console.log("error", error);
    });

  }
  getPricingStatsForDay(start_date, filterStates) {
    return SecureAxios.get('/server/api/v1/listings/pricing_stats_for_day?start_date=' + start_date + '&filter=' + JSON.stringify(filterStates))
    .catch(error => {
      console.log("error", error);
    });

  }

}

export default new ListingService();
