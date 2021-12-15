import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { createPost } from '../actions/postsActions';
import MenuItem from '@material-ui/core/MenuItem';
import colors from '../misc/colors';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  }
});

export class CreatePost extends Component {
  state = {
    postText: ''
  };

  handleChange = (e) => {
    const postText = e.target.value;
    this.setState(() => ({ postText }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { postText } = this.state;
    const { dispatch, user } = this.props;
    if (!postText.trim()) return;
    dispatch(createPost(postText, user));
    this.setState({ postText: '' });
  };

  render() {
    const topic = this.state;
    const { postText } = this.state;
    const { classes } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField
          fullWidth
          select
          className={classes.textField}
          value={topic}//create const topic
          id="topic"
          label="What do you want to teach today?"
          margin="normal"
          name="topic"
          onChange={this.handleChange}
        >
          {colors.map(color => (//repalce color with skill list
            <MenuItem key={color.value} value={color.value}>
              {color.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="textarea"
          placeholder="Add some details."
          multiline
          className={classes.textField}
          margin="normal"
          rowsMax="5"
          value={postText}
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Post
        </Button>
      </form>
    );
  }
}

CreatePost.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.authReducer.user
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(CreatePost);
