export const getProducts = async () => {
  try {
    const data = await fetch('https://dummyjson.com/products');

    if (!data.ok) {
      throw new Error('Failed to fetch products.');
    }

    const response = await data.json();
    return response;
  } catch (error) {
    throw new Error('Something went wrong.');
  }
};
