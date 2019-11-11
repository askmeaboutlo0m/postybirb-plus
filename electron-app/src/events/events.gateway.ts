import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Submission } from 'src/submission/submission.interface';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  public emitSubmissionEvent(event: string, data: string|Submission) {
    this.server.emit(event, data);
  }
}