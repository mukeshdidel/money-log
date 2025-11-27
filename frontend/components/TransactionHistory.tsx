import DownArrow from "@/Icons/DownArrow";
import UpArrow from "@/Icons/UpArrow";
import { selectWalletById } from "@/lib/features/wallets/walletSlice";
import { useAppSelector } from "@/lib/hooks"

const TransactionHistory = ({ walletId }: { walletId: number }) => {

    const wallet = useAppSelector(selectWalletById(walletId))!;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Transaction History</h2>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                {!wallet?.transactions || wallet?.transactions.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center text-slate-500">
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                        </div>
                        <p>No transactions found.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-800">
                        {wallet?.transactions?.map((tx) => (
                            <div key={tx?.transactionId} className="group p-4 flex items-center justify-between hover:bg-slate-800/80 transition-colors cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                                        tx?.isIncome 
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500/20' 
                                            : 'bg-rose-500/10 border-rose-500/20 text-rose-500 group-hover:bg-rose-500/20'
                                    }`}>
                                        {tx?.isIncome ? <UpArrow /> : <DownArrow /> }
                                        
                                    </div>
                                    
                                    <div>
                                        <p className="font-medium text-slate-200">
                                            {tx.description || tx.category?.name || 'Untitled Transaction'}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {tx.category && (
                                                <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                                                    {tx.category.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={`text-right font-bold tracking-tight ${
                                    tx.isIncome ? 'text-emerald-400' : 'text-rose-400'
                                }`}>
                                    {tx.isIncome ? '+' : '-'} {wallet.currency.toUpperCase()} {tx.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TransactionHistory