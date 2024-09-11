async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    const certificateRegistry = await CertificateRegistry.deploy();

    console.log("CertificateRegistry deployed to:", certificateRegistry.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
