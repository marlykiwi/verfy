import { signMessage, writeContract } from "@wagmi/core";
import { recoverPublicKey } from "viem";
import { config } from "../config";
import { useAccount } from "wagmi";
import { abi } from "../abi";

function MyForm() {
  const { address } = useAccount();
  async function handleChange(event: any) {
    const buffer = await event?.target.files[0].arrayBuffer();

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);

    const hashHex = hashBufferToHexString(hashBuffer);

    const signature = await signMessage(config, { message: hashHex });

    const publicKey = await recoverPublicKey({
      hash: hashHex,
      signature,
    });

    const txhash = await writeContract(config, {
      abi,
      address: "0x0170517C3c6F2569051fC9DD0040452a49eB8650",
      functionName: "set",
      args: [hashHex, publicKey, signature],
    });

    console.log("TX Hash", txhash);
  }

  return (
    <>
      <h3>2. Select File</h3>
      <input id="file" type="file" onChange={handleChange} disabled={!address} />
    </>
  );
}

function hashBufferToHexString(hashBuffer: ArrayBuffer): `0x${string}` {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return `0x${hashHex}`;
}

export default MyForm;
