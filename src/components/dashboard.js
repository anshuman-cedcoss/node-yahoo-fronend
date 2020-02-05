import React, {Component} from 'react';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location : 'new york',
            res : {}
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather = () => {
        fetch('http://localhost:3000/yahoo?location=' + this.state.location  )
            .then(res => res.json())
            .then(res => {
                if ( res.success ) {
                    this.setState({res: res.data});
                } else {
                    this.setState({res:{}});
                }
            })
    };


    render() {
        return (
            <div className="row">
                {/* this is for temp in cel and show location */}
                <div className="col-12 bg-dark">
                    Location : {this.state.res.location.city}
                </div>
                {/* this is for current_observation data */}
                <div className="col-sm-6 col-12">

                </div>
                {/* this is for week data */}
                <div className="col-sm-6 col-12">

                </div>
            </div>
        );
    }
}

export default Dashboard;