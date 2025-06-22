import request from '../../utils/request';

interface ActivityOpenDetailParams {
  activityAgentId: number;
}
/**
 * #活动详情
 * @param params activityAgentId
 * @returns
 */

interface ActivityOpenDetailResult extends Global.Results {
  activityStartTime: string;
  activityEndTime: string;
  activityName: string;
  rewardConfigList: object[];
  templateConfig: { title: string; remark: string };
  approveStatus: string;
  coverUrl: string;
  sharedPicUrl: string;
}
export async function getActivityOpenDetail(params: ActivityOpenDetailParams) {
  return request<ActivityOpenDetailResult>('/mtl-goal/activity/open/detail', {
    method: 'GET',
    params,
  });
}

/**
 * #农户中奖详情
 * @param params{phone:string,activityAgentId:number}
 * @returns
 */
export async function queryRewardInfo(params: {
  phone: string;
  activityAgentId: number;
}) {
  return request<Wheel.DrawActivityResult>(
    '/mtl-goal/activity/open/queryRewardInfo',
    {
      method: 'GET',
      params,
    }
  );
}
interface DrawActivityParams {
  phone: string;
  agentActivityCode: string;
  agentId: number;
  brand: number;
  activityAgentId: number;
}
/**
 * #执行抽奖
 * @param data
 * @returns
 */
export async function drawActivity(data: DrawActivityParams) {
  return request<Wheel.DrawActivityResult>(
    '/mtl-goal/activity/open/drawActivity',
    {
      method: 'POST',
      data,
    }
  );
}

interface CheckCodeParams {
  phone: string;
  smsCode: string;
  brand: number;
  agentId: number;
  activityAgentId: number;
}
/**
 * #校验验证码和活动
 * @param data
 * @returns
 */
export async function checkCode(data: CheckCodeParams) {
  return request<Wheel.CheckCodeResult>('/mtl-goal/activity/open/checkCode', {
    method: 'POST',
    data,
  });
}
/**
 * #发送验证码
 * @param data{phone:string,type:string,brand:string}
 * @returns
 */
export async function sendCode(params: {
  phone: string;
  agentId: number;
  brand: number;
}) {
  return request<Global.Results>('/mtl-goal/activity/open/sendCode', {
    method: 'GET',
    params,
  });
}
