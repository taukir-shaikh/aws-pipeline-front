import React, { CSSProperties } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

interface currencyInputProps extends CurrencyInputProps {
  customStyle?: CSSProperties;
}

/***
  Pass customStyle prop to override the style

  Don't pass style prop unless it is necessary to override the whole style
 */

export const CustomCurrencyInput: React.FC<currencyInputProps> = props => {
  const CurrencyStyles = {
    textAlign: 'right' as const,
    border: '1.5px solid #9AA5B5',
    borderRadius: '8px',
    padding: '10px 20px',
    height: '50px',
    width: '100%',
    maxWidth: '600px',
    minWidth: '150px',
    autoComplete: 'off',
    backgroundColor: props.disabled ? 'var(--chakra-colors-gray-100)' : 'white',
  };
  const style = { ...CurrencyStyles, ...props?.customStyle };
  const CurrencyConfig = { locale: 'en-US', currency: 'USD' };
  const prefix = '$';

  return (
    <CurrencyInput
      intlConfig={CurrencyConfig}
      style={style}
      prefix={prefix}
      {...props}
    />
  );
};
