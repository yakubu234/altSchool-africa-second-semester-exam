const readingTime = (post) => {
    const noOfWords = post.split(' ').length;
    // assuming the average person reads 180 words a minute
    const wordsPerMinute = noOfWords / 180;
    return Math.round(wordsPerMinute) === 0 ?
        1 :
        Math.round(wordsPerMinute);
};

module.exports = readingTime;