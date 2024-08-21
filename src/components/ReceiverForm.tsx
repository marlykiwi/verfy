import { readContract, verifyMessage } from "@wagmi/core";
import { getAddress, recoverMessageAddress, recoverPublicKey } from "viem";
import { config } from "../config";
import { abi } from "../abi";
import { useState } from "react";

const TRUSTED_PUBLIC_KEY =
  "0x046a29e33b958adc57c65612034dea287898f18aa75f441f19b08143b30c48e9bc8493a72a0d67b11230e8eed467ef739b773cfbd4e7687041b2f1d0eeab9909d0";

function MyForm() {
  const [isSignatureValid, setIsSignatureValid] = useState(false);
  const [publicKey, setPublicKey] = useState(TRUSTED_PUBLIC_KEY);

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

    const recoveredPublicKey = await recoverPublicKey({
      hash: hashHex,
      signature: data.signature,
    });

    if (recoveredPublicKey != publicKey) {
      alert("Public Key mismatch!");
      return;
    }

    const address = await recoverMessageAddress({
      message: hashHex,
      signature: data.signature,
    });

    const result = await verifyMessage(config, {
      address: address,
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
        value={publicKey}
        placeholder="Recipient Address"
        onChange={(e: any) => setPublicKey(e.target.value)}
      />
      <h3>2. Select File</h3>
      <input type="file" onChange={handleChange} />
    </>
  );
}

function hashBufferToHexString(hashBuffer: ArrayBuffer): `0x${string}` {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `0x${hashHex}`;
}

export default MyForm;
