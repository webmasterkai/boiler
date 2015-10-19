import React, { PropTypes } from 'react';
import Input from './Input';

function SurveyForm(props) {
  const {
    asyncValidating,
    dirty,
    fields: {name, email, occupation, currentlyEmployed, sex},
    active,
    handleSubmit,
    invalid,
    resetForm,
    pristine,
    valid,
    } = props;
  const styles = require('./SurveyForm.scss');


  return (
    <div>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <Input field={name} label="Full Name" styles={styles} />
        <Input field={email} label="Email" asyncValidating={asyncValidating} styles={styles} />
        <Input field={occupation} label="Occupation" styles={styles} />

        <div className="form-group">
          <label htmlFor="currentlyEmployed" className="col-sm-2">Currently Employed?</label>
          <div className="col-sm-8">
            <input type="checkbox" id="currentlyEmployed" {...currentlyEmployed}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2">Sex</label>
          <div className="col-sm-8">
            <input type="radio" id="sex-male" {...sex} value="male" checked={sex.value === 'male'}/>
            <label htmlFor="sex-male" className={styles.radioLabel}>Male</label>
            <input type="radio" id="sex-female" {...sex} value="female" checked={sex.value === 'female'}/>
            <label htmlFor="sex-female" className={styles.radioLabel}>Female</label>
          </div>
        </div>
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
