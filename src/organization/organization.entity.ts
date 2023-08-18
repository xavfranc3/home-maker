import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Address from '../address/address.entity';
import User from '../user/user.entity';

@Entity()
class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  address: Address;

  @OneToMany(() => User, (user: User) => user.organization)
  users: User[];
}

export default Organization;
