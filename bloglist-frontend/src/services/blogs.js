import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const destroyToken = () => {
  token = null
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const addComment = async (id, content) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content })
  return response.data
}

const update = async newObject => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, getConfig())
  return response.data
}

const remove = async object => {
  const response = await axios.delete(`${baseUrl}/${object.id}`, getConfig())
  return response.data
}

export default { get, getAll, create, addComment, update, remove, setToken, destroyToken }