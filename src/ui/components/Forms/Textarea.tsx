import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';
import React from 'react';

interface textAreaProps extends TextareaProps {
  disabled?: boolean;
}

function Textarea(props: textAreaProps) {
  const defaultStyle = {
    border: '1.5px solid #9AA5B5',
    borderRadius: '12px',
    _disabled: { backgroundColor: 'var(--chakra-colors-gray-100)', opacity: 1 },
  };

  const styleToApply = { ...defaultStyle, ...props };
  if (props?.isDisabled || props?.disabled) {
    styleToApply.backgroundColor = 'var(--chakra-colors-gray-100)';
    styleToApply.opacity = 1;
  }
  return <ChakraTextarea {...styleToApply} />;
}
export default Textarea;
