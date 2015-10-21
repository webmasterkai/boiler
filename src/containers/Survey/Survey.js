import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pluck from 'lodash.pluck';
import DocumentMeta from 'react-document-meta';
import Survey from '../../components/Survey/Survey';
import { initialize, reduxForm } from 'redux-form';
import surveyValidation from './surveyValidation';
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

const actionCreators = {
  onSubmit: handleSubmit,
  handleInitialize,
};

const reduxFormOptions = {
  form: 'survey',
  fields: pluck(formInfo.fields, 'id'),
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email'],
};

// Redux connections.

function mapStateToProps(state) {
  return {
    title: formInfo.title,
    form: state.form,
    formFields: formInfo.fields,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(actionCreators, dispatch),
    dispatch,
  };
}

// I'd really like to make this nicer. I hate the DocumentMeta thing.
function Component({title, ...rest}) {
  return (
    <div>
      <DocumentMeta title={title} />
      <Survey {...rest} />
    </div>
  );
}
Component.props = {
  title: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(reduxFormOptions)(Component));
