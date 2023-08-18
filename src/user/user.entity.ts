import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Organization from '../organization/organization.entity';
import * as bcrypt from 'bcrypt';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToOne(
    () => Organization,
    (organization: Organization) => organization.users,
    { eager: true },
  )
  organization: Organization;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async hashRefreshToken() {
    if (this.refreshToken) {
      this.refreshToken = await bcrypt.hash(this.refreshToken, 10);
    }
  }
}

export default User;
