import { Controller, Get } from '@nestjs/common';
import { VersionService } from './version.service';

@Controller('version')
export class VersionController {
    constructor(private versionService:VersionService){}

    @Get('/get-version')
    getVersion(){
        return this.versionService.getVersion()
    }
}
