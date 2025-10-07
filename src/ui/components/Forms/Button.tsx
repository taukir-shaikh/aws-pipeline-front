import {
  Button as ChakraButton,
  ButtonGroup,
  ButtonProps,
} from '@chakra-ui/react';
import React from 'react';

function Button(props: ButtonProps) {
  const defaultStyle = {
    borderRadius: '8px',
  };

  let styleToApply = { ...defaultStyle, ...props };

  // Size - height, padding
  if (!Object.prototype.hasOwnProperty.call(styleToApply, 'size')) {
    styleToApply.px = '20px';
    styleToApply.py = '15px';
    styleToApply.h = '50px';
  }

  // Border
  let addBorderToButton = true;
  /**
   * Contains parameters which when passed in props,
   * don't add border to the button
   */
  const excludeBorderParameters = ['variant', 'bgColor'];

  excludeBorderParameters.map(item => {
    if (Object.prototype.hasOwnProperty.call(styleToApply, item)) {
      addBorderToButton = false;
    }
  });

  if (addBorderToButton) {
    styleToApply.border = '1.5px solid var(--chakra-colors-primary-500)';
  }

  // Variant
  if (Object.prototype.hasOwnProperty.call(styleToApply, 'variant')) {
    // Link
    if (styleToApply?.variant === 'link') {
      styleToApply.color = 'linkColor';
      styleToApply._focus = {
        textDecoration: 'underline',
        color: 'blue',
      };
      styleToApply._active = {
        color: 'blue',
      };
    }
  }

  styleToApply = { ...styleToApply, ...props };

  return (
    <ChakraButton
      {...styleToApply}
      title={`${
        props?.title || typeof props?.children === 'string'
          ? props?.children
          : ''
      }`}
      aria-label={`${
        props?.['aria-label'] || typeof props?.children === 'string'
          ? props?.children
          : ''
      }`}
    />
  );
}

export { Button, ButtonGroup };
