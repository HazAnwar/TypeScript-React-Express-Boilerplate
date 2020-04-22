/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Redirect } from 'react-router';

type LoginState = {
  loading: boolean;
  errorState: boolean;
  redirect: boolean;
  username?: string;
  password?: string;
};

export class Login extends React.Component<LoginState> {
  state: LoginState = {
    loading: false,
    errorState: false,
    redirect: false
  };

  componentDidMount() {
    if (
      localStorage.getItem('TeslaWebApp') &&
      JSON.parse(localStorage.getItem('TeslaWebApp')).expiry >
        Math.round(Date.now() / 1000)
    ) {
      this.setState({ redirect: true });
    }
  }

  updatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  };

  updateUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    this.setState({ loading: true });

    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      response.status === 200
        ? response.json().then((res) => {
            localStorage.setItem(
              'TeslaWebApp',
              JSON.stringify({
                authToken: res.access_token,
                expiry: res.created_at + res.expires_in
              })
            );
            this.setState({ loading: false, redirect: true });
          })
        : this.setState({ loading: false, errorState: true });
    });
  };

  render() {
    return (
      <div className="login">
        {this.state.redirect ? (
          <Redirect to="/" />
        ) : (
          <form onSubmit={this.handleSubmit}>
            <h2 className="mb-0">Tesla Web App</h2>
            <h6>
              by{' '}
              <a
                href="https://www.linkedin.com/in/HazAnwar/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hazik Anwar
              </a>
            </h6>
            <p className="disclaimer">
              Your data only passes through official Tesla servers and is only
              saved in your browser&apos;s storage. Feel free to look at the{' '}
              <a
                href="https://github.com/HazAnwar/Tesla-Web-App"
                target="_blank"
                rel="noopener noreferrer"
              >
                open source code
              </a>{' '}
              and contribute!
            </p>
            <input
              type="email"
              placeholder="Email"
              onChange={this.updateUsername}
            ></input>
            <input
              type="password"
              placeholder="Password"
              onChange={this.updatePassword}
            ></input>
            <a
              className="forgot"
              href="https://www.tesla.com/user/password"
              target="_blank"
              rel="noopener noreferrer"
            >
              Forgotten your password?
            </a>
            {this.state.errorState ? (
              <span className="text-center forgot text-danger">
                It looks like we&apos;re having some trouble logging you in,
                please check your details and try again
              </span>
            ) : null}
            <input
              type="submit"
              value={this.state.loading ? 'Loading' : 'Login'}
            ></input>
          </form>
        )}
      </div>
    );
  }
}
