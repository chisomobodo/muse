const useAccessToken = () => {
  const accessToken = useState<string>('token', () => '')
  
  const setAccessToken = (token: string) => {
    accessToken.value = token
  }
  return {
    accessToken,
    setAccessToken
  }
}

const useFetch = async (url: string, options: any) => {
  const data = ref<any>(null);
  const loading = ref(true);
  const error = ref(null);
  try {
    loading.value = true;
    const res = await fetch(url, options);
    data.value = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
    (error as unknown as any).value = error;
  } finally {
    loading.value = false;
  }
}

export {
  useAccessToken,
  useFetch
}