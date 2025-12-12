import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import type { Chain } from 'wagmi/chains';

// 定义 Hardhat 本地链
const hardhatLocal = {
  id: 31337,
  name: 'Hardhat Local',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
  blockExplorers: {
    default: { name: 'Hardhat', url: 'http://localhost:8545' },
  },
  testnet: true,
} as const satisfies Chain;

// 根据环境变量选择网络（移除 NEXT_PUBLIC 前缀，使用标准环境变量）
const USE_LOCAL = process.env.USE_LOCAL_CHAIN === 'true' || process.env.NEXT_PUBLIC_USE_LOCAL_CHAIN === 'true';

// 选择链和传输配置
const chains = [USE_LOCAL ? hardhatLocal : sepolia] as const;
const transports = {
  [hardhatLocal.id]: http('http://127.0.0.1:8545'),
  [sepolia.id]: http(),
};

// console.log('🔗 当前使用的区块链网络:', USE_LOCAL ? 'Hardhat 本地链 (31337)' : 'Sepolia 测试网 (11155111)');

// 导出 injected 连接器实例供其他地方使用（支持 MetaMask 等浏览器钱包）
export const injectedConnector = injected();

export const wagmiConfig = createConfig({
  chains,
  connectors: [injectedConnector],
  transports,
  batch: { multicall: false },
  ssr: false,
});

// 导出当前链 ID，方便其他地方使用
export const CURRENT_CHAIN_ID = USE_LOCAL ? 31337 : 11155111;
export const IS_LOCAL_CHAIN = USE_LOCAL;
