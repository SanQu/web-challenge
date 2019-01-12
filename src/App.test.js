import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<App />);
});

it('calls componentDidMount and change the state', async () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({status: 200, json: () => ([{name: 'mockname'}])}));

  const appComponent = shallow(<App />);

  expect(appComponent.state().houses).toEqual([]);
  
  await appComponent.instance().componentDidMount();
  
  expect(appComponent.state().houses).toEqual([{name: 'mockname'}]);
});

it('calls getHouses and returns items', async () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({status: 200, json: () => ([{name: 'mockname', region: 'mockregion', url: 'mockurl'}])}));

  const appComponent = shallow(<App />);
  
  await appComponent.instance().componentDidMount();

  const houseList = await appComponent.instance().getHouses();
  
  expect(JSON.stringify(houseList)).toMatch(/mockname/);
  expect(JSON.stringify(houseList)).toMatch(/mockregion/);
});

it('getDetails and check new detail and list view state', async () => {
  window.fetch = jest.fn().mockImplementation(() => Promise.resolve({status: 200, json: () => ([{name: 'mockname'}])}));

  const appComponent = shallow(<App />);
  
  await appComponent.instance().getDetails('mockurl');
  
  expect(appComponent.state().selectedHouse).toEqual([{name: 'mockname'}]);
  expect(appComponent.state().showDetailView).toBe(true);
  expect(appComponent.state().showListView).toBe(false);
});

it('will set new state backToListView', async () => {
  const appComponent = shallow(<App />);
  
  appComponent.instance().backToListView();
  
  expect(appComponent.state().showDetailView).toBe(false);
  expect(appComponent.state().showListView).toBe(true);
});

it('listViewClasses', async () => {
  const appComponent = shallow(<App />);
  
  const classList = appComponent.instance().listViewClasses();
  
  expect(classList).toBe('list-view d-block');
});

it('detailViewClasses', async () => {
  const appComponent = shallow(<App />);
  
  const classList = appComponent.instance().detailViewClasses();
  
  expect(classList).toBe('detail-view d-none');
});