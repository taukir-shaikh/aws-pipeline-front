import { Box, BoxProps } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { FiCopy } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface CopyAndRedirectCellProps extends BoxProps {
  value: string;
  valueType: string;
  onNumberClick?: () => void;
  LinkElement?: React.ReactNode;
  isLink?: boolean;
}

interface CopyIconProps {
  copied: boolean;
  size?: number;
  color?: string;
}

/***
  value: Used for copying value

  valueType: Text to be displayed when copy message is shown

  isLink: Used to determine if displayed content is to be displayed as a link

  Pass onNumberClick function or LinkElement prop for desired functionality

  Example:

  <CopyAndRedirectCell
    value={value}
    onNumberClick={()=>onNumberClick()}
    valueType={'Policy Number'}
    isLink={true}
    LinkElement={
      <Link
        style={{
          color: 'var(--chakra-colors-linkColor)',
        }}
        to={/path}
      >
        {value}
      </Link>
    }
  />
*/

export const CopyAndRedirectCell: React.FC<
  CopyAndRedirectCellProps
> = props => {
  const { value, valueType, onNumberClick, LinkElement, isLink = true } = props;
  const [showCopyIcon, setShowCopyIcon] = useState(false);
  const numberRef = useRef(null);

  const handleNumberClick = () => {
    typeof onNumberClick == 'function' ? onNumberClick() : null;
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value);
    setShowCopyIcon(true);
    toast.success(valueType ? `${valueType} Copied` : 'Copied', {
      autoClose: 2000,
    });
    setTimeout(() => setShowCopyIcon(false), 2000);
  };

  return (
    <>
      {LinkElement || value ? (
        <Box
          ref={numberRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--chakra-colors-linkColor)',
            cursor: isLink ? 'pointer' : 'default',
            textDecoration: isLink ? 'underline' : '',
          }}
          onClick={handleNumberClick}
        >
          {showCopyIcon ? (
            <Box
              style={{
                padding: '4px',
              }}
            >
              <BiCheckCircle size={18} />
            </Box>
          ) : (
            <Box
              style={{
                padding: '4px',
                cursor: 'pointer',
              }}
              onClick={e => {
                e.stopPropagation();
                handleCopyClick();
              }}
            >
              <FiCopy size={18} />
            </Box>
          )}
          {LinkElement ? LinkElement : value}
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export const CopyIcon: React.FC<CopyIconProps> = ({
  copied,
  size = 25,
  color = '',
}) =>
  copied ? (
    <BiCheckCircle size={size} color={color} />
  ) : (
    <FiCopy size={size} color={color} />
  );
