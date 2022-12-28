import queryString from 'query-string';

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY
const rootURL = 'https://maps.googleapis.com/maps/api/geocode/json'
const createAddressQuery = (str) => (str.split(' ').join('+'))

export default {
    searchByAddress: (address) => {
        const query = { address: createAddressQuery(address), key: googleMapsApiKey }
        return fetch(`${rootURL}?${queryString.stringify(query)}`).then((res) => res.json())
    }
}