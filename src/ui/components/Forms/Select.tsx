import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react';
import React from 'react';

interface selectProps extends SelectProps {
  disabled?: boolean;
}

const defaultStyle = {
  border: '1.5px solid #9AA5B5',
  borderRadius: '12px',
  h: '50px',
  gap: '10px',
  _disabled: { backgroundColor: 'var(--chakra-colors-gray-100)', opacity: 1 },
};

function Select(props: selectProps) {
  const styleToApply = { ...defaultStyle, ...props };
  if (props?.isDisabled || props?.disabled) {
    styleToApply.icon = <></>;
    styleToApply.backgroundColor = 'var(--chakra-colors-gray-100)';
    styleToApply.opacity = 1;
  }
  return <ChakraSelect {...styleToApply} />;
}

export default Select;
