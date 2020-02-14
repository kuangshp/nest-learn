import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export class UserEntity {
	@PrimaryGeneratedColumn({
		type: "int",
		name: "id"
	})
	id: number;

	@Column('varchar', {
		nullable: false,
		primary: true,
		generated: 'uuid',
		length: 50,
		name: 'uuid',
		comment: 'uuid',
	})
	uuid: string;

	@Column("varchar", {
		nullable: false,
		length: 50,
		name: "username"
	})
	username: string;


	@Column("varchar", {
		nullable: false,
		length: 100,
		name: "password"
	})
	password: string;


	@Column("varchar", {
		nullable: true,
		length: 11,
		name: "mobile"
	})
	mobile: string | null;


	@Column("varchar", {
		nullable: true,
		length: 50,
		name: "email"
	})
	email: string | null;


	@Column("tinyint", {
		nullable: true,
		default: () => "'1'",
		name: "status"
	})
	status: number | null;


	@Column("varchar", {
		nullable: true,
		length: 50,
		name: "platform"
	})
	platform: string | null;


	@Column("tinyint", {
		nullable: false,
		default: () => "'0'",
		name: "is_super"
	})
	isSuper: number;


	@Column("timestamp", {
		nullable: false,
		default: () => "CURRENT_TIMESTAMP",
		name: "created_at"
	})
	createdAt: Date;


	@Column("timestamp", {
		nullable: false,
		default: () => "CURRENT_TIMESTAMP",
		name: "updated_at"
	})
	updatedAt: Date;

}
