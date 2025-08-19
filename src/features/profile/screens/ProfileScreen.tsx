import React from 'react';
import BaseScreen from '@shared/components/layout/BaseScreen';
import Button from '@ui/components/atoms/Button';
import Box from '@ui/components/primitives/Box';
import Text from '@ui/components/primitives/Text';
import Card from '@ui/components/molecules/Card';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useRouter } from 'expo-router';
import { selectAuthToken, selectUserProfile, selectUserLoading } from '@store/selectors';
import { useThemeMode } from '@ui/theme/provider';
import IconButton from '@ui/components/atoms/IconButton';
import Divider from '@ui/components/atoms/Divider';
import { useFocusEffect } from '@react-navigation/native';
import { refreshMe } from '@features/auth/state/thunks';
import { loadUserExpanded } from '@features/user/state/thunks';
import { selectCondominioNome, selectTipoUsuario } from '@features/user/state/userSlice';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserProfile);
  const token = useAppSelector(selectAuthToken);
  const userLoading = useAppSelector(selectUserLoading);
  const tipoUsuario = useAppSelector(selectTipoUsuario);
  const condominioNome = useAppSelector(selectCondominioNome);
  const email = user?.email ?? '—';
  const username = user?.username ?? '—';

  const { mode, setMode, isDark } = useThemeMode();
  const modeLabel = mode === 'system' ? 'Sistema' : mode === 'light' ? 'Claro' : 'Escuro';
  const modeIcon = mode === 'system' ? '🖥️' : isDark ? '🌙' : '☀️';

  function cycleMode() {
    // system -> light -> dark -> system
    const next = mode === 'system' ? 'light' : mode === 'light' ? 'dark' : 'system';
    setMode(next);
  }

  // logs removidos

  // Garante que o perfil está atualizado ao focar a tela
  useFocusEffect(
    React.useCallback(() => {
      if (token && !user) {
        dispatch(refreshMe());
      } else if (token && user && (!user.condominio || !user.tipo_usuario)) {
        dispatch(loadUserExpanded());
      }
      return () => {};
    }, [token, user, dispatch])
  );

  // Fallback de loading enquanto busca o perfil
  if (token && !user) {
    return (
      <BaseScreen>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text variant="caption" color="textSecondary">
            {userLoading ? 'Carregando perfil…' : 'Preparando perfil…'}
          </Text>
        </Box>
      </BaseScreen>
    );
  }

  return (
    <BaseScreen>
      <Box flex={1} padding="lg">
        {/* Header: título + toggle com IconButton */}
        <Box flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text variant="heading">Meu Perfil</Text>
          <IconButton
            variant="ghost"
            size="sm"
            accessibilityLabel={`Alternar tema. Atual: ${modeLabel}`}
            icon={<Text variant="body">{modeIcon}</Text>}
            onPress={cycleMode}
          />
        </Box>

        <Divider marginTop="md" />

        <Card padding="lg" marginTop="lg">
          <Text variant="caption" color="textSecondary">Usuário</Text>
          <Text variant="title" marginTop="xs">{username}</Text>

          <Text variant="caption" color="textSecondary" marginTop="sm">E-mail</Text>
          <Text variant="body" marginTop="xs">{email}</Text>

          {tipoUsuario ? (
            <>
              <Text variant="caption" color="textSecondary" marginTop="sm">Tipo</Text>
              <Text variant="body" marginTop="xs">{tipoUsuario}</Text>
            </>
          ) : null}

          {condominioNome ? (
            <>
              <Text variant="caption" color="textSecondary" marginTop="sm">Condomínio</Text>
              <Text variant="body" marginTop="xs">{condominioNome}{user?.condominio?.bairro ? ` · ${user.condominio.bairro}` : ''}</Text>
            </>
          ) : null}
        </Card>

        <Box marginTop="lg">
          <Button
            label="Sair da conta"
            onPress={() => router.push('/logout')}
            variant="outline"
          />
        </Box>
      </Box>
    </BaseScreen>
  );
}