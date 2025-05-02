import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '@/api/auth/register';
import { saveSession } from '@/utils/sessionStorage';
import { setCredentials } from '@/features/userSession/userSessionSlice';
import BaseScreen from '@/components/BaseScreen';
import ViziInput from '@/components/ViziInput';
import ViziButton from '@/components/ViziButton';
import { theme } from '@/styles/theme';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await registerUser(username, email, password);
      await saveSession(res.jwt, res.user);
      dispatch(setCredentials({
        token: res.jwt,
        user: {
          id: res.user.id.toString(),
          username: res.user.username,
          email: res.user.email,
        },
      }));
    } catch {
      alert('Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseScreen>
      <Text style={styles.title}>Criar conta</Text>

      <View style={styles.form}>
        <ViziInput
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
        />
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
          title="Cadastrar"
          loading={loading}
          onPress={handleRegister}
          variant="filled"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <ViziButton
          title="Já tenho uma conta"
          variant="outlined"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  },
  form: {
    gap: theme.spacing.md,
    width: '100%',
  },
  buttonWrapper: {
    marginTop: theme.spacing.lg,
    width: '100%',
  },
});