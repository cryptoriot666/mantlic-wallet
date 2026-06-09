// Qwen AI agent for browser — calls local proxy server
// Included AFTER mantle-audric.html main script

window.QWEN = {
  apiUrl: '/api/qwen',
  
  // Analyze wallet with AI
  async analyzeWallet(balance, gasPrice, blockNumber) {
    const messages = [
      { role: 'system', content: 'You are an AI finance agent on Mantle blockchain. Analyze wallet data concisely. Max 3 sentences. Be direct.' },
      { role: 'user', content: `Wallet balance: ${balance} MNT. Gas: ${gasPrice} Gwei. Block: #${blockNumber}. Give brief analysis.` }
    ];
    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      const data = await res.json();
      return data.result;
    } catch(e) {
      return this._fallbackAnalysis(balance, gasPrice);
    }
  },

  // Answer any question via AI
  async ask(messages) {
    try {
      const res = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });
      const data = await res.json();
      return data.result;
    } catch(e) {
      return null;
    }
  },

  _fallbackAnalysis(balance, gasPrice) {
    const b = parseFloat(balance);
    if (b < 0.01) return 'Near-zero balance. Deposit MNT to use Mantle.';
    if (b < 1) return 'Low balance. Top up MNT for gas fees.';
    if (b < 10) return 'Moderate balance. Ready for basic transactions.';
    return 'Healthy balance. Ready for DeFi and dApps.';
  }
};

console.log('✓ Qwen agent loaded');
