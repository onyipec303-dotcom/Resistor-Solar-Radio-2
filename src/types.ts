export interface OrderFormInputs {
  orderId?: string;
  orderDate?: string;
  name: string;
  email?: string;
  phone1: string;
  phone2: string;
  address: string;
  productName: string;
  productQuantity: string; // "1 Unit" | "2 Units"
  amount: string; // "N30,000" | "N55,000"
  whenToReceive: string;
}

export interface LeadOrder {
  id: string;
  createdAt: string;
  name: string;
  email?: string;
  phone1: string;
  phone2?: string;
  address: string;
  productName: string;
  productQuantity: string;
  amount: string;
  whenToReceive: string;
  status: 'Pending' | 'Contacted' | 'Delivered' | 'Cancelled';
  syncedToGoogleSheet: boolean;
  syncError?: string;
}

export interface AppConfig {
  googleSheetWebhookUrl: string;
  whatsappNumber: string;
}
