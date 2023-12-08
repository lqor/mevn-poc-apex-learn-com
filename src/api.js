import axios from 'axios';

export default class API {
    // Authenticate user
    static async authenticateUser() {
        return await axios.post('/oauth2/auth');
    }

}