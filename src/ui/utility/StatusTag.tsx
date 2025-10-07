import { Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';

interface tagProps extends TagProps {
  activeValue?: string;
  inactiveValue?: string;
  status?: boolean;
}

/***
  Pass activeValue and inactiveValue props if text is to be shown along with icons
 */

export const StatusTag: React.FC<tagProps> = props => {
  const passedProps = { ...props };
  delete passedProps.status;

  return (
    <Tag
      mt={'4px'}
      colorScheme={props?.status ? 'green' : 'red'}
      variant={'outline'}
      {...passedProps}
    >
      <TagLeftIcon
        mr={props?.activeValue && props?.inactiveValue ? 2 : 0}
        as={props?.status ? FaCheck : IoCloseSharp}
      />
      <TagLabel>
        {props?.status ? props?.activeValue : props?.inactiveValue}
      </TagLabel>
    </Tag>
  );
};
