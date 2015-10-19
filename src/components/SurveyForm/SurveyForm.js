import React, { PropTypes } from 'react';
import Input from './Input';

function SurveyForm(props) {
  const {
    asyncValidating,
    dirty,
    fields,
    active,
    handleSubmit,
    formFields,
    invalid,
    resetForm,
    pristine,
    valid,
    } = props;
  const styles = require('./SurveyForm.scss');

  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        {
          formFields.map( ({id, hasAsyncValidate, ...other}) => (
            <Input
              key={id}
              asyncValidating={hasAsyncValidate && asyncValidating}
              field={fields[id]}
              styles={styles}
              {...other}
            />
          ))
        }

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button className="btn btn-success" onClick={handleSubmit}>
              <i className="fa fa-paper-plane"/> Submit
            </button>
            <button className="btn btn-warning" onClick={resetForm} style={{marginLeft: 15}}>
              <i className="fa fa-undo"/> Reset
            </button>
          </div>
        </div>
      </form>

      <h4>Props from redux-form</h4>

      <table className="table table-striped">
        <tbody>
        <tr>
          <th>Active Field</th>
          <td>{active}</td>
        </tr>
        <tr>
          <th>Dirty</th>
          <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>Pristine</th>
          <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>Valid</th>
          <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
        </tr>
        <tr>
          <th>Invalid</th>
          <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}
SurveyForm.propTypes = {
  active: PropTypes.string,
  asyncValidating: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  dirty: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
};
SurveyForm.defaultProps = {};

export default SurveyForm;
