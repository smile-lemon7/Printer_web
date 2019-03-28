import React, { Component } from 'react';
import { connect } from 'dva';
import { redirectWXAuthURL } from '../utils/utils';


class Login extends Component {
 
  componentDidMount() {
    redirectWXAuthURL();
  }

  render() {
    return (
      <div>
        login
      </div>
    )
  }
}



export default connect()(Login);
