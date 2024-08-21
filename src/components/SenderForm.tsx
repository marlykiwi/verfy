import { signMessage, writeContract } from "@wagmi/core";
import { recoverPublicKey } from "viem";
import { config } from "../config";
import { useAccount } from "wagmi";
import { abi } from "../abi";
import { useState } from "react";

function MyForm() {
  const { address } = useAccount();
  const [txHash, setTxHash] = useState('')
  const [hash, setHash] = useState('')

  async function handleChange(event: any) {
    const buffer = await event?.target.files[0].arrayBuffer();

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);

    const hashHex = hashBufferToHexString(hashBuffer);

    setHash(hashHex)

    const signature = await signMessage(config, { message: hashHex });

    const publicKey = await recoverPublicKey({
      hash: hashHex,
      signature,
    });

    const result = await writeContract(config, {
      abi,
      address: "0x0170517C3c6F2569051fC9DD0040452a49eB8650",
      functionName: "set",
      args: [hashHex, publicKey, signature],
    });

    setTxHash(result)
  }

  return (
    <>
      <h3>2. Select File</h3>
      <input id="file" type="file" onChange={handleChange} disabled={!address} />
      {hash && (
        <>
          <div style={{marginTop: 20}}></div>
          <label for="hash">File Hash (SHA-256)</label>
          <input id="hash" value={hash}></input>
        </>
      )}
      {txHash && (
        <>
          <div style={{marginTop: 20}}></div>
          <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank">Go to Transaction</a>
        </>
      )}
    </>
  );
}

function hashBufferToHexString(hashBuffer: ArrayBuffer): `0x${string}` {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `0x${hashHex}`;
}

export default MyForm;
