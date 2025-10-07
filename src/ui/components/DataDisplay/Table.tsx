import {
  Table,
  TableCaption,
  TableColumnHeaderProps,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th as TableHeader,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React from 'react';

function Th(props: TableColumnHeaderProps) {
  return <TableHeader textTransform={'none'} {...props} />;
}

export { Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr };
