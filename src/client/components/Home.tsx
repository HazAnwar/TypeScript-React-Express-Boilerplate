import React from 'react';

type HomeState = {
  loading: boolean;
};

export class Home extends React.Component<HomeState> {
  state: HomeState = {
    loading: false
  };

  componentDidMount() {
    // do something
  }

  render() {
    return <div>Code goes here :)</div>;
  }
}
