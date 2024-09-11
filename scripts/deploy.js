const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.HOLESKY_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // ABI y bytecode del contrato (de Remix IDE o compilador)
    const abi = [
        "event CertificateCreated(uint256 id, string name, string details, address owner)",
        "function createCertificate(string memory _name, string memory _details) public",
        "function getCertificate(uint256 _id) public view returns (uint256, string memory, string memory, address)"
    ];
    const bytecode = "0x...";  // Bytecode del contrato generado por Remix

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);
    const contract = await factory.deploy();
    await contract.deployed();

    console.log(`Contrato desplegado en la dirección: ${contract.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
