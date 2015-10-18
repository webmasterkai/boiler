import { connect } from 'react-redux';
import Component from '../components/Home/Home';

function mapStateToProps({db: {title, tagline}}) {
  return {
    tagline,
    title,
  };
}

export default connect(mapStateToProps)(Component);
