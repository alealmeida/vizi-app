import { Text, View, Input, Button } from 'tamagui'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { loginUser } from '@/api/auth/login'
import { saveSession } from '@/utils/sessionStorage'
import { setCredentials } from '@/features/userSession/userSessionSlice'
import BaseScreen from '@/components/BaseScreen'

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      await saveSession(res.jwt, res.user);
      dispatch(
        setCredentials({
          token: res.jwt,
          user: {
            id: res.user.id.toString(),
            username: res.user.username,
            email: res.user.email,
          },
        })
      );
    } catch {
      alert('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseScreen>
      <Text style={styles.title}>Bem-vindo ao Vizi</Text>

      <View style={styles.form}>
        <ViziInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <ViziInput
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <ViziButton
          title="Entrar"
          loading={loading}
          onPress={handleLogin}
          variant="filled"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <ViziButton
          title="Cadastre-se"
          onPress={() => navigation.navigate('Register')}
          variant="outlined"
        />
      </View>
    </BaseScreen>
  );
}