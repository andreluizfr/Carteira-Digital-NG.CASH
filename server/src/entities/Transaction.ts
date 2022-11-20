import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import Account from './Account';
import { v4 as uuidv4 } from 'uuid';

@Entity("Transactions")
export default class Transaction{

    @PrimaryColumn()
    public readonly id!: string;

    //coluna adicionada para facilitar no tabela de transações frontend
    @Column({nullable: false})
    public debitedUsername!: string;

    //coluna adicionada para facilitar no tabela de transações frontend
    @Column({nullable: false})
    public creditedUsername!: string;
    
    @Column({nullable: false})
    public debitedAccountId!: string;

    @Column({nullable: false})
    public creditedAccountId!: string;

    @ManyToOne(() => Account, (account) => account.id, {cascade: true})
    @JoinColumn({ name: "debitedAccountId" })
    private _debitedAccountId!: never;

    @ManyToOne(() => Account, (account) => account.id, {cascade: true})
    @JoinColumn({ name: "creditedAccountId" })
    private _creditedAccountId!: never;

    @Column({type: 'decimal', precision: 20, scale: 2,  nullable: false})
    public value!: number;

    @CreateDateColumn()
    public createdAt!: Date;


    constructor(props: Omit <Transaction, 'id'| 'createdAt'>, id?: string){

        Object.assign(this, props);

        if(!id){
            this.id = uuidv4();
        }
        
    }

}