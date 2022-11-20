import Transaction from "../entities/Transaction";

export function filterTransactions (transactions: Transaction[], dateFilter: string, typeFilter: string, username: string): Transaction[] {

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    let dateFiltered = [] as Transaction[];

    if(dateFilter==="0"){ //desde sempre
        dateFiltered = transactions;
    }
    else if(dateFilter==="1"){ //a partir desse ano
        dateFiltered = transactions.filter(transaction=>{
            const transactionDate = new Date(transaction.createdAt);
            const transactionYear = transactionDate.getFullYear();
            return (transactionYear===currentYear)?true:false;
        })
    }
    else if(dateFilter==="2"){ //a partir desse mes
        dateFiltered = transactions.filter(transaction=>{
            const transactionDate = new Date(transaction.createdAt);
            const transactionYear = transactionDate.getFullYear();
            const transactionMonth = transactionDate.getMonth();
            return (transactionMonth===currentMonth && transactionYear===currentYear)?true:false;
        })
    }

    let typeFiltered = [] as Transaction[];

    if(typeFilter === "0")
        typeFiltered = dateFiltered;
    else if(typeFilter === "1") //cash-out
        typeFiltered = dateFiltered.filter(transaction=> transaction.creditedUsername === username);
    else if(typeFilter === "2") //cash-in
        typeFiltered = dateFiltered.filter(transaction=> transaction.debitedUsername === username);

    return typeFiltered;

}