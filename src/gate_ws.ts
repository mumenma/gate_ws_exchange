import WebSocket from 'ws';

export class GateWebSocket {
    private static instance: GateWebSocket;

    public static getInstance(): GateWebSocket {
        if (!GateWebSocket.instance) {
            GateWebSocket.instance = new GateWebSocket();
        }
        return GateWebSocket.instance;
    }

    constructor() {
        this.connect();
    }

    private ws: WebSocket | null = null;


    
    private async dealMessage(decompressedData: string) {
        console.log(decompressedData)
        try {
            const response = JSON.parse(decompressedData);
            const ch = response["channel"];
            if (ch == "spot_kline") {
                const action = response["action"];
                if (action == "update") {
                    console.log(decompressedData)      
                }
            } else {
                const code = response["code"]
                if (code == 0) {
                    const msg = response["msg"]
                    if (msg == "connect.success") {
                        const symbolList = ["BTCUSDT"];//  SymbolListManager.cointrSymbolList();
                        const args: { bar: string; instId: string; initialNum: number }[] = [];
                        for (const symbol of symbolList) {
                            args.push({"bar":"15m","instId":symbol,"initialNum":1});
                        }
                        const sendDic = {"args":args,"channel":"spot_kline","op":"subscribe"};
                        const sendStr = JSON.stringify(sendDic)
                        console.log(sendStr)
                        this.ws?.send(sendStr);
                    }
                } else {
                    console.error("错误返回:"+decompressedData);
                }
            }
        } catch (error) {
            console.log('出现错误:', error);
        }
    }

    private async connect() {
        console.log("开始连cointr Websocket")
        this.ws = new WebSocket(`wss://www.cointr.com/ws`);

        this.ws.onopen = () => {
            console.log('cointr ws connected');
            // const symbolList =  SymbolListManager.cointrSymbolList();
            // const args: { bar: string; instId: string; initialNum: number }[] = [];
            // for (const symbol of symbolList) {
            //     args.push({"bar":"15m","instId":symbol,"initialNum":1});
            // }
            // const sendDic = {"args":args,"channel":"spot_kline","op":"subscribe"};
            // const sendStr = JSON.stringify(sendDic)
            // console.log(sendStr)
            // this.ws?.send(sendStr);
        };

        // this.ws.on('pong', () => {
        //     console.debug('cointr receieved pong from server');
        // });
        // this.ws.on('ping', () => {
        //     console.debug('==========cointr receieved ping from server');
        //     this.ws?.pong();
        // });

        this.ws.onclose = (e) => {
            this.connect();
            console.warn('cointr ws closed');
        };

        this.ws.onerror = (err) => {
            console.warn('cointr ws error');
        };

        this.ws.onmessage = async (event: WebSocket.MessageEvent) => {
            try {
                this.dealMessage(event.data.toString());
            } catch (error) {
                console.log('cointr 出现错误:', error);
                console.log(event.data);
            }
        };
    }
}


