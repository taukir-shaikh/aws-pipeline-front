import { Button as ChakraButton, ButtonGroup } from '@chakra-ui/react';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import {  useNavigate } from 'react-router-dom';

interface BackButtonProps {
  backUrl?: string;
}

function BackButton({ backUrl = '' }: BackButtonProps) {
  const navigate = useNavigate();
  const styleToApply = {
    colorScheme: 'yellow',
    variant: 'solid',
    leftIcon: <FaChevronLeft />,
    active: true,
    size: 'md',
  };

  return (
    <ChakraButton
      onClick={() => (backUrl ? navigate(backUrl) : navigate(-1))}
      {...styleToApply}
    >
      Back
    </ChakraButton>
  );
}

export { BackButton, ButtonGroup };
