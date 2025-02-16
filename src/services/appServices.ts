export const getAppServices = async (): Promise<string[]> => {
  const services = [
    'chroma',
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(services);
    }, 1000);
  });
};
