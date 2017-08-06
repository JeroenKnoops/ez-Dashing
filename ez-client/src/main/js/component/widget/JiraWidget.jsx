import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JSONPath from 'jsonpath';
import ObjectUtils from 'utils/ObjectUtils';
import AbstractWidget from 'component/widget/base/AbstractWidget.jsx';

class JiraWidget extends AbstractWidget {

  static propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    sizeInfo: PropTypes.object
  };

  static defaultProps = {
  };

  /**
   * Most of the time, Widget are linked to only one dataSource, so most of time
   * this function is enough.
   */
  getDS() {
    return this.props.dataSource[this.props.dataSource[0]].jsonData;
  }

  getDSTimestamp() {
    return this.props.dataSource[this.props.dataSource[0]].timestamp;
  }

  isDataSourceAvailable() {
    let k = this.props.dataSource[0].toString();
    let isAvailable = !ObjectUtils.isNullOrEmpty(this.props.dataSource[k]);
    return isAvailable;
  }

  extractDataSourceData() {
    let ds = this.getDS();
    return {
      total: JSONPath.query(ds, '$.total'),
      keys: JSONPath.query(ds, '$.issues[*].key')
    }
  }

  // renderContent() {
  //   if (!this.isDataSourceAvailable()) {
  //     return (
  //       <div>
  //         <p>Waiting data...</p>
  //       </div>
  //     )
  //   }
  //   let { total, keys } = this.extractDataSourceData();
  //   return (
  //     <div>
  //       <p>Total in TODO : {total}</p>
  //       <p>Issues in TODO : {keys}</p>
  //     </div>
  //   )
  // }

  renderContent() {
    return (
      <div className="layout-test">
        <div>BC-GAS-2054</div>
        <div>BC-GAS-2211</div>
        <div>BC-GAS-2564</div>
        <div>BC-GAS-2068</div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  let result = {
    ...AbstractWidget.mapCommonWidgetProps(state, ownProps)
  };
  return result;
};

export default connect(
  mapStateToProps
)(JiraWidget)

