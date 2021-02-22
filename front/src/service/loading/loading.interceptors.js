import axios from 'axios';
import { store } from '../store/store';
import {
  endingRequest,
  startingRequest,
} from '../../feature/loader/store/actions';

const interceptors = {
  load: () => {
    axios.interceptors.request.use(
      config => {
        store.dispatch(startingRequest());
        return config;
      },
      error =>
        // Do something with request error
        Promise.reject(error)
    );

    axios.interceptors.response.use(
      response => {
        store.dispatch(endingRequest());
        return response;
      },
      error => {
        store.dispatch(endingRequest());
        return Promise.reject(error.response);
      }
    );
  },
};

export { interceptors };
