import React, { PropTypes } from 'react';

import InputFlags from './InputFlags';
import InputRadios from './InputRadios';
import Select from 'react-select';

function Input({field, label, type, showFlags, options, asyncValidating, styles}) {
  const { active, dirty, error, name, touched, visited, ...inputProps } = field;
  // checked, defaultChecked, defaultValue, invalid, pristine, valid, value
  // handleBlur, handleChange, handleFocus
  // onBlur, onChange, onDrag, onDrop, onFocus, onUpdate
  const isTypeText = type === 'text';
  const inputGroupStyle = isTypeText ? styles.inputGroup : '';

  let InputEl = false;
  if (type === 'radio') {
    InputEl = <InputRadios styles={styles.radioLabel} field={field} type={type} options={options} />;
  } else if (type === 'select') {
    InputEl = <Select options={options} {...field} />;
  } else {
    InputEl = <input type={type} className={isTypeText && 'form-control'} id={name} {...inputProps}/>;
  }

  return (
    <div className={'form-group' + (error && touched ? ' has-error' : '')}>
      <label htmlFor={name} className="col-sm-2">{label}</label>
      <div className={'col-sm-8 ' + inputGroupStyle}>
        { asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/> }
        { InputEl }
        { error && touched && <div className="text-danger">{error}</div> }
        { showFlags && <InputFlags {...{dirty, active, visited, touched, styles}} /> }
      </div>
    </div>
  );
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  asyncValidating: PropTypes.bool.isRequired,
  styles: PropTypes.object.isRequired,
};
Input.defaultProps = {
  asyncValidating: false,
  type: 'text',
};
export default Input;