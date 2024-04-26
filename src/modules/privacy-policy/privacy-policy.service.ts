import { Injectable } from '@nestjs/common';

@Injectable()
export class PrivacyPolicyService {

    async getPrivacyPolicy():Promise<string>{
        return "Privacy Policy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum ."
    } 
}
