import { SELECT_USER } from '../actions//SelectUser'

export default function selectUser(state=null, action){
    switch(action.type) {
        case SELECT_USER:
        return action.id
        default:
            return state
    }
}