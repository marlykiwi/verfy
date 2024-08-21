import { useAccount, useDisconnect, useEnsName } from "wagmi";

export default function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });

  return (
    <>
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
      <div style={{marginBottom: 20}}></div>
      {address && <button onClick={() => disconnect()}>Disconnect</button>}
      <div style={{marginBottom: 20}}></div>
    </>
  );
}
