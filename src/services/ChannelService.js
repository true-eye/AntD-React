import SecureAxios from './SecureAxios';

class ChannelService {
  getChannels() {
    return SecureAxios.get('/server/api/v1/markets');
  }
}

export default new ChannelService();
