import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function RootNavigator() {
  const token = useSelector((state: RootState) => state.userSession.token);

  return (
    <NavigationContainer>
      {token ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}