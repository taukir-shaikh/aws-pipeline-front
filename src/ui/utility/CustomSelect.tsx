import React from 'react';
//eslint-disable-next-line
// @ts-ignore
import Select, { CSSProperties } from 'react-select';

/***
    To override the style, pass style prop

    For eg.
    style={{
        width: '500px',
    }}

    Don't pass styles prop unless it is necessary to override the whole style
 */

export const CustomSelect: React.FC<Select> = props => {
  const defaultStyle = {
    border: '1.5px solid #9AA5B5',
    borderRadius: '8px',
    padding: '5px 10px',
    minHeight: '50px',
    height: '100%', // because of multi select option in react select
    width: '100%',
    maxWidth: '400px',
    minWidth: '150px',
    backgroundColor: props?.isDisabled
      ? 'var(--chakra-colors-gray-100)'
      : 'white',
  };

  return (
    <Select
      placeholder=""
      menuPortalTarget={document.body}
      components={
        props?.isDisabled
          ? {
              IndicatorSeparator: () => null,
              DropdownIndicator: () => null,
            }
          : {
              IndicatorSeparator: () => null,
            }
      }
      styles={{
        control: (baseStyles: CSSProperties) => ({
          ...baseStyles,
          ...defaultStyle,
          ...props?.style,
        }),
        singleValue: (baseStyles: CSSProperties) => ({
          ...baseStyles,
          color: 'black',
        }),
        menu: (base: CSSProperties) => ({
          ...base,
          width: 'max-content',
          minWidth: '100%',
          maxWidth: '20rem',
        }),
        menuPortal: (base: CSSProperties) => ({
          ...base,
          zIndex: 9999,
        }),
      }}
      {...props}
    />
  );
};
