/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Scan, 
  Bell, 
  Menu, 
  ChevronRight, 
  GraduationCap, 
  ClipboardList, 
  Briefcase, 
  BookOpen, 
  Award, 
  Users, 
  Pill, 
  Brain, 
  Gift, 
  Calendar,
  Home,
  Radio,
  Book,
  MessageSquare,
  User,
  Play,
  ChevronLeft,
  Share2,
  BookText,
  SquareCheck,
  Cpu,
  FileText,
  CheckSquare,
  Upload,
  MessageCircle,
  UserCircle,
  X,
  Pencil,
  ShieldCheck,
  CreditCard,
  FileText as FileIcon,
  Download,
  Settings,
  Shield,
  LayoutGrid,
  Star,
  Sparkles,
  Phone,
  Volume2,
  VolumeX,
  Mic,
  Plus,
  Image as ImageIcon,
  Send,
  MoreHorizontal
} from 'lucide-react';

// --- System UI Components ---

const StatusBar = () => (
  <div className="absolute top-0 w-full h-[44px] flex items-center justify-between px-7 z-[100] text-black text-[14px]">
    <div className="font-semibold select-none">9:41</div>
    <div className="flex items-center gap-1.5 pt-0.5">
      {/* Cellular Signal Icons */}
      <div className="flex items-end gap-[1px] h-[10px]">
        <div className="w-[3px] h-[3px] bg-black rounded-[0.5px]"></div>
        <div className="w-[3px] h-[5px] bg-black rounded-[0.5px]"></div>
        <div className="w-[3px] h-[7px] bg-black rounded-[0.5px]"></div>
        <div className="w-[3px] h-[10px] bg-black/30 rounded-[0.5px]"></div>
      </div>
      {/* WiFi Icon */}
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 10.5C9.25 10.5 10.5 9.25 10.5 7.5C10.5 5.75 9.25 4.5 7.5 4.5C5.75 4.5 4.5 5.75 4.5 7.5C4.5 9.25 5.75 10.5 7.5 10.5Z" fill="black"/>
        <path d="M14.5 4.5C12.5 2.5 10 1.5 7.5 1.5C5 1.5 2.5 2.5 0.5 4.5L1.5 5.5C3.3 3.7 5.3 3 7.5 3C9.7 3 11.7 3.7 13.5 5.5L14.5 4.5Z" fill="black"/>
        <path d="M11.5 1.5C10.3 0.5 8.9 0 7.5 0C6.1 0 4.7 0.5 3.5 1.5L4.5 2.5C5.4 1.8 6.4 1.5 7.5 1.5C8.6 1.5 9.6 1.8 10.5 2.5L11.5 1.5Z" fill="black"/>
      </svg>
      {/* Battery Icon */}
      <div className="w-[22px] h-[11px] border-[1px] border-black/40 rounded-[2.5px] relative flex items-center px-[1.5px]">
        <div className="w-full h-full bg-black rounded-[1px] scale-x-[0.6] origin-left"></div>
        <div className="absolute -right-[2.5px] w-[1.5px] h-[4px] bg-black/40 rounded-r-[1px]"></div>
      </div>
    </div>
  </div>
);

const HomeIndicator = () => (
  <div className="absolute bottom-0 w-full h-[34px] flex items-center justify-center z-[60] pointer-events-none">
    <div className="w-[134px] h-[5px] bg-black/80 rounded-full"></div>
  </div>
);

// --- Header Component ---
const Header = () => (
  <div className="sticky top-0 bg-white z-50 pt-[44px] px-4 pb-3 flex items-center gap-3 border-b border-gray-50">
    <h1 className="text-[20px] font-bold text-gray-900 whitespace-nowrap">首页</h1>
    <div className="flex-1 relative">
      <div className="flex items-center h-[34px] bg-gray-100 rounded-full px-4 gap-2 transition-all focus-within:bg-gray-200">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="搜索" 
          className="bg-transparent border-none outline-none text-[15px] w-full placeholder:text-gray-400"
        />
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Scan size={22} className="text-gray-700" />
      <div className="relative">
        <Bell size={22} className="text-gray-700" />
        <div className="absolute top-0 right-0 w-[11px] h-[11px] bg-red-500 rounded-full border-2 border-white" />
      </div>
    </div>
  </div>
);

// --- Sub Navigation (Text Style) ---
const SubNav = ({ active, onSelect }: { active: string, onSelect: (val: string) => void }) => {
  const items = ["推荐", "继续教育", "科室管理", "学术资源", "区域培训", "职业健康", "基层管理"];
  
  return (
    <div className="sticky top-[87px] bg-white z-40 overflow-hidden border-b border-gray-50/50">
      <div className="flex gap-6 px-4 overflow-x-auto no-scrollbar pt-2 pb-0">
        {items.map((item) => (
          <div 
            key={item} 
            onClick={() => onSelect(item)}
            className="flex flex-col items-center shrink-0 relative cursor-pointer"
          >
            <span className={`text-[14px] whitespace-nowrap pb-1.5 transition-all ${
              active === item ? "text-primary font-bold" : "text-gray-500 font-normal"
            }`}>
              {item}
            </span>
            {active === item && (
              <motion.div 
                layoutId="activeSub"
                className="absolute bottom-0 w-full h-[3px] bg-primary rounded-full z-10"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Category Tabs ---
const Categories = ({ onShowAll }: { onShowAll: () => void }) => {
  const [active, setActive] = useState<string | null>(null);
  const tabs = ["肿瘤科", "心血管科", "儿科", "神经科"];
  
  return (
    <div className="flex items-center bg-white px-4 pt-1 pb-3 gap-2 overflow-hidden border-b border-gray-50">
      <div className="flex-1 flex gap-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab} 
            onClick={() => setActive(tab)}
            className={`px-4 py-1.5 rounded-full text-[13px] whitespace-nowrap transition-colors ${
              active === tab ? "bg-primary text-white font-bold" : "bg-gray-100 text-gray-600 font-normal hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <div className="w-[1px] h-4 bg-gray-200 mr-3"></div>
        <Menu 
          size={20} 
          className="text-gray-400 cursor-pointer active:opacity-60" 
          onClick={onShowAll}
        />
      </div>
    </div>
  );
};

// --- Hero Banner ---
const HeroBanner = () => (
  <div className="px-4 mt-2">
    <div className="bg-primary rounded-2xl p-4 relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-6" />
      
      <div className="inline-block bg-[#085a26] text-secondary-bg text-[10px] font-bold px-2 py-0.5 rounded-sm mb-2">
        2026年政策解读
      </div>
      <h2 className="text-white text-[17px] font-bold leading-tight mb-1">
        传染病防治法 (2025版) 解读
      </h2>
      <p className="text-white/80 text-[11px] mb-3">
        权威专家深度解析，助力临床实践
      </p>
      <button className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform">
        立即学习 <ChevronRight size={14} />
      </button>
    </div>
  </div>
);

// --- Grid Services ---
const services = [
  { icon: GraduationCap, label: "继续教育" },
  { icon: ClipboardList, label: "临床指南" },
  { icon: Briefcase, label: "找工作" },
  { icon: BookOpen, label: "职业题库" },
  { icon: Award, label: "精品继教" },
  { icon: Users, label: "培训班" },
  { icon: Pill, label: "用药助手" },
  { icon: Brain, label: "华医AI" },
  { icon: Gift, label: "福利积分" },
  { icon: MoreHorizontal, label: "更多" },
];

const GridServices = ({ onNavigate }: { onNavigate: (label: string) => void }) => (
  <div className="grid grid-cols-5 gap-y-4 px-4 mt-4">
    {services.map((item, i) => (
      <div 
        key={i} 
        onClick={() => onNavigate(item.label)}
        className="flex flex-col items-center gap-1.5 active:opacity-60 transition-opacity cursor-pointer group"
      >
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 transition-transform group-active:scale-90">
          <item.icon size={22} strokeWidth={2.0} />
        </div>
        <span className="text-[11px] text-gray-700 font-medium text-center">{item.label}</span>
      </div>
    ))}
  </div>
);

// --- Specialized Blocks ---
const SpecialBlocks = () => (
  <div className="px-4 mt-4 flex gap-3">
    <div className="flex-1 bg-secondary-bg rounded-xl p-4 flex justify-between items-center h-20">
      <div>
        <h4 className="text-primary font-bold text-[14px]">找工作</h4>
        <p className="text-[11px] text-gray-500">海量医疗岗位</p>
      </div>
      <Briefcase size={28} className="text-primary opacity-60" strokeWidth={2.5} />
    </div>
    <div className="flex-1 bg-blue-bg rounded-xl p-4 flex justify-between items-center h-20">
      <div>
        <h4 className="text-[#3b82f6] font-bold text-[14px]">日历</h4>
        <p className="text-[11px] text-[#3b82f6] opacity-70">查看安排</p>
      </div>
      <Calendar size={28} className="text-[#3b82f6] opacity-60" strokeWidth={2.5} />
    </div>
  </div>
);

// --- Recommended Courses ---
const CourseItem = () => (
  <div className="flex gap-4 p-3 bg-white hover:bg-gray-50 transition-colors">
    <div className="w-[124px] h-[70px] bg-gray-100 rounded-lg flex items-center justify-center shrink-0 relative">
      <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-gray-600">
        <Play size={16} fill="currentColor" className="ml-0.5" />
      </div>
    </div>
    <div className="flex flex-col justify-center">
      <h4 className="text-[14px] font-bold text-gray-900 leading-snug line-clamp-2">
        课程名称: 中华人民共和国传染病防治法 (2025版)
      </h4>
      <p className="text-[12px] text-gray-500 mt-1">权威专家深度解析</p>
    </div>
  </div>
);

const RecommendedCourses = () => (
  <div className="mt-4 px-4 pb-28">
    <h3 className="text-[18px] font-bold text-gray-900 mb-2">推荐课程</h3>
    <div className="space-y-1 -mx-4">
      <CourseItem />
      <CourseItem />
      <CourseItem />
      <CourseItem />
    </div>
  </div>
);

const CountingNumber = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
};

// --- Points Mission Page ---
const PointsMission = ({ onBack }: { onBack: () => void }) => {
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [showShareDrawer, setShowShareDrawer] = useState(false);
  const [pointsTotal, setPointsTotal] = useState(288);
  const [toast, setToast] = useState<{ show: boolean, points: string }>({ show: false, points: "" });

  const missions = [
    { icon: Play, title: "看医疗科普视频赚医豆", points: "50" },
    { icon: BookText, title: "浏览传染病防治指南", points: "20" },
    { icon: SquareCheck, title: "每日科室管理签到", points: "10" },
    { icon: Cpu, title: "使用华医AI进行临床查询", points: "30" },
    { icon: FileText, title: "完善个人职称信息", points: "50" },
    { icon: GraduationCap, title: "完成一节继续教育课程", points: "100" },
    { icon: Share2, title: "向同事推荐学术资源", points: "20" },
    { icon: Search, title: "参与医生职业发展调研", points: "40" },
    { icon: CheckSquare, title: "完成科室安全知识测试", points: "60" },
    { icon: Search, title: "搜索并收藏一个新岗位", points: "20" },
  ];

  const handleComplete = (index: number, points: string) => {
    if (!completedMissions.includes(index)) {
      setCompletedMissions([...completedMissions, index]);
      setPointsTotal(prev => prev + 50); // Increment total points by 50 for each completed task
      setToast({ show: true, points });
      setTimeout(() => setToast({ show: false, points: "" }), 2000);
    }
  };

  const shareOptions = [
    { icon: MessageCircle, label: "微信", color: "bg-[#07c160]" },
    { icon: Share2, label: "朋友圈", color: "bg-[#00c661]" },
    { icon: Send, label: "私信好友", color: "bg-[#007aff]" },
    { icon: UserCircle, label: "QQ", color: "bg-[#12b7f5]" },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      {/* Share Drawer */}
      <AnimatePresence>
        {showShareDrawer && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareDrawer(false)}
              className="absolute inset-0 bg-black/50 z-[150] backdrop-blur-[1px]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-[160] px-5 pt-6 pb-[34px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[17px] font-bold text-gray-900">分享到</h3>
                <button onClick={() => setShowShareDrawer(false)} className="p-2 -mr-2 text-gray-400 active:opacity-60 transition-opacity">
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4 px-1">
                {shareOptions.map((opt, i) => (
                  <button key={i} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                    <div className={`${opt.color} w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-white`}>
                      <opt.icon size={26} strokeWidth={2} />
                    </div>
                    <span className="text-[12px] text-gray-500 font-normal">{opt.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%" }}
            className="absolute top-1/2 left-1/2 z-[200] bg-black/85 text-white px-8 py-4 rounded-2xl text-[15px] font-medium backdrop-blur-md shadow-2xl whitespace-nowrap text-center"
          >
            恭喜获得医豆+{toast.points}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex items-center justify-center px-8 bg-black/40 backdrop-blur-[2px]"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] w-full p-8 flex flex-col items-center shadow-2xl"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <div className="w-12 h-9 border-[3px] border-slate-800 rounded flex flex-col justify-center px-1.5 gap-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full border-[2.5px] border-slate-800" />
                      <div className="w-4 h-[3px] bg-slate-800 rounded-full" />
                    </div>
                    <div className="w-full h-[3px] bg-slate-800 opacity-20 rounded-full" />
                    <div className="w-[70%] h-[3px] bg-slate-800 opacity-20 rounded-full" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#10b981] w-6.5 h-6.5 rounded-full flex items-center justify-center border-4 border-white">
                  <div className="w-2.5 h-1.5 border-b-[2.5px] border-l-[2.5px] border-white -rotate-45 -mt-0.5" />
                </div>
              </div>

              <h2 className="text-[22px] font-bold text-gray-900 mb-2">认证提醒</h2>
              <p className="text-[17px] text-gray-400 mb-9">仅限专业用户参与</p>

              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-14 bg-[#017a33] text-white rounded-full font-bold text-[16px] active:opacity-90"
                >
                  前往认证
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-14 bg-white text-gray-400 border border-gray-200 rounded-full font-medium text-[16px] active:bg-gray-50"
                >
                  暂不认证
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Page Header */}
      <div className="bg-white z-[60] pt-[44px] px-4 pb-2 flex items-center justify-between border-b border-gray-50 flex-shrink-0">
        <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors border border-transparent active:border-gray-100">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <span className="text-[18px] font-bold text-gray-900">积分福利</span>
        <button onClick={() => setShowShareDrawer(true)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <Upload size={22} className="text-gray-900" strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Points Card */}
        <div className="px-4 mt-4">
          <div className="bg-[#f0faf4] rounded-2xl p-5 border border-[#e2f5ea] flex items-center gap-4 relative">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-100 shrink-0">
              <User size={28} className="text-gray-300" />
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-1 overflow-hidden h-9">
                <span className="text-[24px] font-bold text-[#008434]">
                  <CountingNumber value={pointsTotal} />
                </span>
                <span className="text-[12px] text-[#008434] font-medium">医豆</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1">您有200医豆即将过期</p>
            </div>
            <button className="bg-primary px-4 py-2 rounded-full text-white text-[13px] font-bold flex items-center gap-1 active:scale-95 transition-transform">
              去兑换 <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="px-4 mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[16px] font-bold text-gray-900">今日任务</h3>
            <span className="text-gray-400 text-[12px] font-normal">完成今日任务赚更多医豆</span>
          </div>
          <div className="flex flex-col">
            {missions.map((mission, i) => (
              <div key={i} className="flex items-center gap-3 py-4 border-b border-gray-50 group hover:bg-gray-50 transition-colors -mx-4 px-4">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 shrink-0">
                  <mission.icon size={20} strokeWidth={2.0} />
                </div>
                <div className="flex-1">
                  <h4 className="text-[14px] font-bold text-gray-900 leading-tight">{mission.title}</h4>
                  <p className="text-[12px] text-gray-500 mt-1">已获得 {mission.points} 医豆</p>
                </div>
                <button 
                  onClick={() => handleComplete(i, mission.points)}
                  disabled={completedMissions.includes(i)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all shrink-0 active:scale-95 ${
                    completedMissions.includes(i) 
                    ? "bg-gray-100 text-gray-400 cursor-default" 
                    : "bg-primary text-white hover:opacity-90"
                  }`}
                >
                  {completedMissions.includes(i) ? "已完成" : "去完成"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Live Page ---
const LivePage = () => {
  const categories = ["热门", "学术", "手术", "护理"];
  const streams = [
    { title: "心血管内科微创手术直播演示", viewers: "2.4k", status: "直播中" },
    { title: "2026全国传染病防治学术年会", viewers: "1.8k", status: "预告" },
    { title: "儿科危重症全程管理专场", viewers: "956", status: "直播中" },
    { title: "神经内科疑难病例研讨会", viewers: "3.2k", status: "回放" },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="pt-[44px] px-4 pb-2 border-b border-gray-50 bg-white z-10 sticky top-0">
        <h2 className="text-[20px] font-bold text-gray-900">直播</h2>
      </div>
      <div className="flex gap-6 px-4 py-3 overflow-x-auto no-scrollbar border-b border-gray-50">
        {categories.map((cat, i) => (
          <span key={i} className={`text-[14px] whitespace-nowrap ${i === 0 ? "text-primary font-bold" : "text-gray-500"}`}>
            {cat}
          </span>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-28">
        {streams.map((stream, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="aspect-video bg-gray-100 relative items-center justify-center flex">
              <Play size={40} className="text-gray-300" />
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] rounded font-bold flex items-center gap-1">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                {stream.status}
              </div>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/40 text-white text-[10px] rounded backdrop-blur-sm">
                {stream.viewers} 观看
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-[14px] font-bold text-gray-900 line-clamp-1">{stream.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Learning Page ---
const LearningPage = () => {
  const stats = [
    { label: "累计时长", value: "128h" },
    { label: "必修学分", value: "24/30" },
    { label: "证书情况", value: "12个" },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="pt-[44px] px-4 pb-2 border-b border-gray-50 bg-white z-10 sticky top-0">
        <h2 className="text-[20px] font-bold text-gray-900">学习</h2>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <div className="p-4 grid grid-cols-3 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-[#f0faf4] rounded-xl p-3 border border-[#e2f5ea]">
              <p className="text-[10px] text-[#008434] opacity-70 mb-1">{s.label}</p>
              <p className="text-[16px] font-bold text-[#008434]">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="px-4 mt-2">
          <h3 className="text-[16px] font-bold text-gray-900 mb-3">进行中的课程</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 border border-gray-100">
                <h4 className="text-[14px] font-bold text-gray-900 mb-2">临床指南解读系列第{i}阶段</h4>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-primary" style={{ width: i === 1 ? '65%' : '30%' }} />
                </div>
                <div className="flex justify-between items-center text-[11px] text-gray-400">
                  <span>已学 {i === 1 ? '65%' : '30%'}</span>
                  <span>剩余 5 课时</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 mt-6">
          <h3 className="text-[16px] font-bold text-gray-900 mb-3">学习工具</h3>
          <div className="grid grid-cols-4 gap-4">
            {[{ icon: BookOpen, label: "错题集" }, { icon: ClipboardList, label: "笔记" }, { icon: GraduationCap, label: "考试" }, { icon: Calendar, label: "计划" }].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
                  <item.icon size={22} />
                </div>
                <span className="text-[11px] text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Messages Page ---
const MessagesPage = ({ onChatClick }: { onChatClick: (chat: any) => void }) => {
  const chats = [
    { name: "系统通知", msg: "您的医豆已到账，请查收", time: "10:30", count: 1 },
    { name: "招生办", msg: "欢迎咨询2026年继续教育课程", time: "昨日", count: 0 },
    { name: "赵医生", msg: "病例资料已经发到你邮箱了", time: "周一", count: 3 },
    { name: "学术交流群", msg: "李教授: 这个方案很值得探讨", time: "周日", count: 0 },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="pt-[44px] px-4 pb-2 border-b border-gray-50 bg-white z-10 sticky top-0 flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-gray-900">消息</h2>
        <LayoutGrid size={20} className="text-gray-400" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        {chats.map((chat, i) => (
          <div 
            key={i} 
            onClick={() => onChatClick(chat)}
            className="flex items-center gap-4 px-4 py-4 border-b border-gray-50 active:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
              <User size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <h4 className="text-[15px] font-bold text-gray-900 truncate">{chat.name}</h4>
                <span className="text-[11px] text-gray-400 shrink-0 ml-2">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-gray-500 truncate mr-2">{chat.msg}</p>
                {chat.count > 0 && (
                  <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                    {chat.count}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Chat Detail Page ---
const ChatDetailPage = ({ chat, onBack }: { chat: any, onBack: () => void }) => {
  const [messages, setMessages] = useState([
    { text: chat?.msg || "您好！", isMe: false, time: "10:30" },
    { text: "好的，我看一下。", isMe: true, time: "10:31" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { text: input, isMe: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages([...messages, newMsg]);
    setInput("");
    
    // Auto reply for demo
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "收到，我会尽快回复您的。", 
        isMe: false, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      {/* Header */}
      <div className="pt-[44px] px-4 pb-3 flex items-center justify-between border-b border-gray-100 bg-white z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 -ml-1 active:opacity-60">
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-[17px] font-bold text-gray-900">{chat?.name || "聊天"}</h1>
        </div>
        <MoreHorizontal size={22} className="text-gray-600" />
      </div>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 pb-10"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.isMe ? "justify-end" : "justify-start"} items-end gap-2`}>
            {!msg.isMe && <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0 flex items-center justify-center text-gray-400"><User size={16} /></div>}
            <div className={`max-w-[70%] rounded-2xl p-3 text-[14px] leading-relaxed ${
              msg.isMe ? "bg-primary text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm"
            }`}>
              {msg.text}
            </div>
            {msg.isMe && <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0 flex items-center justify-center text-gray-300"><User size={16} /></div>}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-3 pb-8">
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
          <Mic size={20} />
        </div>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="说点什么..."
          className="flex-1 h-10 bg-gray-100 rounded-full px-4 text-[14px] outline-none"
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim()}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            input.trim() ? "bg-primary text-white" : "bg-gray-100 text-gray-300"
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

// --- Job Listing Page ---
interface Job {
  title: string;
  company: string;
  salary: string;
  location: string;
  tag: string;
}

const JobListingPage = ({ onBack }: { onBack: () => void }) => {
  const jobs: Job[] = [
    { title: "全科医生", company: "北京市第一人民医院", salary: "15k-25k", location: "北京", tag: "三甲医院" },
    { title: "儿科主任", company: "上海和睦家医疗", salary: "30k-50k", location: "上海", tag: "民营医疗" },
    { title: "外科医生", company: "广州中山大学附属医院", salary: "20k-35k", location: "广州", tag: "编制内" },
    { title: "康复理疗师", company: "深圳泰康之家", salary: "10k-18k", location: "深圳", tag: "包食宿" },
    { title: "护士长", company: "杭州邵逸夫医院", salary: "12k-20k", location: "杭州", tag: "三甲医院" },
    { title: "影像科医师", company: "武汉同济医院", salary: "18k-28k", location: "武汉", tag: "五险一金" },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="pt-[44px] px-4 pb-3 flex items-center gap-3 bg-white border-b border-gray-100 z-50">
        <button onClick={onBack} className="p-1 -ml-1 active:opacity-60">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-[18px] font-bold text-gray-900">找工作</h1>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {jobs.map((job, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 active:bg-gray-50 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-[16px] font-bold text-gray-900">{job.title}</h3>
              <span className="text-[15px] font-bold text-[#f44336]">{job.salary}</span>
            </div>
            <p className="text-[13px] text-gray-600 mb-3">{job.company}</p>
            <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-3">
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] rounded">{job.tag}</span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] rounded">{job.location}</span>
              </div>
              <button className="text-[13px] text-primary font-medium">查看详情</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HuaYi AI Page ---
const HuaYiAIPage = ({ onBack }: { onBack: () => void }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col h-full bg-[#f8f9ff] relative overflow-hidden">
      {/* Header */}
      <div className="pt-[44px] px-4 pb-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-1 -ml-1 active:opacity-60 transition-opacity">
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-[18px] font-bold text-gray-900">华医AI</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 active:bg-gray-50 transition-colors">
            <Phone size={18} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 active:bg-gray-50 transition-colors">
            <VolumeX size={18} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5">
        {/* Welcome Section */}
        <div className="relative mt-4 mb-4">
          <div className="grid grid-cols-2 items-center">
            <div className="pt-4">
              <h2 className="text-[26px] font-bold text-[#1a237e] leading-tight flex flex-col">
                <span>HI</span>
                <span className="flex items-center gap-1">
                  有什么可以帮您！
                  <Sparkles size={20} className="text-[#7c4dff]" />
                </span>
              </h2>
            </div>
            <div className="relative h-[160px]">
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full border border-[#e8eaf6]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110px] h-[110px] rounded-full border border-[#e8eaf6]" />
              {/* Character Placeholder */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[140px] flex items-end justify-center">
                <div className="w-24 h-36 bg-[#e8eaf6] rounded-t-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-200 to-transparent" />
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 w-12 h-16 bg-[#fed7aa] rounded-full flex flex-col items-center pt-3">
                    <div className="flex gap-2 mb-1">
                      <div className="w-3 h-3 border-2 border-gray-800 rounded-full" />
                      <div className="w-3 h-3 border-2 border-gray-800 rounded-full" />
                    </div>
                    <div className="w-3 h-0.5 border-b border-gray-800 rounded-full" />
                  </div>
                  <div className="absolute top-4 inset-x-3 h-6 bg-[#451a03] rounded-full opacity-60" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Inquiry */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-[#7c4dff] rounded-full" />
            <h3 className="text-[15px] font-bold text-gray-900">快捷询问</h3>
          </div>
          
          <div className="space-y-3">
            {[
              { type: "医疗问询", content: "乳腺癌最新的治疗方案什么什么？" },
              { type: "辅助诊断", content: "TSH升高可能的诊断结果" },
              { type: "医学文案", content: "撰写一篇关于艾尔海魔症研究的..." },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm active:bg-gray-50 transition-colors border border-white"
              >
                <div className="flex-1 text-[14px]">
                  <span className="font-bold text-gray-900">{item.type}：</span>
                  <span className="text-gray-500">{item.content}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="px-5 pb-[44px] pt-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#f8f9ff] via-[#f8f9ff] to-transparent">
        <div className="bg-white h-[58px] rounded-full px-5 flex items-center gap-3 shadow-[0_4px_24px_rgba(124,77,255,0.08)]">
          <Mic size={22} className="text-gray-400" />
          <input 
            type="text"
            className="flex-1 text-[14px] text-gray-900 bg-transparent outline-none placeholder:text-gray-300"
            placeholder="请输入您的问题..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Plus size={22} className="text-gray-400" />
          <ImageIcon size={22} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
};

// --- Sub Pages ---
const GenericSubPage = ({ 
  title, 
  onBack, 
  icon: Icon,
  description 
}: { 
  title: string, 
  onBack: () => void, 
  icon: any,
  description?: string 
}) => {
  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="pt-[44px] px-4 pb-3 flex items-center gap-3 border-b border-gray-50 bg-white z-50">
        <button onClick={onBack} className="p-1 -ml-1 active:opacity-60 transition-opacity">
          <ChevronLeft size={24} className="text-gray-900" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">{title}</h1>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/30">
        <div className="p-6 flex flex-col items-center">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center mb-4 mt-8">
            <Icon size={40} className="text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-[14px] text-gray-400 text-center max-w-[200px] mb-8">
            {description || `正在为您加载${title}的相关学术资源与课程...`}
          </p>
          
          <div className="w-full space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-bold text-gray-900">热门项目</h3>
                <span className="text-[12px] text-gray-400">更多</span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-3">
                    <div className="w-20 h-14 bg-gray-100 rounded-lg shrink-0" />
                    <div className="flex-1 overflow-hidden">
                      <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-50 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center gap-4">
              <div className="w-full h-[180px] bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-100">
                <span className="text-gray-300 text-[13px]">更多精彩内容敬请期待</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Profile Page ---
const ProfilePage = ({ onNavigate }: { onNavigate: (label: string) => void }) => {
  const menuItems = [
    { icon: ShieldCheck, label: "人脸建档" },
    { icon: ClipboardList, label: "考勤记录" },
    { icon: MessageCircle, label: "微信绑定" },
    { icon: CreditCard, label: "我的订单" },
    { icon: FileIcon, label: "发票管理" },
    { icon: Download, label: "离线缓存" },
    { icon: Settings, label: "设置" },
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="pt-[44px] px-4 pb-4 flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-gray-900">我的</h2>
        <div className="flex items-center gap-4">
          <Search size={22} className="text-gray-900" />
          <Scan size={22} className="text-gray-900" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-[100px]">
        {/* User Info Section */}
        <div className="px-5 py-2 flex items-center gap-4">
          <div className="w-[72px] h-[72px] rounded-full bg-[#fae8d8] border-2 border-white overflow-hidden flex items-center justify-center shrink-0">
            <div className="relative w-full h-full">
              <div className="absolute inset-x-0 bottom-0 top-[20%] bg-[#b45309] rounded-t-full mx-1"></div>
              <div className="absolute inset-[15%] bg-[#fed7aa] rounded-full"></div>
              <div className="absolute top-[35%] left-[25%] w-1.5 h-1.5 bg-black rounded-full"></div>
              <div className="absolute top-[35%] right-[25%] w-1.5 h-1.5 bg-black rounded-full"></div>
              <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-4 h-1 border-b border-black rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] font-bold text-gray-900">医护赵晓莉</h3>
              <Pencil size={16} className="text-gray-300" />
            </div>
            <div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded-full w-fit">
              <Shield size={10} className="text-gray-400" />
              <span className="text-[11px] text-gray-400 font-medium">未认证</span>
            </div>
          </div>
          <button 
            onClick={() => onNavigate("我的简历")}
            className="bg-[#f2faf5] text-[#008434] px-4 py-1.5 rounded-full text-[13px] font-medium active:opacity-60 transition-opacity"
          >
            我的简历
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-2 px-5 mt-6 mb-6">
          {[
            { label: "我的收藏", value: "96" },
            { label: "积分任务", value: "288" },
            { label: "我的投递", value: "0" },
            { label: "华医号", value: "2983" },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center gap-1 active:scale-95 transition-transform cursor-pointer"
              onClick={() => onNavigate(stat.label)}
            >
              <span className="text-[18px] font-bold text-[#008434]">{stat.value}</span>
              <span className="text-[12px] text-gray-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Menu List */}
        <div className="border-t border-gray-50 pt-2">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate(item.label)}
              className="flex items-center gap-4 py-4.5 px-5 group active:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="text-gray-900">
                <item.icon size={22} strokeWidth={2} />
              </div>
              <span className="flex-1 text-[15px] text-gray-900 font-medium">{item.label}</span>
              <ChevronRight size={18} className="text-gray-300 group-active:text-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Bottom Navigation ---
const BottomNav = ({ activeTab, onSelect }: { activeTab: string, onSelect: (label: string) => void }) => {
  const navItems = [
    { label: "首页", icon: Home },
    { label: "直播", icon: Radio },
    { label: "学习", icon: Book },
    { label: "消息", icon: MessageSquare },
    { label: "我的", icon: User },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 pt-3 pb-[34px] flex items-center justify-between z-50">
      {navItems.map((item) => (
        <div 
          key={item.label}
          onClick={() => onSelect(item.label)}
          className="flex flex-col items-center gap-1 min-w-[60px] cursor-pointer"
        >
          <item.icon 
            size={24} 
            className={activeTab === item.label ? "text-primary" : "text-gray-400"} 
            strokeWidth={activeTab === item.label ? 2.5 : 2} 
          />
          <span className={`text-[10px] ${activeTab === item.label ? "text-primary font-bold" : "text-gray-400 font-normal"}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeTab, setActiveTab ] = useState("首页");
  const [activeSubTab, setActiveSubTab] = useState("推荐");
  const [showDepartments, setShowDepartments] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);

  const departments = [
    "全科", "肿瘤科", "心血管科", "儿科", "神经科", "妇产科", 
    "骨科", "急诊科", "皮肤科", "眼科", "耳鼻喉科", "口腔科", 
    "放射科", "内科", "外科", "精神科", "康复科", "中医科", 
    "老年科", "传染病科", "重症医学科", "麻醉科", "病理科"
  ];

  const handleNavigate = (label: string) => {
    if (label === "福利积分" || label === "积分任务") {
      setCurrentPage("points");
    } else {
      setCurrentPage(`sub-${label}`);
    }
  };

  const handleTabSelect = (label: string) => {
    setActiveTab(label);
    if (label === "首页") {
      setCurrentPage("home");
    } else if (label === "我的") {
      setCurrentPage("profile");
    } else if (label === "直播") {
      setCurrentPage("live");
    } else if (label === "学习") {
      setCurrentPage("learning");
    } else if (label === "消息") {
      setCurrentPage("messages");
    }
  };

  return (
    <div className="phone-container select-none overflow-hidden h-full">
      {/* iOS Status Bar */}
      <StatusBar />
      
      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentPage === "home" ? (
          <motion.div 
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="phone-content bg-white scroll-smooth pb-[100px]"
          >
            <Header />
            <SubNav active={activeSubTab} onSelect={setActiveSubTab} />
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeSubTab}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Categories onShowAll={() => setShowDepartments(true)} />
                <HeroBanner />
                <GridServices onNavigate={handleNavigate} />
                <SpecialBlocks />
                <RecommendedCourses />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : currentPage === "profile" ? (
          <motion.div 
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="phone-content bg-white"
          >
            <ProfilePage onNavigate={handleNavigate} />
          </motion.div>
        ) : currentPage === "live" ? (
          <motion.div 
            key="live"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="phone-content bg-white"
          >
            <LivePage />
          </motion.div>
        ) : currentPage === "learning" ? (
          <motion.div 
            key="learning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="phone-content bg-white"
          >
            <LearningPage />
          </motion.div>
        ) : currentPage === "messages" ? (
          <motion.div 
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="phone-content bg-white"
          >
            <MessagesPage onChatClick={(chat) => {
              setSelectedChat(chat);
              setCurrentPage("chat-detail");
            }} />
          </motion.div>
        ) : currentPage === "chat-detail" ? (
          <motion.div 
            key="chat-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="phone-content"
          >
            <ChatDetailPage 
              chat={selectedChat} 
              onBack={() => setCurrentPage("messages")} 
            />
          </motion.div>
        ) : currentPage === "points" ? (
          <motion.div 
            key="points"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="phone-content bg-white"
          >
            <PointsMission onBack={() => {
              if (["首页", "我的", "直播", "学习", "消息"].includes(activeTab)) {
                handleTabSelect(activeTab);
              } else {
                setCurrentPage("home");
                setActiveTab("首页");
              }
            }} />
          </motion.div>
        ) : currentPage.startsWith("sub-") ? (
          <motion.div 
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="phone-content bg-white"
          >
            {(() => {
              const label = currentPage.replace("sub-", "");
              
              if (label === "华医AI") {
                return <HuaYiAIPage onBack={() => {
                  if (["首页", "我的", "直播", "学习", "消息"].includes(activeTab)) {
                    handleTabSelect(activeTab);
                  } else {
                    setCurrentPage("home");
                    setActiveTab("首页");
                  }
                }} />;
              }

              const handleSubBack = () => {
                if (["首页", "我的", "直播", "学习", "消息"].includes(activeTab)) {
                  handleTabSelect(activeTab);
                } else {
                  setCurrentPage("home");
                  setActiveTab("首页");
                }
              };

              if (label === "找工作") {
                return <JobListingPage onBack={handleSubBack} />;
              }

              let icon = LayoutGrid;
              let description = "";
              
              if (label === "继续教育") icon = GraduationCap;
              if (label === "临床指南") icon = BookOpen;
              if (label === "找工作") icon = Briefcase;
              if (label === "职业题库") icon = ClipboardList;
              if (label === "精品继教") icon = Star;
              if (label === "培训班") icon = Users;
              if (label === "用药助手") icon = Pill;
              if (label === "我的简历") {
                icon = FileText;
                description = "展示您的专业风采，获取更多晋升机会。";
              }
              if (label === "我的收藏") {
                icon = Star;
                description = "您收藏的所有学术名篇与精彩直播都在这里。";
              }
              if (label === "我的投递") {
                icon = Send;
                description = "紧跟职业发展的每一步，查看您的申请进度。";
              }
              if (label === "人脸建档") {
                icon = ShieldCheck;
                description = "保障学习真实性，开启刷脸学习之旅。";
              }
              if (label === "考勤记录") {
                icon = ClipboardList;
                description = "记录您的每一次学习互动与线下签到。";
              }
              if (label === "微信绑定") {
                icon = MessageCircle;
                description = "绑定微信，获取即时课程提醒与学分动态。";
              }
              if (label === "我的订单") {
                icon = CreditCard;
                description = "查看您的购买记录与服务订单。";
              }
              if (label === "发票管理") {
                icon = FileIcon;
                description = "轻松开具电子发票，管理您的财务报销。";
              }
              if (label === "离线缓存") {
                icon = Download;
                description = "即使没有网络，也能随时随地继续学习。";
              }
              if (label === "设置") {
                icon = Settings;
                description = "个性化您的应用体验与安全隐私偏好。";
              }
              if (label === "华医号") {
                icon = User;
                description = "您的个人品牌空间，期待您的内容产出。";
              }
              
              return (
                <GenericSubPage 
                  title={label} 
                  icon={icon}
                  description={description}
                  onBack={handleSubBack} 
                />
              );
            })()}
          </motion.div>
        ) : null
        }
      </AnimatePresence>
      
      {!["points", "chat-detail", ...["继续教育", "临床指南", "找工作", "职业题库", "精品继教", "培训班", "用药助手", "华医AI"].map(l => `sub-${l}`)].includes(currentPage) && (
        <BottomNav activeTab={activeTab} onSelect={handleTabSelect} />
      )}
      
      {/* Departments Drawer */}
      <AnimatePresence>
        {showDepartments && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDepartments(false)}
              className="absolute inset-0 bg-black/50 z-[150] backdrop-blur-[1px]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] z-[160] px-5 pt-6 pb-[34px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] max-h-[70%]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[17px] font-bold text-gray-900">选择科室</h3>
                <button onClick={() => setShowDepartments(false)} className="p-2 -mr-2 text-gray-400 active:opacity-60 transition-opacity">
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3 overflow-y-auto no-scrollbar pb-6 max-h-[400px]">
                {departments.map((dept, i) => (
                  <button 
                    key={i} 
                    onClick={() => setShowDepartments(false)}
                    className="h-10 border border-gray-100 rounded-lg text-[13px] text-gray-700 font-medium active:bg-gray-50 flex items-center justify-center"
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* iOS Home Indicator */}
      <HomeIndicator />
    </div>
  );
}


