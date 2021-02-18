import React from 'react';
import { mount } from 'enzyme';
import { Tag } from './Tag';

const TAG = 'Text of my tag';

describe('Tag should', () => {
  it('renders empty string in component with no children', () => {
    // When
    const wrapper = mount(<Tag />);

    // Then
    expect(wrapper.find('.badge').text()).toBe('');
  });

  it('renders with content props', () => {
    // When
    const wrapper = mount(<Tag children={TAG} />);

    // Then
    const tag = wrapper.find('.badge');
    expect(tag.length).toBe(1);
    expect(tag.text()).toBe(TAG);
  });
});
