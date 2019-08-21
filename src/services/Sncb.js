import Axios from 'axios'
const urlSncb = 'https://api.irail.be/'

export default {
  getStations() {
    let route = "stations/?format=json"
    return Axios.get(urlSncb + route).then(response => response.data)
  },
  getTrains(idGare) {
    let route = 'liveboard/?id=' + idGare + '&format=JSON'
    return Axios.get(urlSncb + route).then(response => response.data)
  }
}