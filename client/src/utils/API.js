import axios from 'axios';

export default {
    
    // User APIs
    // Gets users
    getUsers: function() {
        return axios.get(`/api/users/`);
        
    },

    // Gets individual user
    getOneUser: function(id) {
        return axios.get(`/api/users/${id}`);
    },

    // Deletes user with given id
    deleteUser: function(id) {
        return axios.delete(`/api/users/${id}`);
    },

    // Saves a user to the database
    saveUser: function(userData) {
        return axios.post(`/api/users`, userData);
    },

    // Race APIs
    // Gets races
    getRaces: function() {
        return axios.get(`/api/races/`);
    },

    // Gets individual race
    getOneRace: function(id) {
        return axios.get(`/api/races/${id}`);
    },

    // Deletes race with given id
   

    // Saves a race to the database
    saveRace: function(raceData) {
        return axios.post(`/api/races`, raceData);
    },
    login: function(loginData){
        return axios.post('/api/users/login', loginData)
    } 
}