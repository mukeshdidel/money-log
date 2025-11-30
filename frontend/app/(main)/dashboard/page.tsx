'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend
} from 'recharts';
import { format, parseISO, startOfDay, subDays } from 'date-fns';
import {
  DollarSign, Wallet, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Globe
} from 'lucide-react';

// Currency symbols & formatting
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
  BTC: '₿',
  ETH: 'Ξ',
  CAD: 'C$',
  AUD: 'A$',
  CHF: 'CHF',
};

const formatCurrency = (amount: number, currency: string) => {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  })}`;
};

export default function DashboardPage() {

  const wallets = useSelector((state: RootState) => state.walletReducer);
  const categories = useSelector((state: RootState) => state.categoriesReducer);

  const walletsByCurrency = wallets.reduce((acc, wallet) => {
    if (!acc[wallet.currency]) {
      acc[wallet.currency] = { wallets: [], totalBalance: 0, income: 0, expenses: 0 };
    }
    acc[wallet.currency].wallets.push(wallet);
    acc[wallet.currency].totalBalance += wallet.balance;

    wallet.transactions.forEach(tx => {
      if (tx.isIncome) {
        acc[wallet.currency].income += tx.amount;
      } else {
        acc[wallet.currency].expenses += tx.amount;
      }
    });
    return acc;
  }, {} as Record<string, { wallets: typeof wallets; totalBalance: number; income: number; expenses: number }>);

  const currencies = Object.keys(walletsByCurrency);

  const totalWallets = wallets.length;

  const recentTransactions = [...wallets.flatMap(w => w.transactions.map(t => ({ ...t, walletCurrency: w.currency })))]
    .sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime())
    .slice(0, 10);

  const expensesByCategory = categories.map(cat => {
    const perCurrency: Record<string, number> = {};

    wallets.forEach(wallet => {
      wallet.transactions.forEach(tx => {
        if (!tx.isIncome && tx.category.categoryId === cat.categoryId) {
          perCurrency[wallet.currency] = (perCurrency[wallet.currency] || 0) + tx.amount;
        }
      });
    });

    return {
      name: cat.name,
      color: cat.colorCode || '#64748b',
      values: perCurrency,
      total: Object.values(perCurrency).reduce((a, b) => a + b, 0),
    };
  }).filter(cat => cat.total > 0);

  const dailyData = Array.from({ length: 14 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 13 - i));
    const dateStr = format(date, 'yyyy-MM-dd');
    const displayDate = format(date, 'MMM dd');

    let income = 0;
    let expense = 0;

    wallets.forEach(wallet => {
      wallet.transactions.forEach(tx => {
        const txDate = format(parseISO(tx.transactionDate), 'yyyy-MM-dd');
        if (txDate === dateStr) {
          if (tx.isIncome) income += tx.amount;
          else expense += tx.amount;
        }
      });
    });

    return {
      date: displayDate,
      income,
      expense,
      net: income - expense,
    };
  });

  const totalIncomeLast14 = dailyData.reduce((sum, d) => sum + d.income, 0);
  const totalExpenseLast14 = dailyData.reduce((sum, d) => sum + d.expense, 0);
  const netFlowLast14 = totalIncomeLast14 - totalExpenseLast14;

  return (
    <>
      <div className="min-h-screen bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-50">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {currencies.map(currency => {
              const data = walletsByCurrency[currency];
              const net = data.income - data.expenses;

              return (
                <div key={currency} className="bg-slate-800 border border-slate-700 rounded-2xl p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-800 rounded-xl">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{currency}</p>
                        <p className="text-sm text-slate-400">{data.wallets.length} wallet{data.wallets.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-400">Total Balance</p>
                      <p className="text-2xl font-bold text-emerald-400">
                        {formatCurrency(data.totalBalance, currency)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl lg:p-5 p-2 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Last 14 Days</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none' }}
                  labelStyle={{ color: '#e2e8f0' }}
                  formatter={(v: number) => `$${v.toLocaleString()}`}
                />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="income" name="Income" fill="#10b981" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="text-xs text-slate-400">Income</p>
                <p className="text-lg font-bold text-emerald-400">${totalIncomeLast14.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Spent</p>
                <p className="text-lg font-bold text-rose-400">${totalExpenseLast14.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Net</p>
                <p className={`text-lg font-bold ${netFlowLast14 >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {netFlowLast14 >= 0 ? '+' : ''}${Math.abs(netFlowLast14).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-10">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Portfolio by Currency</h3>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={currencies.map(cur => ({
                      name: cur,
                      value: walletsByCurrency[cur].totalBalance,
                    }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {currencies.map((cur, i) => (
                      <Cell key={cur} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [formatCurrency(value, name), 'Balance']}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                {currencies.map((cur, i) => (
                  <div key={cur} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5] }} />
                    <span className="text-sm">{cur}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">Top Spending Categories</h3>
              <div className="space-y-4">
                {expensesByCategory
                  .sort((a, b) => b.total - a.total)
                  .slice(0, 6)
                  .map(cat => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }} />
                        <span className="font-medium">{cat.name}</span>
                      </div>
                      <div className="text-sm text-slate-400">
                        {Object.entries(cat.values)
                          .map(([cur, amt]) => `${formatCurrency(amt, cur)}`)
                          .join(' + ')}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-6">Recent Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-400 text-sm border-b border-slate-800">
                    <th className="pb-3">Description</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {recentTransactions.map((tx: any) => (
                    <tr key={tx.transactionId} className="hover:bg-slate-800/50 transition">
                      <td className="py-4">{tx.description || tx.category.name}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tx.category.colorCode }} />
                          {tx.category.name}
                        </span>
                      </td>
                      <td className="py-4 text-slate-400">
                        {format(new Date(tx.transactionDate), 'MMM dd')}
                      </td>
                      <td className={`py-4 text-right font-semibold ${tx.isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tx.isIncome ? '+' : '-'}
                        {formatCurrency(tx.amount, tx.walletCurrency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}