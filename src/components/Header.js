import React from 'react';
import { View, 
        Text, 
        StyleSheet, 
        TextInput,
        Image,
        TouchableOpacity,
        ScrollView 
    } from 'react-native';
import { withNavigation } from 'react-navigation';

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            location: '',
            suggestions: []
        }
    }

    async getSuggestions() {
        const response = await fetch('http://192.168.0.11:4000/getLocationsSuggestions', {
            method: 'POST', 
            body: JSON.stringify({location: this.state.location}),
            headers:{'Content-Type': 'application/json'}
        });
        try {
            const data = await response.json();
            this.setState({suggestions: data})
            // alert("requesting")
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
                            this.state.suggestions.length = 0
                        }) }>

                        <Text style = {{fontStyle: 'italic', fontSize: 16}}>
                            {location}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }

    render() {
 
        const { location, suggestions } = this.state;

        return (
            <View style = {{flex:1,justifyContent: 'space-between', width: '100%'}}>
                <View style={styles.navBar}>
                    <TextInput
                        style={styles.textfield}
                        placeholder = 'Location'
                        defaultValue = {location}
                        returnKeyType="next"
                        onChangeText = {async (input)=> {
                            if (input.length > 1) {
                                this.setState({location: input}, ()=>{
                                    suggestions.length === 0 ? this.getSuggestions(): null;
                                });       

                            // make this code cleaner *******************

                            } else if (input.length === 0){
                                this.props.location('');
                            } else {
                                this.setState({suggestions: []})
                            }
                        }}

                        onSubmitEditing = {() => {
                            
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

