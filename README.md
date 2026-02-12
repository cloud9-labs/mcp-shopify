# @cloud9-labs/mcp-shopify

MCP server for Shopify Admin API.

## Installation

Add this to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "mcp-shopify": {
      "command": "npx",
      "args": ["-y", "@cloud9-labs/mcp-shopify"],
      "env": {
        "SHOPIFY_STORE_URL": "YOUR_STORE_URL",
        "SHOPIFY_ACCESS_TOKEN": "YOUR_ACCESS_TOKEN"
      }
    }
  }
}
```

## Configuration

Set the following environment variables:

| Variable | Description |
|----------|-------------|
| `SHOPIFY_STORE_URL` | Your Shopify store URL (e.g., mystore.myshopify.com) |
| `SHOPIFY_ACCESS_TOKEN` | Admin API access token |

## Tools

| Tool | Description |
|------|-------------|
| `shopify_list_products` | List all products in Shopify store |
| `shopify_get_product` | Get a specific product by ID |
| `shopify_create_product` | Create a new product |
| `shopify_update_product` | Update an existing product |
| `shopify_list_orders` | List all orders |
| `shopify_get_order` | Get a specific order by ID |
| `shopify_list_customers` | List all customers |
| `shopify_get_customer` | Get a specific customer by ID |
| `shopify_create_customer` | Create a new customer |
| `shopify_search_customers` | Search for customers |
| `shopify_list_collections` | List all product collections |
| `shopify_get_inventory_levels` | Get inventory levels for products |
| `shopify_count_products` | Get total product count |
| `shopify_get_shop` | Get shop information |

## License

MIT
