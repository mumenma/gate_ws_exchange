import { GateFutureWebSocket } from "./gate_future_ws";
import { GateSpotWebSocket } from "./gate_spot_ws";
async function main(){
    console.log('hello world');
    GateFutureWebSocket.getInstance();
    // GateSpotWebSocket.getInstance();
}

main();