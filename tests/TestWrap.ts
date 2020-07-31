// test wrap code
// so that we don't need to introduce development garbage code,
// and we also don't need to have a server running alyways to test the client.

import { ITransport, TransportMessage } from "../src/Transport"
import { CollabVMClient } from "../src/CollabVMClient"

export class TestWrapTransport implements ITransport {
	Connect(uri: string): void {
		// no uri matters.
		return;
	};

	// Function to be called by the transport when the connection is made.
	OnMessage: (messageData: TransportMessage) => void;

	OnConnect: () => void;

	OnClose: () => void;

	// Send a message to the other end.
	Send(message: TransportMessage) {
		return; //ignored
	}

	// "Send" a message as if we were the server.
	TestWrapSpecialSend(message: TransportMessage) {
		if (this.OnMessage)
			this.OnMessage(message);
	}

}

function Test() {
	let Transport: ITransport = new TestWrapTransport();
	Transport.Connect("dummy-uri");

	// collabvm client injects into the transport instance
	let client: CollabVMClient = new CollabVMClient(Transport);
}