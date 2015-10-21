import {createValidator, isRequired, maxLength, isInteger, oneOf} from 'utils/validation';

export const colors = ['Blue', 'Fuchsia', 'Green', 'Orange', 'Red', 'Taupe'];

const widgetValidation = createValidator({
  color: [isRequired, oneOf(colors)],
  sprocketCount: [isRequired, isInteger],
  owner: [isRequired, maxLength(30)],
});
export default widgetValidation;
