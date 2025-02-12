import WebSocket from 'ws';

export class GateSpotWebSocket {
    private static instance: GateSpotWebSocket;

    public static getInstance(): GateSpotWebSocket {
        if (!GateSpotWebSocket.instance) {
            GateSpotWebSocket.instance = new GateSpotWebSocket();
        }
        return GateSpotWebSocket.instance;
    }

    constructor() {
        this.connect();
    }

    private ws: WebSocket | null = null;


    
    private async dealMessage(decompressedData: string) {
        try {
            const response = JSON.parse(decompressedData);
            const event = response["event"];
            const ch = response["channel"];
            const result = response["result"];
                            
            switch (event) {
                case "subscribe":
                    console.log(ch+"订阅成功")
                    break;
                case "update":
                    switch (ch) {
                        case "spot.book_ticker":
                                const s = result["s"];
                                const bPrice = result["b"];
                                const buyNum = result["B"];
                                const sellPrice = result["a"];
                                const sellNum = result["A"];
                                console.log(s,bPrice,buyNum,sellPrice,sellNum)
                            break;
                        default:
                            console.log(ch+"更新成功")
                            break;
                    }
                    break;
                default:
                    console.log(event, decompressedData)
                    break;
            }
            // const ch = response["channel"];
            // if (ch == "futures.tickers") {
            //     const action = response["action"];
            //     if (action == "update") {
            //         console.log(decompressedData)      
            //     }
            // }
        } catch (error) {
            console.log('出现错误:', error);
        }
        // try {
        //     const response = JSON.parse(decompressedData);
        //     const ch = response["channel"];
        //     if (ch == "spot_kline") {
        //         const action = response["action"];
        //         if (action == "update") {
        //             console.log(decompressedData)      
        //         }
        //     } else {
        //         const code = response["code"]
        //         if (code == 0) {
        //             const msg = response["msg"]
        //             if (msg == "connect.success") {
        //                 const symbolList = ["BTCUSDT"];//  SymbolListManager.cointrSymbolList();
        //                 const args: { bar: string; instId: string; initialNum: number }[] = [];
        //                 for (const symbol of symbolList) {
        //                     args.push({"bar":"15m","instId":symbol,"initialNum":1});
        //                 }
        //                 const sendDic = {"args":args,"channel":"spot_kline","op":"subscribe"};
        //                 const sendStr = JSON.stringify(sendDic)
        //                 console.log(sendStr)
        //                 this.ws?.send(sendStr);
        //             }
        //         } else {
        //             console.error("错误返回:"+decompressedData);
        //         }
        //     }
        // } catch (error) {
        //     console.log('出现错误:', error);
        // }
    }

    private async connect() {
        console.log("开始连cointr Websocket")
        this.ws = new WebSocket(`wss://api.gateio.ws/ws/v4/`);

        this.ws.onopen = () => {
            console.log('cointr ws connected');

            // const tickersSendDic = {
            //     time: Date.now(),
            //     channel: "futures.tickers",
            //     event: "subscribe",
            //     payload: ["DOGE_USDT"]
            // }
            // const tickersSendStr = JSON.stringify(tickersSendDic)
            // console.log(tickersSendStr)
            // this.ws?.send(tickersSendStr);

            const orderbookSendDic = {
                time: Date.now(),
                channel: "spot.book_ticker",
                event: "subscribe",
                payload: ["DOGE_USDT"]
            }
            const orderbookSendStr = JSON.stringify(orderbookSendDic)
            console.log(orderbookSendStr)
            this.ws?.send(orderbookSendStr);
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


