import React from 'react';
import { shallow } from 'enzyme';
import { Home } from './Home';

describe('Home component', () => {
  let wrapper;
  beforeEach(() => {
    const posts = [
      {id: "1", text: "Some text", title: "Some title"},
      {id: "1", text: "Some text", title: "Some title"}
    ];
    wrapper = shallow(<Home posts={posts} fetchPosts={() => {}} />);
  });

  it('renders without crashing', () => {});
});
