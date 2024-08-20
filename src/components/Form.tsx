import { signMessage } from "@wagmi/core";
import { config } from "../config";
import { useAccount } from "wagmi";

function MyForm() {
  const { address } = useAccount();
  async function handleChange(event: any) {
    const buffer = await event?.target.files[0].arrayBuffer();

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);

    const hashHex = hashBufferToHexString(hashBuffer);

    const result = await signMessage(config, { message: hashHex });
    console.log(result);
  }

  return (
    <>
      <input type="file" onChange={handleChange} disabled={!address} />
    </>
  );
}

function hashBufferToHexString(hashBuffer: ArrayBuffer) {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return "0x" + hashHex;
}

export default MyForm;
