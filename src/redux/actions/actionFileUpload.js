import {actionPromise} from "../reducers/promiseReducer";
import {backendUrl} from "../../graphQL/url";

export const actionFileUpload = (file) => {
    console.log(file)
    const formdata = new FormData();
    formdata.append('photo', file);
    return actionPromise(
        'uploadFile',
        fetch(backendUrl + 'upload', {
            method: "POST",
            headers: localStorage.authToken
                ? {Authorization: 'Bearer ' + localStorage.authToken}
                : {},
            body: formdata
        }).then(res => res.json()))
}

export const actionFilesUpload = (files) =>
    async (dispatch) => {
        for(let file of files) {
            await dispatch(actionFileUpload(file))
        }
    }
