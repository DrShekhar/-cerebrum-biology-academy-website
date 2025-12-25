#!/bin/bash

# Heroicons to Lucide-react migration script
# This script handles the icon naming differences

FILES=$(grep -rl "heroicons" src/ --include="*.tsx" 2>/dev/null)

for file in $FILES; do
  echo "Processing: $file"
  
  # Replace import source - outline icons
  sed -i '' "s|from '@heroicons/react/24/outline'|from 'lucide-react'|g" "$file"
  sed -i '' "s|from '@heroicons/react/24/solid'|from 'lucide-react'|g" "$file"
  
  # Icon name mappings (heroicons -> lucide)
  # XMarkIcon -> X
  sed -i '' 's/XMarkIcon/X/g' "$file"
  
  # ClockIcon -> Clock
  sed -i '' 's/ClockIcon/Clock/g' "$file"
  
  # CheckCircleIcon -> CheckCircle2
  sed -i '' 's/CheckCircleIcon/CheckCircle2/g' "$file"
  
  # CheckIcon -> Check
  sed -i '' 's/CheckIcon/Check/g' "$file"
  
  # ChevronRightIcon -> ChevronRight
  sed -i '' 's/ChevronRightIcon/ChevronRight/g' "$file"
  
  # ChevronLeftIcon -> ChevronLeft
  sed -i '' 's/ChevronLeftIcon/ChevronLeft/g' "$file"
  
  # ChevronDownIcon -> ChevronDown
  sed -i '' 's/ChevronDownIcon/ChevronDown/g' "$file"
  
  # StarIcon -> Star
  sed -i '' 's/StarIcon/Star/g' "$file"
  
  # HeartIcon -> Heart
  sed -i '' 's/HeartIcon/Heart/g' "$file"
  
  # SparklesIcon -> Sparkles
  sed -i '' 's/SparklesIcon/Sparkles/g' "$file"
  
  # PlayIcon -> Play
  sed -i '' 's/PlayIcon/Play/g' "$file"
  
  # PhoneIcon -> Phone
  sed -i '' 's/PhoneIcon/Phone/g' "$file"
  
  # GlobeAltIcon -> Globe
  sed -i '' 's/GlobeAltIcon/Globe/g' "$file"
  
  # UsersIcon -> Users
  sed -i '' 's/UsersIcon/Users/g' "$file"
  
  # TrophyIcon -> Trophy
  sed -i '' 's/TrophyIcon/Trophy/g' "$file"
  
  # ShieldCheckIcon -> ShieldCheck
  sed -i '' 's/ShieldCheckIcon/ShieldCheck/g' "$file"
  
  # ListBulletIcon -> List
  sed -i '' 's/ListBulletIcon/List/g' "$file"
  
  # LightBulbIcon -> Lightbulb
  sed -i '' 's/LightBulbIcon/Lightbulb/g' "$file"
  
  # FireIcon -> Flame
  sed -i '' 's/FireIcon/Flame/g' "$file"
  
  # ExclamationCircleIcon -> AlertCircle
  sed -i '' 's/ExclamationCircleIcon/AlertCircle/g' "$file"
  
  # CogIcon -> Settings
  sed -i '' 's/CogIcon/Settings/g' "$file"
  
  # ChatBubbleLeftRightIcon -> MessageSquare
  sed -i '' 's/ChatBubbleLeftRightIcon/MessageSquare/g' "$file"
  
  # CalendarIcon -> Calendar
  sed -i '' 's/CalendarIcon/Calendar/g' "$file"
  
  # BookOpenIcon -> BookOpen
  sed -i '' 's/BookOpenIcon/BookOpen/g' "$file"
  
  # Bars3Icon -> Menu
  sed -i '' 's/Bars3Icon/Menu/g' "$file"
  
  # ArrowRightIcon -> ArrowRight
  sed -i '' 's/ArrowRightIcon/ArrowRight/g' "$file"
  
  # AcademicCapIcon -> GraduationCap
  sed -i '' 's/AcademicCapIcon/GraduationCap/g' "$file"
  
  # BookmarkIcon -> Bookmark
  sed -i '' 's/BookmarkIcon/Bookmark/g' "$file"
  
  # BoltIcon -> Zap
  sed -i '' 's/BoltIcon/Zap/g' "$file"
  
  # DocumentTextIcon -> FileText
  sed -i '' 's/DocumentTextIcon/FileText/g' "$file"
  
  # BeakerIcon -> Flask (or FlaskConical)
  sed -i '' 's/BeakerIcon/FlaskConical/g' "$file"
  
  # MagnifyingGlassIcon -> Search
  sed -i '' 's/MagnifyingGlassIcon/Search/g' "$file"
  
  # ArrowPathIcon -> RefreshCw
  sed -i '' 's/ArrowPathIcon/RefreshCw/g' "$file"
  
  # InformationCircleIcon -> Info
  sed -i '' 's/InformationCircleIcon/Info/g' "$file"
  
  # ExclamationTriangleIcon -> AlertTriangle
  sed -i '' 's/ExclamationTriangleIcon/AlertTriangle/g' "$file"
  
  # EyeIcon -> Eye
  sed -i '' 's/EyeIcon/Eye/g' "$file"
  
  # EyeSlashIcon -> EyeOff
  sed -i '' 's/EyeSlashIcon/EyeOff/g' "$file"
  
  # MinusIcon -> Minus
  sed -i '' 's/MinusIcon/Minus/g' "$file"
  
  # PlusIcon -> Plus
  sed -i '' 's/PlusIcon/Plus/g' "$file"
  
  # QuestionMarkCircleIcon -> HelpCircle
  sed -i '' 's/QuestionMarkCircleIcon/HelpCircle/g' "$file"
  
  # MapPinIcon -> MapPin
  sed -i '' 's/MapPinIcon/MapPin/g' "$file"
  
  # EnvelopeIcon -> Mail
  sed -i '' 's/EnvelopeIcon/Mail/g' "$file"
  
  # DevicePhoneMobileIcon -> Smartphone
  sed -i '' 's/DevicePhoneMobileIcon/Smartphone/g' "$file"
  
  # ChartBarIcon -> BarChart2
  sed -i '' 's/ChartBarIcon/BarChart2/g' "$file"
  
  # ChartPieIcon -> PieChart
  sed -i '' 's/ChartPieIcon/PieChart/g' "$file"
  
  # ArrowTrendingUpIcon -> TrendingUp
  sed -i '' 's/ArrowTrendingUpIcon/TrendingUp/g' "$file"
  
  # ArrowDownIcon -> ArrowDown
  sed -i '' 's/ArrowDownIcon/ArrowDown/g' "$file"
  
  # ArrowUpIcon -> ArrowUp
  sed -i '' 's/ArrowUpIcon/ArrowUp/g' "$file"
  
  # PencilIcon -> Pencil
  sed -i '' 's/PencilIcon/Pencil/g' "$file"
  
  # TrashIcon -> Trash2
  sed -i '' 's/TrashIcon/Trash2/g' "$file"
  
  # CurrencyRupeeIcon -> IndianRupee
  sed -i '' 's/CurrencyRupeeIcon/IndianRupee/g' "$file"
  
  # ReceiptRefundIcon -> ReceiptText
  sed -i '' 's/ReceiptRefundIcon/ReceiptText/g' "$file"
  
  # VideoCameraIcon -> Video
  sed -i '' 's/VideoCameraIcon/Video/g' "$file"
  
  # FlagIcon -> Flag
  sed -i '' 's/FlagIcon/Flag/g' "$file"
  
  # AdjustmentsHorizontalIcon -> SlidersHorizontal
  sed -i '' 's/AdjustmentsHorizontalIcon/SlidersHorizontal/g' "$file"
  
  # HandThumbUpIcon -> ThumbsUp
  sed -i '' 's/HandThumbUpIcon/ThumbsUp/g' "$file"
  
  # PresentationChartLineIcon -> LineChart
  sed -i '' 's/PresentationChartLineIcon/LineChart/g' "$file"
  
  # UserGroupIcon -> Users
  sed -i '' 's/UserGroupIcon/Users/g' "$file"
  
  # ComputerDesktopIcon -> Monitor
  sed -i '' 's/ComputerDesktopIcon/Monitor/g' "$file"
  
  # CreditCardIcon -> CreditCard
  sed -i '' 's/CreditCardIcon/CreditCard/g' "$file"
  
  # LanguageIcon -> Languages
  sed -i '' 's/LanguageIcon/Languages/g' "$file"
  
done

echo "Migration complete!"
