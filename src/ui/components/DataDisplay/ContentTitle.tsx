import { Box as ChakraBox, BoxProps as ChakraBoxProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ContentSectionProps extends ChakraBoxProps {
  children: ReactNode;
}

const ContentTitle: React.FC<ContentSectionProps> = ({
  children,
  ...props
}) => {
  return (
    <ChakraBox
      p={0}
      m={0}
      mb={2}
      fontWeight="600"
      fontSize="var(--chakra-fontSizes-2xl)"
      {...props}
    >
      {children}
    </ChakraBox>
  );
};

export default ContentTitle;
