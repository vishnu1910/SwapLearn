import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import './style.css'
import compose from 'recompose/compose';
// import skills from '../misc/skill';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import FlatButton from '@material-ui/core/Button';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
  followUser,
  getFollowing,
  getUserbySkills,
  getUser,
  getAllUsers,
  unfollowUser
} from '../actions/userActions';
import NavbarContainer from './NavbarContainer';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';

var skilluserlist = [];
var arr = [];
var flag = 0;
var displayedInterest = []
const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    }
  },
  
});

<link rel="stylesheet" href="style.css" /> 


export class DiscoverPage extends Component {
  state = {
    loading: true,
    following: []
  };

  componentDidMount = () => {
    const { history, retrieveAllUsers } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }

    retrieveAllUsers().then(() => {
      this.updateFollowing();
      this.setState({
        loading: false
      });
    });
  };

  componentDidUpdate(prevProps) {
    const { userReducer } = this.props;
    if (!equal(userReducer.following, prevProps.userReducer.following)) {
      this.updateFollowing();
    }
  }

  myCheck() {
    // var x = []
    var cb1 = document.getElementById("cb1");
    var cb2 = document.getElementById("cb2");
    var cb3 = document.getElementById("cb3");
    var cb4 = document.getElementById("cb4");
    var cb5 = document.getElementById("cb5");
    var cb6 = document.getElementById("cb6");
    var cb7 = document.getElementById("cb7");
    var cb8 = document.getElementById("cb8");
    if (cb1.checked == true){
      displayedInterest.push("Guitar");
    }
    if (cb2.checked == true){
      displayedInterest.push("Piano");
    }
    if (cb3.checked == true){
      displayedInterest.push("Painting");
    }
    if (cb4.checked == true){
      displayedInterest.push("Karate");
    }
    if (cb5.checked == true){
      displayedInterest.push("Python");
    }
    if (cb6.checked == true){
      displayedInterest.push("Java");
    }
    if (cb7.checked == true){
      displayedInterest.push("Violin");
    }
    if (cb8.checked == true){
      displayedInterest.push("Carpentry");
    }
  };
  
  
  // Set "following" to be the list of users you are following
  updateFollowing = () => {
    const { authReducer, getCurrUser } = this.props;
    getCurrUser(authReducer.user.userId).then((res) => {
      this.setState({
        following: res.payload.user.following
      });
    });
  };
  filterArr(skill_list){
    const { userReducer} = this.props;
    if(flag===0){
      arr = userReducer.allUsers
      var skill_list_length = skill_list.length
      var arr_length = arr.length
      for(let k = 0; k<skill_list_length; k++){
        for(let i = 0; i<arr_length; i++){
          for(let j =0; j<arr[i].skill.length;j++){
            if(arr[i].skill[j]===skill_list[k]){
              skilluserlist.push(arr[i])
              arr.splice(i,1)
              arr_length-=1
              console.log(userReducer.currUser)
              break
            }
          }
        }
      }
      flag=1
    }
  }
  render() {
    const {
      authReducer,
      classes,
      followThisUser,
      getCurrUser,
      userReducer,
      unfollowThisUser,
      
    } = this.props;
    const { following, loading } = this.state;
    
    return loading ? (
      
      <div>
        <NavbarContainer />
        <Loading />
      </div>
    ) : (
      <div>
        
        <NavbarContainer />
        <main>
        {/* <div className={classNames(classes.layout, classes.cardGrid)}>
        <input type="checkbox" name="Skill" value="Guitar" id="cb1"/>Guitar   
        <input type="checkbox" name="Skill" value="Piano" id="cb1"/>Piano
          
        </div> */}
        <fieldset class="checkbox-group">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"></link>
	<legend class="checkbox-group-legend">Discover</legend>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb1"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
				<i class="fas fa-guitar fa-3x"></i>
				</span>
				<span class="checkbox-label">Guitar</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb2"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
				<i class="fas fa-paint-brush fa-3x"></i>
				</span>
				<span class="checkbox-label">Painting</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb3"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
        <i class="fas fa-compact-disc fa-3x"></i>
				</span>
				<span class="checkbox-label">Piano</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb4"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
				<i class="fas fa-male fa-3x"></i>
				</span>
				<span class="checkbox-label">Karate</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb5"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
				<i class="fas fa-music fa-3x"></i>
				</span>
				<span class="checkbox-label">Violin</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb6"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
				<i class="fas fa-tools fa-3x"></i>
				</span>
				<span class="checkbox-label">Carpentry</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb7"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
        <i class="fab fa-python fa-3x"></i>
				</span>
				<span class="checkbox-label">Python</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" id="cb8"/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
        <i class="fab fa-java fa-3x"></i>
				</span>
				<span class="checkbox-label">Java</span>
			</span>
		</label>
	</div>
</fieldset>
        <button type='submit' onClick={this.myCheck()}>
          submit
        </button>
        {/* {this.myCheck()} */}
        {console.log(document.getElementById("cb1"))}
          {console.log(displayedInterest)}
          {this.filterArr(displayedInterest)}
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container justify="center" spacing={40}>
              
              {skilluserlist.map(
                user =>
                  (user._id === authReducer.user.userId ? null : (
                    <Grid item key={user._id} sm={6} md={3} lg={2}>
                      <UserCard
                        isFollowing={following.includes(user._id)}
                        followUser={followThisUser}
                        getUser={getCurrUser}
                        listedUser={user}
                        signedInUser={authReducer.user}
                        unfollowUser={unfollowThisUser}
                      />
                    </Grid>
                  ))
              )}
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}

DiscoverPage.propTypes = {
  authReducer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  followThisUser: PropTypes.func.isRequired,
  getCurrUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  retrieveAllUsers: PropTypes.func.isRequired,
  unfollowThisUser: PropTypes.func.isRequired,
  userReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getCurrUser: id => dispatch(getUser(id)),
  getFollowingUsers: id => dispatch(getFollowing(id)),
  followThisUser: (signedInUserId, idToFollow) =>
    dispatch(followUser(signedInUserId, idToFollow)),
  retrieveAllUsers: () => dispatch(getAllUsers()),
  unfollowThisUser: (signedInUserId, idToUnfollow) =>
    dispatch(unfollowUser(signedInUserId, idToUnfollow))
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DiscoverPage);
