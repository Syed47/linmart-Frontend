import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TextInput,
        Image,
        TouchableOpacity,
        ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { bs_leftmost } from './util';

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

                                // this.setState({
                                //         location: input, 
                                //         requested: true
                                //     }, () => {
          // this.getSuggestions();
                                // });   

    }

    async getSuggestions() {
        const response = await fetch('http://192.168.0.11:4000/getLocationSuggestions', {
            method: 'POST', 
            body: JSON.stringify({location: this.state.location}),
            headers:{'Content-Type': 'application/json'}
        });
        try {
            const data = await response.json();
            this.setState({suggestions: data.sort()})
        } catch(err) {
            alert(err)
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
                    requested: true
                }, () => {
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
                    <TextInput
                        style={styles.textfield}
                        placeholder = 'Location'
                        defaultValue = {location}
                        returnKeyType = {'next'}
                        onChangeText = { async (input) => {

                            if (!input.length) {
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
                            source={require('./icons/basket.png')}/>

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
        justifyContent: 'space-between',
        borderWidth: 1,
        backgroundColor: 'white',
        padding: 5,
        maxHeight: 55
    },
    textfield:{
        flex: 7,    
        marginHorizontal: 5,
        color: "black",
        fontStyle: 'italic',
        fontSize: 18,
    },
    settings:{
        flex: 1,
    },
    image:{
        width: 40,
        height: 40,
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
