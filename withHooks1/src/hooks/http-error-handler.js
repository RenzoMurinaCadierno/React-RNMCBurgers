import { useState, useEffect } from 'react'

export default httpClient => {

  const [error, setError] = useState(null)
  
  // formerly componentWillMount()
  const reqInterceptor = httpClient.interceptors.request.use(
    req => {
      setError(null)
      return req
    }
  )
  
  const resInterceptor = httpClient.interceptors.response.use(
    res => res, 
    err => { setError(err) }
  )
  
  // formerly componentWillUnmount()
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor)
      httpClient.interceptors.response.eject(resInterceptor)
    }
  }, [reqInterceptor, resInterceptor, httpClient])
  
  const handleClearError = () => { setError(null) }

  return [error, handleClearError]
}