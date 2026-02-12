import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ShopifyClient } from './client.js';
import {
  ListProductsSchema,
  GetProductSchema,
  CreateProductSchema,
  UpdateProductSchema,
  CountProductsSchema,
  ListOrdersSchema,
  GetOrderSchema,
  ListCustomersSchema,
  GetCustomerSchema,
  CreateCustomerSchema,
  SearchCustomersSchema,
  ListCollectionsSchema,
  GetInventoryLevelsSchema,
  GetShopSchema,
} from './schemas.js';

export function registerTools(server: McpServer): void {
  let _client: ShopifyClient | null = null;
  const getClient = () => {
    if (!_client) _client = new ShopifyClient();
    return _client;
  };

  // Products
  server.tool(
    'shopify_list_products',
    'List products with pagination and filtering options.',
    ListProductsSchema.shape,
    async (params) => {
      try {
        const result = await getClient().listProducts(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_get_product',
    'Get a product by ID.',
    GetProductSchema.shape,
    async (params) => {
      try {
        const result = await getClient().getProduct(params.productId);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_create_product',
    'Create a new product.',
    CreateProductSchema.shape,
    async (params) => {
      try {
        const result = await getClient().createProduct(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_update_product',
    'Update an existing product.',
    UpdateProductSchema.shape,
    async (params) => {
      try {
        const { productId, ...updates } = params;
        const result = await getClient().updateProduct(productId, updates);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_count_products',
    'Count products with optional filters.',
    CountProductsSchema.shape,
    async (params) => {
      try {
        const result = await getClient().countProducts(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  // Orders
  server.tool(
    'shopify_list_orders',
    'List orders with filtering options.',
    ListOrdersSchema.shape,
    async (params) => {
      try {
        const result = await getClient().listOrders(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_get_order',
    'Get an order by ID.',
    GetOrderSchema.shape,
    async (params) => {
      try {
        const result = await getClient().getOrder(params.orderId);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  // Customers
  server.tool(
    'shopify_list_customers',
    'List customers with pagination.',
    ListCustomersSchema.shape,
    async (params) => {
      try {
        const result = await getClient().listCustomers(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_get_customer',
    'Get a customer by ID.',
    GetCustomerSchema.shape,
    async (params) => {
      try {
        const result = await getClient().getCustomer(params.customerId);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_create_customer',
    'Create a new customer.',
    CreateCustomerSchema.shape,
    async (params) => {
      try {
        const result = await getClient().createCustomer(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  server.tool(
    'shopify_search_customers',
    'Search customers by query string.',
    SearchCustomersSchema.shape,
    async (params) => {
      try {
        const result = await getClient().searchCustomers(params.query);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  // Collections
  server.tool(
    'shopify_list_collections',
    'List collections with pagination.',
    ListCollectionsSchema.shape,
    async (params) => {
      try {
        const result = await getClient().listCollections(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  // Inventory
  server.tool(
    'shopify_get_inventory_levels',
    'Get inventory levels by item or location IDs.',
    GetInventoryLevelsSchema.shape,
    async (params) => {
      try {
        const result = await getClient().getInventoryLevels(params);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );

  // Shop
  server.tool(
    'shopify_get_shop',
    'Get shop information.',
    GetShopSchema.shape,
    async () => {
      try {
        const result = await getClient().getShop();
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (error) {
        return errorResult(error);
      }
    }
  );
}

function errorResult(error: unknown) {
  const message =
    error instanceof Error ? error.message : 'An unknown error occurred';
  return {
    content: [{ type: 'text' as const, text: `Error: ${message}` }],
    isError: true,
  };
}
