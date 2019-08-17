export class HttpClient {
  static get(url,params) {
    return fetch(url)
  }
  static post(url,params) {
    return fetch(url,{
      method: 'POST',
      body: JSON.stringify(params)
    })
  }
  static put(url,params) {
    return fetch(url,{
      method: 'PUT',
      body: JSON.stringify(params)
    })
  }
  static delete(url,params) {
    return fetch(url,{
      method: 'DELETE',
      body: JSON.stringify(params)
    })
  }
}
