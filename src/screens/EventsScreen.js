import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import moment from 'moment';
import events from '../eventsData';

const EventsScreen = () => {
  const [currentDate, setCurrentDate] = useState(moment()); // Track current month
  const [selectedDate, setSelectedDate] = useState(null); // Track selected day

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Helper to navigate months
  const changeMonth = (direction) => {
    setCurrentDate((prev) =>
      direction === 'next' ? prev.clone().add(1, 'month') : prev.clone().subtract(1, 'month')
    );
  };

  // Generate days for the current month
  const generateDays = () => {
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const startDay = startOfMonth.day();
    const emptyDays = Array(startDay).fill(null); // Empty days for padding
    const daysInMonth = Array.from({ length: endOfMonth.date() }, (_, i) => i + 1);

    return [...emptyDays, ...daysInMonth];
  };

  const handleDayPress = (day) => {
    if (!day) return; // Ignore empty cells
    const selected = currentDate.clone().date(day);
    setSelectedDate(selected.format('YYYY-MM-DD'));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.calendarContainer}>
        {/* Header for Month Navigation */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => changeMonth('prev')}>
            <Text style={styles.navButton}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>{currentDate.format('MMMM YYYY')}</Text>
          <TouchableOpacity onPress={() => changeMonth('next')}>
            <Text style={styles.navButton}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Weekdays Row */}
        <View style={styles.weekdays}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.weekdayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.daysContainer}>
          {generateDays().map((day, index) => {
            const dayString = day ? currentDate.clone().date(day).format('YYYY-MM-DD') : null;
            const hasEvents = dayString && events[dayString] && events[dayString].length > 0;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.day,
                  day ? styles.activeDay : styles.inactiveDay,
                  day && selectedDate === dayString && styles.selectedDay,
                  { backgroundColor: Math.floor(index / 7) % 2 === 0 ? '#E8F5E9' : '#FFFFFF' }, // Alternate row color
                ]}
                onPress={() => handleDayPress(day)}
              >
                <Text style={styles.dayText}>{day || ''}</Text>
                {/* Notification Dot */}
                {hasEvents && day && <View style={styles.notificationDot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Display Events for the Selected Date at the Bottom */}
      <View style={styles.eventsContainer}>
        {selectedDate ? (
          <>
            <Text style={styles.eventsHeader}>Events on {selectedDate}:</Text>
            {events[selectedDate]?.length ? (
              events[selectedDate].map((event, i) => (
                <Text key={i} style={styles.eventText}>
                  {event}
                </Text>
              ))
            ) : (
              <Text style={styles.noEventsText}>No events for this day.</Text>
            )}
          </>
        ) : (
          <Text style={styles.noEventsText}>Select a day to see events.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2B5329' },
  calendarContainer: { flex: 1, padding: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerText: { fontSize: 20, fontWeight: 'bold', color: "#ffffff" },
  navButton: { fontSize: 18, fontWeight: '600', paddingHorizontal: 10, color: '#ffffff' },
  weekdays: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5 },
  weekdayText: { fontSize: 16, fontWeight: '600', color: '#ffffff' },
  daysContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  day: {
    width: '14.28%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  notificationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5722', // Color of the dot
    marginTop: 4, // Space between date text and dot
  },
  activeDay: { backgroundColor: '#f5f5f5' },
  inactiveDay: { backgroundColor: '#fff' },
  selectedDay: { backgroundColor: '#87CEEB' },
  dayText: { fontSize: 14 },
  eventsContainer: {
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  eventsHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  eventText: { fontSize: 14, marginBottom: 2 },
  noEventsText: { fontSize: 14, fontStyle: 'italic' },
});

export default EventsScreen;
