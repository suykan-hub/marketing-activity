declare namespace Wheel {
  interface CheckCodeResult {
    code: number;
    data: string;
    dataAuthPermissionList: null;
    date: string;
    msg: null;
    msgCode: string;
    requestId: string;
    success: boolean;
    token: null;
  }

  interface DrawActivityResult {
    code: number;
    data: {
      id: number;
      activityAgentId: number;
      activityCode: string;
      agentId: number;
      brand: number;
      rewardConfigId: number;
      rewardName: string;
      rewardValue: string;
      phone: string;
      userName: string;
      powerStationType: string;
      powerStationCode: string;
    };
    date: string;
    msg: null;
    msgCode: string;
    requestId: string;
    success: boolean;
    token: null;
  }
  interface DrawActivityResult {
    code: number;
    data: {
      id: number;
      rewardName: string;
      rewardValue: string;
    };
    dataAuthPermissionList: object;
    msgCode: string;
    msg: string;
    success: boolean;
    token: string;
    date: string;
    mock: string;
    requestId: string;
  }
}
