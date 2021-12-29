import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { createPost } from '../actions/postsActions';
import MenuItem from '@material-ui/core/MenuItem';
import skill from '../misc/skill';
import defaultImage from '../images/bg.jpg';


const skillboi = ""
const styles = theme => ({
  backgroundContainer: {
    alignItems: 'center',
    backgroundImage: `url(${defaultImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'flex',
    height: '50vh',
    justifyContent: 'center',
    width: '100%'
  },
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
    width: 500,
    height:20
  },
  multilineColor:{
    color:'black',
    opacity:'1'
  },
  floatingLabelFocusStyle: {
    color: "black"
},
  resize:{
    fontSize:17
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "black !important"
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
      <div className={classes.backgroundContainer}>
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <TextField 
          variant="outlined-name"
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle,
            notchedOutline: classes.notchedOutline
          }}
          multiline
          fullWidth
          select
          className={classes.textField}
          defaultValue={skillboi}
          value={skill.label}//create const topic
          id="outlined-name" 
          label="What do you want to teach today?"
          margin="normal"
          name="topic"
          onChange={this.handleChange}
        >
          {skill.map(skill => (
            <MenuItem key={skill.value} value={skill.value}>
              {skill.label}
            </MenuItem>
            ))}
        </TextField>
        <TextField
          variant ="outlined"
          InputProps={{
            className: classes.multilineColor,
            classes: {
              input: classes.resize,
            }
          }}
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
      </div>
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
