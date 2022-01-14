import {
  Entity as TOEntity,
  Column,
  Index,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Entity from "./Entity";
import Post from "./Post";
import User from "./User";

@TOEntity("subs")
export default class Sub extends Entity {
  constructor(sub: Partial<Sub>) {
    super();
    Object.assign(this, sub);
  }

  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string; // Urn and Url because we gonna store the name of the file and the Url will be generated on the run time

  @Column({ nullable: true })
  bannerUrn: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];
}
