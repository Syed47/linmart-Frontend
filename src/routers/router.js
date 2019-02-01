import React                      from 'react';
import { createStackNavigator  }  from 'react-navigation';

import Home                       from '../components/Home';
import Stack                      from '../components/Stack';
import SignIn                     from '../user/SignIn';
import SignUp                     from '../user/SignUp';
import PassReset                  from '../user/PassReset';
import Profile                    from '../components/Profile';
import CheckOut                   from '../components/CheckOut';

export const ScreenSwitcher = createStackNavigator({

    SignIn:{
        screen: SignIn,
        navigationOptions: {
            title: 'login',
        },
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            title: 'SignUp',
        },
    },
    PassReset:{
        screen: PassReset,
        navigationOptions: {
            title: 'Forgot Password',
        },
    },

    Home: {
        screen: Home,
        navigationOptions: {
            title: 'linmart',
        },
    },
    Stack: {
        screen: Stack,
        navigationOptions: {
            title: `linamrt`,
        },
    },
    CheckOut:{
        screen: CheckOut,
        navigationOptions:{
            title: 'Checkout'
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions:{
            title: 'Profile'
        },
    }
},
    {
        mode: 'card',// modal, card
        headerMode: 'float', // float,screen, none
    }
);


