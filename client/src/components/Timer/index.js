
import React, { Component } from 'react';
import Stopwatch from 'rc-stopwatch';

class ApplicationThankYou extends Component {
    render() {


        return (
            <div >
                <p>Timer</p>
                <Stopwatch
                    buttonClass="button"
                    onTimeChange={obj => console.log(obj)}
                />
            </div>
        )
    }
}

export default ApplicationThankYou;