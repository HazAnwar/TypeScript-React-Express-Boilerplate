import React from 'react';

type HomeState = {
  loading: boolean;
};

export class Home extends React.Component<HomeState> {
  state: HomeState = {
    loading: false
  };

  render() {
    return <div className="home">Home screen logic goes here</div>;
  }
}
