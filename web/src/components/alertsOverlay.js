import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Message } from 'semantic-ui-react'
import _ from 'lodash'
import * as mainActions from '../actions/main';


function Alert(props) {
  return (
    <Message negative >
      <Message.Header>{props.header}</Message.Header>
      <p>{props.message}</p>
    </Message>
  )
}

class AlertsOverlay extends Component {
  componentWillMount() {
    // setTimeout(() => {
    //   this.props.actions.mainActions.removeAlert();
    // }, 3000);
  }

  renderAlerts(alerts) {
    return _.map(alerts, alert => {
      const headerMessage = `Error Code ${alert.code}`;
      const message = `Message: ${alert.message}`;
      const timestamp = Date.now();

      return (
        <Alert header={headerMessage} message={message} key={timestamp}/>
      )
    })
  }

  render() {
    return (
      <div>
        { this.renderAlerts(this.props.alerts) }
      </div>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    alerts: state.main.alerts
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      mainActions: bindActionCreators(mainActions, dispatch)
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlertsOverlay);
