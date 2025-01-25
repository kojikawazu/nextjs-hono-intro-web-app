import { Hono } from 'hono';
import { Resend } from 'resend';

const sendMailRouter = new Hono();

// Resendクライアントの初期化
const resend = new Resend(process.env.RESEND_API_KEY);

sendMailRouter.post('/send', async (c) => {
    console.log(`send mail start...`);

    try {
        const { name, from, subjects, messages } = await c.req.json();

        if (!name || !from || !subjects || !messages) {
            return c.json({ error: 'Missing required fields' }, 400);
        }

        console.log(`${name}: send mail...`);
        const response = await resend.emails.send({
            from: 'Resend <kawa@resend.dev>',
            to: process.env.MY_MAIL_ADDRESS || 'no-reply@example.com',
            subject: subjects,
            html: `<p><b>From:</b> ${name} (${from})</p><p>${messages}</p>`,
        });

        console.log(`${name}: use resend end.`);
        return c.json({ success: true, response: response });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Resend Error:', error.message);
        } else {
            console.error('Resend Error:', error);
        }
        return c.json({ error: 'Failed to send email' }, 500);
    }
});

export default sendMailRouter;
