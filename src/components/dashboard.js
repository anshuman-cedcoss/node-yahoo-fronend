import React, {Component} from 'react';
import { getNewCityTemp } from "../Actions";
import { connect } from 'react-redux';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location : 'new york',
            res : {},
            loading : true,
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather = () => {
        if ( this.state.location === '' ) alert('location field can not be empty');
        this.props.getNewCityTemp({location: this.state.location});
    };

    componentWillReceiveProps(nextProps) {
        this.validateData(nextProps);
    }

    validateData = (props) => {
      if ( props.globalState.yahooRedux && Object.keys(props.globalState.yahooRedux).length > 0 ) {
          let yahooRedux = props.globalState.yahooRedux;
          if ( yahooRedux.success ) {
              if ( yahooRedux.data && Object.keys(yahooRedux.data.location).length > 0 ) {
                  console.log(yahooRedux.data);
                  this.setState({
                      loading:false,
                      error: false,
                      res : yahooRedux.data
                  });
              } else {
                  this.setState({loading:false,error: true, message : 'No City found on this name. Try another'});
              }
          } else {
              this.setState({loading:false,error: true, message : 'Failed get response from server'});
          }
      } else {
          this.setState({loading: true});
      }
    };


    renderErrorBox = () => {
        return (
            <div className="col-12 text-center text-danger">
                <h1>{this.state.message}</h1>
            </div>
        );
    };

    renderLoadingBox = () => {
        return (
            <div className="col-12 text-center">
                <h1>Loading......</h1>
            </div>
        );
    };

    handleChange = (value) => {
        this.setState({location : value.target.value});
    };

    render() {
        console.log(this.state, this.props);
        if ( this.state.error ) {
            return this.renderErrorBox();
        }
        if ( this.state.loading ) {
            return this.renderLoadingBox();
        }
        let { current_observation, location, forecasts } = this.state.res;
        return (
            <div className="row">
                {/* this is for temp in cel and show location */}
                <div className="col-12 bg-dark p-5 text-white" style={{mingHeight: "200px"}}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <input className="mb-2" value={this.state.location} onChange={this.handleChange}/>
                            <button onClick={this.getWeather}>Search</button>
                            <br/>
                            City : <b>{location.city}</b>
                            <br/>
                            Country :<b> {location.country}</b>
                            <br/>
                            Lat : {location.lat} &nbsp;
                            Long : {location.long}
                        </div>
                        <div className="col-12 col-sm-6 mt-1">
                            <p style={{fontSize:"10px", "margin" : "0"}}>Temperature</p>
                            <p style={{fontSize:"60px"}}>{current_observation.condition.temperature}</p>
                        </div>
                    </div>
                </div>
                {/* this is for current_observation data */}
                <div className="col-12 p-5">
                    <b style={{fontSize:"25px", color: "#5f5f5f"}}>Current Observation</b><br/>
                    <div className="row">
                        {Object.keys(current_observation).filter(keys => keys !== 'pubDate').map(keys => {
                            return (
                                <div className="col-6 col-sm-3 mb-4">
                                    <b style={{fontSize:"20px", color: "#5f5f5f"}}>{capitalizeWord(keys)}</b>
                                    <br/>
                                    {Object.keys(current_observation[keys]).map(childKeys => {
                                        return (<React.Fragment>
                                            <b>{capitalizeWord(childKeys)}</b> : <span style={{fontSize:"20px"}}>{current_observation[keys][childKeys]}</span>
                                            <br/>
                                        </React.Fragment>);
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* this is for week data */}
                <div className="col-12 bg-light p-5">
                    <b style={{fontSize:"25px", color: "#5f5f5f"}}>Forecasts</b><br/>
                    <div className="row">
                        {Object.values(forecasts).map(value => {
                            return (
                                <div className="col-6 col-sm-3 mb-4">
                                    <b style={{fontSize:"20px", color: "#5f5f5f"}}>{value.day}</b>
                                    <br/>
                                    <b style={{fontSize:"15px"}}>{value.text}</b>
                                    <br/>
                                    <span style={{fontSize:"15px"}}>{value.code}</span>
                                    <br/>
                                    Low : <span style={{fontSize:"10px"}}>{value.low}</span> &nbsp;
                                    High: <span style={{fontSize:"10px"}}>{value.high}</span>
                                    <br/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function capitalizeWord(string) {
    if ( typeof string === 'string' ) {
        string = string.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return '';
}

const mappedStateToProps = state => ({
    globalState: state
});

export default  connect(mappedStateToProps, { getNewCityTemp })(Dashboard);