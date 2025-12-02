'use client';
import {PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format, parseISO, startOfDay, subDays } from 'date-fns';
import { TrendingUp, TrendingDown, Globe} from 'lucide-react';
import { selectwallets, selectWalletsLoading } from '@/lib/features/wallets/walletSlice';
import { selectCategories } from '@/lib/features/categories/categoriesSlice';
import { useAppSelector } from '@/lib/hooks';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'




const formatCurrency = (amount: number, currency: string) => {
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: currency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  })}`;
};

export default function DashboardPage() {

  const wallets = useAppSelector(selectwallets);
  const categories = useAppSelector(selectCategories);
  const isWalletsLoading = useAppSelector(selectWalletsLoading);

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

  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = startOfDay(subDays(new Date(), 6 - i));
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

  const totalIncomeLast7 = dailyData.reduce((sum, d) => sum + d.income, 0);
  const totalExpenseLast7 = dailyData.reduce((sum, d) => sum + d.expense, 0);
  const netFlowLast7 = totalIncomeLast7 - totalExpenseLast7;

  return (
    <>
      <div className="min-h-screen text-white">
        <div className="max-w-7xl mx-auto">

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-50">Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {isWalletsLoading ?  <Skeleton height={150} borderRadius={16} /> : currencies.map(currency => {
              const data = walletsByCurrency[currency];
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
            <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">{isWalletsLoading ? <Skeleton width={200} /> : 'Last 14 Days'}</h2>
            {isWalletsLoading ? <Skeleton height={300} borderRadius={16} /> :
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
            }
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="text-xs text-slate-400">{isWalletsLoading ? <Skeleton width={50} /> : 'Income'}</p>
                <p className="text-lg font-bold text-emerald-400">${ isWalletsLoading ? <Skeleton width={100} /> : totalIncomeLast7.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">{isWalletsLoading ? <Skeleton width={50} /> : 'Spent'}</p>
                <p className="text-lg font-bold text-rose-400">${ isWalletsLoading ? <Skeleton width={100} /> :  totalExpenseLast7.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">{isWalletsLoading ? <Skeleton width={50} /> : 'Net'}</p>
                <p className={`text-lg font-bold ${netFlowLast7 >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  ${isWalletsLoading ? <Skeleton width={100} /> : `${netFlowLast7 >= 0 ? '+' : ''} ${Math.abs(netFlowLast7).toLocaleString()}`}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-10">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">{isWalletsLoading ? <Skeleton width={200} /> : 'Portfolio by Currency'}</h3>
              {isWalletsLoading ? <Skeleton height={320} borderRadius={16} /> :
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
              }
              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                {currencies.map((cur, i) => (
                  <div key={cur} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5] }} />
                    <span className="text-sm">{cur}</span>
                  </div>
                ))}
              </div>
              
            </div>

            <div className="bg-slate-800  border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-6">{isWalletsLoading ? <Skeleton width={200} /> : 'Top Spending Categories'}</h3>
                            
              {
              isWalletsLoading ? <Skeleton height={320} borderRadius={16} /> : 
              
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
              }
            </div>
          </div>

          <div className="bg-slate-800  border border-slate-700 rounded-2xl p-2 lg:p-6">
            <h3 className="text-xl font-semibold mb-6 py-2">Recent Transactions</h3>

            <div className="space-y-3">
              {recentTransactions.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No transactions yet</p>
              ) : (
                recentTransactions.map((tx: any) => (
                  <div
                    key={tx.transactionId}
                    className="flex items-center justify-between p-1 lg:p-4 bg-slate-700 rounded-xl"
                  >
                    <div className="flex items-center lg:gap-4 gap-2 min-w-0 flex-1">
                      <div className={`p-2.5 rounded-lg ${tx.isIncome ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                        {tx.isIncome ? (
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-rose-400" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="font-medium text-slate-100 truncate">
                          {tx.description || tx.category.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: tx.category.colorCode || '#64748b' }}
                          />
                          <p className="text-xs text-slate-400 truncate">
                            {tx.category.name} • {format(new Date(tx.transactionDate), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Amount + Currency */}
                    <div className="text-right ml-4">
                      <p className={`lg:text-lg font-bold ${tx.isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tx.isIncome ? '+' : '−'}{formatCurrency(tx.amount, tx.walletCurrency)}
                      </p>
                      <p className="text-xs text-slate-500">{tx.walletCurrency}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}