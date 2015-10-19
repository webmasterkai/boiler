import React, { PropTypes } from 'react';

function InputFlags({active, dirty, touched, visited, styles}) {
  return (
    <div className={styles.flags}>
      {dirty && <span className={styles.dirty} title="Dirty">D</span>}
      {active && <span className={styles.active} title="Active">A</span>}
      {visited && <span className={styles.visited} title="Visited">V</span>}
      {touched && <span className={styles.touched} title="Touched">T</span>}
    </div>
  );
}

InputFlags.propTypes = {
  active: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  visited: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
};
InputFlags.defaultProps = {};
export default InputFlags;
