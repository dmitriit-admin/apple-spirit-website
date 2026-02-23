export const ADMIN_URL = 'https://functions.poehali.dev/7f596fac-a8fe-498a-bf36-7bfa5c3c69c5';
export const UPLOAD_URL = 'https://functions.poehali.dev/e6b8ed0a-5d91-4a0e-b345-ce02226791ef';

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  product_count: number;
}

export interface Product {
  id: number;
  name: string;
  category_slug: string;
  category_name: string;
  price: string;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
  is_active: boolean;
  sort_order: number;
}

export type ApiCall = (method: string, resource: string, body?: object, id?: number | string) => Promise<Record<string, unknown>>;
export type UploadImage = (file: File, folder: string) => Promise<string | null>;
