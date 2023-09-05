import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,

    WORK_LIST_REQUEST,
    WORK_LIST_SUCCESS,
    WORK_LIST_FAIL,
} from '../constants/mediaConstants'


export const postListReducer = (state = {posts: []}, action) => {


    switch (action.type) {
        case POST_LIST_REQUEST:
            return { loading:true, posts: []}

        case POST_LIST_SUCCESS:
            return { loading: false,
                      posts:action.payload}
        
        case POST_LIST_FAIL:
            return {loading: false, error: action.payload}
        
        default:
            return state
    }
}

export const workListReducer = (state = {works: []}, action) => {


    switch (action.type) {
        case WORK_LIST_REQUEST:
            return { loading:true, posts: []}

        case WORK_LIST_SUCCESS:
            return { loading: false,
                      posts:action.payload}
        
        case WORK_LIST_FAIL:
            return {loading: false, error: action.payload}
        
        default:
            return state
    }
}