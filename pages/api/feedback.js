import fs from 'fs';
import path from 'path';

export const buildFeedbackPath = () => {
    return path.join(process.cwd(), 'data', 'feedback.json');
};
export const extractFeedback = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
};
const handler = async (req, res) => {
    if (req.method === "GET") {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        return res.status(200).json({ feedback: data });
    }
    if (req.method === "POST") {
        req.body.id = new Date().toISOString();

        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        data.push(req.body);
        
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({ type: "success", message: "Feedback added successfully!" ,feedback: data});
    }
};
export default handler;