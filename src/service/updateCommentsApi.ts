import callApi from './callApi';

async function updateCommentsApi(id: number, newData: any) {
 const response = await callApi().put(`/comments/${id}`, newData)
 return response
}

export default updateCommentsApi