export const extracErrorMessages = (error: any): string => {
	if (typeof error === "string") return error;

	if (error instanceof Error) {
		const match = error.message.match(
			/reverted with the following reason:\s*([^\n]+)/
		);
		if (match) return match[1];

		return error.message;
	}

	return "Error desconocido";
};
