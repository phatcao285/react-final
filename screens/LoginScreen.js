import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES } from '../constants';

// 2124802010151 - Lê Sỹ Hoài
// 2124802010172 - Cao Thành Phát
// 2124802010807 - Nguyễn Đức Thắng

export default function LoginScreen({ navigation }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://192.168.153.19:7181/api/Auth/login', form);
      await AsyncStorage.setItem('token', res.data.token);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Đăng nhập thất bại', error.response?.data?.message || 'Sai tài khoản hoặc mật khẩu');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={COLORS.gray}
        style={styles.input}
        value={form.username}
        onChangeText={(text) => handleChange('username', text)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={COLORS.gray}
        secureTextEntry
        style={styles.input}
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Chưa có tài khoản? Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    padding: SIZES.padding * 2
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
    marginBottom: SIZES.padding * 2,
    textAlign: 'center'
  },
  input: {
    backgroundColor: COLORS.lightGray,
    color: COLORS.white,
    borderRadius: SIZES.radius,
    height: 50,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.radius,
    ...FONTS.body3
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding
  },
  loginText: {
    color: COLORS.white,
    ...FONTS.h3
  },
  registerText: {
    color: COLORS.lightGray,
    textAlign: 'center',
    ...FONTS.body4,
    textDecorationLine: 'underline'
  }
});
