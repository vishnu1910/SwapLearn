import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import './style.css'
import compose from 'recompose/compose';
import skills from '../misc/skill';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
	<legend class="checkbox-group-legend">Discover</legend>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" />
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<circle cx="96" cy="144.00002" r="10"></circle>
						<circle cx="160" cy="144.00002" r="10"></circle>
						<path d="M74.4017,80A175.32467,175.32467,0,0,1,128,72a175.32507,175.32507,0,0,1,53.59754,7.99971" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M181.59717,176.00041A175.32523,175.32523,0,0,1,128,184a175.32505,175.32505,0,0,1-53.59753-7.99971" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M155.04392,182.08789l12.02517,24.05047a7.96793,7.96793,0,0,0,8.99115,4.20919c24.53876-5.99927,45.69294-16.45908,61.10024-29.85086a8.05225,8.05225,0,0,0,2.47192-8.38971L205.65855,58.86074a8.02121,8.02121,0,0,0-4.62655-5.10908,175.85294,175.85294,0,0,0-29.66452-9.18289,8.01781,8.01781,0,0,0-9.31925,5.28642l-7.97318,23.91964" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M100.95624,182.08757l-12.02532,24.0508a7.96794,7.96794,0,0,1-8.99115,4.20918c-24.53866-5.99924-45.69277-16.459-61.10006-29.85069a8.05224,8.05224,0,0,1-2.47193-8.38972L50.34158,58.8607a8.0212,8.0212,0,0,1,4.62655-5.1091,175.85349,175.85349,0,0,1,29.66439-9.18283,8.0178,8.0178,0,0,1,9.31924,5.28642l7.97318,23.91964" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
					</svg>
				</span>
				<span class="checkbox-label">Discord</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" checked />
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<polygon points="56 100 56 168 128 236 128 168 200 168 56 32 200 32 200 100 56 100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
					</svg>
				</span>
				<span class="checkbox-label">Framer</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" />
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<polygon points="72 40 184 40 240 104 128 224 16 104 72 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
						<polygon points="177.091 104 128 224 78.909 104 128 40 177.091 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
						<line x1="16" y1="104" x2="240" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line>
					</svg>
				</span>
				<span class="checkbox-label">Sketch</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" />
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
						<rect x="36" y="36" width="184" height="184" rx="48" stroke-width="12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect>
						<circle cx="180" cy="75.99998" r="10"></circle>
					</svg>
				</span>
				<span class="checkbox-label">Instagram</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" />
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
						<path d="M71.0247,205.27116a159.91145,159.91145,0,0,1,136.98116-77.27311q8.09514,0,15.99054.78906" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M188.0294,53.09083A159.68573,159.68573,0,0,1,64.00586,111.99805a160.8502,160.8502,0,0,1-30.15138-2.83671" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M85.93041,41.68508a159.92755,159.92755,0,0,1,78.99267,138.00723,160.35189,160.35189,0,0,1-4.73107,38.77687" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
					</svg>
				</span>
				<span class="checkbox-label">Dribbble</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" />
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
						<g>
							<path d="M179.1333,108.32931a112.19069,112.19069,0,0,0-102.3584.04859" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
							<path d="M164.29541,136.71457a79.94058,79.94058,0,0,0-72.68359.04736" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
							<path d="M149.47217,165.07248a47.97816,47.97816,0,0,0-43.03662.04736" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						</g>
					</svg>
				</span>
				<span class="checkbox-label">Spotify</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" />
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<circle cx="162" cy="128" r="34" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
						<path d="M128,94V26.00089H94a34,34,0,0,0,0,68Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M128,161.99911V94H94a34,34,0,0,0,0,68Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M128,94V26.00089h34a34,34,0,0,1,0,68Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M128,161.99911v34.00044A34,34,0,1,1,94,162Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
					</svg>
				</span>
				<span class="checkbox-label">Figma</span>
			</span>
		</label>
	</div>
	<div class="checkbox">
		<label class="checkbox-wrapper">
			<input type="checkbox" class="checkbox-input" checked/>
			<span class="checkbox-tile">
				<span class="checkbox-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
						<rect width="256" height="256" fill="none"></rect>
						<path d="M80,56.00005h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V80a24,24,0,0,1,24-24Z" transform="translate(184.00005 24.00003) rotate(90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M128,80H104a24,24,0,0,1-24-24V56a24,24,0,0,1,24-24h0a24,24,0,0,1,24,24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M152,32.00007h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V56a24,24,0,0,1,24-24Z" transform="translate(304 160.00011) rotate(180)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M176,128V104a24,24,0,0,1,24-24h0a24,24,0,0,1,24,24v0a24,24,0,0,1-24,24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M176,104.00005h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V128A24,24,0,0,1,176,104.00005Z" transform="translate(23.99995 328.00003) rotate(-90)" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M128,176h24a24,24,0,0,1,24,24v0a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M104,128h24a0,0,0,0,1,0,0v72a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24V152A24,24,0,0,1,104,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
						<path d="M80,128v24a24,24,0,0,1-24,24h0a24,24,0,0,1-24-24v0a24,24,0,0,1,24-24Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
					</svg>
				</span>
				<span class="checkbox-label">Slack</span>
			</span>
		</label>
	</div>
</fieldset>
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
