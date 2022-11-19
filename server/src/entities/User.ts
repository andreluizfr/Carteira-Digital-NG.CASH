import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import Account from './Account';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Entity("Users")
export default class User{

    @PrimaryColumn()
    public readonly id!: string;
    
    @Column({ unique: true })
    public username!: string;

    @Column()
    public password!: string;

    @Column({nullable: false})
    public accountId!: string;

    @OneToOne(() => Account, account => account.id, {cascade: true})
    @JoinColumn({ name: "accountId" })
    private _accountId!: never;

    constructor(props: Omit <User, 'id' | 'hashPassword'>, id?: string){

        Object.assign(this, props);

        if(!id){
            this.id = uuidv4();
        }
        
    }

    @BeforeInsert()
    async hashPassword() {
        
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        
    }

}