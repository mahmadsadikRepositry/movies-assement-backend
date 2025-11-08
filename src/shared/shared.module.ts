import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SharedHttpService } from './shared-http/shared-http.service';

@Module({
    imports: [HttpModule],
    providers: [SharedHttpService],
    exports:[SharedHttpService]
})
export class SharedModule {}
