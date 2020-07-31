

export class TransportMessage {
	// Message data
	data: Uint8Array;
};

// A applicable transport interface for the client..
export interface ITransport {

	Connect(uri: string): void;

	// Function to be called by the transport when the connection is made.
	OnMessage: (messageData: TransportMessage) => void;

	OnConnect: () => void;

	OnClose: () => void;

	// Send a message to the other eend.
	Send(message: TransportMessage): void;

};