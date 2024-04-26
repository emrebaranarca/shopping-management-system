import { Injectable } from '@nestjs/common';

@Injectable()
export class VersionService {
    async getVersion():Promise<string>{
        return "1.0.0"
    }
}
