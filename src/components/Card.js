import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const Card = props => {
    const { navigate } = props.navigation;

    // id is the memberid (om server)of the member in the database
    const {id, membername, area, status, rating, phone } = props.info;
    const ratingIcon = <Image style={styles.star} 
                         source={require('./icons/greenstar.png')} />

    const arr = new Array(rating).fill(ratingIcon)

    return(
        <TouchableOpacity style = {styles.main}
            onPress={ async () => {
                if (props.nav) { // validate/allow navigation
                    const response = await fetch('http://172.20.10.2:4000/getItems', {
                        method: 'POST', 
                        body: JSON.stringify({
                            // memberid: id -> use this get member by id, remove the other 2
                            membername: membername,
                            area: area
                        }),
                        headers:{'Content-Type': 'application/json'}
                    });
                    try {
                        const data = await response.json();
                        // alert(JSON.stringify(data))
                        // data.status === 200 ? props.info.menu = data : props.info.menu = []
                        if(response.status === 200 && status === 'open') {
                            props.info.menu = data
                            data.length === 0 ? alert(`Sorry! ${membername} have no items for sale!`) : null
                        } else if (status === 'close'){
                            alert(`Sorry! ${membername} is close at the moment!`)
                            props.info.menu = []// assign blank array to avoid errors further in the app
                        } else {
                            alert(`Sorry! ${membername} is not providing the service. You may call them for any help.`)
                            props.info.menu = []// assign blank array to avoid errors further in the app
                        }
                        navigate('Stack', {info: props.info});
                    } catch(err) {
                        alert(err)
                    }
                }
            }}>

            <View style={styles.thumbnail_wrapper}>
                <Image style = {styles.thumbnail}
                    source = {require('./icons/store.png')}/>
            </View>

            <View style={styles.info_wrapper}>

                <View style={styles.name_wrapper}>
                    <Text style={styles.name}>
                        {membername}
                    </Text>
                </View>

                <View style={styles.status_wrapper}>
                    <Text style={styles.area}>
                        {area}
                    </Text>
                    <Text style={{fontSize: 18, margin: 5,color:status === 'open' ? 'lime' : 'red'}}>
                        {status}
                    </Text> 
                </View>

                <View style={styles.rating_wrapper}>
                    <View style={styles.stars}>
                        {arr.map(star => star)}
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    main:{
        flex:1,
        flexDirection: 'row',        
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white', //'rgba(155, 255, 168, 0.8)',
        borderRadius: 4,
        minWidth:'100%',
        maxWidth: '100%',
        marginVertical: 2,
        backgroundColor: 'white'//'rgba(155, 255, 168, 0.8)'
    },

    thumbnail_wrapper:{
        flex: 1,
        justifyContent: 'space-evenly',   
        alignItems: 'center',     
        backgroundColor: 'rgba(125,125,125,0.8)',
        borderRadius: 4,
    },
    info_wrapper:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: 'white',//'rgba(209, 255, 180,1)', 
        borderRadius: 4,
    },
    thumbnail: {
        flex: 1,
        borderRadius: 25,
        minWidth: '95%',
        minWidth: '100%'
    },
    name_wrapper:{
        flex: 1,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        paddingTop: 5,
    },
    status_wrapper:{
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomColor: 'red',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    rating_wrapper:{
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 5,

    },
    stars:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    star:{margin: 2},

    name:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgba(94, 153, 255,1)',
    },
    // status:{ still usable if needed
    //     fontSize: 18,
    //     //color: 'lime',//'rgba(32, 219, 104,1)' ,
    //     margin:5,
    // },
    area: {
        fontSize: 18,
        color: 'rgba(159, 104, 255, 1)',
        margin:5,
    },
});

export default withNavigation(Card);
