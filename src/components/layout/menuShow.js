// 系统管理员,租户
let menuAdminData = [
  {
    'resName': '概览',
    'resUri': '/home/#/overview',
    'subResList': [],
    'picUrl': '/images/banner.png'
  },
  {
    'resName': '用户管理',
    'resUri': '/home/#/user',
    'subResList': [],
    'picUrl': '/images/banner.png'
  },
  {
    'resName': '实例管理',
    'resUri': '/home/#/insManage',
    'picUrl': '/images/banner.png',
    'subResList': [
      {
        'resName': '实例信息',
        'resUri': '/home/#/insManage',
        'picUrl': '',
        'subResList': null
      },
      {
        'resName': '用量报告',
        'resUri': '/home/#/insManage/useReport',
        'picUrl': '',
        'subResList': null
      },
      {
        'resName': '实例权限',
        'resUri': '/home/#/insManage/insAuthor',
        'picUrl': '',
        'subResList': null
      }
    ]
  },
  {
    'resName': '审计日志',
    'resUri': '/home/#/auditLog',
    'subResList': [],
    'picUrl': '/images/banner.png'
  }
];
// 项目管理员
let menuProjectData = [
  {
    'resName': '概览',
    'resUri': '/home/#/overview',
    'subResList': [],
    'picUrl': '/images/banner.png'
  },
  {
    'resName': '用户管理',
    'resUri': '/home/#/user',
    'subResList': [],
    'picUrl': '/images/banner.png'
  },
  {
    'resName': '实例管理',
    'resUri': '/home/#/insManage',
    'picUrl': '/images/banner.png',
    'subResList': [
      {
        'resName': '实例信息',
        'resUri': '/home/#/insManage',
        'picUrl': '',
        'subResList': null
      },
      {
        'resName': '用量报告',
        'resUri': '/home/#/insManage/useReport',
        'picUrl': '',
        'subResList': null
      },
      {
        'resName': '实例权限',
        'resUri': '/home/#/insManage/insAuthor',
        'picUrl': '',
        'subResList': null
      }
    ]
  }
];
// 项目成员
let userData = [
  {
    'resName': '概览',
    'resUri': '/home/#/overview',
    'subResList': [],
    'picUrl': '/images/banner.png'
  },
  {
    'resName': '实例管理',
    'resUri': '/home/#/insManage',
    'picUrl': '/images/banner.png',
    'subResList': [
      {
        'resName': '实例信息',
        'resUri': '/home/#/insManage',
        'picUrl': '',
        'subResList': null
      },
      {
        'resName': '用量报告',
        'resUri': '/home/#/insManage/useReport',
        'picUrl': '',
        'subResList': null
      }
    ]
  }
]
export default {
  menuAdminData,
  menuProjectData,
  userData
}
