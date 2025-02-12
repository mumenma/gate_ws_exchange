import { channel } from 'diagnostics_channel';
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
        try {
            const response = JSON.parse(decompressedData);
            // console.log(response)
            const event = response["event"];
            const ch = response["channel"];
            const result = response["result"];
                            
            switch (event) {
                case "subscribe":
                    console.log(ch+"订阅成功")
                    break;
                case "update":
                    switch (ch) {
                        case "futures.tickers":
                            for (const item of result) {
                                const contract = item["contract"];
                                const funding_rate = item["funding_rate"];
                                // const funding_rate_indicative = item["funding_rate_indicative"];
                                // console.log(contract,"资金费率",funding_rate)//,funding_rate_indicative)
                            }
                            break;
                        default:
                            console.log(ch+"更新成功")
                            break;
                    }
                    break;
                case "all":
                    switch (ch) {
                        case "futures.order_book":

                            const asks = result["asks"];
                            const bids = result["bids"];
                            const askItem = asks[0];
                            const bidItem = bids[0];
                            const askPrice = askItem["p"];
                            const askSize = askItem["s"];
                            const bidPrice = bidItem["p"];
                            const bidSize = bidItem["s"];
                            const contract = result["contract"];
                            console.log(contract, askPrice,askSize,bidPrice,bidSize)
                            break;
                        default:
                            console.log(ch+"更新成功")
                            break;
                    }
                    break
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
        this.ws = new WebSocket(`wss://fx-ws.gateio.ws/v4/ws/usdt`);

        this.ws.onopen = () => {
            console.log('cointr ws connected');

            const tickersSendDic = {
                time: Date.now(),
                channel: "futures.tickers",
                event: "subscribe",
                payload: ["DOGE_USDT"]
            }
            const tickersSendStr = JSON.stringify(tickersSendDic)
            console.log(tickersSendStr)
            this.ws?.send(tickersSendStr);

            const orderbookSendDic = {
                time: Date.now(),
                channel: "futures.order_book",
                event: "subscribe",
                payload: ["DOGE_USDT","1","0"]
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


