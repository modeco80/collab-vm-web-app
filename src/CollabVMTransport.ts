
import { ITransport, TransportMessage } from "./Transport";

// CollabVM socket.
export class CollabVMTransport implements ITransport {

	// The raw websocket.
	private ws: WebSocket = null;
	private connected: boolean = false;

	Connect(uri: string): void {
		// TODO: the subprotocol maybe shouldn't be hard coded
		this.ws = new WebSocket(window.location.protocol == "https:" ? "wss://" : "ws://" + uri, "cvm2");

		// apply thunk methods to client
		this.ws.binaryType = "arraybuffer";
		this.ws.onopen = Object.bind(this.OnConnectThunk, this);
		this.ws.onclose = Object.bind(this.OnCloseThunk, this);
		this.ws.onmessage = Object.bind(this.OnMessageThunk, this);
	}

	// functions that should be attached
	OnMessage: (messageData: TransportMessage) => void;
	OnConnect: () => void;
	OnClose: () => void;

	// private thunks from WS->ITransport
	// with approiate null checking

	private OnConnectThunk() {
		this.connected = true;

		if (this.OnConnect != null)
			this.OnConnect();
	}


	private OnCloseThunk() {
		this.connected = true;

		if (this.OnClose != null)
			this.OnClose();
	}

	private OnMessageThunk(messageData: MessageEvent) {
		if (typeof(messageData.data) === typeof(Uint8Array) && (this.OnMessage != null)) {
			var message = new TransportMessage();
			message.data = messageData.data;
			this.OnMessage(message);
			message = null;
		}
	}

	// If for some reason, a consumer of the CollabVM transport
	// needs to have a raw websocket access, it's provided here.
	AsRaw() : WebSocket {
		return this.ws;
	}

	Send(message: TransportMessage) {
		if(this.connected)
			this.ws.send(message.data);
	}

};