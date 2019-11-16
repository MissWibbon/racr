import React from "react";
import { geolocated, geoPropTypes } from "geolocation";
 
class Demo extends React.Component {
    // Same as the basic example
}
 
// Using Object.assign
Demo.propTypes = Object.assign({}, Demo.propTypes, geoPropTypes);
// Using ES6 object spread syntax
Demo.propTypes = { ...Demo.propTypes, ...geoPropTypes };
 
export default geolocated()(Demo);