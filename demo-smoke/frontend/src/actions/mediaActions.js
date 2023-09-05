import axios from 'axios'
import {
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,

    WORK_LIST_REQUEST,
    WORK_LIST_SUCCESS,
    WORK_LIST_FAIL,
} from '../constants/mediaConstants'

export const listPosts = async (dispatch) => {
    try{
        dispatch({type:POST_LIST_REQUEST})
        const { data } = await axios.get('api/media/posts/')
        
        

        dispatch({type:POST_LIST_SUCCESS,
        payload:data})

    } catch(error) {
        dispatch({type:POST_LIST_FAIL,
        payload: error.response && error.response.data.detail 
        ? error.response.data.detail
        : error.message
    
    })
}

}

export const listWorks = async (dispatch) => {
    try{
        dispatch({type:WORK_LIST_REQUEST})
        const { data } = await axios.get('api/media/works/')
        
        

        dispatch({type:WORK_LIST_SUCCESS,
        payload:data})

    } catch(error) {
        dispatch({type:WORK_LIST_FAIL,
        payload: error.response && error.response.data.detail 
        ? error.response.data.detail
        : error.message
    
    })
}

}


