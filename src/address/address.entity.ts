import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  postalCode: string;

  @Column()
  city: string;

  @Column()
  country: string;
}

export default Address;
