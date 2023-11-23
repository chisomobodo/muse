export default function ({ app }: any) {
  // Access the runtime config
  const apiBase = app?.$config?.public?.apiBase 

  // Set the API base URL in your HTTP library or wherever you make API calls
  // For example, if you're using Axios:
  app?.$axios.setBaseURL(apiBase)
}