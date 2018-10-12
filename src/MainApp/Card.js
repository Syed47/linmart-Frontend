import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const Card = props => {

    const { navigate } = props.navigation;
    const {name, area, status, rating, phone, menu } = props.info;
    const arr = new Array(rating).fill(
            <Image style={styles.star} 
                   source={require('./icons/greenstar.png')} />
        )

    return(
        <TouchableOpacity style = {styles.main}
            onPress={() => navigate('Details', {info: props.info})}>

            <View style={styles.thumbnail_wrapper}>
                <Image style = {styles.thumbnail}
                    source = {require('./icons/store.png')}/>
            </View>

            <View style={styles.info_wrapper}>

                <View style={styles.name_wrapper}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                </View>

                <View style={styles.status_wrapper}>
                    <Text style={styles.area}>
                        {area}
                    </Text>
                    <Text style={styles.status}>
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
    status:{
        fontSize: 18,
        color: 'rgba(32, 219, 104,1)' ,
        margin:5,
    },
    area: {
        fontSize: 18,
        color: 'rgba(159, 104, 255, 1)',
        margin:5,
    },
});

export default withNavigation(Card);
