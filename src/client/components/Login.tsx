/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

type LoginState = {
  loading: boolean;
  errorState: boolean;
  username?: string;
  password?: string;
};

export class Login extends React.Component<LoginState> {
  state: LoginState = {
    loading: false,
    errorState: false
  };

  updatePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: event.target.value });
  };

  updateUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    this.setState({ loading: true });

    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      response.json().then((res) => {
        localStorage.setItem('TeslaKey', res);
        this.setState({ loading: false });
      });
    });
  };

  render() {
    return (
      <div className="login">
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
          <input
            type="submit"
            value={this.state.loading ? 'Loading' : 'Login'}
          ></input>
        </form>
      </div>
    );
  }
}
