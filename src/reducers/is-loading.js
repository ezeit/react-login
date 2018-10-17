import { IS_LOADING } from '../action-types/index';

const initialState = {
  active: false
}

function isLoading(state = initialState, action) {
  switch (action.type) {
    case IS_LOADING:
      return {
        active: action.payload.value
      }
    default:
      return state
  }
}

export default isLoading
