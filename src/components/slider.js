import React from "react";
import "../App.css";

class Slider extends React.Component {
  state = { value: 50, display: "" };

  changeDisplay = (e) => {
    this.setState({
      display: `Volume: ${e.target.value}`,
      value: e.target.value,
    });
    setTimeout(() => this.setState({ display: "" }), 1000);
  };

  render() {
    return (
      <div>
        <div className="display">
          <h4>{this.state.display || this.props.display}</h4>
        </div>
        <input
          className="slider-switch"
          id="slider"
          type="range"
          min="0"
          max="100"
          disabled={!this.props.disabled}
          onChange={this.changeDisplay}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Slider;
