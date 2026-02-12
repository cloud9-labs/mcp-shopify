#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools.js';

function createServer(): McpServer {
  const server = new McpServer({
    name: 'shopify-mcp-server',
    version: '0.1.0',
  });
  registerTools(server);
  return server;
}

export function createSandboxServer(): McpServer {
  process.env.SHOPIFY_STORE_URL ??= 'https://sandbox.myshopify.com';
  process.env.SHOPIFY_ACCESS_TOKEN ??= 'sandbox-token';
  return createServer();
}

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);

  process.on('SIGINT', async () => {
    await server.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await server.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});
