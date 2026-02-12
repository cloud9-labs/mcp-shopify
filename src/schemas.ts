import { z } from 'zod';

export const ListProductsSchema = z.object({
  limit: z.number().int().positive().max(250).optional().default(50),
  page_info: z.string().optional(),
  status: z.enum(['active', 'archived', 'draft']).optional(),
});

export const GetProductSchema = z.object({
  productId: z.number().int().positive(),
});

export const ProductVariantSchema = z.object({
  title: z.string().optional(),
  price: z.string(),
  sku: z.string().optional(),
  inventory_quantity: z.number().int().optional(),
});

export const ProductImageSchema = z.object({
  src: z.string().url(),
  alt: z.string().optional(),
});

export const CreateProductSchema = z.object({
  title: z.string(),
  body_html: z.string().optional(),
  vendor: z.string().optional(),
  product_type: z.string().optional(),
  status: z.enum(['active', 'archived', 'draft']).optional(),
  tags: z.string().optional(),
  variants: z.array(ProductVariantSchema).optional(),
  images: z.array(ProductImageSchema).optional(),
});

export const UpdateProductSchema = z.object({
  productId: z.number().int().positive(),
  title: z.string().optional(),
  body_html: z.string().optional(),
  vendor: z.string().optional(),
  product_type: z.string().optional(),
  status: z.enum(['active', 'archived', 'draft']).optional(),
  tags: z.string().optional(),
});

export const CountProductsSchema = z.object({
  vendor: z.string().optional(),
  product_type: z.string().optional(),
});

export const ListOrdersSchema = z.object({
  limit: z.number().int().positive().max(250).optional().default(50),
  status: z.enum(['open', 'closed', 'cancelled', 'any']).optional(),
  financial_status: z
    .enum([
      'authorized',
      'pending',
      'paid',
      'partially_paid',
      'refunded',
      'voided',
      'partially_refunded',
      'any',
    ])
    .optional(),
  fulfillment_status: z
    .enum(['shipped', 'partial', 'unshipped', 'any'])
    .optional(),
});

export const GetOrderSchema = z.object({
  orderId: z.number().int().positive(),
});

export const ListCustomersSchema = z.object({
  limit: z.number().int().positive().max(250).optional().default(50),
  page_info: z.string().optional(),
});

export const GetCustomerSchema = z.object({
  customerId: z.number().int().positive(),
});

export const CreateCustomerSchema = z.object({
  email: z.string().email(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  tags: z.string().optional(),
});

export const SearchCustomersSchema = z.object({
  query: z.string().min(1),
});

export const ListCollectionsSchema = z.object({
  limit: z.number().int().positive().max(250).optional().default(50),
});

export const GetInventoryLevelsSchema = z.object({
  inventory_item_ids: z.string().optional(),
  location_ids: z.string().optional(),
  limit: z.number().int().positive().max(250).optional().default(50),
});

export const GetShopSchema = z.object({});
