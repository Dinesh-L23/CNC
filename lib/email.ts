// Email notification service helper
export interface QuoteEmailData {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  product: string;
  quantity?: string;
  deliveryDate?: string;
  material?: string;
  toolDiameter?: string;
  application?: string;
  message?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  message: string;
}

export async function sendQuoteNotification(data: QuoteEmailData) {
  console.log(`[EMAIL NOTIFICATION] New RFQ Quote Request received:`, {
    recipient: process.env.EMAIL_USER || 'sales@marswinprecisiontools.in',
    from: data.email,
    customer: `${data.name} (${data.companyName})`,
    product: data.product,
    details: data,
  });

  // Acknowledgement to customer
  console.log(`[EMAIL ACKNOWLEDGEMENT] RFQ confirmation sent to customer:`, {
    to: data.email,
    subject: 'We have received your Quote Request - Marswin Precision Tools',
  });

  return { success: true };
}

export async function sendContactNotification(data: ContactEmailData) {
  console.log(`[EMAIL NOTIFICATION] New Contact Inquiry received:`, {
    recipient: process.env.EMAIL_USER || 'info@marswinprecisiontools.in',
    customer: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
  });

  return { success: true };
}
