import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreatePost from './CreatePost';
import NavbarContainer from './NavbarContainer';
import PostFeed from './PostFeed';

export class HomePage extends Component {
  componentDidMount = () => {
    const { history } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }
  };

  render() {
    return (
      <div style={{backgroundColor:"#000000"}}>
        <NavbarContainer />
        <CreatePost />
        <PostFeed />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(HomePage);
