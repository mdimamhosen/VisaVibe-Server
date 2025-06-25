import { Router } from 'express';
import { EmailSender } from '../../utils/emailSender';

const router = Router();

router.post('/', async (req, res) => {
  try {
    console.log('Received email request:', req.body);
    const { payload } = req.body;

    await EmailSender(payload);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error:
        typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message?: string }).message
          : String(error),
    });
  }
});

export const EmailRoutes = router;
