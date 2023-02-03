import callApi from './callApi';

async function getCommentsApi() {
 const response = await callApi().get("/comments")
 return response
}

export default getCommentsApi