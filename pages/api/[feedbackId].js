import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const handler = async (req, res) => {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    const selectedFeedback = data.find((item) => item.id === feedbackId);
    res.status(200).json({ feedback: selectedFeedback });
};

export default handler;