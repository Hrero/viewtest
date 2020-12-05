import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnumService {
    // /**
    //  * 认证类型， -1未认证，  1企业，  2个人
    //  */
    // private AuthTypeEnum authType;
    
    // /**
    //  * 所属行业
    //  */
    // private CustomerIndustryEnum industry;
    
    // /**
    //  * 客户等级
    //  */
    // private CustomerLevelEnum level;
    
    // /**
    //  * 客户来源
    //  */
    // private CustomerSourceEnum source;
    
    // /**
    //  * 公司规模
    //  */
    // private CompanySizeEnum companySize;
    
    // /**
    //  * 公海资源类型，1新资源、 2回收资源 （理解不了PD的想法）
    //  */
    // private PublicSourceEnum publicSource;
    
    // /**
    //  * 最后一次意向（来源拜访记录）
    //  */
    // private CooperationIntentionEnum lastIntention;
    
    // /**
    //  * 当前状态（来源拜访记录） （理解不了PD的想法）
    //  */
    // private CustomerStatusEnum status;
    
    // /**
    //  * 客户标签
    //  */
    // private CustomerTagEnum tag;
    
    constructor(
    ) { 

    }
    public enumList: Array<any> = ['AuthTypeEnum', 'CustomerLevelEnum', 'CustomerSourceEnum', 
    'CustomerStatusEnum', 'CustomerTagEnum', 'CooperationIntentionEnum', 'CompanySizeEnum', 'CustomerIndustryEnum'];
    private CustomerIndustryEnum: Array<any> = [];
    private CustomerIndustryEnumSubject = new BehaviorSubject<any>(false);
    public getCustomerIndustryEnumAsync = this.CustomerIndustryEnumSubject.asObservable();

    private AuthTypeEnum: Array<any> = [];
    private AuthTypeEnumSubject = new BehaviorSubject<any>(false);
    public getAuthTypeEnumAsync = this.AuthTypeEnumSubject.asObservable();


    private CustomerLevelEnum: Array<any> = [];
    private CustomerLevelEnumSubject = new BehaviorSubject<any>(false);
    public getCustomerLevelEnumAsync = this.CustomerLevelEnumSubject.asObservable();

    private CustomerSourceEnum: Array<any> = [];
    private CustomerSourceEnumSubject = new BehaviorSubject<any>(false);
    public getCustomerSourceEnumAsync = this.CustomerSourceEnumSubject.asObservable();

    private CustomerStatusEnum: Array<any> = [];
    private CustomerStatusEnumSubject = new BehaviorSubject<any>(false);
    public getCustomerStatusEnumAsync = this.CustomerStatusEnumSubject.asObservable();


    private CustomerTagEnum: Array<any> = [];
    private CustomerTagEnumSubject = new BehaviorSubject<any>(false);
    public getCustomerTagEnumAsync = this.CustomerTagEnumSubject.asObservable();

    private CooperationIntentionEnum: Array<any> = [];
    private CooperationIntentionEnumSubject = new BehaviorSubject<any>(false);
    public getCooperationIntentionEnumAsync = this.CooperationIntentionEnumSubject.asObservable();

    private CompanySizeEnum: Array<any> = [];
    private CompanySizeEnumSubject = new BehaviorSubject<any>(false);
    public getCompanySizeEnumAsync = this.CompanySizeEnumSubject.asObservable();

    setCustomerIndustryEnum(list) {
        this.CustomerIndustryEnum = list;
        this.CustomerIndustryEnumSubject.next(this.CustomerIndustryEnum)
    }
    setAuthTypeEnum(list) {
        this.AuthTypeEnum = list;
        this.AuthTypeEnumSubject.next(this.AuthTypeEnum)
    }

    setCustomerLevelEnum(list) {
        this.CustomerLevelEnum = list;
        this.CustomerLevelEnumSubject.next(this.CustomerLevelEnum)
    }

    setCustomerSourceEnum(list) {
        this.CustomerSourceEnum = JSON.parse(JSON.stringify(list).replace(/msg/g, 'label').replace(/name/g, 'value'));
        this.CustomerSourceEnumSubject.next(this.CustomerSourceEnum);
    }
    setCustomerStatusEnum(list) {
        this.CustomerStatusEnum = list;
        this.CustomerStatusEnumSubject.next(this.CustomerStatusEnum)
    }
    setCustomerTagEnum(list) {
        this.CustomerTagEnum = list;
        this.CustomerTagEnumSubject.next(this.CustomerTagEnum)
    }

    setCooperationIntentionEnum(list) {
        this.CooperationIntentionEnum = list;
        this.CooperationIntentionEnumSubject.next(this.CooperationIntentionEnum)
    }
    setCompanySizeEnum(list) {
        this.CompanySizeEnum = list;
        this.CompanySizeEnumSubject.next(this.CompanySizeEnum)
    }

}
