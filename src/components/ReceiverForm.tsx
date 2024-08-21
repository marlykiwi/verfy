import { readContract, verifyMessage } from "@wagmi/core";
import { getAddress, recoverMessageAddress, recoverPublicKey } from "viem";
import { config } from "../config";
import { abi } from "../abi";
import { useState } from "react";


function MyForm() {
  const [address, setAddress] = useState('');
  const [isSignatureValid, setIsSignatureValid] = useState(false);

  async function handleChange(event: any) {
    const buffer = await event?.target.files[0].arrayBuffer();

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);

    const hashHex = hashBufferToHexString(hashBuffer);

    const data: any = await readContract(config, {
      abi,
      address: "0x0170517C3c6F2569051fC9DD0040452a49eB8650",
      functionName: "get",
      args: [hashHex],
    });

    const recoveredAddress = await recoverMessageAddress({
      message: hashHex,
      signature: data.signature,
    });

    if (address != recoveredAddress) {
      alert('Recipient address doesn\'t match signer address!')
    }

    const result = await verifyMessage(config, {
      address: recoveredAddress,
      message: hashHex,
      signature: data.signature,
    });

    setIsSignatureValid(result);
  }

  return (
    <>
      {isSignatureValid && (
        <p style={{ borderRadius: 5, padding: 10, backgroundColor: "green", color: "white" }}>
          Attachment signature valid
        </p>
      )}
      <h3>1. Enter Recipient Address</h3>
      <input
        id="trusted-address"
        type="text"
        value={address}
        placeholder="Recipient Address"
        onChange={(e: any) => setAddress(e.target.value)}
      />
      <h3>2. Select File</h3>
      <input type="file" onChange={handleChange} disabled={!address} />
    </>
  );
}

function hashBufferToHexString(hashBuffer: ArrayBuffer): `0x${string}` {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `0x${hashHex}`;
}

export default MyForm;
