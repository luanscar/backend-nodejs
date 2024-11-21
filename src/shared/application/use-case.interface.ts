interface IUseCase<InputDTO, OutputDTO> {
	execute(input?: InputDTO): Promise<OutputDTO>;
}

export type { IUseCase };
