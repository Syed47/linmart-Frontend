import React from 'react';
import { 
        View, 
        Text, 
        StyleSheet,
        Image, 
        ScrollView,
        TouchableOpacity,
        Dimensions 
    } from 'react-native';

import Header from  './Header';
import Card from './Card';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'http://172.20.10.2:4000/getMembers', // get from the browser sidebar in expo tab
            passedInfo: [], // only stores the original data that comes from the server
            members: [] // this is the altered data
        }

        this.filterByLocation = this.filterByLocation.bind(this)

        this.fetchData()
    }

    // Request to the server to get members data
    fetchData() {
        fetch(this.state.url)
            .then(res => res.json())
            .then(data => { 
                this.setState({ passedInfo : data.members }, () => {
                    this.setState({members: this.state.passedInfo})
                    members_data = this.state.passedInfo;
                });
            })
            .catch(err => alert(err)) 
    }

    // Render each member from the data received
    renderMembers(members){
        const cards = members.map((member, index) => {
            return ( <Card info={member} key = {index} nav = {true}/> )
        });
        return cards;
    } 


    filterData(callback) {
        const filteredData = this.state.passedInfo.filter(callback);
        this.setState({members: filteredData})    
    }


    filterBycatagory(ctg) {
        //@param : by -> needs to be either 'shop' or 'res'
        if (ctg !== 'shop' && ctg !== 'restaurant')  return;
        this.filterData(item => item.catagory === ctg)
        // const filteredData = this.state.passedInfo.filter(({catagory}) => catagory === by);
        // this.setState({members: filteredData})
    }

    filterByLocation(loc) {
        if (loc) {
            this.filterData(item => item.area === loc);
        } else {
            this.setState({ members: this.state.passedInfo})
        }
    }

    searchFilter() {
        return (
            <View style={styles.style_main}>
                <View style={styles.wrapper}>

                    <TouchableOpacity style={styles.button_shape}
                        onPress={() => this.filterBycatagory('shop')}>
                        <Text style={styles.text}>Super-Stores</Text>
                        <Image source={require('./icons/supermarket.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button_shape}
                        onPress={() => this.filterBycatagory('restaurant')}>
                        <Text style={styles.text}>Restaurants</Text>
                        <Image source={require('./icons/resturant.png')} />
                    </TouchableOpacity>

                </View>
            </View>
        )   
    }

    render() { 
        return (
            <View style={styles.main}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    <Header location = {this.filterByLocation}/>
                    {this.searchFilter()}
                    {this.renderMembers(this.state.members)}
                </ScrollView>
            </View>
        )
    } 
}

console.disableYellowBox = true
const styles = StyleSheet.create({
    // Home Styling
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
    }, 
    // searchFilter Styling
    style_main: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(165, 185, 255, 0.95)', //'rgba(252, 128, 128,0.8)',
        maxHeight: 55,
        padding: 2,
    },
    wrapper:{
        flex: 1,    
        flexDirection: 'row',
    },
    button_shape:{
        flex: 1,
        flexDirection: 'row',
        borderRadius: 30,
        backgroundColor: 'rgba(255, 114, 114,0.9)',//'rgba(255, 50, 200, 0.5)
        alignItems: 'center', 
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginHorizontal: 3,
    },
    text:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        paddingRight: 5
    }
});


export default Home;
