import React, {Component, useContext, useEffect, useState}from 'react'
import {RaceContext} from './appstate'

import { geolocated } from "react-geolocated";
 
// function calcDistance() {
//     feet = 1;
//     mile = feet * 5280.00016896;
//     kilometer = feet * 3280.84;
// }
 

class Demo extends Component {
    
    state = {
        lat: 0,
        long: 0,
        latPlayer1: [], 
        longPlayer1: [], 
        latPlayer2: [], 
        longPlayer2: [], 
        timestamp: []
    }
    //navigator.geolocation.watchPosition(console.log(this.props.coords.latitude)),
    //Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    distance = () => {
        this.setState(prevState => ({
            lat: this.props.coords.latitude || 0,
            long: this.props.coords.longitude || 0,
            distance : Math.sqrt( Math.pow((prevState.lat-this.state.lat), 2) + Math.pow((prevState.long-this.state.long), 2) )
            
        }))
    }

    render() {
        //componentDidUpdate( this.props.coords.latitude, this.state.latPlayer1)
        // this.state.lat.push(this.props.coords.latitude);
        // this.state.long.push(this.props.coords.longitude);
        return !this.props.isGeolocationAvailable ? (
            
            <div>Your browser does not support Geolocation</div>
            ) : !this.props.isGeolocationEnabled ? (
                <div>Geolocation is not enabled</div>
                ) : this.props.coords ? (
                    
                    // this.state.latPlayer1.concat(this.props.coords.latitude),
                    // document.getElementById('newLat').innerHTML = this.props.coords.latitude,
                    
            <div className="location-wrap">
            <table id="location-data">
                <tbody>
                    <tr>
                        <td>latitude</td>
                        <td>
                        {this.props.coords.latitude}</td>
                    </tr>
                    <tr>
                        <td>longitude</td>
                        <td>{this.props.coords.longitude}</td>
                    </tr>
                    <tr>
                        <td>altitude</td>
                        <td>{this.props.coords.altitude}</td>
                    </tr>
                    <tr>
                        <td>heading</td>
                        <td>{this.props.coords.heading}</td>
                    </tr>
                    <tr>
                        <td>speed</td>
                        <td>{this.props.coords.speed}</td>
                    </tr>
                </tbody>
            </table>
            <div id="newLat"></div>
            <div id="long-distance">{this.state.distance}</div>
            <div id="lat-distance"></div>
            </div>
        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }

}


 

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    watchPosition: true, 
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true
})(Demo);