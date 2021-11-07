import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight, faCalendar, faHome, faRedo} from "@fortawesome/free-solid-svg-icons";

export const Icon = ({style, icon, className}) => {
  const makeIcon = iconName => {
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

  return (
      <span style={style} className={className}>
        <FontAwesomeIcon icon={makeIcon(icon)} />
      </span>
  )

}
