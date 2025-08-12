// src/components/PostCard.tsx
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

interface PostCardProps {
  title: string
  image: string
  type: string
  author: string
  onPress: () => void
}

export default function PostCard({ title, image, type, author, onPress }: PostCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.type}>{type.toUpperCase()}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.author}>{author}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  type: {
    fontSize: 12,
    color: '#00bcd4',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
})