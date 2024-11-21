import * as bcrypt from "bcrypt";
import type { IEncoder } from "./encoder.service.interface";

export class BcryptEncoder implements IEncoder {
	private readonly rounds: number = 10;

	constructor(rounds = 10) {
		this.rounds = rounds;
	}

	async encode(plain: string): Promise<string> {
		return await bcrypt.hash(plain, this.rounds);
	}

	async compare(plain: string, hashed: string): Promise<boolean> {
		return await bcrypt.compare(plain, hashed);
	}
}
