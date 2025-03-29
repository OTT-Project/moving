export const movieImage = (image: string) => {
  if (!image) {
    return '/images/defaultImage.png';
  }
  const resultImage = process.env.NEXT_PUBLIC_BACK_IMAGE_URL + image;
  return resultImage;
};
