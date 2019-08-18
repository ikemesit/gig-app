import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Entity()
@Unique(['username'])
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToOne(type => User, user => user.account, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  user: User;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
