import React from 'react'
import {useSelector} from 'react-redux';
import {selectUser} from "../features/userSlice";
import { auth } from '../firebase';
import Nav from '../Nav';
import PlanScreen from './PlanScreen';


function ProfileScreen() {
    const user = useSelector(selectUser);
    return (
        <div className="profileScreen">
            <Nav/>
            <div className="profileScreen__body">
                <h1> Edit Profile</h1>
                <div className="profileScreen__info">
                <img className="profileScreen__avtar" src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="avtar" title="avtar" />
                <div className="profileScreen_details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen__plans">
                        <h3> Plans</h3>
                       <PlanScreen></PlanScreen>
                        <button onClick={() => auth.signOut() } className="profileScreen_signOut"> Sign Out</button>
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    )
}

export default ProfileScreen
