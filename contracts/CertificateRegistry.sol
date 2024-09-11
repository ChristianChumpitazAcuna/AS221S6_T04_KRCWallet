// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateRegistry {
    struct Certificate {
        uint256 id;
        string name;
        string details;
        address owner;
    }

    mapping(uint256 => Certificate) public certificates;
    uint256 public nextId;

    event CertificateCreated(uint256 id, string name, string details, address owner);

    function createCertificate(string memory _name, string memory _details) public {
        certificates[nextId] = Certificate(nextId, _name, _details, msg.sender);
        emit CertificateCreated(nextId, _name, _details, msg.sender);
        nextId++;
    }

    function getCertificate(uint256 _id) public view returns (Certificate memory) {
        return certificates[_id];
    }
}
