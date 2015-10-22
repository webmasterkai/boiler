import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import pluck from 'lodash.pluck';
import DocumentMeta from 'react-document-meta';
import Survey from '../../components/Survey/Survey';
import { initialize, connectReduxForm } from 'redux-form';
// import surveyValidation from './surveyValidation';
import formValidation from '../../utils/formValidation';
import formInfo from './surveyInfo';
// Define our custom functions and action handlers.
// Move to another file someday/somehow?

function asyncValidate(data) {
  // TODO: figure out a way to move this to the server. need an instance of ApiClient
  if (!data.email) {
    return Promise.resolve({});
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errors = {};
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(data.email)) {
        errors.email = 'Email address already used';
      }
      reject(errors);
    }, 1000);
  });
}

function handleSubmit(data) {
  window.alert('Data submitted! ' + JSON.stringify(data));
  return initialize('survey', {});
}

function handleInitialize() {
  return initialize('survey', {
    name: 'Little Bobby Curry',
    email: 'bobby@gmail.com',
    occupation: 'Redux Wizard',
    currentlyEmployed: true,
    sex: 'male',
  });
}

// Redux connections.

function mapStateToProps() {
  return {
    title: formInfo.title,
    formFields: formInfo.fields,
  };
}

// I'd really like to make this nicer. I hate the DocumentMeta thing.
function Component({title, ...rest}) {
  const formOptions = {
    form: 'survey',
    fields: pluck(formInfo.fields, 'id'),
    // validate: surveyValidation,
    validate: formValidation(formInfo.fields),
    asyncValidate,
    asyncBlurFields: ['email'],
  };
  const FormEl = connectReduxForm(formOptions)(Survey);
  return (
    <div>
      <DocumentMeta title={title} />
      <FormEl {...rest} onSubmit={handleSubmit} handleInitialize={handleInitialize} />
    </div>
  );
}
Component.props = {
  title: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Component);
