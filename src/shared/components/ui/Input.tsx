import React from 'react';
import { TextInput, Text, View, StyleSheet, TextInputProps, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { Controller, Control } from 'react-hook-form';

type InputBaseProps = TextInputProps & {
  error?: string;
};

type InputWithRHF = InputBaseProps & {
  name?: string;
  control?: Control<any>;
};

export default function Input(props: InputWithRHF) {
  const { name, control, error, style, onBlur: onBlurFromProps, ...rest } = props;

  const Field = (
    value: string | undefined,
    onChange: (t: string) => void,
    onBlurRHF?: () => void
  ) => {
    // Une o onBlur do RHF (sem args) com o onBlur do TextInput (com evento)
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      try { onBlurRHF?.(); } finally { onBlurFromProps?.(e); }
    };

    return (
      <View>
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChange}
          onBlur={handleBlur}
          style={[styles.input, !!error && styles.inputError, style]}
          placeholderTextColor="#888"
        />
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
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

  // fallback “sem RHF”
  const fallbackBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlurFromProps?.(e);
  };

  return (
    <View>
      <TextInput
        {...rest}
        onBlur={fallbackBlur}
        style={[styles.input, !!error && styles.inputError, style]}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8 },
  inputError: { borderColor: 'red' },
  error: { color: 'red', marginTop: 4, fontSize: 12 },
});