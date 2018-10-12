import React from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from '../MainApp/Home';
import MemberDetails from '../MainApp/MemberDetails';
import SignIn from '../User/SignIn';
import CheckOut from '../MainApp/CheckOut';

export const ScreenSwitcher = createStackNavigator({

    // SignIn:{
    //     screen: SignIn,
    // },
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'linmart',
        },
    },

    Details: {
        screen: MemberDetails,
        navigationOptions: {
            title: `linamrt`,
        },
    },
    CheckOut:{
        screen: CheckOut,
        navigationOptions:{
            title: 'Checkout'
        },
    }
},
    {
        mode: 'card',// modal, card
        headerMode: 'screen', // float,screen, none
    }
);


