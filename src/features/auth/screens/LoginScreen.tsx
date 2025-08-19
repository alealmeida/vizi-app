// src/modules/auth/screens/LoginScreen.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'expo-router';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import AuthBaseScreen from '@shared/components/layout/AuthBaseScreen';
import FormInput from '@shared/forms/FormInput';
import Button from '@ui/components/atoms/Button';
import ErrorMessage from '@shared/components/feedback/ErrorMessage';

import { authLogin } from '@features/auth/state/thunks';
import { resetAuthError } from '@features/auth/state/authSlice';

const schema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});
type LoginFormData = z.infer<typeof schema>;

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const authError   = useAppSelector((s) => s.auth.error);
  const authLoading = useAppSelector((s) => s.auth.loading);

  useEffect(() => {
    if (authError) dispatch(resetAuthError());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, touchedFields, isSubmitted },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
    mode: 'onBlur',          // ✅ validação só no blur
    reValidateMode: 'onBlur' // ✅ revalida também só no blur
  });

  const email = watch('email');
  const password = watch('password');

  // Habilita botão com regra leve — sem validar a cada tecla:
  // - email: apenas não-vazio (formato será checado no blur/submit)
  // - senha: pelo menos 6 chars
  const canSubmit = email.trim().length > 0 && password.length >= 1;
  const loading = authLoading || isSubmitting;

  // Exibe erro somente se o campo foi tocado (blur) ou após submit
  const emailError =
    (touchedFields.email || isSubmitted) ? errors.email?.message : undefined;
  const passwordError =
    (touchedFields.password || isSubmitted) ? errors.password?.message : undefined;

  const onSubmit = async (data: LoginFormData) => {
    if (authError) dispatch(resetAuthError());
    const res = await dispatch(authLogin({ identifier: data.email, password: data.password }));
    if (authLogin.rejected.match(res)) return;
    // Perfil já carregado via /api/usuarios/me pelo bootstrap do slice de usuário
    // Guard no layout redireciona
  };

  return (
    <AuthBaseScreen>
      <View style={styles.container}>
        <FormInput
          name="email"
          control={control}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          error={emailError}         // ✅ só mostra no blur/submit
        />

        <FormInput
          name="password"
          control={control}
          placeholder="Senha"
          secureTextEntry
          textContentType="password"
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={() => void handleSubmit(onSubmit)()}
          error={passwordError}      // ✅ só mostra no blur/submit
        />

        {authError ? <ErrorMessage message={authError} /> : null}

        <Button
          label="Entrar"
          onPress={() => void handleSubmit(onSubmit)()}
          loading={loading}
          disabled={!canSubmit || loading}  // ✅ habilita enquanto digita
        />

        <Link href="/(auth)/register" style={{ textAlign: 'center', marginTop: 12 }}>
          Criar conta
        </Link>
      </View>
    </AuthBaseScreen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, flex: 1, justifyContent: 'center', gap: 16 },
});