import { CSSProperties } from 'react';

const ReactSelectCustomStyles = {
  control: (base: CSSProperties, state: { isDisabled: boolean }) => ({
    ...base,
    border: '1.5px solid #9AA5B5',
    borderRadius: '8px',
    padding: '5px 10px',
    minHeight: '50px',
    height: '100%', // because of multi select option in react select
    width: '100%',
    maxWidth: '400px',
    minWidth: '100%',
    backgroundColor: state?.isDisabled
      ? 'var(--chakra-colors-gray-100)'
      : 'transparent',
  }),
  singleValue: (base: CSSProperties) => ({
    ...base,
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
  indicatorSeparator: (base: CSSProperties) => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: (base: CSSProperties, state: { isDisabled: boolean }) =>
    state?.isDisabled
      ? {
          ...base,
          display: 'none',
        }
      : {
          ...base,
        },
  placeholder: (base: CSSProperties) => ({
    ...base,
    display: 'none',
  }),
};

export { ReactSelectCustomStyles };
