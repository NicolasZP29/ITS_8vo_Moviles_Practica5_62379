// register.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { registerUser } from '../services/api';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (text: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(text);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo válido.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      const response = await registerUser(email, password);
      if (response.success) {
        Alert.alert('Registro Exitoso', 'Ya puedes iniciar sesión.', [
          {
            text: 'OK',
            onPress: () => {
              requestAnimationFrame(() => {
                router.replace("/login");
              });
            }
          }
        ]);
      } else {
        Alert.alert('Error', 'No se pudo registrar el usuario.');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Ocurrió un error durante el registro.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#622774', '#C53364']}
        style={styles.gradientBackground}
      >
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/images/todo_icon.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>Registrarse</Text>

          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="person-outline"
              size={20}
              color="#AAA"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#AAA"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
          </View>

          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="lock-outline"
              size={20}
              color="#AAA"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#AAA"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginButtonText}>REGISTRAR</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            requestAnimationFrame(() => {
              router.replace("/login");
            });
          }}>
            <Text style={styles.registerLink}>
              ¿Ya tienes cuenta? Inicia Sesión
            </Text>
          </TouchableOpacity>

        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    color: '#FFF',
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#FFF',
    paddingVertical: 12,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#C53364',
    fontSize: 16,
    fontWeight: '600',
  },
  registerLink: {
    color: '#FFF',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
