import React from 'react';
import { View, Text, StyleSheet, ScrollView,TouchableOpacity,Dimensions } from 'react-native';

import Header from  './Header';
import SearchFilter from './SearchFilter';
import Card from './Card';

class Home extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://172.23.1.27:3000', // get from the browser sidebar
            passedInfo: [],
        }
        
        this.fetchData()
    }
    // Request to the server to get members data
    fetchData() {
        fetch(this.state.url)
        .then(res => res.json())
        .then(data => { this.setState({passedInfo : data.members })})
        .catch(err => alert(err)) 
    }

    // Render each member to the data received
    renderMembers = members =>  members.map((members, index) => <Card info={members} key = {index}/>);

    render = () => { return (
        <View style={styles.main}>

            <ScrollView contentContainerStyle={styles.scroll} 
                    onRefresh = {()=> this.fetchData()} >
                <Header />
                <SearchFilter />
                {this.renderMembers(this.state.passedInfo)}
            </ScrollView>

        </View>
    )} 
}


const styles = StyleSheet.create({
    main:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',  
        width: Dimensions.get('window').width,    
    },
    scroll:{
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '100%',
    }
});


export default Home;
