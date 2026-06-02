// ============================================
// 幻唐志活动提醒 - 企业微信群机器人脚本
// 每天早上发：今日清单 + 今日活动预告
// 活动开始前5分钟发提醒
// ============================================

const WEBHOOK_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d9da5d8a-760e-4d34-a10d-c38927552357';

// ======== 每日活动配置 ========
const WEEKLY_ACTIVITIES = {
  1: { // 周一
    name: '周一',
    list: [
      { time: '17:30', name: '帮派宴会', icon: '🍻' },
      { time: '20:30', name: '首席争霸', icon: '⚔️' },
      { time: '21:40', name: '门派论剑', icon: '⚔️' }
    ],
    reminders: [
      { time: '17:25', msg: '🍻【17:30 帮派宴会】5分钟后开始！\n别忘了吃席领奖励！' },
      { time: '20:25', msg: '⚔️【20:30 首席争霸】5分钟后开始！\n门派最强之争，准备上线！' },
      { time: '21:35', msg: '⚔️【21:40 门派论剑】5分钟后开始！\n兄弟们上号！' }
    ]
  },
  2: { // 周二
    name: '周二',
    list: [
      { time: '14:30', name: '帮派攻城战', icon: '🏰' },
      { time: '17:30', name: '帮派宴会', icon: '🍻' },
      { time: '18:55', name: '帮派封魔洞', icon: '🏰' },
      { time: '20:30', name: '帮派竞赛', icon: '⭐' },
      { time: '21:25', name: '暗黑龙王', icon: '🐉' },
      { time: '21:40', name: '门派论剑', icon: '⚔️' }
    ],
    reminders: [
      { time: '14:25', msg: '🏰【14:30 帮派攻城战】5分钟后开始！\n记得上线攻城！' },
      { time: '17:25', msg: '🍻【17:30 帮派宴会】5分钟后开始！\n别忘了吃席领奖励！' },
      { time: '18:50', msg: '🏰【18:55 帮派封魔洞】5分钟后开始！\n⚠️ 记得提前预约！' },
      { time: '20:25', msg: '⭐【20:30 帮派竞赛】5分钟后开始！\n💰 银币大户，必参加！' },
      { time: '21:20', msg: '🐉【21:25 暗黑龙王】5分钟后开始！\n⚠️ 记得提前预约！' },
      { time: '21:35', msg: '⚔️【21:40 门派论剑】5分钟后开始！' }
    ]
  },
  3: { // 周三
    name: '周三',
    list: [
      { time: '17:30', name: '帮派宴会', icon: '🍻' },
      { time: '20:05', name: '排位赛', icon: '🏆' },
      { time: '21:40', name: '门派论剑', icon: '⚔️' }
    ],
    reminders: [
      { time: '17:25', msg: '🍻【17:30 帮派宴会】5分钟后开始！\n别忘了吃席领奖励！' },
      { time: '20:00', msg: '🏆【20:05 排位赛】5分钟后开始！\n冲排名的兄弟上号！' },
      { time: '21:35', msg: '⚔️【21:40 门派论剑】5分钟后开始！' }
    ]
  },
  4: { // 周四
    name: '周四',
    list: [
      { time: '17:30', name: '帮派宴会', icon: '🍻' },
      { time: '18:55', name: '帮派封魔洞', icon: '🏰' },
      { time: '20:30', name: '帮派竞赛', icon: '⭐' },
      { time: '21:40', name: '门派论剑', icon: '⚔️' }
    ],
    reminders: [
      { time: '17:25', msg: '🍻【17:30 帮派宴会】5分钟后开始！\n别忘了吃席领奖励！' },
      { time: '18:50', msg: '🏰【18:55 帮派封魔洞】5分钟后开始！\n⚠️ 记得提前预约！' },
      { time: '20:25', msg: '⭐【20:30 帮派竞赛】5分钟后开始！\n💰 帮派间对抗，争荣誉拿银币！' },
      { time: '21:35', msg: '⚔️【21:40 门派论剑】5分钟后开始！' }
    ]
  },
  5: { // 周五
    name: '周五',
    list: [
      { time: '14:30', name: '帮派攻城战', icon: '🏰' },
      { time: '17:30', name: '帮派宴会', icon: '🍻' },
      { time: '20:05', name: '排位赛', icon: '🏆' },
      { time: '21:00', name: '排位赛·第二场', icon: '🏆' },
      { time: '21:40', name: '门派论剑', icon: '⚔️' },
      { time: '22:15', name: '帮派精英赛', icon: '⭐' }
    ],
    reminders: [
      { time: '14:25', msg: '🏰【14:30 帮派攻城战】5分钟后开始！' },
      { time: '17:25', msg: '🍻【17:30 帮派宴会】5分钟后开始！\n别忘了吃席领奖励！' },
      { time: '20:00', msg: '🏆【20:05 排位赛】5分钟后开始！\n今晚排位赛有两场（20:05和21:00）' },
      { time: '20:55', msg: '🏆【21:00 排位赛·第二场】5分钟后开始！' },
      { time: '21:35', msg: '⚔️【21:40 门派论剑】5分钟后开始！' },
      { time: '22:10', msg: '⭐【22:15 帮派精英赛】5分钟后开始！\n今天最后一个活动，别漏了！' }
    ]
  },
  6: { // 周六
    name: '周六',
    list: [
      { time: '14:30', name: '霜原幻境', icon: '❄️' },
      { time: '17:30', name: '帮派宴会', icon: '🍻' },
      { time: '20:05', name: '门派演武', icon: '⚔️' },
      { time: '21:30', name: '霜原幻境·第二场', icon: '❄️' }
    ],
    reminders: [
      { time: '14:25', msg: '❄️【14:30 霜原幻境】5分钟后开始！' },
      { time: '17:25', msg: '🍻【17:30 帮派宴会】5分钟后开始！\n别忘了吃席领奖励！' },
      { time: '20:00', msg: '⚔️【20:05 门派演武】5分钟后开始！' },
      { time: '21:25', msg: '❄️【21:30 霜原幻境·第二场】5分钟后开始！' }
    ]
  },
  0: { // 周日
    name: '周日',
    list: [
      { time: '14:30', name: '群雄逐鹿', icon: '🦌' },
      { time: '17:30', name: '帮派宴会', icon: '🍻' }
    ],
    reminders: [
      { time: '14:25', msg: '🦌【14:30 群雄逐鹿】5分钟后开始！' },
      { time: '17:25', msg: '🍻【17:30 帮派宴会】5分钟后开始！\n别忘了吃席领奖励！' }
    ]
  }
};

// ======== 生成早安消息（清单 + 今日活动） ========
function buildMorningMsg(dayOfWeek) {
  const today = WEEKLY_ACTIVITIES[dayOfWeek];
  const dayName = today ? today.name : '今天';

  let activityList = '🎉 今天没有限时活动，安心做日常！';
  if (today && today.list.length > 0) {
    activityList = today.list.map(a => `${a.icon} ${a.time} ${a.name}`).join('\n');
  }

  return `☀️【早安·${dayName}活动总览】

📋 今日必做清单：
━━━━━━━━━━━━
✅ 修业任务 ×10
✅ 宝图任务 ×15（挖宝赚银）
✅ 丝绸之路 ×1（修炼经验）
✅ 竞技场 ×8（至少胜2局）
✅ 除魔任务 ×30（经验大头）
✅ 野外降妖 ×10（装备灵获取）
✅ 英雄试炼 ×1（铜币获取）
✅ 每日挑战 ×5
   └ 三十六天罡（每小时30分）
   └ 诸天列宿（每小时15分）
   └ 十二生肖（每小时45分）
   └ 三界悬赏 ×5
━━━━━━━━━━━━

🗓️ 今日限时活动：
━━━━━━━━━━━━
${activityList}
━━━━━━━━━━━━

💡 活跃度打满450！
💡 除魔古董留一套给丝绸之路！
⚔️ 兄弟们今天也要加油！`;
}

// ======== 发送消息函数 ========
async function sendMessage(content) {
  const https = require('https');
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ msgtype: 'text', text: { content } });
    const url = new URL(WEBHOOK_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log('发送结果:', body);
        resolve(JSON.parse(body));
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ======== 主逻辑 ========
async function main() {
  const now = new Date();
  const bjTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  const dayOfWeek = bjTime.getDay();
  const hour = bjTime.getHours();
  const minute = bjTime.getMinutes();
  const currentTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

  console.log(`当前北京时间: 周${dayOfWeek} ${currentTime}`);

  if (hour === 8 && minute <= 5) {
    const msg = buildMorningMsg(dayOfWeek);
    await sendMessage(msg);
    return;
  }

  const today = WEEKLY_ACTIVITIES[dayOfWeek];
  if (today) {
    for (const reminder of today.reminders) {
      const [targetHour, targetMinute] = reminder.time.split(':').map(Number);
      if (hour === targetHour && minute >= targetMinute && minute <= targetMinute + 15) {
        await sendMessage(reminder.msg);
        return;
      }
    }
  }

  console.log('当前时间没有需要发送的提醒');
}

main().catch(console.error);
