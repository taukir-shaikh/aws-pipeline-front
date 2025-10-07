import { Input as ChakraInput, InputProps } from '@chakra-ui/react';
import React from 'react';
interface inputProps extends InputProps {
  disabled?: boolean;
}

const defaultStyle = {
  border: '1.5px solid #9AA5B5',
  borderRadius: '12px',
  px: '20px',
  py: '15px',
  h: '50px',
  gap: '10px',
  _disabled: { backgroundColor: 'var(--chakra-colors-gray-100)', opacity: 1 },
  backgroundColor: 'white',
};

function Input(props: inputProps) {
  const styleToApply = { ...defaultStyle, ...props };
  if (props?.isDisabled || props?.disabled) {
    styleToApply.backgroundColor = 'var(--chakra-colors-gray-100)';
    styleToApply.opacity = 1;
  }
  return <ChakraInput {...styleToApply} />;
}

export default Input;
