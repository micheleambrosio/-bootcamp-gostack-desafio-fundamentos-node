import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactionValues = this.transactions.filter(transaction =>
      transaction.type === 'income'
    ).map(transaction => transaction.value);

    const income: number = incomeTransactionValues.reduce((a, b) => a + b, 0);

    const outcomeTransactionValues = this.transactions.filter(transaction =>
      transaction.type === 'outcome'
    ).map(transaction => transaction.value);

    const outcome: number = outcomeTransactionValues.reduce((a, b) => a + b, 0);

    return {
      income,
      outcome,
      total: income - outcome
    }
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
