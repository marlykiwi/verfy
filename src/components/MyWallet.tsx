import * as React from "react";
import { Connector, useConnect } from "wagmi";

export default function WalletOptions() {
  const { connectors, connect } = useConnect();
  console.log(connectors);


  const buttons =  connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));

  return <>
    <h3>1. Connect Wallet</h3>
    {buttons[0]}
    <div style={{marginTop: 20, marginBottom: 20}}></div>
  </>
}
