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
import React, { useRef, useState } from 'react';
//eslint-disable-next-line
// @ts-ignore
import DatePicker from 'react-datepicker';
//eslint-disable-next-line
// @ts-ignore
import { InputAdapter, TextMask } from 'react-text-mask-hoc';
import { toast } from 'react-toastify';

import { formateDate } from './formateDate';

interface inputProps extends InputProps {
  //eslint-disable-next-line
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placement?: PlacementWithLogical;
  maxDate?: string;
  minDate?: string;
  error?: boolean;
  disabled?: boolean;
}

interface IFormatDate {
  value?: string | number | readonly string[] | undefined;
  format: string | string[];
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

/***
  Format of value should be MM/DD/YYYY

  Example:

  <DateInput
    onChange={e => setDate(e.target.value)} // returns value in "MM/DD/YYYY" format
    value={value}
  />

  Don't Change the format of date in onChange function
 */

const DateInput = (props: inputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [format] = useState('MM/DD/YYYY');
  const styleToApply = { ...defaultStyle, ...props };
  const ref = useRef(null);
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  const createChangeEvent = (
    value: string,
    name: string
  ): React.ChangeEvent<HTMLInputElement> => {
    const event = {
      target: { value, name } as HTMLInputElement,
      currentTarget: { value, name } as HTMLInputElement,
      // Add any other properties if needed
    } as unknown as React.ChangeEvent<HTMLInputElement>; // Cast to the expected type

    return event;
  };

  const formatDate = ({ value, format }: IFormatDate) => {
    // Ensure value is a string or number
    if (typeof value === 'string' || typeof value === 'number') {
      // Check if the format is an array or single string
      const dateFormats = Array.isArray(format) ? format : [format];

      // Validate and convert the date
      const validDate = moment(value, dateFormats, true).isValid()
        ? moment(value, dateFormats, true).toDate()
        : null;

      return validDate;
    }

    return null;
  };

  const handleDatePick = (newDate: string) => {
    const newDateMoment = moment(newDate);
    if (!newDateMoment.isValid()) {
      console.warn('Invalid time value');
      return;
    }

    const event = createChangeEvent(
      moment(newDate).format(format),
      props?.name || ''
    );

    props.onChange(event);
    setIsOpen(false);
  };

  const parseDate = (date: string) => {
    return moment(date, ['MM/DD/YYYY', 'YYYY-MM-DD']).toDate();
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const dateMoment = moment(val, format, true);
    if (val && !dateMoment.isValid()) {
      console.warn('Invalid date value');
      toast.error(`Please enter a valid date in ${format} format.`, {
        toastId: 'date_input',
      });
      e.target.value = '';
      props.onChange(e);
    } else {
      e.target.value = dateMoment.format(format);
      props.onChange(e);
    }
  };

  return (
    <>
      {props?.isDisabled || props?.disabled ? (
        <Input
          isInvalid={!!props?.error}
          {...styleToApply}
          value={formateDate(props?.value?.toString() || '')}
          isDisabled
        />
      ) : (
        <Box ref={ref}>
          <Popover
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            placement={props?.placement ? props?.placement : 'bottom-start'}
          >
            <PopoverTrigger>
              <InputGroup>
                <Input
                  as={TextMask}
                  mask={[
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    '/',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  Component={InputAdapter}
                  placeholder={props?.placeholder || 'MM/DD/YYYY'}
                  isDisabled={props?.isDisabled || props?.disabled || false}
                  isInvalid={!!props?.error}
                  autoComplete="off"
                  {...styleToApply}
                  // If input isn't a date it won't format it i.e. in case of typing the date else it will format it to "MM/DD/YYYY" format
                  value={
                    moment(props?.value?.toString()).isValid()
                      ? formateDate(props?.value?.toString() || '', format)
                      : props?.value?.toString() || ''
                  }
                  onBlur={e => {
                    handleBlur(e);
                    typeof props?.onBlur === 'function'
                      ? props.onBlur(e)
                      : null;
                  }}
                />
                {props.isDisabled !== true && (
                  <InputRightElement
                    alignItems={props?.size === 'sm' ? 'normal' : 'center'}
                  >
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
            <PopoverContent width={'max-content'}>
              <PopoverBody>
                <DatePicker
                  selected={formatDate({ value: props.value, format })}
                  onChange={handleDatePick}
                  inline
                  selectsMultiple={false}
                  showYearDropdown
                  dropdownMode="select"
                  showMonthDropdown
                  dateFormat={format}
                  minDate={props.minDate ? parseDate(props.minDate) : null}
                  maxDate={props.maxDate ? parseDate(props.maxDate) : null}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </>
  );
};

export default DateInput;
