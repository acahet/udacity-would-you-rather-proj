import selectUser from './SelectUser'
import { loadingBarReducer } from 'react-redux-loading'
import { combineReducers} from 'redux'

const allReducers = combineReducers({
    currentUser: selectUser,
    loading: loadingBarReducer,

})

export default allReducers;