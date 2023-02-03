import callApi from './callApi';

async function addFirstCommentApi(newData: any) {
 const response = await callApi().post(`/comments`, newData)
 return response
}

export default addFirstCommentApi