const { expect } = require("chai");

describe("CertificateRegistry", function () {
    it("Should issue and verify a certificate", async function () {
        const [admin] = await ethers.getSigners();
        const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
        const certificateRegistry = await CertificateRegistry.deploy();
        
        await certificateRegistry.issueCertificate("John Doe", "Blockchain", "Tech University");

        const certificate = await certificateRegistry.certificates(1);
        expect(certificate.studentName).to.equal("John Doe");
        expect(await certificateRegistry.verifyCertificate(1)).to.equal(true);
    });

    it("Should revoke a certificate", async function () {
        const CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
        const certificateRegistry = await CertificateRegistry.deploy();
        
        await certificateRegistry.issueCertificate("John Doe", "Blockchain", "Tech University");
        await certificateRegistry.revokeCertificate(1);

        expect(await certificateRegistry.verifyCertificate(1)).to.equal(false);
    });
});
