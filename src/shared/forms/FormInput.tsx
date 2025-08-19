import React from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { Controller, Control } from 'react-hook-form';
import Box from '@ui/components/primitives/Box';
import Text from '@ui/components/primitives/Text';
import { useTheme } from '@shopify/restyle';
import type { Theme } from '@ui/theme';

export type FormInputBaseProps = TextInputProps & {
  error?: string | undefined;
};

export type FormInputProps = FormInputBaseProps & {
  name?: string;
  control?: Control<any>;
};

export default function FormInput(props: FormInputProps) {
  const { name, control, error, style, onBlur: onBlurFromProps, ...rest } = props;
  const theme = useTheme<Theme>();

  const Field = (
    value: string | undefined,
    onChange: (t: string) => void,
    onBlurRHF?: () => void
  ) => {
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      try { onBlurRHF?.(); } finally { onBlurFromProps?.(e); }
    };

    return (
      <Box>
        <Box
          borderWidth={1}
          borderColor={error ? ('danger' as any) : ('borderDefault' as any)}
          borderRadius="md"
          paddingHorizontal="md"
          paddingVertical="sm"
          backgroundColor="bgCanvas"
        >
          <TextInput
            {...rest}
            value={value}
            onChangeText={onChange}
            onBlur={handleBlur}
            style={style}
            placeholderTextColor={theme.colors.textSecondary}
          />
        </Box>
        {!!error && (
          <Text variant="caption" color="danger" marginTop="xs">
            {error}
          </Text>
        )}
      </Box>
    );
  };

  if (name && control) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => Field(value as string, onChange, onBlur)}
      />
    );
  }

  const fallbackBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlurFromProps?.(e);
  };

  return (
    <Box>
      <Box
        borderWidth={1}
        borderColor={error ? ('danger' as any) : ('borderDefault' as any)}
        borderRadius="md"
        paddingHorizontal="md"
        paddingVertical="sm"
        backgroundColor="bgCanvas"
      >
        <TextInput
          {...rest}
          onBlur={fallbackBlur}
          style={style}
          placeholderTextColor={theme.colors.textSecondary}
        />
      </Box>
      {!!error && (
        <Text variant="caption" color="danger" marginTop="xs">
          {error}
        </Text>
      )}
    </Box>
  );
}
