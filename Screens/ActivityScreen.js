import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component, useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { UserType } from '../UserContext';
import "core-js/stable/atob";
import User from '../API/Models/User';

export default function ActivityScreen() {
    const [selectedButton, setselectedButton] = useState('people');
    const [selectedContent, setselectedContent] = useState('People Content');
    const [users, setUsers] = useState([]);
    const { userId, setuserId } = useContext(UserType);
    // const handleButtonName=(buttonname)=>{
    //     selectedButton(buttonname);
    // }
    useEffect(() => {
        const fetchUsers = async () => {
            const token = await AsyncStorage.getItem('authToken');
           

            const decodedToken = jwtDecode(token);

            console.log(decodedToken);

            const userid = decodedToken.userId;
            console.log('usrid:', userid);
            await setuserId(userid);
            console.log('usrId:', userId);
            await axios.get(`http://192.168.78.223:3100/users/${userId}`).then((response) => {
                setUsers(response.data);
            }).catch((err) => { console.log('err', err); })

          
        };
        fetchUsers();
    }, [])

    console.log('users:', users);

    return (
        <ScrollView style={{
            marginTop: 50
        }}>
            <View style={{
                padding: 10
            }}>
                <Text style={{
                    fontSize: 18, fontWeight: 'bold'
                }}
                > Activity </Text>
                <View style={{
                    gab: 10, marginTop: 12, flexDirection: 'row', alignItems: 'center', display: 'flex'
                }}>
                    <TouchableOpacity
                        onPress={() => { setselectedButton('people') }}
                        style={[
                            {
                                flex: 1,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: 'white',
                                marginRight: 5,
                                borderRadius: 6,
                                borderWidth: .7,
                                borderColor: '#D0D0D0'
                            }, selectedButton === 'people' ? { backgroundColor: 'black' } : null
                        ]}>
                        <Text
                            style={
                                [
                                    {
                                        textAlign: 'center', fontWeight: 'bold'
                                    }, selectedButton === 'people' ? { color: 'white' } : { color: 'black' }
                                ]
                            }
                        >People</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setselectedButton('all') }}
                        style={[
                            {
                                flex: 1, marginRight: 5,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: 'white',
                                borderRadius: 6,
                                borderWidth: .7,
                                borderColor: '#D0D0D0'
                            }, selectedButton === 'all' ? { backgroundColor: 'black' } : null
                        ]}>
                        <Text
                            style={
                                [
                                    {
                                        textAlign: 'center', fontWeight: 'bold'
                                    }, selectedButton === 'all' ? { color: 'white' } : { color: 'black' }
                                ]
                            }
                        >All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setselectedButton('requests') }}
                        style={[
                            {
                                flex: 1,
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                backgroundColor: 'white',
                                borderRadius: 6,
                                borderWidth: .7,
                                borderColor: '#D0D0D0'
                            }, selectedButton === 'requests' ? { backgroundColor: 'black' } : null
                        ]}>
                        <Text
                            style={
                                [
                                    {
                                        textAlign: 'center', fontWeight: 'bold'
                                    }, selectedButton === 'requests' ? { color: 'white' } : { color: 'black' }
                                ]
                            }
                        >Requests</Text>
                    </TouchableOpacity>
                </View>
                <View>
               { selectedButton === 'people'  && users!== null? <View>
               <Text>test test</Text>
               <Text>tes test test</Text>
              { users?.map((item,index)=>
                                <Text>hello</Text>
                                )}
               </View> :<Text> test 2 test2</Text>}
                </View>
                {/* <View>
                    {selectedButton==='people'} &&(
                        <View>
                            <Text>hello</Text>
                            {
                                users?.map((item,index)=>
                                <Text>hello</Text>
                                )
                            }
                        </View>
                    )
                </View> */}
            </View>

        </ScrollView>
    )

}

const styles = StyleSheet.create({})
