export const reviewTimeAgo = (data: string) => {
  const givenDate = new Date(data);
  const currentDate = new Date();

  let yearsDifference = currentDate.getFullYear() - givenDate.getFullYear();
  let monthsDifference = currentDate.getMonth() - givenDate.getMonth();

  if (monthsDifference < 0) {
    yearsDifference -= 1;
    monthsDifference += 12;
  }

  if (yearsDifference === 0) {
    return `${monthsDifference}개월 전`;
  } else if (monthsDifference === 0) {
    return `${yearsDifference}년 전`;
  } else {
    return `${yearsDifference}년 ${monthsDifference}개월 전`;
  }
};
