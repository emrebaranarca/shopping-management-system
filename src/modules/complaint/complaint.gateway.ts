import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ComplaintService } from './complaint.service';

@WebSocketGateway()
export class CompliantGateway implements OnGatewayInit {

  @WebSocketServer() server: Server;

  constructor(private readonly compliantService: ComplaintService) {}

  afterInit() {
    console.log('Compliant WebSocket initialized');
  }

  async handleConnection(client: Socket) {
    setTimeout(() => {
      client.emit('message', 'Merhabalar, şikayetinizi detaylı bir şekilde yazabilir misiniz?');
    }, 3000);
  }

  async handleMessage(client: Socket, message: string) {
    await this.compliantService.saveComplaint(message);
    setTimeout(() => {
      client.emit('message', 'Şikayetinize kısa süre içersinde dönüş sağlayacağız. İyi günler dileriz:)');
      client.disconnect();
    }, 3000);
  }
}
