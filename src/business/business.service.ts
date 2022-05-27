import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { CreateBusinessDto } from './dto/create-business.dto';
import { ACCOMMODATION_BUSINESS_CODE_LIST } from '../../constant'
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessRepository } from './entities/business.repository';

@Injectable()
export class BusinessService {
  constructor(
    @InjectRepository(BusinessRepository)
    private businessRepository: BusinessRepository
  ) { }

  public async certificateBusiness(data: CreateBusinessDto): Promise<{ pass: boolean, message?: string }> {
    const cert_data = {
      businesses: [
        {
          ...data
        }
      ]
    }
    let pass = false;

    const check_business = await this.businessRepository.findOne({ b_no: data.b_no });
    if (check_business) {
      return { pass: false, message: 'Already Join' }
    }
    // if (!ACCOMMODATION_BUSINESS_CODE_LIST.includes(data.b_type) && !RESTAURANT_BUSINESS_CODE_LIST.includes(data.b_type)) {
    //   return { pass, message: 'Not Target' };
    // }

    const cert_res = await fetch(
      `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${process.env.ADMIN_CERTIFICATION_API_KEY}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cert_data),
      },
    );

    const cert_res_json: {
      data: {
        valid: string;
      }[],
      status_code: string;
    } = await cert_res.json();

    if (cert_res_json.data[0].valid == '01') {
      pass = true;
    }

    return { pass };
  }
}
