import { View, StyleSheet, TouchableOpacity, Text, Animated, Vibration } from 'react-native';
import { Link, useSegments } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useRef } from 'react';

const Menu = () => {
  const segments = useSegments();
  const currentRoute = `/${segments.join('/')}`;

  const menuItems = [
    { id: '1', name: "Accueil", icon: "home", link: "/professors/home" },
    { id: '2', name: "Profil", icon: "person", link: "/professors/profile" },
    { id: '3', name: "Étudiants", icon: "people", link: "/professors/students-list" },
    { id: '4', name: "Emploi", icon: "calendar-today", link: "/professors/schedules" },
    { id: '5', name: "Semestre", icon: "school", link: "/professors/semesters" },
  ];

  const scaleAnimations = menuItems.reduce((acc, item) => {
    acc[item.id] = useRef(new Animated.Value(1)).current;
    return acc;
  }, {});

  const handlePressIn = (id) => {
    Vibration.vibrate(10);
    Animated.spring(scaleAnimations[id], {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (id) => {
    Animated.spring(scaleAnimations[id], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const isActive = (link) => currentRoute === link;

  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item) => (
        <Link href={item.link} key={item.id} asChild>
          <TouchableOpacity
            style={styles.menuItem}
            onPressIn={() => handlePressIn(item.id)}
            onPressOut={() => handlePressOut(item.id)}
            activeOpacity={0.7}
          >
            <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleAnimations[item.id] }] }]}>
              <MaterialIcons 
                name={item.icon} 
                size={26} 
                color={isActive(item.link) ? '#007AFF' : '#666'} 
              />
              <Text style={[styles.menuText, isActive(item.link) && styles.menuTextActive]}>
                {item.name}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  menuTextActive: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default Menu;
