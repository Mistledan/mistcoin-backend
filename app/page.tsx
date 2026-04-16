"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
  }

  async function joinAirdrop() {
    if (!wallet) {
      alert("Connect wallet first");
      return;
    }

    const res = await fetch("http://localhost:5000/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        wallet: wallet,
        ref: null
      })
    });

    const data = await res.json();
    setStatus(data.message);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      <h1 className="text-5xl text-purple-500 mb-6">
        MistCoin 🚀
      </h1>

      <button
        onClick={connectWallet}
        className="bg-purple-600 px-6 py-3 rounded-xl mb-4"
      >
        {wallet ? wallet.slice(0, 6) + "..." : "Connect Wallet"}
      </button>

      <button
        onClick={joinAirdrop}
        className="bg-green-600 px-6 py-3 rounded-xl mb-4"
      >
        Join Airdrop
      </button>

      <p>{status}</p>

    </div>
  );
}