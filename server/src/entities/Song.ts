import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index
} from 'typeorm';

import { User } from './User';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index({ fulltext: true })
  @Column()
  title: string;

  @Index({ fulltext: true })
  @Column()
  artist: string;

  @Column({ type: 'longtext' })
  lyrics: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.songs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
