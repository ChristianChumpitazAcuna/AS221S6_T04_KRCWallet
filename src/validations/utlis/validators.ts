import { Address } from "viem";

const isValidAddress = (address: Address) => /^0x[a-fA-F0-9]{40}$/.test(address);
const isValidAmount = (value: string) =>
	/^\d+(\.\d+)?$/.test(value) && parseFloat(value) > 0;

export { isValidAddress, isValidAmount };
