import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import moment from 'moment';

const PrayerTimesScreen = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [currentDate, setCurrentDate] = useState('');
  const [islamicDate, setIslamicDate] = useState('');
  const [prayerTimes, setPrayerTimes] = useState([]);

  useEffect(() => {
    // Update the current time every second
    const timer = setInterval(() => setCurrentTime(moment()), 1000);

    // Fetch prayer times when the component mounts
    fetchPrayerTimes();

    return () => clearInterval(timer); // Clean up timer on component unmount
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch(
        'https://api.aladhan.com/v1/timingsByCity?city=Arlington&country=US&method=2'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const timings = data.data.timings;

      // Format timings to 12-hour format
      const formattedTimings = [
        { prayer: 'Fajr', athan: moment(timings.Fajr, 'HH:mm').format('hh:mm A'), iqamah: '6:00 AM' },
        { prayer: 'Sunrise', athan: moment(timings.Sunrise, 'HH:mm').format('hh:mm A'), iqamah: '' },
        { prayer: 'Dhuhr', athan: moment(timings.Dhuhr, 'HH:mm').format('hh:mm A'), iqamah: '1:00 PM' },
        { prayer: 'Asr', athan: moment(timings.Asr, 'HH:mm').format('hh:mm A'), iqamah: '3:30 PM' },
        { prayer: 'Maghrib', athan: moment(timings.Maghrib, 'HH:mm').format('hh:mm A'), iqamah: '5:38 PM' },
        { prayer: 'Isha', athan: moment(timings.Isha, 'HH:mm').format('hh:mm A'), iqamah: '7:30 PM' },
        { prayer: 'Jumuah', athan: '1:30 PM', iqamah: '2:00 PM' }
      ];

      setPrayerTimes(formattedTimings);

      // Set dates
      setCurrentDate(moment().format('dddd, MMMM DD YYYY'));
      setIslamicDate(`${data.data.date.hijri.month.en} ${data.data.date.hijri.day}, ${data.data.date.hijri.year}`);
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      alert("Failed to fetch prayer times. Please try again later.");
    }
  };

  const renderPrayerTime = ({ item, index }) => (
    <View style={[styles.row, { backgroundColor: index % 2 === 0 ? '#DFF0D8' : '#FFFFFF' }]}>
      <Text style={styles.cell}>{item.prayer}</Text>
      <Text style={styles.cell}>{item.athan}</Text>
      <Text style={styles.cell}>{item.iqamah}</Text>
    </View>
  );

  return (
    //table 
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime.format('h:mm:ss A')}</Text>
      <Text style={styles.dateText}>{currentDate}</Text>
      <Text style={styles.islamicDateText}>{`| ${islamicDate}`}</Text>

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Prayer</Text>
          <Text style={styles.headerCell}>Athan</Text>
          <Text style={styles.headerCell}>Iqamah</Text>
        </View>

        <FlatList
          data={prayerTimes}
          renderItem={renderPrayerTime}
          keyExtractor={(item) => item.prayer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B5329',
    paddingTop: 20,
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  dateText: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 5,
  },
  islamicDateText: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
  },
  table: {
    width: '90%',
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    color: '#000000',
  },
});

export default PrayerTimesScreen;
