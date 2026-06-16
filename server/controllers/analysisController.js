// @desc    Perform Letter Frequency Analysis on Text
// @route   POST /api/analysis/frequency
// @access  Private
export const analyzeFrequency = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (text === undefined) {
      return res.status(400).json({ success: false, message: 'Please provide text for analysis' });
    }

    const totalCharacters = text.length;
    const cleanText = text.toUpperCase();

    // Initialize counts for A-Z
    const letterCounts = {};
    for (let i = 65; i <= 90; i++) {
      letterCounts[String.fromCharCode(i)] = 0;
    }

    let totalLetters = 0;
    let mostRepeatedChar = 'N/A';
    let maxCount = 0;

    // Count characters
    for (let char of cleanText) {
      if (char >= 'A' && char <= 'Z') {
        letterCounts[char] = (letterCounts[char] || 0) + 1;
        totalLetters++;
        
        if (letterCounts[char] > maxCount) {
          maxCount = letterCounts[char];
          mostRepeatedChar = char;
        }
      }
    }

    // Prepare frequency table data
    const frequencyTable = Object.keys(letterCounts).map((letter) => {
      const count = letterCounts[letter];
      const percentage = totalLetters > 0 ? ((count / totalLetters) * 100).toFixed(2) : '0.00';
      return {
        letter,
        count,
        percentage: parseFloat(percentage)
      };
    });

    res.json({
      success: true,
      analysis: {
        totalCharacters,
        totalLetters,
        mostRepeatedChar,
        mostRepeatedCount: maxCount,
        letterCounts,
        frequencyTable
      }
    });
  } catch (error) {
    next(error);
  }
};
