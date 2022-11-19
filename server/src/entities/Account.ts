import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("Accounts")
export default class Account{

    @PrimaryColumn()
    public readonly id!: string;

    @Column({type: 'decimal', precision: 20, scale: 2,  nullable: false})
    public balance!: number;


    constructor(props: Omit <Account, 'id'>, id?: string){

        Object.assign(this, props);

        if(!id){
            this.id = uuidv4();
        }
        
    }

}