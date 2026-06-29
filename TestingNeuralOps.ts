// Sample file exercising tracked third-party integrations (imports + SDK init +
// API URLs + env keys) so NeuralOps ingestion detects them. Not real code.
import Stripe from 'stripe';
import twilio from 'twilio';
import { S3Client } from '@aws-sdk/client-s3';
import OpenAI from 'openai';
import sgMail from '@sendgrid/mail';
import { createClient } from '@supabase/supabase-js';
import { clerkClient } from '@clerk/nextjs';
import { Resend } from 'resend';
import { Octokit } from '@octokit/rest';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const sms = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const s3 = new S3Client({ region: process.env.AWS_REGION });
const ai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);
const gh = new Octokit({ auth: process.env.GITHUB_TOKEN });
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function ping() {
  await fetch('https://api.stripe.com/v1/charges');
  await fetch('https://api.openai.com/v1/models');
  await fetch('https://api.twilio.com/2010-04-01/Accounts');
  await fetch('https://api.sendgrid.com/v3/mail/send');
  return { stripe, sms, s3, ai, supabase, resend, gh, clerkClient };
}
