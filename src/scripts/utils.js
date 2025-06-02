export { shuffle };

function shuffle(array) {
  const shuffledArray = [...array];
  shuffledArray.sort(() => Math.random() - 0.5);
  return shuffledArray;
}
