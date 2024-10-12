<template>
  <div class="bg-white rounded-xl overflow-hidden">
    <div>
      <div class="flex justify-center space-x-2 items-center mb-4">
        <div class="flex flex-col items-center">
          <h2
            class="text-lg text-slate-800 font-medium text-center w-72 lg:w-96 bg-gray-100 rounded-xl py-1 mb-4">
            {{ currentMonth }}
          </h2>

          <div class="flex justify-center items-center space-x-1 lg:space-x-2">
            <button
              @click="prevWeek"
              class="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              &lt;
            </button>
            <div
              v-for="(day, index) in currentWeek"
              :key="index"
              class="flex flex-col border p-1 w-8 lg:w-10 rounded-lg items-center">
              <div class="text-sm text-slate-800">{{ day.format("ddd") }}</div>
              <div
                :class="{
                  'bg-tertiary text-white': index === selectedIndex,
                  'hover:bg-gray-200': index !== selectedIndex,
                }"
                class="p-1 w-[1.7rem] text-center rounded-md cursor-pointer"
                @click="selectDate(index)">
                {{ day.format("D") }}
              </div>
            </div>
            <button
              @click="nextWeek"
              class="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300">
              &gt;
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-center mx-5">
        <div class="grid grid-cols-4 text-sm w-96 h-36">
          <div
            v-if="attorneyData"
            class="col-span-4 flex flex-wrap content-start justify-center">
            <div
              v-for="(slot, index) in timeSlots"
              :key="index"
              @click="handleSelectDate(slot)"
              class="px-4 w-20 h-[2.2rem] m-1 text-center justify-center py-2 rounded-md border bg-gray-50 text-slate-700 hover:bg-gray-200 cursor-pointer">
              {{ slot }}
            </div>
            <div
              v-if="!timeSlots.length"
              class="w-full text-center text-gray-500">
              Bu tarihte uygun saat bulunamadı. Lütfen başka bir tarih seçiniz.
            </div>
          </div>
          <div v-else>fetching</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "dayjs/locale/tr"; // Import Turkish locale
dayjs.extend(isoWeek);
dayjs.locale("tr"); // Set locale to Turkish

const props = defineProps({
  attorneyData: Object,
});

const store = useStore();
const router = useRouter();

const today = dayjs();
// today in YYYY-MM-DD format
const todayFormatted = new Date(today.format("YYYY-MM-DD"));
let timeSlotsDataExample = createWeeklyTimeSlots(
  todayFormatted,
  props.attorneyData
);

timeSlotsDataExample = removeExceptions(
      timeSlotsDataExample,
      props.attorneyData.exceptions
);

const startOfWeek = today.startOf("isoWeek");
const endOfWeek = today.endOf("isoWeek");
const currentMonth = ref(today.format("MMMM"));

const selectedDate = ref(today.format("YYYY-MM-DD"));
const selectedDay = ref(today.format("dddd"));
const selectedDateForDisplay = ref(today.format("DD MMMM YYYY"));

// pick current day index

const selectedIndex = ref(today.isoWeekday() - 1);

const currentWeek = ref(
  Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day"))
);

const timeSlots = computed(() => {
  const selectedDate = currentWeek.value[selectedIndex.value].format("YYYY-MM-DD");
  const slots = timeSlotsDataExample[selectedDate] || [];
  
  // Check if the selected date is today
  if (selectedDate === today.format("YYYY-MM-DD")) {
    const currentTime = dayjs().format("HH:mm");
    return slots.filter(slot => slot >= currentTime);  // Filter out past time slots
  }

  return slots;
});

const nextWeek = () => {
  const nextWeekStart = currentWeek.value[0].add(1, "week");
  currentWeek.value = Array.from({ length: 7 }, (_, i) =>
    nextWeekStart.add(i, "day")
  );
  currentMonth.value = currentWeek.value[0].format("MMMM");
  selectDate(0);
};

const prevWeek = () => {
  const prevWeekStart = currentWeek.value[0].subtract(1, "week");
  currentWeek.value = Array.from({ length: 7 }, (_, i) =>
    prevWeekStart.add(i, "day")
  );
  currentMonth.value = currentWeek.value[0].format("MMMM");
};

const selectDate = (index) => {
  selectedIndex.value = index;
  selectedDate.value = currentWeek.value[index].format("YYYY-MM-DD");
  selectedDateForDisplay.value =
    currentWeek.value[index].format("DD MMMM YYYY");
  selectedDay.value = currentWeek.value[index].format("dddd");
};

function createTimeSlots(intervals) {
  const slots = [];
  intervals.forEach((interval) => {
    let start = interval.start.split(":").map(Number);
    let end = interval.end.split(":").map(Number);
    let current = new Date(0, 0, 0, start[0], start[1]);
    const endDate = new Date(0, 0, 0, end[0], end[1]);

    while (current < endDate) {
      const hours = current.getHours().toString().padStart(2, "0");
      const minutes = current.getMinutes().toString().padStart(2, "0");
      slots.push(`${hours}:${minutes}`);
      current.setHours(current.getHours() + 1);
    }
  });
  return slots;
}

function generateDateKey(date) {
  return date.toISOString().split("T")[0];
}

function getDaySchedule(dayName, attorneyData) {
  return attorneyData.schedule.days.find((day) => day.name === dayName);
}

function createWeeklyTimeSlots(startDate, attorneyData) {
  const timeSlotsData = {};
  for (let i = 0; i < 28; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    const dayName = currentDate.toLocaleDateString("tr-TR", {
      weekday: "long",
    });
    const daySchedule = getDaySchedule(dayName, attorneyData);

    if (daySchedule && daySchedule.enabled) {
      const dateKey = generateDateKey(currentDate);
      timeSlotsData[dateKey] = createTimeSlots(daySchedule.intervals);
    }
  }
  return timeSlotsData;
}

function removeExceptions(timeSlotsData, exceptions) {
  const dates = Object.keys(timeSlotsData);
  exceptions.forEach((exception) => {
    const exceptionDateObj = new Date(exception.date);
    const exceptionDay = exceptionDateObj.getDay(); // 0 (Sunday) to 6 (Saturday)

    dates.forEach((date) => {
      const dateObj = new Date(date);
      const isSameDate = date === exception.date;
      const isRepeatingException =
        exception.repeat && dateObj.getDay() === exceptionDay;

      if (isSameDate || isRepeatingException) {
        const updatedTimeSlots = timeSlotsData[date].filter((slot) => {
          return slot < exception.startTime || slot >= exception.endTime;
        });

        timeSlotsData[date] = updatedTimeSlots;
      }
    });
  });
  return timeSlotsData;
}

// after selecting the date and slot, update the store and navigate to the randevu-olustur page
const handleSelectDate = (slot) => {
  store.dispatch("updateDateTimePickerData", {
    attorneyId: props.attorneyData.id,
    selectedDate: selectedDate.value,
    selectedDay: selectedDay.value,
    selectedDateForDisplay: selectedDateForDisplay.value,
    selectedSlot: slot,
  });
  // print store dateTimePickerData
  router.push("/randevu-olustur");
};

onMounted(() => {
  selectDate(selectedIndex.value);

});
</script>
