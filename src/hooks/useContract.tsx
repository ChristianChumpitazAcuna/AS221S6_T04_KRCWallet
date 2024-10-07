import { useEffect, useState } from "react";
import ContractService from "../service/contractService";
import Web3Service from "../service/web3Service";

export const useContract = () => {
    const [contract, setContract] = useState<ContractService | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<string[]>([]);
    const [web3Service, setWeb3Service] = useState<Web3Service | null>(null);

    useEffect(() => {
        initContract();

        if ((window as any).ethereum) {
            (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    console.log(`Cuenta cambiada a: ${accounts[0]}`);
                } else {
                    console.warn('No hay cuentas disponibles');
                }
            });
        }

        return () => {
            if ((window as any).ethereum && (window as any).ethereum.removeListener) {
                (window as any).ethereum.removeListener('accountsChanged', () => { });
            }
        };
    }, []);

    const initContract = async () => {
        const _web3Service = new Web3Service();
        setWeb3Service(_web3Service);
        try {
            const { web3, accounts } = await _web3Service.connect();
            const service = new ContractService(web3);
            setContract(service);
            setAccounts(accounts);
            setAccount(account);
        } catch (e) {
            console.error(e);
        }
    }

    const handleAccountChange = (newAccount: string) => {
        setAccount(newAccount);
    }

    return { contract, account, accounts, handleAccountChange };
}