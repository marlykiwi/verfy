function MyForm() {
  async function handleChange(event: any) {
    const buffer = await event?.target.files[0].arrayBuffer();

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);

    const hashHex = hashBufferToHexString(hashBuffer);
  }

  return (
    <>
      <input type="file" onChange={handleChange} />
    </>
  );
}

function hashBufferToHexString(hashBuffer: ArrayBuffer) {
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  let hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return "0x" + hashHex;
}

export default MyForm;
