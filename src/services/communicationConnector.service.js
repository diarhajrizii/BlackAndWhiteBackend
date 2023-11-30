const axios = require('axios');
const { communicationConnectorTypes } = require('../constants/communicationConnectorTypes');
const { communicationConnectorMessages } = require('../constants/communicationConnectorMessages');

class CommunicationConnectorService {
  /**
   * @type {CommunicationConnectorService}
   * @private
   */
  static _instance = null;
  
  /**
   * @type { import('axios').AxiosInstance }
   * @private
   */
  _axiosInstance = null;
  
  /**
   * @returns CommunicationConnectorService
   */
  static getInstance() {
    if (!CommunicationConnectorService._instance) {
      CommunicationConnectorService._instance = new CommunicationConnectorService();
      CommunicationConnectorService._instance._axiosInstance = axios.create({
        baseURL: process.env.COMMUNICATION_SERVICE_URL,
      })
    }

    return CommunicationConnectorService._instance;
  }

   /**
   * @param data { { data: { type: string, message: string }, destination: 'website' | 'cms' } }
   * @returns {Promise<void>}
   */
  async sendWsMessage(data) {
    await this._axiosInstance.post('/ws-connector/send-message', data);
  }

  async sendUpdatedComponentMessage(updatedComponent) {
    await this.sendWsMessage({
      data: {
        type: communicationConnectorTypes.COMPONENT_UPDATED,
        updatedComponent,
      },
      destination: 'website',
    })
  }
}

module.exports = {
  CommunicationConnectorService
}
