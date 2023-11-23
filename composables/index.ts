export const useAccessToken = () => {
  const accessToken = useState<string>('token', () => '')
  
  const setAccessToken = (token: string) => {
    accessToken.value = token
  }
  return {
    accessToken,
    setAccessToken
  }
}