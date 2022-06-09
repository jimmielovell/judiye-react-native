import {ValidationError} from 'components/inputs';
import {InputRules} from 'components/inputs/types';

export const email: InputRules = {
  required: {
    value: true,
    message: 'Please enter email',
  },
  regex: [
    // // Missing an @ sign
    // {
    //   value: /[]/,
    //   message: "The email is missing an '@'",
    // },
    // // Missing a .com...
    // {
    //   value: /[]/,
    //   message: 'You forgot to add a .com|.org|...',
    // },
    // Invalid first char
    {
      value: /^[a-zA-Z]+.*/,
      message: 'An email can only start with a letter',
    },
    {
      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/,
      message: 'Please enter a valid email',
    },
  ],
};

const phoneMinLength = 10;
export const phone: InputRules = {
  required: {
    value: true,
    message: 'Please enter phone',
  },
  rule: (value: string) => {
    const diff = phoneMinLength - value.length;
    if (diff > 0) {
      throw new ValidationError(`Phone is missing ${diff} digits`);
    }
  },
};
