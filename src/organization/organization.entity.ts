import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Address from '../address/address.entity';

@Entity()
class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToOne(() => Address, { eager: true, cascade: true })
  @JoinColumn()
  address: Address;
}

export default Organization;
