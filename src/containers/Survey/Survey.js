import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pluck from 'lodash.pluck';
import DocumentMeta from 'react-document-meta';
import Survey from '../../components/Survey/Survey';
import { initialize, reduxForm } from 'redux-form';
import surveyValidation from './surveyValidation';

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
const formFields = [
  { id: 'name', label: 'Full Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'text', hasAsyncValidate: true },
  { id: 'occupation', label: 'Occupation', type: 'text' },
  { id: 'birthday', label: 'Birthday', type: 'datetime' },
  { id: 'currentlyEmployed', label: 'Currently Employed?', type: 'checkbox' },
  {
    id: 'sex',
    label: 'Gender',
    type: 'radio',
    options: [
      {value: 'male', label: 'Male'},
      {value: 'female', label: 'Female'},
      {value: 'transgender', label: 'Transgender'},
    ],
  },
  {
    id: 'genre',
    label: 'Musical Genre',
    type: 'select',
    // https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/genres
    options: [
      {value: '13', label: 'New Age'},
      {value: '11', label: 'Jazz'},
      {value: '6', label: 'Country'},
    ],
  },
];

const reduxFormOptions = {
  form: 'survey',
  fields: pluck(formFields, 'id'),
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email'],
};

// Redux connections.

function mapStateToProps(state) {
  return {
    title: 'Survey Title',
    form: state.form,
    formFields,
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
