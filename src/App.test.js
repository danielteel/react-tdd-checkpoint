import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

test('if search box exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#search-box')).toHaveLength(1);
});

test('if search button exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#search-button')).toHaveLength(1);
});

test('if browse movies link exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#browse-movies')).toHaveLength(1);
});

test('if register link exists',()=>{
	const wrapper = shallow(<App />);

  expect(wrapper.find('#register')).toHaveLength(1);
});