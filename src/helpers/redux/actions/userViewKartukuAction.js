import {ASSIGN_USERDATA_VIEW_KARTUKU} from './types';

export const assignUserDataViewKartuku = (data) => {
  return (dispatch) => {
    dispatch({
      type: ASSIGN_USERDATA_VIEW_KARTUKU,
      payload: {
        ...data,
      },
    });
  };
};
