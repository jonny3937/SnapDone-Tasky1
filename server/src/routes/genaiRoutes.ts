import express from 'express';
import { generateSteps } from '../utils/genai';

const router = express.Router();

router.post('/generate-steps', async (req, res) => {
  const { task } = req.body;

  if (!task || typeof task !== 'string') {
    return res.status(400).json({ error: 'Task is required as a string.' });
  }

  try {
    const steps = await generateSteps(task);
    res.status(200).json({ steps });
  } catch (error) {
    console.error('Gemini AI Error:', error);
    res.status(500).json({ error: 'Failed to generate task steps using Gemini AI.' });
  }
});

export default router;
