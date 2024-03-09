import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable,Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function RegisterScreen() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [name, setname] = useState('');
    const navigation = useNavigation();

    const handleRegistration = () => {
        const user = {
            name: name,
            email: email,
            password: password

        };
       let result=  axios.post('http://192.168.78.223:3100/register', user).then((response) => {
            //console.log(response);
            Alert.alert('Registration sucessfull you have been regsitered successfully!');
            setname(''),
                setemail('');
                setpassword('');
        }).catch((err) => {
            Alert.alert('Registration failed an error occured during registration!,');
            console.log("errorrrr," + err);
        })
        //console.log('result post,'+result);
    }

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: "white", alignItems: 'center'
        }}>
            <View style={{ marginTop: 50 }}>
                <Image source={{ uri: 'https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png' }} style={{
                    width: 150, height: 100, objectFit: 'contain'
                }} />

            </View>



            <KeyboardAvoidingView>
                <View style={{
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 17, fontWeight: 'bold', marginTop: 25
                    }}>
                        Register to your account
                    </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row', alignItems: 'center', borderColor: '#D0D0D0', borderWidth: 1, gap: 5, paddingVertical: 5, borderRadius: 5
                    }}>
                        <Ionicons style={{ marginLeft: 8 }} name="person" size={24} color="gray" />
                        <TextInput
                            value={name}
                            onChangeText={(text) => setname(text)}
                            style={{
                                color: 'gray', marginVertical: 10, width: 300, fontSize: email ? 16 : 16
                            }} placeholder='enter your Name' placeholderTextColor={'gray'} />

                    </View>
                    <View style={{
                        marginTop: 30,
                        display: 'flex',
                        flexDirection: 'row', alignItems: 'center', borderColor: '#D0D0D0', borderWidth: 1, gap: 5, paddingVertical: 5, borderRadius: 5
                    }}>
                        <MaterialIcons style={{
                            marginLeft: 8
                        }} name="email" size={24} color="gray" />
                        <TextInput
                            value={email}
                            onChangeText={(text) => setemail(text)}
                            style={{
                                color: 'gray', marginVertical: 10, width: 300, fontSize: email ? 16 : 16
                            }} placeholder='enter your Email' placeholderTextColor={'gray'} />

                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row', alignItems: 'center', borderColor: '#D0D0D0', borderWidth: 1, gap: 5, paddingVertical: 5, borderRadius: 5
                        }}>
                            <AntDesign style={{
                                marginLeft: 8
                            }} name="lock" size={24} color="gray" />
                            <TextInput
                                secureTextEntry={true}
                                password={password}
                                onChangeText={(text) => setpassword(text)}
                                style={{
                                    color: 'gray', marginVertical: 10, width: 300, fontSize: password ? 16 : 16
                                }} placeholder='enter your Password' placeholderTextColor={'gray'} />

                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', marginTop: 12
                        }}>
                            <Text>Keep me logged in</Text>
                            <Text style={{
                                fontWeight: '500',
                                color: '#007FFF'
                            }}>Forgot password?</Text>
                        </View>

                    </View>


                </View>
                <View style={{ marginTop: 45 }} />
                <Pressable
                    onPress={handleRegistration}
                    style={{
                        width: 200, backgroundColor: 'black', padding: 15, marginTop: 40, marginLeft: 'auto', marginRight: 'auto', borderRadius: 6
                    }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'white'
                    }}>Register</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Login')}
                    style={{
                        marginTop: 10
                    }}>
                    <Text style={{
                        textAlign: 'center', fontSize: 16
                    }}>Already have an account? Sign In</Text>
                </Pressable>
            </KeyboardAvoidingView>



        </SafeAreaView>
    )
}


const styles = StyleSheet.create({})
