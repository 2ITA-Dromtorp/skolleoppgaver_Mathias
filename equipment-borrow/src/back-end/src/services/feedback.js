const db = require('./db');

const addFeedback = async (feedback) => {
  try {
    const result = await db.query(
      "INSERT INTO feedback (user_id, message) VALUES (?, ?)",
      [feedback.user_id, feedback.message]
    );
  } catch (err) {
    console.log(err);
  }
}

const getAllFeedback = async () => {
  try {
    const [rows, fields] = await db.query('SELECT * FROM feedback');
    return rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addFeedback, getAllFeedback }



