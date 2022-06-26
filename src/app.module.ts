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
import { UploadModule } from './upload/upload.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RestaurantViewsCountModule } from './restaurant_views_count/restaurant_views_count.module';
import { ExposureMenuModule } from './exposure_menu/exposure_menu.module';
import { EntireMenuModule } from './entire_menu/entire_menu.module';
import { EntireMenuCategoryModule } from './entire_menu_category/entire_menu_category.module';
import { SuperModule } from './super/super.module';
import { NoticeModule } from './notice/notice.module';
import { DailyModule } from './daily/daily.module';
import { CommentModule } from './comment/comment.module';
import { ReportModule } from './report/report.module';

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
    UploadModule,
    RestaurantModule,
    RestaurantViewsCountModule,
    ExposureMenuModule,
    EntireMenuModule,
    EntireMenuCategoryModule,
    SuperModule,
    NoticeModule,
    DailyModule,
    CommentModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }