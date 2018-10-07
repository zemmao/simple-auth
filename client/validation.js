import VeeValidate from 'vee-validate';

export default VeeValidate;

const mixin = ({ inherit = false } = {}) => {
  if (inherit) return { inject: ['$validator'] };
  return { $_veeValidate: { validator: 'new' } };
};

export const withValidation = mixin;
