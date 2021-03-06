import ApiClient from './ApiClient';
import ApiError from './ApiError';

export default class AuthCheck extends ApiClient {
  constructor(...args) {
    super(...args);
  }
  
  async check(code) {
    try {
      let response = await this.doRequest('users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(code)
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError('Error creating new notification on server', error);
    }
  }
  
  async validToken(token) {
    try {
      let response = await this.doRequest('users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      });
      return await response.json();
    }
    catch (error) {
      throw new ApiError('Error creating new notification on server', error);
    }
  }
};
