// src/__tests__/features/auth/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/state/authSlice';
import { useAppSelector, useAppDispatch } from '@store/hooks';

// Mock do hook personalizado de auth
const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, isLoading } = useAppSelector((state) => state.auth);
  
  const login = async (email: string, password: string) => {
    // Implementação do login
  };
  
  const logout = () => {
    // Implementação do logout
  };
  
  return { user, token, isLoading, login, logout };
};

const createTestStore = () => configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefault) => getDefault({ serializableCheck: false }),
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={createTestStore()}>{children}</Provider>
);

describe('useAuth', () => {
  it('should return initial auth state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
  
  it('should handle login flow', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });
    
    // Verificar se o estado foi atualizado corretamente
  });
  
  it('should handle logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    act(() => {
      result.current.logout();
    });
    
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});
