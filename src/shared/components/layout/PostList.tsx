// src/components/PostList.tsx
import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import PostCard from './PostCard'

interface PostItem {
  id: string
  title: string
  image: string
  type: string
  author: string
}

interface PostListProps {
  data: PostItem[]
  onPressItem: (item: PostItem) => void
  emptyMessage?: string
}

export default function PostList({ data, onPressItem, emptyMessage }: PostListProps) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage || 'Nenhum item encontrado.'}</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      renderItem={({ item }) => (
        <PostCard
          title={item.title}
          image={item.image}
          type={item.type}
          author={item.author}
          onPress={() => onPressItem(item)}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
})