// src/modules/auth/screens/RegisterScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'expo-router';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import BaseScreen from '@shared/components/layout/BaseScreen';
import Input from '@shared/components/ui/Input';
import Button from '@shared/components/ui/Button';
import ErrorMessage from '@shared/components/feedback/ErrorMessage';

import { authRegister } from '@modules/auth/state/thunks';
import { resetAuthError } from '@modules/auth/state/authSlice';

const schema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});
type RegisterFormData = z.infer<typeof schema>;

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const authError   = useAppSelector((s) => s.auth.error);
  const authLoading = useAppSelector((s) => s.auth.loading);

  useEffect(() => {
    if (authError) dispatch(resetAuthError());
  }, [dispatch]);

  const { control, handleSubmit, formState: { errors, isSubmitting, isValid } } =
    useForm<RegisterFormData>({
      resolver: zodResolver(schema),
      defaultValues: { email: '', password: '' },
      mode: 'onBlur',
    });

  const onSubmit = async (data: RegisterFormData) => {
    if (authError) dispatch(resetAuthError());
    const username = data.email.split('@')[0];
    const res = await dispatch(authRegister({ username, email: data.email, password: data.password }));
    if (authRegister.rejected.match(res)) return;
    // guard redireciona após token
  };

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Input
          name="email"
          control={control}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          error={errors.email?.message}
        />
        <Input
          name="password"
          control={control}
          placeholder="Senha"
          secureTextEntry
          error={errors.password?.message}
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onSubmit)}
        />

        {authError ? <ErrorMessage message={authError} /> : null}

        <Button
          label={authLoading || isSubmitting ? 'Cadastrando…' : 'Cadastrar'}
          onPress={handleSubmit(onSubmit)}
          disabled={authLoading || isSubmitting || !isValid}
        />

        <Link href="/(auth)/login" style={{ textAlign: 'center', marginTop: 12 }}>
          Entrar na conta
        </Link>
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center', gap: 16 },
});