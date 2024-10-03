import {DOMAIN} from '@env';
import * as StompJs from '@stomp/stompjs';
import SocketJs from 'sockjs-client';

export const MESSAGE_SUB = '/sub/message';
export const MESSAGE_PUB = '/pub/hello';

class Socket {
  private _client: StompJs.Client | null = null;

  constructor() {}

  create() {
    const client = new StompJs.Client({
      webSocketFactory: () => new SocketJs(`${DOMAIN}/ws`),
      connectHeaders: {},
      debug(str) {
        console.log('Debugging', str);
      },
      onStompError(error) {
        console.error('Broker reported error: ' + error);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    return client;
  }

  // onConnect(cb: (c: StompJs.Client) => void) {
  //   const client = this.create();
  //   client.onConnect = () => cb(client);
  //   client.activate();
  //   this._client = client;
  // }

  // disConnect() {
  //   if (this._client?.active) {
  //     this._client?.deactivate();
  //   }
  //   this._client = null;
  // }

  // public get client() {
  //   // console.log('GET CLIENT', this._client?.connected);
  //   // if (!this._client?.connected) return;
  //   return this._client;
  // }

  // static useSocket() {
  //   return useState(new Socket());
  // }
}

export default Socket;
