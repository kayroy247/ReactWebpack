import React from 'react';
import {
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Tooltip,
  Text,
  Button,
  InputGroup,
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/input';
import { SettingsIcon } from '@chakra-ui/icons';

import { changeTransactionDeadline } from '../../utils/UtilFunc';
const SwapSettings = ({
  transactionDeadline,
  setTransactionDeadline,
  setActualTransactionDeadline,
  setSlippageValue,
  slippageValue,
  errorMessage,
  setErrorMessage,
  deadline,
  setDeadline
}) => {
  const changeSlippageValue = val => {
    setSlippageValue(val);
    if (val < 0.5) {
      setErrorMessage("Your transaction might fail")
    } else if (val > 5 && val < 49.9) {
      setErrorMessage("Your transaction may be frontrun")
    } else if (val > 50) {
      setErrorMessage("Enter a valid slippage percentage")
    } else {
      setErrorMessage("")
    }
  };
  const changeDeadline = (time, val) => {
    setTransactionDeadline(val);
    setActualTransactionDeadline(time);
  };
  return (
    <Flex
      style={{
        right: '0px',
        position: 'relative',
        left: '86%',
      }}
    >
      <Popover>
        <PopoverTrigger>
          <SettingsIcon
            color="#fff"
            m={4}
            style={{
              fontSize: '1.4rem',
              float: 'right',
              boxShadow: 'rgb(74, 74, 74) 0px 0px 3px 2px',
              cursor: 'pointer',
              borderRadius: '100%',
            }}
          />
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor: 'rgb(41, 35, 94)',
            color: 'white',
            border: 'none',
            boxShadow: '0px 0px 2px 1px #635880',
            padding: '10px',
            outline: 'none',
          }}
        >
          <PopoverHeader fontWeight="semibold">
            Transaction Settings
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Text>
              Slippage tolerance{' '}
              <Tooltip
                label="Your transactions will revert if "
                aria-label="A tooltip"
              >
                &#x1F6C8;
              </Tooltip>
            </Text>
            <Flex justifyContent="space-between">
              {['0.1', '0.5', '1'].map((value, index) => (
                <Button
                  border="0px"
                  h="30px"
                  fontWeight="regular"
                  width="60px"
                  mr={1}
                  fontSize="16px"
                  cursor="pointer"
                  bg={slippageValue === value ? '#40BAD5' : '#120136'}
                  marginBottom="5px"
                  color="white"
                  _hover={{ background: '#72cfe4', color: '#29235E' }}
                  borderRadius="10px"
                  onClick={() => changeSlippageValue(value)}
                  key={index}
                >
                  {value} %
                </Button>
              ))}
              <InputGroup>
                <Input
                  placeholder="0.0"
                  fontSize="lg"
                  color=" rgba(255, 255, 255,0.8)"
                  isRequired
                  size="sm"
                  ml={2}
                  width="50%"
                  value={slippageValue}
                  onChange={(e) => changeSlippageValue(e.target.value)}
                />
                {/* <InputRightAddon children="%" w="10px" h="20px" /> */}
              </InputGroup>
            </Flex>
            <Text color="red">{errorMessage}</Text>
            <Text>
              Transaction Deadline{' '}
              <Tooltip
                label="Your transactions will revert if it is pending after the deadline elapses"
                aria-label="A tooltip"
              >
                &#x1F6C8;
              </Tooltip>
            </Text>
            <Flex>
              <Input
                placeholder="0.0"
                fontSize="lg"
                color=" rgba(255, 255, 255,0.8)"
                isRequired
                type="number"
                size="sm"
                width="30%"
                value={deadline}
                onChange={e => {
                  setDeadline(e.target.value)
                }

                }
              />
              <Text style={{ margin: '8px 10px 0px' }}> Minutes</Text>
            </Flex>
            {/* Interface  */}
            {/* <Text>Interface Settings </Text>
            <Flex>
              <FormControl
                display="flex"
                alignItems="center"
                style={{ marginBottom: '1rem' }}
              >
                <FormLabel
                  htmlFor="expert_mode"
                  mb="0"
                  style={{ marginRight: '3rem' }}
                >
                  Toggle Expert Mode{' '}
                  <Tooltip
                    label="Bypass confirmation modals and allow high spillage trades. Use at your own risk"
                    aria-label="A tooltip"
                  >
                    &#x1F6C8;
                  </Tooltip>
                </FormLabel>
                <Switch id="expert_mode" />
              </FormControl>
            </Flex>
            <Flex>
              <FormControl
                display="flex"
                alignItems="center"
                style={{ marginBottom: '1rem' }}
              >
                <FormLabel
                  htmlFor="expert_mode"
                  mb="0"
                  style={{ marginRight: '3rem' }}
                >
                  Disable Multihops {'   '}
                  <Tooltip
                    label="Restricts swap to direct swap only"
                    aria-label="A tooltip"
                  >
                    &#x1F6C8;
                  </Tooltip>
                </FormLabel>
                <Switch id="multihops" />
              </FormControl>
            </Flex>
          */}
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end" />
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
export default SwapSettings;
