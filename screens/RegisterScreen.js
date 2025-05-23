import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { COLORS, FONTS, SIZES } from '../constants';

// 2124802010151 - Lê Sỹ Hoài
// 2124802010172 - Cao Thành Phát
// 2124802010807 - Nguyễn Đức Thắng

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://192.168.153.19:7181/api/Auth/register', form);
      Alert.alert('Đăng ký thành công', `Chào mừng ${res.data.username}`, [
        { text: 'Đăng nhập', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert(
        'Đăng ký thất bại',
        error.response?.data?.message || 'Lỗi không xác định'
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tạo tài khoản</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={COLORS.gray}
        style={styles.input}
        value={form.username}
        onChangeText={(text) => handleChange('username', text)}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor={COLORS.gray}
        keyboardType="email-address"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={COLORS.gray}
        secureTextEntry
        style={styles.input}
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
      />
      <TextInput
        placeholder="First Name"
        placeholderTextColor={COLORS.gray}
        style={styles.input}
        value={form.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor={COLORS.gray}
        style={styles.input}
        value={form.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerText}>Đăng ký</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginRedirect}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    flexGrow: 1,
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
  registerButton: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.padding
  },
  registerText: {
    color: COLORS.white,
    ...FONTS.h3
  },
  loginRedirect: {
    color: COLORS.lightGray,
    textAlign: 'center',
    ...FONTS.body4,
    textDecorationLine: 'underline'
  }
});
