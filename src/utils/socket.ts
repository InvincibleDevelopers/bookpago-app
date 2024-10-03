import {DOMAIN} from '@env';
import * as StompJs from '@stomp/stompjs';
import {useRef} from 'react';
import SocketJs from 'sockjs-client';

export const MESSAGE_SUB = '/sub/message';
export const MESSAGE_PUB = '/pub/hello';

const socketjs = new SocketJs(`${DOMAIN}/ws`);

class Socket {
  private _client: StompJs.Client | null = null;

  constructor() {}

  create() {
    const client = new StompJs.Client({
      // brokerURL: BROKER_URL,
      webSocketFactory: () => socketjs,
      connectHeaders: {},
      debug(str) {
        // console.log('Debugging', str, client.connected);
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

  onConnect(cb: (c: StompJs.Client) => void) {
    const client = this.create();
    client.onConnect = () => cb(client);
    client.activate();
    this._client = client;
  }

  disConnect() {
    if (this._client?.active) {
      this._client?.deactivate();
    }
    this._client = null;
  }

  public get client() {
    if (!this._client?.connected) return;
    return this._client;
  }

  static useSocket() {
    return useRef(new Socket());
  }
}

export default Socket;
