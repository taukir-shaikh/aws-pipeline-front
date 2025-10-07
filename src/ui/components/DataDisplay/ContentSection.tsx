import {
  Card as ChakraCard,
  CardProps as ChakraCardProps,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ContentSectionProps extends ChakraCardProps {
  children: ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  ...props
}) => {
  return (
    <ChakraCard p={4} mb={4} boxShadow="lg" borderRadius="2xl" {...props}>
      {children}
    </ChakraCard>
  );
};

export default ContentSection;
