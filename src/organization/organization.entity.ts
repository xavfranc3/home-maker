import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

export default Organization;
