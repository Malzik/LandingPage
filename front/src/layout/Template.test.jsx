import React from 'react';
import { shallow } from 'enzyme';
import { Template } from './Template';

describe('Template should', () => {
  it('render', () => {
    // When
    const wrapper = shallow(<Template />);

    // Then
    expect(wrapper.exists('.Template')).toBeTruthy();
  });

  it('render with children', () => {
    // When
    const wrapper = shallow(<Template>children</Template>);

    // Then
    expect(wrapper.find('.Template').text()).toContain('children');
  });
});
