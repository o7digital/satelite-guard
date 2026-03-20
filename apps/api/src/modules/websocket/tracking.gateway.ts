import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import type { Alert, DeviceStatusEvent, Position } from "@satelite-guard/types";
import type { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: "*",
  },
  namespace: "/tracking",
})
export class TrackingGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private clients = 0;

  handleConnection() {
    this.clients += 1;
  }

  handleDisconnect() {
    this.clients = Math.max(0, this.clients - 1);
  }

  getClientCount() {
    return this.clients;
  }

  emitPositionUpdate(payload: unknown, position?: Position) {
    if (position) {
      this.server.emit("position:update", {
        deviceId: payload,
        position,
      });
      return;
    }

    this.server.emit("position:update", payload);
  }

  emitDeviceStatus(event: DeviceStatusEvent) {
    this.server.emit("device:status", event);
  }

  emitAlert(alert: Alert) {
    this.server.emit("alert:new", { alert });
  }
}
