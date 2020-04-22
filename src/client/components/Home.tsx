import React from 'react';
import { Redirect } from 'react-router';

type HomeState = {
  loading: boolean;
  redirect: boolean;
  vehicleData?: {};
};

export class Home extends React.Component<HomeState> {
  state: HomeState = {
    loading: false,
    redirect: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    !localStorage.getItem('TeslaWebApp') ||
    !(
      JSON.parse(localStorage.getItem('TeslaWebApp')).expiry >
      Math.round(Date.now() / 1000)
    )
      ? this.setState({ redirect: true })
      : fetch('/api/vehicles', {
          method: 'GET',
          headers: {
            authorization: JSON.parse(localStorage.getItem('TeslaWebApp'))
              .authToken
          }
        }).then((response) => {
          response.status === 200
            ? response
                .json()
                .then((res) =>
                  this.setState({ loading: false, vehicleData: res })
                )
            : this.setState({ loading: false, errorState: true });
        });
  }

  render() {
    return (
      <div className="home">
        {this.state.redirect ? (
          <Redirect to="/login" />
        ) : (
          <span>
            {this.state.vehicleData
              ? JSON.stringify(this.state.vehicleData)
              : null}
          </span>
        )}
      </div>
    );
  }
}
