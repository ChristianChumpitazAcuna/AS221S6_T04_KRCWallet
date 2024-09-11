// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        uint256 id;
        string studentName;
        string courseName;
        string institution;
        uint256 dateIssued;
        bool valid;
    }

    address public admin;
    uint256 public certificateCount;
    mapping(uint256 => Certificate) public certificates;

    event CertificateIssued(uint256 id, string studentName, string courseName, string institution, uint256 dateIssued);
    event CertificateRevoked(uint256 id);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Solo el admin puede ejecutar esta funcion.");
        _;
    }

    function issueCertificate(string memory _studentName, string memory _courseName, string memory _institution) public onlyAdmin {
        certificateCount++;
        certificates[certificateCount] = Certificate(certificateCount, _studentName, _courseName, _institution, block.timestamp, true);
        emit CertificateIssued(certificateCount, _studentName, _courseName, _institution, block.timestamp);
    }

    function revokeCertificate(uint256 _id) public onlyAdmin {
        require(certificates[_id].valid, "El certificado ya fue revocado.");
        certificates[_id].valid = false;
        emit CertificateRevoked(_id);
    }

    function verifyCertificate(uint256 _id) public view returns (bool) {
        return certificates[_id].valid;
    }
}
