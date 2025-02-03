import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
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
    { id: '5', name: "Semester", icon: "school", link: "/professors/semesters" },
  ];

  const scaleAnimations = menuItems.reduce((acc, item) => {
    acc[item.id] = useRef(new Animated.Value(1)).current;
    return acc;
  }, {});

  const handlePressIn = (id) => {
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

  const isActive = (link) => {
    return currentRoute === link;
  };


  return (
    <View style={styles.menuContainer}>
    {menuItems.map((item) => (
      <Link href={item.link} key={item.id} asChild>
        <TouchableOpacity 
          style={styles.menuItem}
          onPressIn={() => handlePressIn(item.id)}
          onPressOut={() => handlePressOut(item.id)}
          activeOpacity={0.6}
        >
          <Animated.View style={{ 
            transform: [{ scale: scaleAnimations[item.id] }],
            opacity: scaleAnimations[item.id]
          }}>
            <MaterialIcons 
              name={item.icon} 
              size={26} 
              color={isActive(item.link) ? '#0b1320' : '#666'} 
            />
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    minWidth: 70,
  },
  menuText: {
    fontSize: 10,
    color: '#0b1320',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default Menu;