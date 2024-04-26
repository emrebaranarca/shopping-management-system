import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { JwtAuthGuard } from '../user/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('privacy-policy')
export class PrivacyPolicyController {
    constructor(private privacePolicyService:PrivacyPolicyService){}

    @Get('/get-privacy-policy')
    getPrivacyPolicy(){
        return this.privacePolicyService.getPrivacyPolicy()
    }
}
