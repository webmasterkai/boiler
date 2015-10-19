import React, { PropTypes } from 'react';

function Input({field, label, asyncValidating, styles}) {
  const { active, dirty, name, error, touched, visited, ...inputProps } = field;
  return (
    <div className={'form-group' + (error && touched ? ' has-error' : '')}>
      <label htmlFor={name} className="col-sm-2">{label}</label>
      <div className={'col-sm-8 ' + styles.inputGroup}>
        { asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/> }
        <input type="text" className="form-control" id={name} {...inputProps}/>
        {error && touched && <div className="text-danger">{error}</div>}
        <div className={styles.flags}>
          {dirty && <span className={styles.dirty} title="Dirty">D</span>}
          {active && <span className={styles.active} title="Active">A</span>}
          {visited && <span className={styles.visited} title="Visited">V</span>}
          {touched && <span className={styles.touched} title="Touched">T</span>}
        </div>
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
};
export default Input;
