import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight, faCalendar, faHome, faRedo} from "@fortawesome/free-solid-svg-icons";

class Icon extends React.Component {
  static makeIcon(iconName) {
    let icon;
    switch (iconName) {
      case 'calendar':
        icon = faCalendar;
        break;
      case 'angle-right':
        icon = faAngleRight;
        break;
      case 'angle-left':
        icon = faAngleLeft;
        break;
      case 'refresh':
        icon = faRedo;
        break;
      default:
        icon = faHome;
    }
    return icon;
  }

  render() {
    const { style, icon, className } = this.props;
    const completeStyle = {
      ...style,
    };
    return (
      <span style={completeStyle} className={className}>
        <FontAwesomeIcon icon={Icon.makeIcon(icon)} />
      </span>
    );
  }
}

export { Icon };
