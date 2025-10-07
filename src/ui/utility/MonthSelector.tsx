import 'react-datepicker/dist/react-datepicker.css';

import {
  Box,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  PlacementWithLogical,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useOutsideClick,
} from '@chakra-ui/react';
import moment from 'moment';
import React, {useEffect , useRef, useState } from 'react';
// eslint-disable-next-line
// @ts-ignore
import DatePicker from 'react-datepicker';

interface MonthInputProps
  extends Omit<InputProps, 'onChange' | 'value' | 'name'> {
  name?: string;
   value?: string;
  placement?: PlacementWithLogical;
  error?: boolean;
  disabled?: boolean;
  //eslint-disable-next-line
  onChange: (event: {
    target: {
      name: string;
      value: {
        startDate: string;
        endDate: string;
      };
    };
  }) => void;
}

const defaultStyle = {
  border: '1.5px solid #9AA5B5',
  borderRadius: '12px',
  px: '20px',
  py: '15px',
  h: '50px',
  gap: '10px',
  _disabled: { backgroundColor: 'var(--chakra-colors-gray-100)', opacity: 1 },
  backgroundColor: 'white',
};

const MonthSelectorInput = (props: MonthInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const ref = useRef(null);

  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });
  useEffect(() => {
  if (props?.value && moment(props.value, 'YYYY-MM-DD', true).isValid()) {
    setSelectedMonth(moment(props.value).startOf('month').toDate());
  }
}, [props?.value]);


  const handleDatePick = (date: Date) => {
    setSelectedMonth(date);
    const startDate = moment(date).startOf('month').format('MM/DD/YYYY');
    const endDate = moment(date).endOf('month').format('MM/DD/YYYY');

    props.onChange({
      target: {
        name: props.name || '',
        value: { startDate, endDate },
      },
    });

    setIsOpen(false);
  };

  return (
    <Box ref={ref}>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement={props.placement || 'bottom-start'}
      >
        <PopoverTrigger>
          <InputGroup>
            <Input
              isDisabled={props.disabled}
              isInvalid={!!props.error}
              value={
                selectedMonth ? moment(selectedMonth).format('MMMM YYYY') : ''
              }
              readOnly
              placeholder="Select Month"
              onClick={() => setIsOpen(true)}
              {...defaultStyle}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              {...(props as any)}
            />
            {!props.disabled && (
              <InputRightElement>
                <Box
                  onClick={() => setIsOpen(!isOpen)}
                  mt={1.5}
                  cursor={'pointer'}
                >
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                </Box>
              </InputRightElement>
            )}
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent width="max-content">
          <PopoverBody>
            <DatePicker
              selected={selectedMonth}
              onChange={handleDatePick}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker 
              showYearDropdown
              inline
              shouldCloseOnSelect
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default MonthSelectorInput;
