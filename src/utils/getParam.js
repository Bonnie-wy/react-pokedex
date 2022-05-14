const getParams = (url, defaultParams) => {
  if (!url) {
    return defaultParams;
  }

  const extractedParams = new URLSearchParams(url.split("?")[1]);

  return {
    ...defaultParams,
    offset: parseInt(extractedParams.get("offset")),
  };
};

export default getParams;
