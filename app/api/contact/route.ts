import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    // Send email to admin
    const adminEmail = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Sattvalife Yoga <noreply@sattvalife.yoga>',
      to: ['info@sattvalife.yoga'],
      subject: `New Contact Form: ${validated.firstName} ${validated.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.firstName} ${validated.lastName}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Phone:</strong> ${validated.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted from sattvalife.yoga contact form</small></p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Sattvalife Yoga <noreply@sattvalife.yoga>',
      to: [validated.email],
      subject: 'Thank you for contacting Sattvalife Yoga!',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${validated.firstName},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, you might want to:</p>
        <ul>
          <li><a href="https://sattvalife.yoga/schedule">View our class schedule</a></li>
          <li><a href="https://sattvalife.yoga/register">Book a class</a></li>
          <li><a href="https://sattvalife.yoga/about">Learn more about us</a></li>
        </ul>
        <p>Namaste,<br>The Sattvalife Yoga Team</p>
        <hr>
        <p><small>If you didn't submit this form, please ignore this email.</small></p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation error', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}