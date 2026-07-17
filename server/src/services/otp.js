import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import db from '../config/db.js'

// ── OTP generation ───────────────────────────────────────────

export function generateOtp() {
  return crypto.randomInt(100000, 999999).toString()
}

// ── Store & verify ───────────────────────────────────────────

export async function storeOtp(identifier, type) {
  const otp = generateOtp()
  const hash = await bcrypt.hash(otp, 10)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  // Delete any existing OTPs for this identifier
  await db.query('DELETE FROM otp_verifications WHERE identifier = $1', [identifier])

  await db.query(
    'INSERT INTO otp_verifications (identifier, otp_hash, type, expires_at) VALUES ($1, $2, $3, $4)',
    [identifier, hash, type, expiresAt]
  )

  return otp
}

export async function verifyOtp(identifier, otp) {
  const { rows } = await db.query(
    'SELECT * FROM otp_verifications WHERE identifier = $1 ORDER BY created_at DESC LIMIT 1',
    [identifier]
  )

  const record = rows[0]
  if (!record) return { valid: false, error: 'No OTP found. Please request a new one.' }

  if (new Date() > new Date(record.expires_at)) {
    await db.query('DELETE FROM otp_verifications WHERE id = $1', [record.id])
    return { valid: false, error: 'OTP has expired. Please request a new one.' }
  }

  const match = await bcrypt.compare(otp, record.otp_hash)
  if (!match) return { valid: false, error: 'Invalid OTP' }

  // OTP is valid — clean up
  await db.query('DELETE FROM otp_verifications WHERE identifier = $1', [identifier])
  return { valid: true }
}

// ── Email sending ────────────────────────────────────────────

let emailTransporter = null

function getEmailTransporter() {
  if (emailTransporter) return emailTransporter
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null
  }
  emailTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return emailTransporter
}

export async function sendEmailOtp(email, otp) {
  const transporter = getEmailTransporter()
  if (!transporter) {
    console.log(`[DEV] Email OTP for ${email}: ${otp}`)
    return true
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Cool Kids Club — Your Verification Code',
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 32px; text-align: center;">
        <h2 style="color: #2d2d2d;">Your Verification Code</h2>
        <p style="color: #555; margin-bottom: 24px;">Enter this code to verify your account:</p>
        <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #5DA05A; padding: 16px; background: #EEF7EE; border-radius: 12px;">
          ${otp}
        </div>
        <p style="color: #888; font-size: 13px; margin-top: 24px;">This code expires in 10 minutes.</p>
      </div>
    `,
  })
  return true
}

// ── SMS sending ──────────────────────────────────────────────

let twilioClient = null

function getTwilioClient() {
  if (twilioClient) return twilioClient
  if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE) {
    return null
  }
  twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
  return twilioClient
}

export async function sendPhoneOtp(phone, otp) {
  const client = getTwilioClient()
  if (!client) {
    console.log(`[DEV] Phone OTP for ${phone}: ${otp}`)
    return true
  }

  await client.messages.create({
    body: `Cool Kids Club — Your verification code is: ${otp}`,
    from: process.env.TWILIO_PHONE,
    to: phone,
  })
  return true
}
