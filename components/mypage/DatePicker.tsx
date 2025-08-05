"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onDateRangeSelect: (range: DateRange) => void;
  selectedRange: DateRange;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isOpen,
  onClose,
  onDateRangeSelect,
  selectedRange,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tempStartDate, setTempStartDate] = useState<Date | null>(selectedRange.startDate);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 달력 헤더
  const monthNames = [
    "1월", "2월", "3월", "4월", "5월", "6월",
    "7월", "8월", "9월", "10월", "11월", "12월"
  ];

  const dayNames = ["월", "화", "수", "목", "금", "토", "일"];

  // 이번 달의 첫째 날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // 달력 시작일 (월요일부터 시작하도록 조정)
  const startDate = new Date(firstDay);
  const dayOfWeek = (firstDay.getDay() + 6) % 7; // 월요일을 0으로 만들기
  startDate.setDate(firstDay.getDate() - dayOfWeek);

  // 달력에 표시할 날짜들 생성
  const calendarDays = [];
  const currentCalendarDate = new Date(startDate);
  
  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      weekDays.push(new Date(currentCalendarDate));
      currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
    }
    calendarDays.push(weekDays);
    
    // 6주가 모두 다음 달이면 중단
    if (weekDays[0].getMonth() !== month && weekDays[6].getMonth() !== month) {
      break;
    }
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!tempStartDate || (tempStartDate && selectedRange.endDate)) {
      // 첫 번째 클릭이거나 범위가 이미 완성된 경우 - 새로운 시작 날짜 설정
      setTempStartDate(date);
      onDateRangeSelect({ startDate: date, endDate: null });
    } else {
      // 두 번째 클릭 - 종료 날짜 설정
      if (date >= tempStartDate) {
        onDateRangeSelect({ startDate: tempStartDate, endDate: date });
        onClose();
      } else {
        // 시작 날짜보다 이전을 선택한 경우 새로운 시작 날짜로 설정
        setTempStartDate(date);
        onDateRangeSelect({ startDate: date, endDate: null });
      }
    }
  };

  const handleToday = () => {
    const today = new Date();
    onDateRangeSelect({ startDate: today, endDate: today });
    setCurrentDate(today);
    setTempStartDate(today);
    onClose();
  };

  const handleClear = () => {
    onDateRangeSelect({ startDate: null, endDate: null });
    setTempStartDate(null);
    onClose();
  };

  const isDateInRange = (date: Date) => {
    if (!selectedRange.startDate) return false;
    
    if (!selectedRange.endDate) {
      // 시작 날짜만 선택된 경우
      return isSameDate(date, selectedRange.startDate);
    }
    
    // 범위 내에 있는지 확인
    return date >= selectedRange.startDate && date <= selectedRange.endDate;
  };

  const isStartDate = (date: Date) => {
    return selectedRange.startDate && isSameDate(date, selectedRange.startDate);
  };

  const isEndDate = (date: Date) => {
    return selectedRange.endDate && isSameDate(date, selectedRange.endDate);
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-80 max-w-sm mx-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900">
            {String(year).slice(-2)}년 {monthNames[month]}
          </h2>
          
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="space-y-1">
          {calendarDays.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((date, dayIndex) => {
                const isCurrentMonth = date.getMonth() === month;
                const isInRange = isDateInRange(date);
                const isStart = isStartDate(date);
                const isEnd = isEndDate(date);
                const isTodayDate = isToday(date);
                
                return (
                  <button
                    key={dayIndex}
                    onClick={() => handleDateClick(date)}
                    className={`
                      w-9 h-9 text-sm flex items-center justify-center transition-colors relative
                      ${!isCurrentMonth 
                        ? "text-gray-300 cursor-not-allowed" 
                        : "hover:bg-gray-100 cursor-pointer"
                      }
                      ${isStart || isEnd
                        ? "bg-blue-500 text-white hover:bg-blue-700 rounded-full z-10" 
                        : isInRange
                        ? "bg-blue-300 text-white"
                        : ""
                      }
                      ${isStart && !isEnd ? "rounded-l-full rounded-r-none" : ""}
                      ${isEnd && !isStart ? "rounded-r-full rounded-l-none" : ""}
                      ${isStart && isEnd ? "rounded-full" : ""}
                      ${isTodayDate && !isInRange 
                        ? "bg-blue-100 text-blue-600 font-semibold rounded-full" 
                        : ""
                      }
                    `}
                    disabled={!isCurrentMonth}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <button
            onClick={handleToday}
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Today
          </button>
          <button
            onClick={handleClear}
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Clear
          </button>
        </div>

        {/* 닫기 영역 */}
        <div 
          className="absolute inset-0 -z-10" 
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default DatePicker;