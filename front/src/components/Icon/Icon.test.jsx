import React from 'react';
import { mount } from 'enzyme';
import { Icon } from './Icon';

describe('Icon should', () => {
  it('renders default icon in component with unknown icon property', () => {
    // When
    const wrapper = mount(<Icon icon="unknownIcon" />);

    // Then
    expect(wrapper.find('i').hasClass('fa fa-car')).toBeTruthy();
  });

  it('renders motorbiking icon with property icon= "motorbiking"', () => {
    // When
    const wrapper = mount(<Icon icon="motorbiking" />);

    // Then
    expect(wrapper.find('i').hasClass('fa fa-motorcycle')).toBeTruthy();
  });
});
