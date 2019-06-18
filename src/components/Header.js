import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TextInput,
        Image,
        TouchableOpacity,
        ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { bs_leftmost } from '../utils/util';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            location: '',
            searched: false,
            requested: false,
            subset: [],
            suggestions: []
        }
        this.getSuggestions();
    }

    async getSuggestions() {
        const response = await fetch('http:/172.20.10.2:4000/getLocationSuggestions', {
            // Request Type
            method: 'POST',
            // Data sent to backend
            body: JSON.stringify({ location: this.state.location }),
            // Header/Data type info
            headers:{ 'Content-Type': 'application/json' }
        }   );
        try {
            const data = await response.json(); // Converts JSON in Object
            this.setState({suggestions: data})
        } catch(err) {
            // alert('Invalid Request') // Render error msgs to user
        }
    }

    renderSuggestion() {
        return(
           <ScrollView contentContainerStyle={{width: '100%'}}>

                {this.state.suggestions.map(location => (
                    <TouchableOpacity style = {styles.listItem}
                        onPress = {()=> this.setState( {location} , function() {
                            // set the props.location to location
                            this.props.location(location);
                            this.state.suggestions.length = 0 // empty the array
                        }) }>

                        <Text style = {{fontStyle: 'italic', fontSize: 16}}>
                            {location}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }



    mutateSuggestions(input) {
        const { searched, subset, suggestions, requested } = this.state;

        if (!requested) {
            this.setState({
                location: input, 
                requested: true }, () => {
                    if (!suggestions.length)
                        this.getSuggestions();
            });     
        } else {
            let _suggestion = [] 

            if (!searched) {
                this.setState({
                    subset: bs_leftmost(suggestions, input),
                    searched: true
                })
            }
            for (let i = 0; i < subset.length; i++) {
                let match = true;
                for (let j = 0; j < input.length; j++) {
                    if (input[j] !== subset[i][j]) {
                        match = false;
                        break;
                    } 
                }
                if (match) _suggestion.push(subset[i])
            }
            this.setState({ suggestions: _suggestion })   
        }
    }


    render() {
 
        const { location } = this.state;

        return (
            <View style = {{flex:1,justifyContent: 'space-between', width: '100%'}}>
                <View style={styles.navBar}>
                    <TouchableOpacity style= {styles.settings}
                        onPress = {()=> this.props.navigation.navigate('Profile')}>

                        <Image style = {styles.image} 
                            source={require('../assets/icons/settings.png')}/>

                    </TouchableOpacity>

                    <TextInput
                        style={styles.textfield}
                        placeholder = 'Location'
                        defaultValue = {location}
                        returnKeyType = {'next'}
                        onChangeText = { async (input) => {

                            if (input.length ===  1) {
                                this.props.location('');
                                this.setState({
                                    suggestions : [], 
                                    searched: false, 
                                    requested: false
                                })
                            } else {
                                this.mutateSuggestions(input);
                            }
                        }}

                        onSubmitEditing = { () => {
                            // can be useful
                        }}
                        onFocus = { () => {
                            // can be useful
                        }}
                    />

                    <TouchableOpacity style= {styles.settings}
                        onPress = {()=> {
                            this.props.navigation.navigate('CheckOut')
                        }}>

                        <Image style = {styles.image} 
                            source={require('../assets/icons/trolley.png')}/>

                    </TouchableOpacity>
                </View>
                <View style = {{flex: 1}}>
                    {location !== '' ? this.renderSuggestion() : null}                
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    navBar: {
        flex: 1,
        flexDirection: 'row',        
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'rgba(55,55,55,0.5)',
        backgroundColor: 'white',
        paddingHorizontal: '1%',
        paddingTop: '1%', // reduce these two to make the Header Comp shorter in height
        paddingBottom: '5%', // reduce these two to make the Header Comp shorter in height
        backgroundColor: 'rgba(155,155,155,0.1)'
    },
    textfield:{
        flex: 5,
        borderWidth: 1,
        borderColor: 'rgba(55,55,55,0.5)',
        borderRadius: 10,    
        
        marginHorizontal: '1%',
        paddingHorizontal: '2%',
        paddingTop: '2%',
        paddingBottom: '2%',
        
        backgroundColor: 'white',
        color: "black",
        fontStyle: 'italic',
        fontSize: 18,
    },
    settings:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        // borderWidth: 1,
        // borderColor: 'red',
        // borderRadius: 30,   
    },
    image:{
        width: 32,
        height: 32,
    },
    listItem: {
        alignItems: 'center',
        paddingVertical: 2,
        borderBottomColor: 'rgba(255, 114, 114,0.9)',
        borderBottomWidth: 1,        
        backgroundColor: 'rgba(165, 185, 255, 0.95)',
    }
});


export default withNavigation(Header);




// for (let i = 0; i < suggestions.length; i++) {
//     let match = true;
//     for (let j = 0; j < input.length; j++)
//         match = input[j] !== suggestions[i][j] ? false : true;
//     if (match) _suggestion.push(suggestions[i])
// }



// if (!input.length) {
// this.props.location('');
// this.setState({
//     suggestions : [], 
//     searched: false, 
//     requested: false
// })
// } else {
// if (!requested) {
//     this.setState({
//             location: input, 
//             requested: true
//         }, () => {
//             if (!suggestions.length) {
//                 this.getSuggestions();
//             }
//     });     
// } else {
//     let _suggestion = [] 

//     if (!searched) {
//         this.setState({
//             subset: this.bs_leftmost(suggestions, input),
//             searched: true
//         })
//     }

//     for (let i = 0; i < subset.length; i++) {
//         let match = true;
//         for (let j = 0; j < input.length; j++) {
//             // match = input[j] === subset[i][j] ? true : false;
//             if (input[j] !== subset[i][j]) {
//                 match = false;
//                 break;
//             }
//         }
//         if (match) _suggestion.push(subset[i])
//     }

//     this.setState({ suggestions: _suggestion })   
// }

// }
