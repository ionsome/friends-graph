import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import bgVideo from "../../res/bg-video.mp4";

const VK = window.VK;

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      showWidget: false
    };
  }

  loadVkWidget = () => {
    VK.Widgets.Auth("vk_auth", {
      width: 600,
      onAuth: () => this.props.changeIsAuthorized()
    });
  };

  static getDerivedStateFromProps(props, state) {
    // Если состояние vkInit стало true и виджет не отображается
    if (props.vkInit && !state.showWidget) return { showWidget: true };
  }

  render() {
    return (
      <div>
        <video
          id="bg-video"
          src={bgVideo}
          autoPlay="true"
          muted="true"
          loop="true"
        />
        <div className="login-content">
          <div id="vk_auth" className="position-fixed"></div>
          {this.state.showWidget && this.loadVkWidget()}
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
