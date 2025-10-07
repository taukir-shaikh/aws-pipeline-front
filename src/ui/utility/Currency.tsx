import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

import { formatCurrency } from '../../../utilities/Helper';

interface CurrencyProps extends TextProps {
  amount: number;
}

const Currency: React.FC<CurrencyProps> = ({ amount, ...restProps }) => {
  const formattedAmount = formatCurrency(amount);

  if (!Object.keys(restProps).includes('float')) {
    restProps = { ...restProps, float: 'right' };
  }

  return (
    <Text as="span" {...restProps}>
      {formattedAmount}
    </Text>
  );
};

export { Currency };
