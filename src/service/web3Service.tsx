import Web3 from "web3";

export default class Web3Service {
    private web3: Web3 | null = null;

    async connect(): Promise<{ web3: Web3, accounts: string[] }> {
        if ((window as any).ethereum) {
            const web3 = new Web3((window as any).ethereum);
            const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
            // const account = accounts[0];
            this.web3 = web3;

            return { web3, accounts };
        } else {
            alert('Please install MetaMask!');
            throw new Error('Please install MetaMask!');
        }
    }

    getWeb3(): Web3 {
        if (!this.web3) {
            throw new Error('Web3 is not connected');
        }
        return this.web3;
    }
}