import {actionPromise} from "../reducers/promiseReducer";
import {backendUrl} from "../../graphQL/url";
import {logDOM} from "@testing-library/react";

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

// export const actionFilesUpload = (files) =>
//     async (dispatch) => {
//         console.log(files)
//         for(let file of files) {
//             await dispatch(actionFileUpload(file))
//         }
//     }

export const actionFilesUpload = (files) => {
    let promiseResult = [];

    for (let i = 0; i < files.length; i++) {
        let formdata = new FormData();
        formdata.append('photo', files[i]);
        let oneRes = fetch(backendUrl +'upload', {
            method: 'POST',
            headers: localStorage.authToken
                ? { Authorization: 'Bearer ' + localStorage.authToken }
                : {},
            body: formdata,
        });

        promiseResult.push(oneRes);
    }
    return actionPromise(
        'uploadFile',
        Promise.all(promiseResult)
            .then((res) => res.map((item) => item.json()))
            .then((res) => Promise.all(res))
    );
};
