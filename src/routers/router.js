import React                      from 'react';
import { createStackNavigator  }  from 'react-navigation';

import Home                       from '../components/Home';
import Stack                      from '../components/Stack';
import SignIn                     from '../User/SignIn';
import SignUp                     from '../User/SignUp';
import CheckOut                   from '../components/CheckOut';

export const ScreenSwitcher = createStackNavigator({

    // SignIn:{
    //     screen: SignIn,
    //     navigationOptions: {
    //         title: 'login',
    //     },
    // },
    // SignUp: {
    //     screen: SignUp,
    //     navigationOptions: {
    //         title: 'SignUp',
    //     },
    // },
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
    }
},
    {
        mode: 'card',// modal, card
        headerMode: 'float', // float,screen, none
    }
);


