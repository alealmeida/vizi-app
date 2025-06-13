import { FlatList } from 'react-native'
import { Text as TamaguiText, View, Button } from 'tamagui'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { logout } from '@/features/userSession/userSessionSlice'
import { clearSession } from '@/utils/sessionStorage'
import BaseScreen from '@/components/BaseScreen'
import { PostCard } from '@/components/PostCard'

const dummyPosts = [
  { id: '1', title: 'Bicicleta para troca' },
  { id: '2', title: 'Doação de livros' },
  { id: '3', title: 'Venda de sofá' },
]

export default function FeedScreen() {
  const user = useSelector((state: RootState) => state.userSession.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await clearSession()
    dispatch(logout())
  }

  return (
    <BaseScreen>
      <View
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="$6"
      >
        <TamaguiText fontSize="$6" fontWeight="$7" color="$text">
          Olá, {user?.username || 'Visitante'} 👋
        </TamaguiText>

        <Button
  size="$6"
  backgroundColor="transparent"
  borderWidth={1}
  borderColor="$primary"
  paddingHorizontal="$3"
  onPress={handleLogout}
>
  <TamaguiText color="$primary" fontWeight="$6">
    Sair
  </TamaguiText>
</Button>
      </View>

      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View height="$3" />}
        contentContainerStyle={{ gap: 12 }}
        renderItem={({ item }) => (
          <PostCard
            title={item.title}
            onPress={() => console.log(`Abrir card: ${item.title}`)}
          />
        )}
      />
    </BaseScreen>
  )
}