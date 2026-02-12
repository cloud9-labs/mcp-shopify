/**
 * Shopify Admin REST API Client
 */

export interface ShopifyConfig {
  storeUrl: string;
  accessToken: string;
  apiVersion?: string;
}

export interface Product {
  id?: number;
  title: string;
  body_html?: string;
  vendor?: string;
  product_type?: string;
  status?: string;
  tags?: string;
  variants?: ProductVariant[];
  images?: ProductImage[];
}

export interface ProductVariant {
  id?: number;
  product_id?: number;
  title?: string;
  price: string;
  sku?: string;
  inventory_quantity?: number;
}

export interface ProductImage {
  id?: number;
  product_id?: number;
  src: string;
  alt?: string;
}

export interface Order {
  id?: number;
  email?: string;
  created_at?: string;
  updated_at?: string;
  total_price?: string;
  subtotal_price?: string;
  total_tax?: string;
  financial_status?: string;
  fulfillment_status?: string;
  line_items?: LineItem[];
}

export interface LineItem {
  id?: number;
  product_id?: number;
  variant_id?: number;
  title?: string;
  quantity?: number;
  price?: string;
}

export interface Customer {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  tags?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Collection {
  id?: number;
  handle?: string;
  title: string;
  body_html?: string;
  collection_type?: string;
}

export interface InventoryLevel {
  inventory_item_id?: number;
  location_id?: number;
  available?: number;
  updated_at?: string;
}

export interface Shop {
  id?: number;
  name?: string;
  email?: string;
  domain?: string;
  currency?: string;
  timezone?: string;
  shop_owner?: string;
}

export class ShopifyClient {
  private config: ShopifyConfig;
  private baseUrl: string;

  constructor(config?: ShopifyConfig) {
    this.config = config || {
      storeUrl: process.env.SHOPIFY_STORE_URL || '',
      accessToken: process.env.SHOPIFY_ACCESS_TOKEN || '',
      apiVersion: '2024-01',
    };

    if (!this.config.storeUrl) {
      throw new Error('SHOPIFY_STORE_URL environment variable is required');
    }
    if (!this.config.accessToken) {
      throw new Error('SHOPIFY_ACCESS_TOKEN environment variable is required');
    }

    this.baseUrl = `${this.config.storeUrl}/admin/api/${this.config.apiVersion}`;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'X-Shopify-Access-Token': this.config.accessToken,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Shopify API error (${response.status}): ${errorText}`
      );
    }

    return response.json() as Promise<T>;
  }

  // Products
  async listProducts(params?: {
    limit?: number;
    page_info?: string;
    status?: string;
  }): Promise<{ products: Product[] }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.page_info) query.set('page_info', params.page_info);
    if (params?.status) query.set('status', params.status);

    const endpoint = `/products.json${query.toString() ? `?${query}` : ''}`;
    return this.request<{ products: Product[] }>(endpoint);
  }

  async getProduct(productId: number): Promise<{ product: Product }> {
    return this.request<{ product: Product }>(`/products/${productId}.json`);
  }

  async createProduct(product: Product): Promise<{ product: Product }> {
    return this.request<{ product: Product }>('/products.json', {
      method: 'POST',
      body: JSON.stringify({ product }),
    });
  }

  async updateProduct(
    productId: number,
    product: Partial<Product>
  ): Promise<{ product: Product }> {
    return this.request<{ product: Product }>(`/products/${productId}.json`, {
      method: 'PUT',
      body: JSON.stringify({ product }),
    });
  }

  async countProducts(params?: {
    vendor?: string;
    product_type?: string;
  }): Promise<{ count: number }> {
    const query = new URLSearchParams();
    if (params?.vendor) query.set('vendor', params.vendor);
    if (params?.product_type) query.set('product_type', params.product_type);

    const endpoint = `/products/count.json${query.toString() ? `?${query}` : ''}`;
    return this.request<{ count: number }>(endpoint);
  }

  // Orders
  async listOrders(params?: {
    limit?: number;
    status?: string;
    financial_status?: string;
    fulfillment_status?: string;
  }): Promise<{ orders: Order[] }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.status) query.set('status', params.status);
    if (params?.financial_status)
      query.set('financial_status', params.financial_status);
    if (params?.fulfillment_status)
      query.set('fulfillment_status', params.fulfillment_status);

    const endpoint = `/orders.json${query.toString() ? `?${query}` : ''}`;
    return this.request<{ orders: Order[] }>(endpoint);
  }

  async getOrder(orderId: number): Promise<{ order: Order }> {
    return this.request<{ order: Order }>(`/orders/${orderId}.json`);
  }

  // Customers
  async listCustomers(params?: {
    limit?: number;
    page_info?: string;
  }): Promise<{ customers: Customer[] }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.page_info) query.set('page_info', params.page_info);

    const endpoint = `/customers.json${query.toString() ? `?${query}` : ''}`;
    return this.request<{ customers: Customer[] }>(endpoint);
  }

  async getCustomer(customerId: number): Promise<{ customer: Customer }> {
    return this.request<{ customer: Customer }>(
      `/customers/${customerId}.json`
    );
  }

  async createCustomer(customer: Customer): Promise<{ customer: Customer }> {
    return this.request<{ customer: Customer }>('/customers.json', {
      method: 'POST',
      body: JSON.stringify({ customer }),
    });
  }

  async searchCustomers(query: string): Promise<{ customers: Customer[] }> {
    const endpoint = `/customers/search.json?query=${encodeURIComponent(query)}`;
    return this.request<{ customers: Customer[] }>(endpoint);
  }

  // Collections
  async listCollections(params?: {
    limit?: number;
  }): Promise<{ custom_collections: Collection[] }> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());

    const endpoint = `/custom_collections.json${query.toString() ? `?${query}` : ''}`;
    return this.request<{ custom_collections: Collection[] }>(endpoint);
  }

  // Inventory
  async getInventoryLevels(params?: {
    inventory_item_ids?: string;
    location_ids?: string;
    limit?: number;
  }): Promise<{ inventory_levels: InventoryLevel[] }> {
    const query = new URLSearchParams();
    if (params?.inventory_item_ids)
      query.set('inventory_item_ids', params.inventory_item_ids);
    if (params?.location_ids)
      query.set('location_ids', params.location_ids);
    if (params?.limit) query.set('limit', params.limit.toString());

    const endpoint = `/inventory_levels.json?${query}`;
    return this.request<{ inventory_levels: InventoryLevel[] }>(endpoint);
  }

  // Shop
  async getShop(): Promise<{ shop: Shop }> {
    return this.request<{ shop: Shop }>('/shop.json');
  }
}
