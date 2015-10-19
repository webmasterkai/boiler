import React, { PropTypes } from 'react';

function Input({field, label, type, options, asyncValidating, styles}) {
  const { active, dirty, error, name, touched, visited, ...inputProps } = field;
  // checked, defaultChecked, defaultValue, invalid, pristine, valid, value
  // handleBlur, handleChange, handleFocus
  // onBlur, onChange, onDrag, onDrop, onFocus, onUpdate
  const isTypeText = type === 'text';
  const inputGroupStyle = isTypeText ? styles.inputGroup : '';

  let InputEl = false;
  if (type === 'radio') {
    InputEl = options.map( opt => {
      const radioId = `{$name}-${opt.value}`;
      return (
        <span key={radioId}>
          <input type={type} id={radioId} {...field} value={opt.value} checked={field.value === opt.value}/>
          <label htmlFor={radioId} className={styles.radioLabel}>{opt.label}</label>
        </span>
      );
    });
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
        { isTypeText &&
          <div className={styles.flags}>
            {dirty && <span className={styles.dirty} title="Dirty">D</span>}
            {active && <span className={styles.active} title="Active">A</span>}
            {visited && <span className={styles.visited} title="Visited">V</span>}
            {touched && <span className={styles.touched} title="Touched">T</span>}
          </div>
        }
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
