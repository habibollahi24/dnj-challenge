import callApi from './callApi';

async function getCommentByIdApi(id: number) {
 const response = await callApi().get(`/comments/${id}`)
 return response
}

export default getCommentByIdApi