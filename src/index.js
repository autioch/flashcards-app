import 'antd/dist/antd.css';
import { createApp } from 'pipe-and-gauge';
import actions from './actions';
import initialState from './initialState';
import ReactAppView from './app';

const el = document.querySelector('#root');

const store = createApp(actions, initialState, ReactAppView, el);

store.prepare();
