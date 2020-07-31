import { ITransport, TransportMessage } from "./Transport";


export class CollabVMClient {
	private transport: ITransport = null;

	constructor(transport: ITransport) {
		this.transport = transport;
	}

	GetTransport(): ITransport {
		if(this.transport != null)
			return this.transport;
		else
			throw new Error("Attempt to GetTransport() on a null transport.");
	}

	
};