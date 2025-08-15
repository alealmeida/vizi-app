// src/app/(auth)/components/SlideFade.tsx
import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { motion } from '@ds';

export type SlideFadeDirection = 'forward' | 'back' | 'none';

export type SlideFadeProps = {
  dir: SlideFadeDirection;
  offset?: number; // px de deslocamento inicial
  duration?: number; // ms
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export default function SlideFade({
  dir,
  offset = motion.offset.md,     // tokens DS
  duration = motion.duration.md, // tokens DS
  style,
  children,
}: SlideFadeProps) {
  // Valor inicial baseado na direção para evitar "salto" ao montar
  const initialX = useRef(dir === 'forward' ? +offset : dir === 'back' ? -offset : 0).current;
  const tx = useRef(new Animated.Value(initialX)).current;

  useEffect(() => {
    // Recalcula posição inicial quando direção mudar
    const from = dir === 'forward' ? +offset : dir === 'back' ? -offset : 0;
    tx.setValue(from);

    Animated.timing(tx, {
      toValue: 0,
      duration,
      easing: motion.easing.quadInOut, // tokens DS
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dir, offset, duration]);

  return (
    <Animated.View style={[{ flex: 1, transform: [{ translateX: tx }] }, style]}> 
      {children}
    </Animated.View>
  );
}
