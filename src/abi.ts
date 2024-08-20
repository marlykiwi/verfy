export const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_hashHex",
          "type": "string"
        }
      ],
      "name": "get",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "hashHex",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "publicKey",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "signature",
              "type": "string"
            }
          ],
          "internalType": "struct Verfy.Data",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "hashHexToData",
      "outputs": [
        {
          "internalType": "string",
          "name": "hashHex",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "publicKey",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "signature",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_hashHex",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_publicKey",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_signature",
          "type": "string"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ] 