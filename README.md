# Verfy - Frontend

E-Mail Attachment authentication using Blockchain technology.

This is the repository that includes the code for the frontend. The Smart Contracts can be found [here](https://github.com/marlykiwi/verfy-contracts).

## Setup

1. `git clone <url>`
2. `npm install`
3. `npm run dev`
4. Follow instructions on the terminal

## How it works

To ensure the authenticity of E-Mail attachments we ask the sender to sign a SHA-256 hash of the attachment via Metamask. Once done, the document hash alongside the signature is stored in a Smart Contract on-chain.

The E-Mail recipient who knows the account address of the sender would download the E-Mail attachment once she received the E-Mail. Using our tool she can recompute the SHA-256 hash of the document which is then used to query the Smart Contract on-chain to retrieve the signature over such document. A signature verification using the account address known to the receiver reveals if the document was signed by the sender and is therefore safe to open.

## Usage

### Sender

Follow the outlined steps if you're a sender who wants to authenticate E-Mail attachments.

1. Connect your Metamask wallet
2. Upload a file via the file-picker
3. Sign the hash of the attachment you're about to send (simply follow the instructions of the Metamask
4. Post your signature alongside the hash of the attachment you're about to sent on-chain (simply follow the instructions of the Metamask popup)
5. Follow the link that will be shown to see how / when the aforementioned data is stored on-chain
6. Send your E-Mail as you'd usually do

### Recipient

Follow the outlined steps if you're a recipient of an E-Mail with an attachment.

1. Paste the account address of the recipient you're expecting the E-Mail from
2. Download the attachment from the E-Mail you received
3. A message will be shown whether the E-Mail attachment was actually sent by the recipient
