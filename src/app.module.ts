import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { BusinessModule } from './business/business.module';
import { JoinCertificationModule } from './join_certification/join_certification.module';
import { AuthModule } from './auth/auth.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { AccommodationPeakSeasonModule } from './accommodation_peak_season/accommodation_peak_season.module';
import { AccommodationViewsCountModule } from './accommodation_views_count/accommodation_views_count.module';
import { RoomsModule } from './rooms/rooms.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    AdminModule,
    BusinessModule,
    JoinCertificationModule,
    AuthModule,
    AccommodationModule,
    AccommodationPeakSeasonModule,
    AccommodationViewsCountModule,
    RoomsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }